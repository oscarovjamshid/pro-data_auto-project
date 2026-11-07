cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import manage_user_page from "../pages/user_management_page";
import project_management_page from "../pages/project_management_page";
import login_page from "../pages/login_page";
import forgot_password_page from "../pages/forgot_password_page";
import mailinator_page from "../pages/mailinator_page";

// One test user goes through the whole life cycle: New -> Active -> Blocked -> login changed -> Deleted -> Restored -> Deleted.
// Tests depend on each other and must run in this order.
describe('25.User Management Tests', () => {
    let configData;
    let user;                                               // { email, fullName, newEmail } - set in beforeEach, the same for the whole run
    const now = new Date()
    const today = `${String(now.getDate()).padStart(2, '0')}${String(now.getMonth() + 1).padStart(2, '0')}${now.getFullYear()}`      // DDMMYYYY
    const runId = String(Cypress.env('runId')).slice(-6)
    const passwords = {                                     // test values of this run's user
        initial: `Qa.${runId}.qA`,
        afterReset: `Qa.${runId}.qB`,
        afterRestore: `Qa.${runId}.qD`,
    }
    const texts = {
        required: 'Обязательное поле',
        invalidValue: 'Неверное значение',
        invalidLogin: 'Логин должен быть в формате email',
        emailExists: 'Пользователь с таким email уже существует',
        statusNew: 'Новый',
        statusActive: 'Активный',
        statusBlocked: 'Заблокирован',
        statusDeleted: 'Удален',
        userType: 'Стандартная',
        createdDate: `${today.slice(0, 2)}.${today.slice(2, 4)}.${today.slice(4)}`,
        success: 'Успешно',
        userInfo: 'Информация о пользователе',
        resetPswSent: 'На email пользователя отправлено письмо с ссылкой для сброса пароля',
        wrongPassword: 'Неправильный пароль',
        blocked: 'Пользователь заблокирован администратором',
        unauthorized: 'Unauthorized',
        emailInUse: 'Данный email уже используется',
    }
    const subjects = {                                      // email subjects
        registration: 'Доступ к услугам облака Pro-Data',
        passwordReset: 'Восстановление пароля',
        loginChange: 'Изменение логина',
        restore: 'Доступ к услугам облака Pro-Data',          // TODO confirm subject of restore email
    }

    function loginAsAdmin() {
        cy.login(configData.base_url, configData.login, configData.password)
    }
    function openUserManagement() {
        sidebar.actions.clickUserIcon()
        sidebar.actions.clickSettingsIcon()
        sidebar.actions.clickUserManagement()
    }
    function backToUserList() {                             // settings menu is already open on user edit page
        sidebar.actions.clickUserManagement()
    }
    function openUserActions(email) {
        openUserManagement()
        manage_user_page.actions.clickUserEditBtnByEmail(email)
        manage_user_page.actions.clickEditUserPageActionsBtn()
    }
    function logout() {
        sidebar.actions.clickLogOutBtn()
        sidebar.actions.clickConfLogoutBtn()
    }
    function tryLogin(email, password) {
        cy.visit(configData.base_url)
        login_page.actions.isVisibleLoginTxt()
        login_page.actions.clickeditLanguage()
        login_page.actions.clickRusLanguage()
        login_page.actions.enterLogin(email)
        login_page.actions.enterPassword(password)
        login_page.actions.clickLoginBtn()
    }
    function openCreateUserForm(email, fullName) {
        openUserManagement()
        manage_user_page.actions.clickAddNewUserButton()
        if (email) manage_user_page.actions.typeUserLoginTxt(email)
        if (fullName) manage_user_page.actions.typeUserFullNameTxt(fullName)
    }
    function submitCreateUserForm(email) {
        manage_user_page.actions.clickCreateUserBtn()
        manage_user_page.actions.isVisibleUserByEmail(email)
        manage_user_page.actions.isNotVisibleToast()
    }
    function setPasswordFromEmail(email, subject, password) {
        cy.visit(configData.base_url)                       // cy.origin needs the panel to be the top page before mailinator
        mailinator_page.actions.getLinkFromEmail(email, subject).then((link) => {
            cy.visit(link)
            forgot_password_page.actions.enterPwdToResetPwdPageNewPasswordField(password)
            forgot_password_page.actions.enterPwdToResetPwdPageConfirmPasswordField(password)
            forgot_password_page.actions.clickResetPwdSaveBtn()
            forgot_password_page.actions.isNotVisibleResetPwdSaveBtn()
            forgot_password_page.actions.clickResetPwdBackToMainBtn()
        })
    }
    function deleteUser(email) {
        openUserManagement()
        manage_user_page.actions.clickUserDeleteBtnByEmail(email)
        manage_user_page.actions.clickUserDeleteConfBtn()
        manage_user_page.actions.isNotVisibleUserByEmail(email)
    }
    function changeLoginWith(email, newEmail) {
        openUserActions(email)
        manage_user_page.actions.clickChangeLoginBtn()
        manage_user_page.actions.typeChangeLoginTxt(newEmail)
        manage_user_page.actions.clickChangeLoginSubmitBtn()
    }

    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('GET', '**/panel-main/api/v1/rbac/projects/*/members*').as('projectMembers');
        cy.task('userNumberForRun', { runId, date: today }).then((number) => {     // the same number for every test of this run
            const id = `${today}-${String(number).padStart(2, '0')}`
            user = {
                email: `user-${id}@mailinator.com`,
                fullName: `User ${id}`,
                newEmail: `user-${id}-changed@mailinator.com`,
            }
        })
    })
    after(() => {                                           // delete test users of today left not deleted (if some test failed)
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('GET', '**/panel-main/api/userPanel/childUserList*').as('childUserList');
        loginAsAdmin()
        openUserManagement()
        cy.wait('@childUserList')
        manage_user_page.actions.deleteUsersByPrefix(`user-${today}-`)
    })

    it('[PD-240] User Management - adding new user (successful)', () => {
        loginAsAdmin()
        openCreateUserForm(user.email, user.fullName)
        manage_user_page.actions.selectProjectByName(configData.second_project_name, configData.main_project_owner)
        submitCreateUserForm(user.email)
        manage_user_page.actions.checkUserRowContains(user.email, user.fullName)
    })
    it('[PD-201, PD-1166, PD-203] User Management - adding new user with empty email, invalid email, empty Full Name (unsuccessful)', () => {
        loginAsAdmin()
        // [PD-201]
        openCreateUserForm(null, user.fullName)
        manage_user_page.actions.selectProjects(1)
        manage_user_page.actions.clickCreateUserBtn()
        manage_user_page.actions.checkCreateUserLoginError(texts.required)
        // [PD-1166]
        manage_user_page.actions.typeUserLoginTxt(`user-${today}@mailinator`)
        manage_user_page.actions.clickCreateUserBtn()
        manage_user_page.actions.checkCreateUserLoginError(texts.invalidValue)
        // [PD-203]
        backToUserList()
        manage_user_page.actions.clickAddNewUserButton()
        manage_user_page.actions.typeUserLoginTxt(`user-${today}-empty-name@mailinator.com`)
        manage_user_page.actions.selectProjects(1)
        manage_user_page.actions.clickCreateUserBtn()
        manage_user_page.actions.checkCreateUserFullNameError(texts.required)
    })
    it('[PD-1167] User Management - adding new user with existing email address (unsuccessful)', () => {
        loginAsAdmin()
        openCreateUserForm(user.email, `${user.fullName} copy`)
        manage_user_page.actions.selectProjects(1)
        manage_user_page.actions.clickCreateUserBtn()
        manage_user_page.actions.checkCreateUserLoginError(texts.emailExists)
    })
    it('[PD-1168] User Management - adding new user with single project selected (successful)', () => {
        loginAsAdmin()
        sidebar.actions.clickUserIcon()
        sidebar.actions.clickSettingsIcon()
        sidebar.actions.clickProjectManagement()
        project_management_page.actions.isMemberOfProject(1, user.fullName)          // second_project_name
        project_management_page.actions.isNotMemberOfProject(0, user.fullName)
    })
    it('[PD-1169, PD-1170] User Management - adding new user with multiple and all projects selected (successful)', () => {
        const multiUser = { email: `user-${today}-multi-${runId}@mailinator.com`, fullName: `User ${today} multi ${runId}` }
        const allUser = { email: `user-${today}-all-${runId}@mailinator.com`, fullName: `User ${today} all ${runId}` }
        loginAsAdmin()
        // [PD-1169]
        openCreateUserForm(multiUser.email, multiUser.fullName)
        manage_user_page.actions.selectProjectByName(configData.main_project_name, configData.main_project_owner)
        manage_user_page.actions.selectProjectByName(configData.second_project_name, configData.main_project_owner)
        submitCreateUserForm(multiUser.email)
        // [PD-1170]
        manage_user_page.actions.clickAddNewUserButton()
        manage_user_page.actions.typeUserLoginTxt(allUser.email)
        manage_user_page.actions.typeUserFullNameTxt(allUser.fullName)
        manage_user_page.actions.selectAllProjects()
        submitCreateUserForm(allUser.email)
        sidebar.actions.clickProjectManagement()
        project_management_page.actions.isMemberOfProject(0, multiUser.fullName)
        project_management_page.actions.isMemberOfProject(1, multiUser.fullName)
        project_management_page.actions.isMemberOfProject(0, allUser.fullName)
        project_management_page.actions.isMemberOfProject(1, allUser.fullName)
        deleteUser(multiUser.email)                         // these users are needed only for this test
        deleteUser(allUser.email)
    })
    it('[PD-1171] User Management - new user details: name, login, date, type, status = New (successful)', () => {
        loginAsAdmin()
        openUserManagement()
        manage_user_page.actions.checkUserRowContains(user.email, user.fullName)
        manage_user_page.actions.checkUserRowContains(user.email, texts.createdDate)
        manage_user_page.actions.checkUserRowContains(user.email, texts.userType)
        manage_user_page.actions.checkUserRowContains(user.email, texts.statusNew)
    })
    it('[PD-1172] User Management - new user cannot login without confirming email link (unsuccessful)', () => {
        tryLogin(user.email, passwords.initial)
        login_page.actions.isNotLoginedWithError(texts.wrongPassword)
    })
    it('[PD-1173] User Management - new user information data on hover (successful)', () => {
        loginAsAdmin()
        openUserManagement()
        manage_user_page.actions.hoverUserInfoBtn(user.email)
        manage_user_page.actions.checkUserInfoTooltip(texts.userInfo)
        manage_user_page.actions.clickUserInfoBtn(user.email)
        manage_user_page.actions.checkModalContains(`Логин: ${user.email}`)
    })
    it('[PD-1174] User Management - new user edit: Reset password and Change login buttons are disabled (successful)', () => {
        loginAsAdmin()
        openUserActions(user.email)
        manage_user_page.actions.isDisabledResetPswBtn()
        manage_user_page.actions.isDisabledChangeLoginBtn()
    })
    it('[PD-1175] User Management - new user confirms email, logins and status = Active (successful)', () => {
        setPasswordFromEmail(user.email, subjects.registration, passwords.initial)
        cy.login(configData.base_url, user.email, passwords.initial)
        logout()
        loginAsAdmin()
        openUserManagement()
        manage_user_page.actions.checkUserRowContains(user.email, texts.statusActive)
    })
    it('[PD-1176, PD-206, PD-1177] User Management - active user: adding, editing and deleting phone number (successful)', () => {
        const phone = '99890' + Cypress._.random(1000000, 9999999)
        const updatedPhone = '99891' + Cypress._.random(1000000, 9999999)
        loginAsAdmin()
        openUserManagement()
        // [PD-1176]
        manage_user_page.actions.clickUserEditBtnByEmail(user.email)
        manage_user_page.actions.typeEditUserPhoneTxt(phone)
        manage_user_page.actions.clickEditUserSaveBtn()
        manage_user_page.actions.isVisibleSuccessMessage(texts.success)
        backToUserList()
        manage_user_page.actions.clickUserEditBtnByEmail(user.email)
        manage_user_page.actions.getEditUserPhone().should('eq', phone)
        // [PD-206]
        manage_user_page.actions.typeEditUserPhoneTxt(updatedPhone)
        manage_user_page.actions.clickEditUserSaveBtn()
        manage_user_page.actions.isVisibleSuccessMessage(texts.success)
        backToUserList()
        manage_user_page.actions.clickUserEditBtnByEmail(user.email)
        manage_user_page.actions.getEditUserPhone().should('eq', updatedPhone)
        // [PD-1177]
        manage_user_page.actions.clearEditUserPhoneTxt()
        manage_user_page.actions.clickEditUserSaveBtn()
        manage_user_page.actions.isVisibleSuccessMessage(texts.success)
        backToUserList()
        manage_user_page.actions.clickUserEditBtnByEmail(user.email)
        manage_user_page.actions.getEditUserPhone().should('have.length.lte', 3)       // empty field still has +998 mask
    })
    it('[PD-1178] User Management - active user: Reset password: Cancel button (successful)', () => {
        loginAsAdmin()
        openUserActions(user.email)
        manage_user_page.actions.clickResetPswBtn()
        manage_user_page.actions.clickResetPswCancelBtn()
        manage_user_page.actions.isNotVisibleModal()
        logout()
        cy.login(configData.base_url, user.email, passwords.initial)        // password is not changed
    })
    it('[PD-1179] User Management - active user: resetting password and login (successful)', () => {
        loginAsAdmin()
        openUserActions(user.email)
        manage_user_page.actions.clickResetPswBtn()
        manage_user_page.actions.clickResetPswAcceptBtnInResetPswConfModal()
        manage_user_page.actions.isVisibleNewPasswordTitleLbl(texts.resetPswSent)
        logout()
        setPasswordFromEmail(user.email, subjects.passwordReset, passwords.afterReset)
        cy.login(configData.base_url, user.email, passwords.afterReset)
    })
    it('[PD-1180] User Management - active user cannot login with old password (unsuccessful)', () => {
        tryLogin(user.email, passwords.initial)
        login_page.actions.isNotLoginedWithError(texts.wrongPassword)
    })
    it('[PD-209] User Management - active user: block active user (successful)', () => {
        loginAsAdmin()
        openUserActions(user.email)
        manage_user_page.actions.clickBlockUserBtn()
        manage_user_page.actions.clickBlockUserConfBtn()
        manage_user_page.actions.isNotVisibleModal()
        backToUserList()
        manage_user_page.actions.checkUserRowContains(user.email, texts.statusBlocked)
        manage_user_page.actions.clickUserEditBtnByEmail(user.email)       // page is re-rendered after blocking, so open it again
        manage_user_page.actions.clickEditUserPageActionsBtn()
        manage_user_page.actions.isVisibleUnblockBtn()
    })
    it('[PD-214] User Management - blocked user cannot login (unsuccessful)', () => {
        tryLogin(user.email, passwords.afterReset)
        login_page.actions.isNotLoginedWithError(texts.blocked)
    })
    it('[PD-1181] User Management - blocked user: Unblock: Cancel button (successful)', () => {
        loginAsAdmin()
        openUserActions(user.email)
        manage_user_page.actions.clickUnblockUserBtn()
        manage_user_page.actions.clickBlockCancelBtn()
        manage_user_page.actions.isNotVisibleModal()
        backToUserList()
        manage_user_page.actions.checkUserRowContains(user.email, texts.statusBlocked)
    })
    it('[PD-211] User Management - blocked user: unblock blocked user (successful)', () => {
        loginAsAdmin()
        openUserActions(user.email)
        manage_user_page.actions.clickUnblockUserBtn()
        manage_user_page.actions.clickBlockUserConfBtn()        // the same confirm button for block and unblock
        manage_user_page.actions.isNotVisibleModal()
        backToUserList()
        manage_user_page.actions.checkUserRowContains(user.email, texts.statusActive)
        manage_user_page.actions.clickUserEditBtnByEmail(user.email)
        manage_user_page.actions.clickEditUserPageActionsBtn()
        manage_user_page.actions.isVisibleBlockUserBtnText('Заблокировать')
    })
    it('[PD-1182] User Management - unblocked user can login (successful)', () => {
        cy.login(configData.base_url, user.email, passwords.afterReset)
    })
    it('[PD-1183] User Management - active user: Change login: Cancel button (successful)', () => {
        loginAsAdmin()
        openUserActions(user.email)
        manage_user_page.actions.clickChangeLoginBtn()
        manage_user_page.actions.typeChangeLoginTxt(user.newEmail)
        manage_user_page.actions.clickChangeLoginCancelBtn()
        manage_user_page.actions.isNotVisibleModal()
        backToUserList()
        manage_user_page.actions.isVisibleUserByEmail(user.email)
        manage_user_page.actions.isNotVisibleUserByEmail(user.newEmail)
    })
    it('[PD-1184, PD-1185, PD-1186] User Management - active user: Change login: invalid, empty, existing email address (unsuccessful)', () => {
        loginAsAdmin()
        // [PD-1184]
        changeLoginWith(user.email, `user-${today}@mailinator`)
        manage_user_page.actions.checkChangeLoginError(texts.invalidLogin)
        // [PD-1185]
        manage_user_page.actions.clearChangeLoginTxt()
        manage_user_page.actions.clickChangeLoginSubmitBtn()
        manage_user_page.actions.checkChangeLoginError(texts.required)
        // [PD-1186]
        manage_user_page.actions.typeChangeLoginTxt(configData.login)
        manage_user_page.actions.clickChangeLoginSubmitBtn()
        manage_user_page.actions.checkToast(texts.emailInUse)
    })
    it('[PD-1187] User Management - active user: Change login: email is sent (successful)', () => {
        loginAsAdmin()
        changeLoginWith(user.email, user.newEmail)
        manage_user_page.actions.isNotVisibleModal()
        logout()
        mailinator_page.actions.getLinkFromEmail(user.newEmail, subjects.loginChange).should('match', /^http/)
    })
    it('[PD-1188] User Management - active user: Change login: user can still login with current login until new email is confirmed (successful)', () => {
        cy.login(configData.base_url, user.email, passwords.afterReset)
    })
    it('[PD-1189] User Management - active user: Change login: confirms new email and logins with it (successful)', () => {
        cy.intercept('GET', '**/panel-main/api/v1/auth/confirm-email*').as('confirmEmail')
        cy.visit(configData.base_url)                       // cy.origin needs the panel to be the top page before mailinator
        mailinator_page.actions.getLinkFromEmail(user.newEmail, subjects.loginChange).then((link) => {
            cy.visit(link)
        })
        cy.wait('@confirmEmail').its('response.statusCode').should('eq', 200)
        cy.login(configData.base_url, user.newEmail, passwords.afterReset)     // password is not changed with login
    })
    it('[PD-1190] User Management - active user cannot login with old login after it has been changed (unsuccessful)', () => {
        tryLogin(user.email, passwords.afterReset)
        login_page.actions.isNotLoginedWithError(texts.unauthorized)
    })
    it('[PD-215] User Management - delete active user (successful)', () => {
        loginAsAdmin()
        deleteUser(user.newEmail)
    })
    it('[PD-212] User Management - deleted user cannot login (unsuccessful)', () => {
        tryLogin(user.newEmail, passwords.afterReset)
        login_page.actions.isNotLoginedWithError(texts.unauthorized)
    })
    it('[PD-1191, PD-1192] User Management - Hide deleted ticked off / on: deleted users appear / disappear (successful)', () => {
        loginAsAdmin()
        openUserManagement()
        // [PD-1191]
        manage_user_page.actions.uncheckHideDeleted()
        manage_user_page.actions.checkUserRowContains(user.newEmail, texts.statusDeleted)
        // [PD-1192]
        manage_user_page.actions.checkHideDeleted()
        manage_user_page.actions.isNotVisibleUserByEmail(user.newEmail)
    })
    it('[PD-1193] User Management - deleted user: Restore: Cancel button (successful)', () => {
        loginAsAdmin()
        openUserManagement()
        manage_user_page.actions.uncheckHideDeleted()
        manage_user_page.actions.clickUserRestoreBtnByEmail(user.newEmail)
        manage_user_page.actions.clickUserRestoreCancelBtn()
        manage_user_page.actions.isNotVisibleModal()
        manage_user_page.actions.checkUserRowContains(user.newEmail, texts.statusDeleted)
    })
    it('[PD-1194] User Management - deleted user: restore successfully, email is sent (successful)', () => {
        loginAsAdmin()
        openUserManagement()
        manage_user_page.actions.uncheckHideDeleted()
        manage_user_page.actions.clickUserRestoreBtnByEmail(user.newEmail)
        manage_user_page.actions.clickUserRestoreConfBtn()
        manage_user_page.actions.checkUserRowContains(user.newEmail, texts.statusNew)
        logout()
        mailinator_page.actions.getLinkFromEmail(user.newEmail, subjects.restore).should('match', /^http/)
    })
    it('[PD-1195] User Management - restored user cannot login unless email is confirmed (unsuccessful)', () => {
        tryLogin(user.newEmail, passwords.afterReset)
        login_page.actions.isNotLoginedWithError(texts.wrongPassword)
    })
    it('[PD-1196] User Management - restored user: email confirmation and login (successful)', () => {
        setPasswordFromEmail(user.newEmail, subjects.restore, passwords.afterRestore)
        cy.login(configData.base_url, user.newEmail, passwords.afterRestore)
    })
    it('[PD-1197] User Management - restored user: delete (successful)', () => {
        loginAsAdmin()
        deleteUser(user.newEmail)
    })
})
