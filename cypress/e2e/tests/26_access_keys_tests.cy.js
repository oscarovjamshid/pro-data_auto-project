cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import sidebar from "../pages/sidebar";
import access_history_page from "../pages/access_history_page";

describe('26.Access Keys Tests', () => {
    let configData;
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('POST', `${configData.base_url}panel-main/iam/api/v1/access-keys`).as('successCreateAccess')
    })
    it('PD-284 Вход с новым паролем.', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickAccount_history()
        access_history_page.actions.clickAccessTxt()
        access_history_page.actions.isVisibleCreateKeyBtn()
        access_history_page.actions.clickCreateKeyBtn()
        access_history_page.actions.isVisibleKeyAccessTxt()
        access_history_page.actions.successAddedKeyAccount()
        access_history_page.actions.clickCloseModalBtn1()

    })
    it('PD-250 Удалить Ключи доступа', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickAccount_history()
        access_history_page.actions.clickAccessTxt()
        cy.wait(2000)
        access_history_page.actions.clickDeleteAccessKey()
        access_history_page.actions.clickDeleteAccessKeyVerified()

    })
})
