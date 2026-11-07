class SetupNotification {
    elements = {
        SetupNotification: () => cy.get('[qa-element="nav_link_notification-settings"]', { timeout: 30000 }),
        toast: (text) => cy.get('[qa-element="toast"]', { timeout: 15000 }).contains(text),

        editEmailBtn: () => cy.get('[qa-element="edit-email-toggle"]'),
        emailInpLbl: () => cy.get('[qa-element="app-notifications-settings-email"]', { timeout: 30000 }),
        emailErrorTxt: () => cy.get('[qa-element="app-notifications-settings-email"]').parents('[class*="FormText_formText"]').find('[class*="FormText_error"]'),     // later change this to qa-element tag
        emailStatusLbl: (text) => cy.get('[class*="AppNotifications_marginTop"]').contains(text),      // later change this to qa-element tag
        cancelEmailBtn: () => cy.get('[qa-element="notifications-settings-cancel"]'),
        sendNotifBtn: () => cy.get('[qa-element="notifications-settings-submit"]'),

        connectTelegramBtn: () => cy.get('[qa-element="detach-telegram"]'),
        telegramModal: () => cy.get('[qa-element="tg-bot-otp"]').parents('[class*="Modal_modal"]'),     // later change this to qa-element tag
        qrCodeTgImg: () => cy.get('[qa-element="tg-qr-code"]'),
        telegramBotLink: () => cy.get('[class*="Modal_modal"] a[href^="https://t.me/"]'),             // later change this to qa-element tag
        codeVerifiedTgInp: () => cy.get('[qa-element="tg-bot-otp"]'),
        telegramConfirmBtn: () => cy.get('[qa-element="detach-telegram-confirm"]'),
        telegramCancelBtn: () => cy.get('[qa-element="detach-telegram-cancel"]'),
        confirmErrorMessageTxt: () => cy.get('[qa-element="confirm-error"]'),
        modalCloseBtn: () => cy.get('[qa-element="modal-close"]'),

        addTrustedEmailBtn: () => cy.get('[qa-element="trusted-emails"]'),
        trustedEmailInp: () => cy.get('[qa-element="input-trusted-email"]'),
        trustedEmailSubmitBtn: () => cy.get('[qa-element="add-trusted-email-submit"]'),
        trustedEmailCancelBtn: () => cy.get('[qa-element="add-trusted-email-cancel"]'),
        trustedEmailRowByEmail: (email) => cy.contains('tbody tr', email, { timeout: 15000 }),
        trustedEmailDeleteBtnByEmail: (email) => cy.contains('tbody tr', email).find('[qa-element="trusted-email-delete"]'),
        trustedEmailVerifiedAtByEmail: (email) => cy.contains('tbody tr', email).find('[qa-element="verified-at"]'),
    }
    actions = {
        clickSetupNotifTxt: () => {
            this.elements.SetupNotification().click()
        },
        isVisibleToast: (text) => {
            this.elements.toast(text).should('be.visible')
        },

        clickEditEmailInp: () => {
            this.elements.editEmailBtn().click()
            this.elements.sendNotifBtn().should('be.visible')
        },
        enterEmailDataFn: (text) => {
            this.elements.emailInpLbl().clear().type(text)
        },
        clearEmailInp: () => {
            this.elements.emailInpLbl().clear()
        },
        getNotificationEmail: () => {
            return this.elements.emailInpLbl().should('not.have.value', '').invoke('val')
        },
        checkNotificationEmail: (email) => {
            this.elements.emailInpLbl().should('have.value', email).and('have.attr', 'readonly')
        },
        clickSendNotifBtn: () => {
            this.elements.sendNotifBtn().click()
        },
        clickCancelEmailBtn: () => {
            this.elements.cancelEmailBtn().click()
            this.elements.cancelEmailBtn().should('not.exist')
        },
        isVisibleVerifiedTxt: () => {
            this.elements.emailStatusLbl('Подтверждение отправлено').should('be.visible')
        },
        isVisibleEmailConfirmedTxt: () => {
            this.elements.emailStatusLbl('Email подтвержден').should('be.visible').and('have.attr', 'class').and('contain', 'Badge_success')     // green badge
        },
        isVisibleNotificationEmailConfirmedMsg: () => {
            cy.get('[qa-element="back-to-main"]', { timeout: 15000 }).should('be.visible')
            cy.contains('Email подтвержден').should('be.visible')
        },
        checkEmailError: (text) => {
            this.elements.emailErrorTxt().should('be.visible').and('have.text', text)
        },

        clickTelegramBtn: () => {
            this.elements.connectTelegramBtn().click()
            this.elements.codeVerifiedTgInp().should('be.visible')
        },
        isVisibleQrCodeTg: () => {
            this.elements.qrCodeTgImg().should('be.visible').and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0)     // image is really loaded, not a broken icon
            })
        },
        checkTelegramBotLink: () => {
            this.elements.telegramBotLink().should('be.visible').and('have.attr', 'href').and('match', /^https:\/\/t\.me\/\w+$/)
        },
        enterCodeTgFn: (text) => {
            this.elements.codeVerifiedTgInp().clear().type(text)
        },
        clickVerifiedCodeBtn: () => {
            this.elements.telegramConfirmBtn().click()
        },
        isDisabledVerifiedCodeBtn: () => {
            this.elements.telegramConfirmBtn().should('be.disabled')
        },
        clickTelegramCancelBtn: () => {
            this.elements.telegramCancelBtn().click()
        },
        isVisibleConfirmError: () => {
            this.elements.confirmErrorMessageTxt().should('exist').and('have.text', 'Неверный код подтверждения.')     // 'be.visible' fails - error is covered by modal footer at 720px height
        },
        clickModalCloseBtn: () => {
            this.elements.modalCloseBtn().click()
        },
        isNotVisibleTelegramModal: () => {
            this.elements.codeVerifiedTgInp().should('not.exist')
        },

        clickAddTrustedEmailBtn: () => {
            this.elements.addTrustedEmailBtn().click()
            this.elements.trustedEmailInp().should('be.visible')
        },
        enterTrustedEmail: (email) => {
            this.elements.trustedEmailInp().clear().type(email)
        },
        clickTrustedEmailSubmitBtn: () => {
            this.elements.trustedEmailSubmitBtn().should('be.enabled').click()
        },
        isDisabledTrustedEmailSubmitBtn: () => {
            this.elements.trustedEmailSubmitBtn().should('be.disabled')
        },
        clickTrustedEmailCancelBtn: () => {
            this.elements.trustedEmailCancelBtn().click()
        },
        isNotVisibleTrustedEmailModal: () => {
            this.elements.trustedEmailInp().should('not.exist')
        },
        checkTrustedEmailStatus: (email, status) => {
            this.elements.trustedEmailRowByEmail(email).should('be.visible').and('contain.text', status)
        },
        checkTrustedEmailVerifiedAt: (email) => {
            this.elements.trustedEmailVerifiedAtByEmail(email).invoke('text').should('match', /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/)
        },
        clickTrustedEmailDeleteBtn: (email) => {
            this.elements.trustedEmailDeleteBtnByEmail(email).click()
        },
        isNotVisibleTrustedEmail: (email) => {
            cy.contains('tbody tr', email).should('not.exist')
        },
        deleteTrustedEmail: (email) => {
            this.elements.trustedEmailRowByEmail(email).should('be.visible')
            this.elements.trustedEmailDeleteBtnByEmail(email).click()
            cy.contains('tbody tr', email, { timeout: 15000 }).should('not.exist')
        },
        isVisibleTrustedEmailConfirmedMsg: () => {
            cy.contains('Email успешно подтверждён', { timeout: 15000 }).should('be.visible')
        },
    }
}
module.exports = new SetupNotification()
