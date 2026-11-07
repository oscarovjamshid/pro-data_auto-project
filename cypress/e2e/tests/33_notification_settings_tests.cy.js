cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import sidebar from "../pages/sidebar";
import setup_notification_page from "../pages/setup_notification_page";
import mailinator_page from "../pages/mailinator_page";

describe('33.Notification settings Tests', () => {
    let configData;

    function uniqueEmail(prefix) {                      // e.g. pd-48213@mailinator.com - keep it short, long notification email gets 500. Call inside `it` - spec is re-evaluated after visiting mailinator
        return `${prefix}-${Cypress._.random(10000, 99999)}@mailinator.com`
    }
    function openNotificationSettings() {
        sidebar.actions.clickUserIcon()
        sidebar.actions.clickSettingsIcon()
        setup_notification_page.actions.clickSetupNotifTxt()
        cy.wait('@getTrustedEmails')
    }
    function loginAndOpenNotificationSettings() {
        cy.login(configData.base_url, configData.login, configData.password)
        openNotificationSettings()
    }
    function deleteTestTrustedEmails() {                // checks the last trusted emails list response, not the table - it may be not rendered yet
        cy.get('@getTrustedEmails').its('response.body').then((body) => {
            const emails = Cypress._.uniq(JSON.stringify(body).match(/(trusted[12]|pd|pd-edit)-\d+@mailinator\.com/g) || [])
            emails.forEach((email) => {
                setup_notification_page.actions.deleteTrustedEmail(email)
            })
        })
    }
    function addTrustedEmail(email) {
        setup_notification_page.actions.clickAddTrustedEmailBtn()
        setup_notification_page.actions.enterTrustedEmail(email)
        setup_notification_page.actions.clickTrustedEmailSubmitBtn()
        cy.wait('@addTrustedEmail').its('response.statusCode').should('eq', 200)
        setup_notification_page.actions.isVisibleToast('Письмо с подтверждением отправлено на указанный email')
        setup_notification_page.actions.checkTrustedEmailStatus(email, 'В ожидании')
    }
    function confirmTrustedEmail(email) {
        cy.origin('https://www.mailinator.com', () => {
            Cypress.on('uncaught:exception', () => false)
        })
        mailinator_page.actions.getLinkFromNewInbox(email, 'verify-trusted-email').then((link) => {
            cy.visit(link)
            setup_notification_page.actions.isVisibleTrustedEmailConfirmedMsg()
        })
        cy.clearAllCookies()                            // session is broken after visiting mailinator - login again
        cy.clearAllLocalStorage()
        loginAndOpenNotificationSettings()
    }

    function confirmNotificationEmail(email) {
        cy.origin('https://www.mailinator.com', () => {
            Cypress.on('uncaught:exception', () => false)
        })
        mailinator_page.actions.getLinkFromNewInbox(email, 'notification-email').then((link) => {
            cy.visit(link)
            setup_notification_page.actions.isVisibleNotificationEmailConfirmedMsg()
        })
        cy.clearAllCookies()                            // session is broken after visiting mailinator - login again
        cy.clearAllLocalStorage()
        loginAndOpenNotificationSettings()
    }

    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('POST', '**/panel-main/api/notification/status/change*').as('changeNotificationEmail')
        cy.intercept('POST', '**/panel-main/api/telegram/checkCode').as('checkTelegramCode')
        cy.intercept('GET', '**/panel-main/api/v1/trusted-emails').as('getTrustedEmails')
        cy.intercept('POST', '**/panel-main/api/v1/trusted-emails').as('addTrustedEmail')
        cy.intercept('DELETE', '**/panel-main/api/v1/trusted-emails/*').as('deleteTrustedEmail')
    })

    it('[PD-290] Notification settings - adding email for notifications (successful)', () => {
        const notificationEmail = uniqueEmail('pd')
        loginAndOpenNotificationSettings()
        setup_notification_page.actions.clickEditEmailInp()
        setup_notification_page.actions.enterEmailDataFn(notificationEmail)
        setup_notification_page.actions.clickSendNotifBtn()
        cy.wait('@changeNotificationEmail').its('response.statusCode').should('eq', 200)
        setup_notification_page.actions.isVisibleVerifiedTxt()
        setup_notification_page.actions.checkNotificationEmail(notificationEmail)
        confirmNotificationEmail(notificationEmail)
        setup_notification_page.actions.checkNotificationEmail(notificationEmail)
        setup_notification_page.actions.isVisibleEmailConfirmedTxt()
    })
    it('[PD-291] Notification settings - edit email for notifications (successful)', () => {
        const notificationEmail = uniqueEmail('pd-edit')
        loginAndOpenNotificationSettings()
        setup_notification_page.actions.getNotificationEmail().should('not.eq', notificationEmail)
        setup_notification_page.actions.clickEditEmailInp()
        setup_notification_page.actions.enterEmailDataFn(notificationEmail)
        setup_notification_page.actions.clickSendNotifBtn()
        cy.wait('@changeNotificationEmail').its('response.statusCode').should('eq', 200)
        setup_notification_page.actions.isVisibleVerifiedTxt()
        setup_notification_page.actions.checkNotificationEmail(notificationEmail)
        confirmNotificationEmail(notificationEmail)
        setup_notification_page.actions.checkNotificationEmail(notificationEmail)
        setup_notification_page.actions.isVisibleEmailConfirmedTxt()
    })
    it('[PD-292][PD-1152] Notification settings - invalid and empty email for notifications (unsuccessful)', () => {
        loginAndOpenNotificationSettings()
        setup_notification_page.actions.clickEditEmailInp()
        // [PD-292]
        setup_notification_page.actions.enterEmailDataFn('nurillo')
        setup_notification_page.actions.clickSendNotifBtn()
        setup_notification_page.actions.checkEmailError('Недействительный email')
        // [PD-1152]
        setup_notification_page.actions.clearEmailInp()
        setup_notification_page.actions.clickSendNotifBtn()
        setup_notification_page.actions.checkEmailError('Обязательное поле')
        cy.get('@changeNotificationEmail.all').should('have.length', 0)
    })
    it('[PD-1153] Notification settings - add/edit email: Cancel button', () => {
        loginAndOpenNotificationSettings()
        setup_notification_page.actions.getNotificationEmail().then((currentEmail) => {
            setup_notification_page.actions.clickEditEmailInp()
            setup_notification_page.actions.enterEmailDataFn(uniqueEmail('pd-cancel'))
            setup_notification_page.actions.clickCancelEmailBtn()
            setup_notification_page.actions.checkNotificationEmail(currentEmail)
        })
        cy.get('@changeNotificationEmail.all').should('have.length', 0)
    })

    it('[PD-293] Notification settings - QR code is displayed (Telegram bot)', () => {
        loginAndOpenNotificationSettings()
        setup_notification_page.actions.clickTelegramBtn()
        setup_notification_page.actions.isVisibleQrCodeTg()
    })
    it('[PD-641] Notification settings - attach Telegram bot pop-up: Pro Data bot link', () => {
        loginAndOpenNotificationSettings()
        setup_notification_page.actions.clickTelegramBtn()
        setup_notification_page.actions.checkTelegramBotLink()
    })
    it('[PD-642] Notification settings - attach Telegram bot pop-up: X icon', () => {
        loginAndOpenNotificationSettings()
        setup_notification_page.actions.clickTelegramBtn()
        setup_notification_page.actions.clickModalCloseBtn()
        setup_notification_page.actions.isNotVisibleTelegramModal()
    })
    it('[PD-294] Notification settings - attach Telegram bot with invalid code (unsuccessful)', () => {
        loginAndOpenNotificationSettings()
        setup_notification_page.actions.clickTelegramBtn()
        setup_notification_page.actions.enterCodeTgFn('111111')
        setup_notification_page.actions.clickVerifiedCodeBtn()
        cy.wait('@checkTelegramCode').its('response.statusCode').should('eq', 400)
        setup_notification_page.actions.isVisibleConfirmError()
    })
    it('[PD-1154] Notification settings - attach Telegram bot with empty code (unsuccessful)', () => {
        loginAndOpenNotificationSettings()
        setup_notification_page.actions.clickTelegramBtn()
        setup_notification_page.actions.isDisabledVerifiedCodeBtn()
    })
    it('[PD-1155] Notification settings - attach Telegram bot: Cancel button', () => {
        loginAndOpenNotificationSettings()
        setup_notification_page.actions.clickTelegramBtn()
        setup_notification_page.actions.enterCodeTgFn('111111')
        setup_notification_page.actions.clickTelegramCancelBtn()
        setup_notification_page.actions.isNotVisibleTelegramModal()
        cy.get('@checkTelegramCode.all').should('have.length', 0)
    })

    describe('Trusted emails', () => {
        afterEach(() => {                               // removes every trusted1-*/trusted2-* (and pd-* if PD-1163 ever adds it) left by this or previous runs
            cy.visit(`${configData.base_url}settings/notification-settings`)
            cy.wait('@getTrustedEmails')
            deleteTestTrustedEmails()
        })

        it('[PD-1156] Trusted email - adding a valid email: Pending status (successful)', () => {
            const trustedEmail = uniqueEmail('trusted1')
            loginAndOpenNotificationSettings()
            addTrustedEmail(trustedEmail)
            cy.contains('tbody tr', trustedEmail).find('td').eq(2).should('have.text', '-')
        })
        it('[PD-1157] Trusted email - deleting email in Pending status (successful)', () => {
            const trustedEmail = uniqueEmail('trusted2')
            loginAndOpenNotificationSettings()
            addTrustedEmail(trustedEmail)
            setup_notification_page.actions.clickTrustedEmailDeleteBtn(trustedEmail)
            cy.wait('@deleteTrustedEmail').its('response.statusCode').should('eq', 200)
            setup_notification_page.actions.isNotVisibleTrustedEmail(trustedEmail)
        })
        it('[PD-1158][PD-1160] Trusted email - confirming link for email in Pending status, verification date format (successful)', () => {
            const trustedEmail = uniqueEmail('trusted1')
            loginAndOpenNotificationSettings()
            addTrustedEmail(trustedEmail)
            confirmTrustedEmail(trustedEmail)
            // [PD-1158]
            setup_notification_page.actions.checkTrustedEmailStatus(trustedEmail, 'Email подтвержден')
            // [PD-1160]
            setup_notification_page.actions.checkTrustedEmailVerifiedAt(trustedEmail)
        })
        it('[PD-1159] Trusted email - deleting email in Email confirmed status (successful)', () => {
            const trustedEmail = uniqueEmail('trusted2')
            loginAndOpenNotificationSettings()
            addTrustedEmail(trustedEmail)
            confirmTrustedEmail(trustedEmail)
            setup_notification_page.actions.checkTrustedEmailStatus(trustedEmail, 'Email подтвержден')
            setup_notification_page.actions.clickTrustedEmailDeleteBtn(trustedEmail)
            cy.wait('@deleteTrustedEmail').its('response.statusCode').should('eq', 200)
            setup_notification_page.actions.isNotVisibleTrustedEmail(trustedEmail)
        })
        it('[PD-1161][PD-1162] Trusted email - adding invalid and empty email address (unsuccessful)', () => {
            loginAndOpenNotificationSettings()
            setup_notification_page.actions.clickAddTrustedEmailBtn()
            // [PD-1162]
            setup_notification_page.actions.isDisabledTrustedEmailSubmitBtn()
            // [PD-1161]
            setup_notification_page.actions.enterTrustedEmail('nurillo')
            setup_notification_page.actions.isDisabledTrustedEmailSubmitBtn()
            setup_notification_page.actions.enterTrustedEmail('nurillo@mailinator')
            setup_notification_page.actions.isDisabledTrustedEmailSubmitBtn()
            cy.get('@addTrustedEmail.all').should('have.length', 0)
        })
        it('[PD-1163] Trusted email - adding already used email address (unsuccessful)', () => {
            loginAndOpenNotificationSettings()
            setup_notification_page.actions.getNotificationEmail().then((notificationEmail) => {
                setup_notification_page.actions.clickAddTrustedEmailBtn()
                setup_notification_page.actions.enterTrustedEmail(notificationEmail)
                setup_notification_page.actions.clickTrustedEmailSubmitBtn()
                cy.wait('@addTrustedEmail').its('response.statusCode').should('not.eq', 200)
                setup_notification_page.actions.isVisibleToast('Данный email уже используется')
                setup_notification_page.actions.isNotVisibleTrustedEmail(notificationEmail)
            })
        })
        it('[PD-1164] Trusted email - Cancel button', () => {
            const trustedEmail = uniqueEmail('trusted1')
            loginAndOpenNotificationSettings()
            setup_notification_page.actions.clickAddTrustedEmailBtn()
            setup_notification_page.actions.enterTrustedEmail(trustedEmail)
            setup_notification_page.actions.clickTrustedEmailCancelBtn()
            setup_notification_page.actions.isNotVisibleTrustedEmailModal()
            setup_notification_page.actions.isNotVisibleTrustedEmail(trustedEmail)
            cy.get('@addTrustedEmail.all').should('have.length', 0)
        })
        it('[PD-1165] Trusted email - X icon', () => {
            const trustedEmail = uniqueEmail('trusted1')
            loginAndOpenNotificationSettings()
            setup_notification_page.actions.clickAddTrustedEmailBtn()
            setup_notification_page.actions.enterTrustedEmail(trustedEmail)
            setup_notification_page.actions.clickModalCloseBtn()
            setup_notification_page.actions.isNotVisibleTrustedEmailModal()
            setup_notification_page.actions.isNotVisibleTrustedEmail(trustedEmail)
            cy.get('@addTrustedEmail.all').should('have.length', 0)
        })
    })
})
