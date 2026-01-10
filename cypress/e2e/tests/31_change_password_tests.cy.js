cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import sidebar from "../pages/sidebar";
import change_password_page from "../pages/change_password_page";

describe('31.Change Password Tests', () => {
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
    // it('PD-284 Вход с новым паролем.', () => {
    //     cy.login(configData.base_url, configData.login, configData.password)
    //     sidebar.actions.clickAccount_history()
    //     change_password_page.actions.clickChangePasswordTxt()
    //     change_password_page.actions.enterOldPasswordInp(configData.password)
    //     change_password_page.actions.enterNewPasswordInp(configData.password1)
    //     change_password_page.actions.enterRepeatPasswordInp(configData.password1)
    //     change_password_page.actions.clickChangePasswordBtn()
    //     change_password_page.actions.successChangePassword()
    //     cy.wait(2000)
    //     cy.login(configData.base_url, configData.login, configData.password1)
    //     sidebar.actions.clickAccount_history()
    //     change_password_page.actions.clickChangePasswordTxt()
    //      change_password_page.actions.enterOldPasswordInp(configData.password1)
    //     change_password_page.actions.enterNewPasswordInp(configData.password)
    //     change_password_page.actions.enterRepeatPasswordInp(configData.password)
    //     change_password_page.actions.clickChangePasswordBtn()
    //     change_password_page.actions.successChangePassword()

    // })
    it('PD-280 Hеправильный Текущий пароль', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickAccount_history()
        change_password_page.actions.clickChangePasswordTxt()
        change_password_page.actions.enterOldPasswordInp('hjfsdhjfsgdjfs@hjdjhs')
        change_password_page.actions.enterNewPasswordInp(configData.password)
        change_password_page.actions.enterRepeatPasswordInp(configData.password)
        change_password_page.actions.clickChangePasswordBtn()
        change_password_page.actions.failChangePassword()
    })
    it('PD-281 Новый пароль правильный и Повторите пароль Hеправильный', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickAccount_history()
        change_password_page.actions.clickChangePasswordTxt()
        change_password_page.actions.enterOldPasswordInp(configData.password)
        change_password_page.actions.enterNewPasswordInp(configData.password1)
        change_password_page.actions.enterRepeatPasswordInp(configData.password)
        change_password_page.actions.clickChangePasswordBtn()
        change_password_page.actions.isVisiblePasswordInValid()
    })
    it('PD-282 C Слабый пароль', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickAccount_history()
        change_password_page.actions.clickChangePasswordTxt()
        change_password_page.actions.enterOldPasswordInp(configData.password)
        change_password_page.actions.enterNewPasswordInp('11111111')
        change_password_page.actions.enterRepeatPasswordInp(configData.password)
        change_password_page.actions.clickChangePasswordBtn()
        change_password_page.actions.isVisiblePasswordInValid()
    })
    it('PD-283 Заполните поле нового пароля пустым паролем.', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickAccount_history()
        change_password_page.actions.clickChangePasswordTxt()
        cy.wait(2000)
        change_password_page.actions.enterOldPasswordInp(configData.password)
        change_password_page.actions.enterNewPasswordInp('        ')
        cy.wait(2000)
        change_password_page.actions.enterRepeatPasswordInp(configData.password)
        change_password_page.actions.clickChangePasswordBtn()
        change_password_page.actions.isVisiblePasswordInValid()
    })
})
