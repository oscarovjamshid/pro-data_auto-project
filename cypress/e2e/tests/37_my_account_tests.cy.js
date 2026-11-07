cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import my_account_page from "../pages/my_account_page";
import manage_user_page from "../pages/user_management_page";
import mailinator_page from "../pages/mailinator_page";
import forgot_password_page from "../pages/forgot_password_page";
import yopmail_page from "../pages/yopmail_page";

describe('37.My Account Tests', () => {
    let configData;
    const childPassword = Cypress.env('child_password')     // test value, lives in cypress.env.json

    function openUserManagement() {
        sidebar.actions.clickUserIcon()
        sidebar.actions.clickSettingsIcon()
        sidebar.actions.clickUserManagement()
    }
    function openMyAccount() {
        sidebar.actions.clickUserIcon()
        sidebar.actions.clickSettingsIcon()
        my_account_page.actions.clickMyAccountTxt()
    }
    function logout() {
        sidebar.actions.clickLogOutBtn()
        sidebar.actions.clickConfLogoutBtn()
    }

    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    before(() => {                                          // create and activate child user only if it isn't active yet
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('GET', '**/panel-main/api/userPanel/childUserList?includeDeleted=false').as('childUserList');
        cy.login(configData.base_url, configData.login, configData.password)
        openUserManagement()
        cy.wait('@childUserList').then(({ response }) => {
            const exists = JSON.stringify(response.body).includes(configData.child_login)
            return exists ? manage_user_page.actions.isActiveUser(configData.child_login).then((active) => ({ exists, active })) : { exists, active: false }
        }).then(({ exists, active }) => {
            if (active) {
                return
            }
            if (!exists) {
                manage_user_page.actions.clickAddNewUserButton()
                manage_user_page.actions.typeUserLoginTxt(configData.child_login)
                manage_user_page.actions.typeUserFullNameTxt(configData.child_full_name)
                manage_user_page.actions.selectAllProjects()
                manage_user_page.actions.clickCreateUserBtn()
                cy.wait('@childUserList')
                manage_user_page.actions.isVisibleUser(configData.child_full_name)
            }
            cy.origin('https://www.mailinator.com', () => {
                Cypress.on('uncaught:exception', () => false)
            })
            mailinator_page.actions.getTextFromLatestEmail(configData.child_login).then((text) => {
                const link = text.match(/https?:\/\/\S+password-reset\?token=\S+/)[0]     // invite link is plain text in this email, not <a>
                cy.visit(link)
                forgot_password_page.actions.enterPwdToResetPwdPageNewPasswordField(childPassword)
                forgot_password_page.actions.enterPwdToResetPwdPageConfirmPasswordField(childPassword)
                forgot_password_page.actions.clickResetPwdSaveBtn()
                forgot_password_page.actions.clickResetPwdBackToMainBtn()
            })
        })
        cy.clearAllCookies()                                // tests start from the login page
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
    })

    it('[PD-1140] My Account - user email address display (successful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.checkUserMenuEmail(configData.login)
        openMyAccount()
        my_account_page.actions.checkEmail(configData.login)
        my_account_page.actions.isVisibleDeactivateBtn()
    })
    it('[PD-1141] My Account - deactivation confirmation email is sent (successful)', () => {
        const mailbox = configData.login.endsWith('@mailinator.com') ? mailinator_page : yopmail_page
        cy.origin(configData.login.endsWith('@mailinator.com') ? 'https://www.mailinator.com' : 'https://yopmail.com', () => {
            Cypress.on('uncaught:exception', () => false)
        })
        cy.intercept('POST', '**/panel-main/api/user/deactivate-request').as('deactivateRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        openMyAccount()
        my_account_page.actions.clickDeactivateBtn()
        my_account_page.actions.checkEmail(configData.login)
        my_account_page.actions.clickDeactivationContinueBtn()
        cy.wait('@deactivateRequest').its('response.statusCode').should('eq', 200)     // 429 - email was already sent less than an hour ago
        my_account_page.actions.isVisibleDeactivationModal()
        my_account_page.actions.clickDeactivationModalOkBtn()
        mailbox.actions.getTextFromLatestEmail(configData.login).then((text) => {     // DO NOT open the link from this email - it deactivates the account
            expect(text.toLowerCase()).to.contain('деактивац')
        })
    })
    it('[PD-1142] My Account - child user email address display (successful)', () => {
        cy.login(configData.base_url, configData.child_login, childPassword)
        sidebar.actions.checkUserMenuEmail(configData.child_login)
        openMyAccount()
        my_account_page.actions.checkEmail(configData.child_login)
    })
    it('[PD-1143] My Account - child user sees root user full name (successful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.getUserMenuInfo().then((root) => {
            logout()
            cy.login(configData.base_url, configData.child_login, childPassword)
            openMyAccount()
            my_account_page.actions.checkRootFullName(root.fullName)
        })
    })
    it('[PD-1144] My Account - child user sees root user email address (successful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.getUserMenuInfo().then((root) => {
            logout()
            cy.login(configData.base_url, configData.child_login, childPassword)
            openMyAccount()
            my_account_page.actions.checkRootEmail(root.email)
        })
    })
    it('[PD-1145] My Account - child user sees root user phone number if exists (successful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        openUserManagement()
        manage_user_page.actions.clickUserEditBtnByEmail(configData.login)
        manage_user_page.actions.getEditUserPhone().then((phone) => {
            if (phone !== configData.root_phone) {
                manage_user_page.actions.typeEditUserPhoneTxt(configData.root_phone)
                manage_user_page.actions.clickEditUserSaveBtn()
                manage_user_page.actions.isVisibleSuccessMessage('Успешно')
            }
        })
        logout()
        cy.login(configData.base_url, configData.child_login, childPassword)
        openMyAccount()
        my_account_page.actions.checkRootPhone(configData.root_phone)
    })
    it('[PD-1146] My Account - child user does not see root user phone number if not exists (successful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        openUserManagement()
        manage_user_page.actions.clickUserEditBtnByEmail(configData.login)
        manage_user_page.actions.getEditUserPhone().then((phone) => {
            if (phone.length > 3) {                         // empty field still has +998 mask
                manage_user_page.actions.clearEditUserPhoneTxt()
                manage_user_page.actions.clickEditUserSaveBtn()
                manage_user_page.actions.isVisibleSuccessMessage('Успешно')
            }
        })
        logout()
        cy.login(configData.base_url, configData.child_login, childPassword)
        openMyAccount()
        my_account_page.actions.isNotVisibleRootPhone(configData.login, configData.root_phone)
        logout()
        cy.login(configData.base_url, configData.login, configData.password)     // put root phone back for next runs
        openUserManagement()
        manage_user_page.actions.clickUserEditBtnByEmail(configData.login)
        manage_user_page.actions.typeEditUserPhoneTxt(configData.root_phone)
        manage_user_page.actions.clickEditUserSaveBtn()
        manage_user_page.actions.isVisibleSuccessMessage('Успешно')
    })
    it('[PD-1147] My Account - child user has no deactivation button (successful)', () => {
        cy.login(configData.base_url, configData.child_login, childPassword)
        openMyAccount()
        my_account_page.actions.isNotVisibleDeactivateBtn(configData.child_login)
    })
})
