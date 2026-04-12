cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import { test } from "mocha";
import login_page from "../pages/login_page";

describe('1.Login Tests', () => {
    let configData;
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
    })
    it('[PD-6] Login (incorrect password or username)', () => {
        cy.visit(configData.base_url)
        login_page.actions.isVisibleLoginTxt()
        login_page.actions.clickeditLanguage()
        login_page.actions.clickRusLanguage()
        login_page.actions.enterLogin('testlogin@gmail.com')
        login_page.actions.isVisiblePasswordTxt()
        login_page.actions.enterPassword(configData.password)
        login_page.actions.isVisibleLoginBtn()
        login_page.actions.clickLoginBtn()
        login_page.actions.isNotLogined()
    })
    it('[PD-7] Login (incorrect login type)', () => {
        cy.visit(configData.base_url)
        login_page.actions.isVisibleLoginTxt()
        login_page.actions.clickeditLanguage()
        login_page.actions.clickRusLanguage()
        login_page.actions.enterLogin('testlogin@gmail.com')
        login_page.actions.isVisiblePasswordTxt()
        login_page.actions.enterPassword(configData.password)
        login_page.actions.isVisibleLoginBtn()
        login_page.actions.enterInvalidLogins()
    })
    it('[PD-110] Login (after five failed attempts, account is blocked for one hour)', () => {
        cy.visit(configData.base_url)
        login_page.actions.isVisibleLoginTxt()
        login_page.actions.clickeditLanguage()
        login_page.actions.clickRusLanguage()
        login_page.actions.isVisiblePasswordTxt()
        login_page.actions.enterLogin(configData.blocked_login)
        login_page.actions.blockAccount()
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('loginBlocked');
        login_page.actions.enterLogin(configData.blocked_login)
        login_page.actions.enterPassword(configData.blocked_login_psw)
        login_page.actions.clickLoginBtn()
        login_page.actions.isBlocked()
    })
    it('[PD-2] Login (successfully)', () => {
        cy.visit(configData.base_url)
        login_page.actions.isVisibleLoginTxt()
        login_page.actions.clickeditLanguage()
        login_page.actions.clickRusLanguage()
        login_page.actions.enterLogin(configData.login)
        login_page.actions.isVisiblePasswordTxt()
        login_page.actions.enterPassword(configData.password)
        login_page.actions.isVisibleLoginBtn()
        login_page.actions.clickLoginBtn()
        login_page.actions.isLogined()
    })
})






