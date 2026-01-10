class SetupNotification {
    elements = {
       SetupNotification: () => cy.get('[qa-element="sidemenu-nav-account-settings-sublink-account-notification-settings"]'),
       editEmailBtn: () => cy.get('[qa-element="edit-email-toggle"]'),
       emailInpLbl: () => cy.get('[qa-element="app-notifications-settings-email"]'),
       sendNotifBtn: () => cy.get('[qa-element="notifications-settings-submit"]'),
       checkEmailTxt: () => cy.contains('Подтверждение отправлено'),
       inValidTxtMessage: () => cy.get('[qa-element="app-notification-email-error"]'),
       connectTelegramBtn: () => cy.get('[qa-element="detach-telegram"]'),
       codeVerifiedTgInp: () => cy.get('[qa-element="tg-bot-otp"]'),
       telegramConfirmBtn: () => cy.get('[qa-element="detach-telegram-confirm"]'),
       confirmErrorMessageTxt: () => cy.get('[qa-element="confirm-error"]'),
       qrCodeTgImg: () => cy.get('[qa-element="tg-qr-code"]')

    }
    actions = {
        clickSetupNotifTxt: () => {
            this.elements.SetupNotification().click()
        },
        clickEditEmailInp: () => {
            this.elements.editEmailBtn().click()
        },
        enterEmailDataFn: (text) => {
            this.elements.emailInpLbl().clear().type(text)
        },
        clickSendNotifBtn: () => {
            this.elements.sendNotifBtn().click()
        },
        isVisibleVerifiedTxt: () => {
            this.elements.checkEmailTxt().should('be.visible')
        },
        isVisibleInValidEmailTxt: () => {
            this.elements.inValidTxtMessage().should('be.visible')
        },
        clickTelegramBtn: () => {
            this.elements.connectTelegramBtn().click()
        },
        enterCodeTgFn: (text) => {
            this.elements.codeVerifiedTgInp().clear().type(text)
        },
        clickVerifiedCodeBtn: () => {
            this.elements.telegramConfirmBtn().click()
        },
        isVisibleConfirmError: () => {
            this.elements.confirmErrorMessageTxt().should('be.visible')
        },
        isVisibleQrCodeTg: () => {
            this.elements.qrCodeTgImg().should('be.visible')
        }
        
    }
}





module.exports = new SetupNotification()