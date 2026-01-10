cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import sidebar from "../pages/sidebar";
import change_password_page from "../pages/change_password_page";
import factor_authentication_page from "../pages/factor_authentication_page";

describe('32.Two-factor authentication Tests', () => {
    let configData;
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/change-password`).as('successChangePassword')

    })
    it('PD-287 Проверьте, отображается ли QR-код.', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickAccount_history()
        factor_authentication_page.actions.clickTwoFactorTxt()
        factor_authentication_page.actions.clickCreateFactorBtn()
        change_password_page.actions.enterOldPasswordInp(configData.password)
        factor_authentication_page.actions.clickCheckPasswordBtn()
        factor_authentication_page.actions.isVisibleQrCodeFactor()

    })
    it('PD-285 C Hеправильный пароль', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickAccount_history()
        factor_authentication_page.actions.clickTwoFactorTxt()
        factor_authentication_page.actions.clickCreateFactorBtn()
        change_password_page.actions.enterOldPasswordInp('testersm')
        factor_authentication_page.actions.clickCheckPasswordBtn()
        change_password_page.actions.isVisiblePasswordInValid()

    })
    it('PD-286 C пустым паролем', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickAccount_history()
        factor_authentication_page.actions.clickTwoFactorTxt()
        factor_authentication_page.actions.clickCreateFactorBtn()
        change_password_page.actions.enterOldPasswordInp('       ')
        factor_authentication_page.actions.clickCheckPasswordBtn()
        change_password_page.actions.isVisiblePasswordInValid()

    })
    it('PD-288 Введён неверный код', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickAccount_history()
        factor_authentication_page.actions.clickTwoFactorTxt()
        factor_authentication_page.actions.clickCreateFactorBtn()
        change_password_page.actions.enterOldPasswordInp(configData.password)
        factor_authentication_page.actions.clickCheckPasswordBtn()
        factor_authentication_page.actions.enterQrOtpInp('111111')
        factor_authentication_page.actions.clickLastActivateBtn()
        factor_authentication_page.actions.isVisibleMessageOtp()

    })
    it('PD-289 Клик без заполнения', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickAccount_history()
        factor_authentication_page.actions.clickTwoFactorTxt()
        factor_authentication_page.actions.clickCreateFactorBtn()
        change_password_page.actions.enterOldPasswordInp(configData.password)
        factor_authentication_page.actions.clickCheckPasswordBtn()
        factor_authentication_page.actions.clickLastActivateBtn()
        factor_authentication_page.actions.isVisibleMessageOtp()

    })
})
