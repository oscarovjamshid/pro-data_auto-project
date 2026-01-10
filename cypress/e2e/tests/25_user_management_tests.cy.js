cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import manage_user_page from "../pages/manage_user_page";
import login_page from "../pages/login_page";
import { test } from "mocha";

describe('25.User Management Tests', () => {
    let configData;
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

    it('[PD-240] Создать нового пользователя', () => {
        const testData = {
            fullName: 'Test User',
            email: 'tester@gmail.com'
        }
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickManageUser()
        manage_user_page.actions.clickAddNewUserButton()
        manage_user_page.actions.typeUserLoginTxt(testData.email)
        manage_user_page.actions.typeUserFullNameTxt(testData.fullName)
        manage_user_page.actions.clickProjectListDropdown()
        manage_user_page.actions.clickProjectListDropdownOption(),
            manage_user_page.actions.clickProjectListDropdown()
        manage_user_page.actions.clickCreateUserBtn(),
            manage_user_page.actions.isVisibleUser(testData.fullName)
    })
    it('[PD-206] Редактировать телефон пользователя', () => {
        const testData = {
            fullName: 'Test User'
        }
        const randomPhone = '998' + Math.floor(Math.random() * 900000000).toString().padStart(9, '0');
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickManageUser()
        cy.wait(2000)
        manage_user_page.actions.isVisibleUser(testData.fullName)
        manage_user_page.actions.clickUserEditBtn(testData.fullName)
        //manage_user_page.actions.isVisibleEditUserPageHeaderLbl()
        //manage_user_page.actions.typeEditUserPhoneTxt(randomPhone)
        //manage_user_page.actions.clickEditUserSaveBtn()
        //manage_user_page.actions.isVisibleSuccessMessage()

    })
    /*it('[PD-207] Активация услуги объектное хранилище', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickManageUser()

        manage_user_page.actions.isVisibleUser('QA Blocked')
        manage_user_page.actions.clickUserEditBtn('QA Blocked')
        manage_user_page.actions.isVisibleEditUserPageHeaderLbl()
        manage_user_page.actions.clickActivateObjectMemoryBtn()
        manage_user_page.actions.clickActivateObjectMemoryConfBtn()
        manage_user_page.actions.isDisabledActivateObjectMemoryBtn()
     }) */

    it('[PD-208] Сбросить пароль (до момента отправки ссылки на почту)', () => {
        const testData = {
            fullName: 'Test User'
        }
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickManageUser()

        manage_user_page.actions.clickUserEditBtn(testData.fullName)
        manage_user_page.actions.isVisibleEditUserPageHeaderLbl()
        // manage_user_page.actions.clickResetPswBtn()
        // manage_user_page.actions.clickActionConfBtn()
        // cy.wait(2000)
        // manage_user_page.actions.isVisibleNewPasswordTitleLbl()

    })
    it('[PD-209] Заблокировать пользователя', () => {
        const testData = {
            fullName: 'Test User'
        }
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickManageUser()
        manage_user_page.actions.clickUserEditBtn(testData.fullName)
        manage_user_page.actions.isVisibleEditUserPageHeaderLbl()
        manage_user_page.actions.clickBlockUserBtn()
        manage_user_page.actions.clickActionConfBtn()
        cy.wait(1000)
        sidebar.actions.clickManageUser()
        manage_user_page.actions.isVisibleBlockedUserStatusLbl()
    })
    it('[PD-214] Вход с заблокированным пользователем', () => {
        const testData = {
            fullName: 'Test User',
            email: 'tester@gmail.com',
            password: '123.Qa.321'
        }
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.visit(configData.base_url)
        login_page.actions.isVisibleLoginTxt()
        login_page.actions.clickeditLanguage()
        login_page.actions.clickRusLanguage()
        login_page.actions.enterLogin(testData.email)
        login_page.actions.isVisiblePasswordTxt()
        login_page.actions.enterPassword(testData.password)
        login_page.actions.isVisibleLoginBtn()
        login_page.actions.clickLoginBtn()
    })
    it('[PD-211] Разблокировать пользователя', () => {
        const testData = {
            fullName: 'Test User'
        }
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickManageUser()

        manage_user_page.actions.clickUserEditBtn(testData.fullName)
        manage_user_page.actions.isVisibleEditUserPageHeaderLbl()
        manage_user_page.actions.clickBlockUserBtn()
        manage_user_page.actions.clickActionConfBtn()

        sidebar.actions.clickManageUser()
        manage_user_page.actions.isVisibleActiveUserStatusLbl()
    })
    it('[PD-216] Создание пользователя с одинаковым email', () => {
        const testData = {
            fullName: 'Invalid User',
            email: 'tester@gmail.com'
        }
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickManageUser()
        manage_user_page.actions.clickAddNewUserButton()
        manage_user_page.actions.typeUserLoginTxt(testData.email)
        manage_user_page.actions.typeUserFullNameTxt(testData.fullName)
        manage_user_page.actions.clickProjectListDropdown()
        manage_user_page.actions.clickProjectListDropdownOption()
        manage_user_page.actions.clickProjectListDropdown()
        manage_user_page.actions.clickCreateUserBtn(),
            manage_user_page.actions.isVisibleUserExistLbl()
    })
    // it('[PD-210] Удалить заблокированного пользователя', () => {
    //     cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
    //     cy.login(configData.base_url, configData.login, configData.password)
    //     sidebar.actions.clickUserCredentials()
    //     sidebar.actions.clickManageUser()
    //     manage_user_page.actions.isVisibleUser('Invalid User')

    //     manage_user_page.actions.clickUserEditBtn('Invalid User')
    //     manage_user_page.actions.isVisibleEditUserPageHeaderLbl()
    //     manage_user_page.actions.clickBlockUserBtn()
    //     manage_user_page.actions.clickActionConfBtn()

    //     sidebar.actions.clickManageUser()
    //     manage_user_page.actions.isVisibleBlockedUserStatusLbl()

    //     manage_user_page.actions.clickUserDeleteBtn('Invalid User')
    //     manage_user_page.actions.clickUserDeleteConfBtn()
    // })
    it('[PD-215] Попытка удалить активного пользователя', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickManageUser()
        manage_user_page.actions.isVisibleUser('Test User')

        manage_user_page.actions.clickUserDeleteBtn('Test User')
        manage_user_page.actions.clickUserDeleteConfBtn()
    })
    // it('[PD-212] Вход с удалённым пользователем', () => {
    //     cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
    //     cy.login(configData.base_url, configData.login, configData.password)
    //     sidebar.actions.clickUserCredentials()
    //     sidebar.actions.clickManageUser()
    //     manage_user_page.actions.clickAddNewUserButton()
    //     manage_user_page.actions.typeUserLoginTxt('tester@gmail.com')
    //     manage_user_page.actions.typeUserFullNameTxt('Test User')
    //     manage_user_page.actions.clickProjectListDropdown()
    //     manage_user_page.actions.clickProjectListDropdownOption(),
    //         manage_user_page.actions.clickCreateUserBtn(),
    //         manage_user_page.actions.isVisibleUser('Test User')

    //     manage_user_page.actions.clickUserEditBtn('Test User')
    //     manage_user_page.actions.isVisibleEditUserPageHeaderLbl()
    //     manage_user_page.actions.clickResetPswBtn()
    //     manage_user_page.actions.clickActionConfBtn()
    //     manage_user_page.actions.isVisibleNewPasswordTitleLbl()
    //     manage_user_page.elements.newPasswordLbl().invoke('text').then((text) => {

    //         const password = extractPassword(text)
    //         manage_user_page.actions.clickResetPswAcceptBtn()

    //         sidebar.actions.clickManageUser()
    //         manage_user_page.actions.clickUserDeleteBtn('Test User')
    //         manage_user_page.actions.clickUserDeleteConfBtn()

    //         sidebar.actions.clickUserProfileIcon()
    //         sidebar.actions.clickProfileLogoutIcon()
    //         sidebar.actions.clickConfLogoutBtn()

    //         cy.visit(configData.base_url)
    //         login_page.actions.isVisibleLoginTxt()
    //         login_page.actions.clickeditLanguage()
    //         login_page.actions.clickRusLanguage()
    //         login_page.actions.enterLogin('tester@gmail.com')
    //         login_page.actions.isVisiblePasswordTxt()
    //         login_page.actions.enterPassword(password)
    //         login_page.actions.isVisibleLoginBtn()
    //         login_page.actions.clickLoginBtn()

    //         login_page.actions.isVisiblePasswordErrorLbl('Логин не найден')
    //     });


    // })

})