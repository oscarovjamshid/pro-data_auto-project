cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import sidebar from "../pages/sidebar";
import change_password_page from "../pages/change_password_page";
import setup_notification_page from "../pages/setup_notification_page";

describe('33.Notification settings Tests', () => {
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
    it('PD-290 Добавить Email для уведомлений', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickAccount_history()
        setup_notification_page.actions.clickSetupNotifTxt()
        setup_notification_page.actions.clickEditEmailInp()
        setup_notification_page.actions.enterEmailDataFn('nurilloxayitov@gmail.com')
        setup_notification_page.actions.clickSendNotifBtn()
        cy.wait(3000)
        setup_notification_page.actions.isVisibleVerifiedTxt()

    })
    it('PD-291 Изменить Email для уведомлений', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickAccount_history()
        setup_notification_page.actions.clickSetupNotifTxt()
        setup_notification_page.actions.clickEditEmailInp()
        setup_notification_page.actions.enterEmailDataFn('nurillo@gmail.com')
        setup_notification_page.actions.clickSendNotifBtn()
        cy.wait(3000)
        setup_notification_page.actions.isVisibleVerifiedTxt()

    })
    it('PD-292 C Неправильный Email', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickAccount_history()
        setup_notification_page.actions.clickSetupNotifTxt()
        setup_notification_page.actions.clickEditEmailInp()
        setup_notification_page.actions.enterEmailDataFn('nurillo')
        setup_notification_page.actions.clickSendNotifBtn()
        cy.wait(2000)
        setup_notification_page.actions.isVisibleInValidEmailTxt()

    })
    it('PD-293 Проверьте, отображается ли QR-код. (Telegram bot)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickAccount_history()
        setup_notification_page.actions.clickSetupNotifTxt()
        setup_notification_page.actions.clickTelegramBtn()
        setup_notification_page.actions.isVisibleQrCodeTg()

    })
    it('PD-294 С неправильным кодом', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickAccount_history()
        setup_notification_page.actions.clickSetupNotifTxt()
        setup_notification_page.actions.clickTelegramBtn()
        setup_notification_page.actions.enterCodeTgFn('111111')
        setup_notification_page.actions.clickVerifiedCodeBtn()
        setup_notification_page.actions.isVisibleConfirmError()
    })
})
