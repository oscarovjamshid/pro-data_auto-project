cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import manage_user_page from "../pages/user_management_page";
import login_page from "../pages/login_page";
import forgot_password_page from "../pages/forgot_password_page";
import object_Storage_page from "../pages/object_storage_page";

describe('25.User Management Tests', () => {
    let configData;
    const newUserFullName = 'New User';
    const duplicateUserFullName = 'Invalid User';
    const randomEmailSuffix = Math.random().toString(36).slice(2, 6); // generate a random 4-character string for email uniqueness
    const newUserEmail = `newuser${randomEmailSuffix}@mailinator.com`;
    const newUserInitialPassword = '123.Qa.321';
    const newUserUpdatedPassword = '123.Qaa.321';
    function extractPassword(text) {
        const match = text.match(/Новый пароль:\s*(\S+)/);
        return match ? match[1] : null;
    }
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
    })

    it('[PD-240] Create a new user', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserIcon()
        sidebar.actions.clickSettingsIcon()
        sidebar.actions.clickUserManagement()
        manage_user_page.actions.clickAddNewUserButton()
        manage_user_page.actions.typeUserLoginTxt(newUserEmail)
        manage_user_page.actions.typeUserFullNameTxt(newUserFullName)
        manage_user_page.actions.clickProjectListDropdown()
        manage_user_page.actions.clickProjectListDropdownOption()
        manage_user_page.actions.clickProjectListDropdown()
        manage_user_page.actions.clickCreateUserBtn()
        manage_user_page.actions.isVisibleUser(newUserFullName)
    })
    it('From New to Active status = setting up user password from email', () => {
        cy.origin('https://www.mailinator.com', () => {
            Cypress.on('uncaught:exception', (err, runnable) => {  // inside the cy.origin() method from failing the test
                return false
            })
        });
        cy.visit(configData.base_url)
        login_page.actions.isVisibleLoginTxt()
        login_page.actions.clickeditLanguage()
        login_page.actions.clickRusLanguage()
        forgot_password_page.actions.getPasswordResetUrl(newUserEmail).then((resetUrl) => {
            cy.log(`Visiting reset URL: ${resetUrl}`)
            cy.wait(2000)
            cy.visit(resetUrl)
            cy.wait(2000)
            forgot_password_page.actions.enterPwdToResetPwdPageNewPasswordField(newUserInitialPassword)
            forgot_password_page.actions.enterPwdToResetPwdPageConfirmPasswordField(newUserInitialPassword)
            forgot_password_page.actions.clickResetPwdSaveBtn()
            cy.wait(5000)
            forgot_password_page.actions.clickResetPwdBackToMainBtn()
            login_page.actions.enterLogin(newUserEmail)
            login_page.actions.enterPassword(newUserInitialPassword)
            login_page.actions.isVisibleLoginBtn()
            login_page.actions.clickLoginBtn()
            login_page.actions.isLogined()
        })
    })
    it('[PD-206] Save phone number for new user', () => {
        const randomPhone = '998' + Math.floor(Math.random() * 900000000).toString().padStart(9, '0');
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserIcon()
        sidebar.actions.clickSettingsIcon()
        sidebar.actions.clickUserManagement()
        manage_user_page.actions.isVisibleUser(newUserFullName)
        manage_user_page.actions.clickUserEditBtn(newUserFullName)
        manage_user_page.actions.typeEditUserPhoneTxt(randomPhone)
        manage_user_page.actions.clickEditUserSaveBtn()
        manage_user_page.actions.isVisibleSuccessMessage('Успешно')

    })
    it('Delete phone number from new user', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserIcon()
        sidebar.actions.clickSettingsIcon()
        sidebar.actions.clickUserManagement()
        manage_user_page.actions.isVisibleUser(newUserFullName)
        manage_user_page.actions.clickUserEditBtn(newUserFullName)
        manage_user_page.actions.clickUserPhoneNumberDeleteBtn()
        manage_user_page.actions.isVisibleSuccessMessage('Успешно')
        manage_user_page.actions.isEmptyPhoneNumberField()
    })
    it('[PD-207] Activate Object Storage Service', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserIcon()
        sidebar.actions.clickSettingsIcon()
        sidebar.actions.clickUserManagement()
        manage_user_page.actions.isVisibleUser(newUserFullName)
        manage_user_page.actions.clickUserEditBtn(newUserFullName)
        manage_user_page.actions.clickEditUserPageActionsBtn()
        manage_user_page.actions.clickActivateObjectMemoryBtn('Активировать')
        manage_user_page.actions.clickActivateObjectMemoryConfBtn()
        manage_user_page.actions.isDisabledActivateObjectMemoryBtn("Деактивировать")
        sidebar.actions.clickLogOutBtn()
        sidebar.actions.clickConfLogoutBtn()
        cy.login(configData.base_url, newUserEmail, newUserInitialPassword)
        sidebar.actions.clickObjectStorageIcon()
        object_Storage_page.actions.isVisibleAddBucketBtnWhenNoBuckets()
    })
    it('[PD-208] Reset password (sending the link to email) and re-login', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserIcon()
        sidebar.actions.clickSettingsIcon()
        sidebar.actions.clickUserManagement()
        manage_user_page.actions.clickUserEditBtn(newUserFullName)
        manage_user_page.actions.clickEditUserPageActionsBtn()
        manage_user_page.actions.clickResetPswBtn()
        manage_user_page.actions.clickResetPswAcceptBtnInResetPswConfModal()
        manage_user_page.actions.isVisibleNewPasswordTitleLbl('На email пользователя отправлено письмо с ссылкой для сброса пароля')
        cy.origin('https://www.mailinator.com', () => {
            Cypress.on('uncaught:exception', (err, runnable) => {  // inside the cy.origin() method from failing the test
                return false
            })
        });
        cy.visit(configData.base_url)
        forgot_password_page.actions.getPasswordResetUrl(newUserEmail).then((resetUrl) => {
            cy.log(`Visiting reset URL: ${resetUrl}`)
            cy.wait(2000)
            cy.visit(resetUrl)
            cy.wait(2000)
            forgot_password_page.actions.enterPwdToResetPwdPageNewPasswordField(newUserUpdatedPassword)
            forgot_password_page.actions.enterPwdToResetPwdPageConfirmPasswordField(newUserUpdatedPassword)
            forgot_password_page.actions.clickResetPwdSaveBtn()
            cy.wait(5000)
            forgot_password_page.actions.clickResetPwdBackToMainBtn()
            sidebar.actions.clickLogOutBtn()
            sidebar.actions.clickConfLogoutBtn()
            login_page.actions.enterLogin(newUserEmail)
            login_page.actions.enterPassword(newUserUpdatedPassword)
            login_page.actions.isVisibleLoginBtn()
            login_page.actions.clickLoginBtn()
            login_page.actions.isLogined()
        })
    })
    it('[PD-209] Block user', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserIcon()
        sidebar.actions.clickSettingsIcon()
        sidebar.actions.clickUserManagement()
        manage_user_page.actions.isVisibleUser(newUserFullName)
        manage_user_page.actions.clickUserEditBtn(newUserFullName)
        manage_user_page.actions.clickEditUserPageActionsBtn()
        manage_user_page.actions.clickBlockUserBtn()
        manage_user_page.actions.clickBlockUserConfBtn()
        manage_user_page.actions.clickEditUserPageActionsBtn()
        manage_user_page.actions.isVisibleUnblockBtn()
        sidebar.actions.clickUserManagement()
        manage_user_page.actions.isVisibleBlockedUserStatusLbl()
    })
    it('[PD-214] Login with blocked user', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.visit(configData.base_url)
        login_page.actions.isVisibleLoginTxt()
        login_page.actions.clickeditLanguage()
        login_page.actions.clickRusLanguage()
        login_page.actions.enterLogin(newUserEmail)
        login_page.actions.isVisiblePasswordTxt()
        login_page.actions.enterPassword(newUserUpdatedPassword)
        login_page.actions.isVisibleLoginBtn()
        login_page.actions.clickLoginBtn()
        login_page.actions.isVisiblePasswordErrorTextForBlockedOrNotFound('Пользователь заблокирован администратором')
    })
    it('[PD-211] Unblock user', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserIcon()
        sidebar.actions.clickSettingsIcon()
        sidebar.actions.clickUserManagement()
        manage_user_page.actions.isVisibleUser(newUserFullName)
        manage_user_page.actions.clickUserEditBtn(newUserFullName)
        manage_user_page.actions.clickEditUserPageActionsBtn()
        manage_user_page.actions.isVisibleUnblockBtn()
        manage_user_page.actions.clickUnblockUserBtn()
        manage_user_page.actions.clickBlockUserConfBtn() // this method also unlocks user from block
        manage_user_page.actions.clickEditUserPageActionsBtn()
        manage_user_page.actions.isVisibleBlockUserBtnText('Заблокировать')
        sidebar.actions.clickUserManagement()
        manage_user_page.actions.isVisibleActiveUserStatusLbl(newUserFullName)

    })
    it('[PD-216] Create a user with the same existing email', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserIcon()
        sidebar.actions.clickSettingsIcon()
        sidebar.actions.clickUserManagement()
        manage_user_page.actions.clickAddNewUserButton()
        manage_user_page.actions.typeUserLoginTxt(newUserEmail)
        manage_user_page.actions.typeUserFullNameTxt(duplicateUserFullName)
        manage_user_page.actions.clickProjectListDropdown()
        manage_user_page.actions.clickProjectListDropdownOption()
        manage_user_page.actions.clickProjectListDropdown()
        manage_user_page.actions.clickCreateUserBtn()
        manage_user_page.actions.isVisibleUserExistLbl("Пользователь с таким email уже существует")
    })
    it('[PD-215] Delete an active user', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserIcon()
        sidebar.actions.clickSettingsIcon()
        sidebar.actions.clickUserManagement()
        manage_user_page.actions.isVisibleUser(newUserFullName)
        manage_user_page.actions.clickUserDeleteBtn(newUserFullName)
        manage_user_page.actions.clickUserDeleteConfBtn()
        manage_user_page.actions.isNotVisibleUser(newUserFullName)
    })
    it('[PD-212] Login with deleted user', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.visit(configData.base_url)
        login_page.actions.isVisibleLoginTxt()
        login_page.actions.clickeditLanguage()
        login_page.actions.clickRusLanguage()
        login_page.actions.enterLogin(newUserEmail)
        login_page.actions.isVisiblePasswordTxt()
        login_page.actions.enterPassword(newUserUpdatedPassword)
        login_page.actions.isVisibleLoginBtn()
        login_page.actions.clickLoginBtn()
        login_page.actions.isVisiblePasswordErrorTextForBlockedOrNotFound('Логин не найден')
    }
    )
})
