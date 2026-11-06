class Alerts {
    exactText = (text) => new RegExp(`^${Cypress._.escapeRegExp(text)}$`)

    elements = {
        alerts_icon: () => cy.get('[qa-element="nav_link_alerts"]', { timeout: 60000 }),
        createAlertBtn: () => cy.get('a[href="/services/alerts/create"]', { timeout: 30000 }).first(),      // empty list has no qa-element on create link
        alertTypeDropdownList: () => cy.get('[qa-element="alert-type-select-toggle"]'),
        alertTypeDropdownOption: (text) => cy.get('[qa-element^="alert-type-select-"]:not([qa-element$="-toggle"])').contains(this.exactText(text)),
        metricTypeDropdownList: () => cy.get('[qa-element="metric-type-select-toggle"]'),
        metricTypeDropdownOption: (text) => cy.get('[qa-element^="metric-type-select-"]:not([qa-element$="-toggle"])').contains(this.exactText(text)),
        conditionDropdownList: () => cy.get('[qa-element="metric-condition-toggle"]'),
        conditionDropdownOption: (text) => cy.get('[qa-element^="metric-condition-"]:not([qa-element$="-toggle"])').contains(this.exactText(text)),
        durationDropdownList: () => cy.get('[qa-element="metric-duration-toggle"]'),
        durationDropdownOption: (text) => cy.get('[qa-element^="metric-duration-"]:not([qa-element$="-toggle"])').contains(this.exactText(text)),
        thresholdInputField: () => cy.get('[qa-element="threshold-value"]'),
        thresholdErrorMsg: (text) => cy.get('[qa-element="threshold-value"]').parents().eq(1).contains(text),
        metricUnitLbl: () => cy.get('[qa-element="metric-unit"]'),
        nameInputField: () => cy.get('[qa-element="alert-name"]'),
        nameErrorMsg: (text) => cy.get('[qa-element="name-error"]').contains(text),
        serversDropdownList: () => cy.get('[qa-element="vms-toggle"]'),
        serversDropdownOptions: () => cy.get('[qa-element^="vms-"]').not('[qa-element="vms-toggle"]'),
        serversSearchInputField: () => cy.get('[qa-element="vms-toggle"]').parent().find('[qa-element="dropdown-search"]'),
        nothingFoundLbl: (text) => cy.get('[qa-element="nothing-found"]').contains(text),
        emailNotifySwitch: () => cy.get('[qa-element="email-notify"]'),
        trustedEmailNotifySwitch: () => cy.get('[qa-element="trusted-email-notify"]'),
        trustedEmailsEditBtn: () => cy.get('[qa-element="trusted-emails-edit"]'),
        trustedEmailInputField: () => cy.get('[qa-element="input-trusted-email"]'),
        trustedEmailSendBtn: () => cy.get('[qa-element="add-trusted-email-submit"]'),
        trustedEmailResendBtnRowByEmail: (email) => cy.contains('tbody tr', email).find('[qa-element="resend-to-email"]'),
        trustedEmailsDropdownList: () => cy.get('[qa-element="trusted-emails-toggle"]'),
        trustedEmailsDropdownOption: (text) => cy.get('[qa-element^="trusted-emails-"]:not([qa-element$="-toggle"])').contains(this.exactText(text)),
        telegramNotifySwitch: () => cy.get('[qa-element="tg-notify"]'),
        connectTelegramBtn: () => cy.get('[qa-element="detach-telegram"]'),
        telegramQrCodeImg: () => cy.get('[qa-element="tg-qr-code"]'),
        telegramCodeInputField: () => cy.get('[qa-element="tg-bot-otp"]'),
        telegramSubmitBtn: () => cy.get('[qa-element="detach-telegram-confirm"]'),
        telegramCancelBtn: () => cy.get('[qa-element="detach-telegram-cancel"]'),
        dashboardNotifySwitch: () => cy.get('[qa-element="dashboard-notify"]'),
        notifyOneRequiredMsg: (text) => cy.contains('p', text),
        createBtn: () => cy.get('[qa-element="alert-craete-submit"]', { timeout: 60000 }),
        saveBtn: () => cy.get('[qa-element="alert-change-submit"]'),
        cancelBtn: () => cy.get('[qa-element="to-alerts-list"]'),
        alertRowByName: (name) => cy.contains('tbody tr', name, { timeout: 30000 }),
        editIconRowByName: (name) => cy.contains('tbody tr', name, { timeout: 30000 }).find('[qa-element="to-view-lb"]'),
        deleteIconRowByName: (name) => cy.contains('tbody tr', name, { timeout: 30000 }).find('[qa-element="delete-alert-show"]'),
        confirmDeleteBtn: () => cy.get('[qa-element="delete-alert-submit"]'),
        toast: (text) => cy.get('[qa-element="toast"]', { timeout: 15000 }).contains(text),
    }

    actions = {
        clickAlertsIcon: () => {
            this.elements.alerts_icon().click()
        },
        isVisibleAlertsListPage: () => {
            cy.url().should('match', /\/services\/alerts$/)
        },
        isVisibleCreatePage: () => {
            cy.url().should('include', '/services/alerts/create')
            this.elements.createBtn().should('be.visible')
        },
        createAlert: (name, operationLabel) => {        // metric alert with default values, or operation alert if label is given
            this.actions.clickCreateAlertBtn()
            if (operationLabel) {
                this.actions.selectAlertType('Событие')
                this.actions.selectMetricType(operationLabel)
            }
            this.actions.enterName(name)
            this.actions.clickCreateBtn()
            this.actions.isVisibleToast('Оповещение успешно создано')
            this.actions.isVisibleAlertRowByName(name)
            cy.contains('Оповещение успешно создано', { timeout: 15000 }).should('not.exist')     // toast covers the create button
        },
        clickCreateAlertBtn: () => {
            this.elements.createAlertBtn().should('be.visible').click()
            this.elements.createBtn().should('be.visible')
            cy.get('[qa-element="vms-toggle"]', { timeout: 60000 }).should('be.enabled')   // create button is disabled until server list is loaded
        },
        selectAlertType: (text) => {                    // Метрика / Событие
            this.elements.alertTypeDropdownList().should('be.visible').click()
            this.elements.alertTypeDropdownOption(text).should('be.visible').click()
        },
        selectMetricType: (text) => {                   // metric or operation, same dropdown
            this.elements.metricTypeDropdownList().should('be.visible').click()
            this.elements.metricTypeDropdownOption(text).scrollIntoView().should('be.visible').click()
        },
        selectCondition: (text) => {
            this.elements.conditionDropdownList().should('be.visible').click()
            this.elements.conditionDropdownOption(text).should('be.visible').click()
        },
        selectDuration: (text) => {
            this.elements.durationDropdownList().should('be.visible').click()
            this.elements.durationDropdownOption(text).should('be.visible').click()
        },
        enterThreshold: (value) => {
            this.elements.thresholdInputField().should('be.visible').clear()
            if (value !== '') this.elements.thresholdInputField().type(value)
        },
        checkThresholdValue: (value) => {
            this.elements.thresholdInputField().should('have.value', value)
        },
        isVisibleThresholdErrorMsg: (text) => {
            this.elements.thresholdErrorMsg(text).should('be.visible')
        },
        checkMetricUnit: (text) => {
            this.elements.metricUnitLbl().should('be.visible').and('have.text', text)
        },
        enterName: (name) => {
            this.elements.nameInputField().should('be.visible').clear()
            if (name !== '') this.elements.nameInputField().type(name)
        },
        checkNameValue: (text) => {
            this.elements.nameInputField().should('have.value', text)
        },
        checkNameLength: (length) => {
            this.elements.nameInputField().invoke('val').its('length').should('eq', length)
        },
        isVisibleNameErrorMsg: (text) => {
            this.elements.nameErrorMsg(text).should('be.visible')
        },
        selectOnlyServers: (names) => {                 // all servers are selected by default - unselect the others
            this.elements.serversDropdownList().should('be.visible').click()
            this.elements.serversDropdownOptions().each(($option) => {
                if (!names.includes($option.text().trim())) cy.wrap($option).click()
            })
            this.elements.serversDropdownList().click()
        },
        getServerNames: () => {
            this.elements.serversDropdownList().should('be.visible').click()
            return this.elements.serversDropdownOptions().then(($options) => {
                const names = [...$options].map((option) => option.innerText.trim())
                this.elements.serversDropdownList().click()
                return cy.wrap(names)
            })
        },
        searchServer: (name) => {
            this.elements.serversDropdownList().should('be.visible').click()
            this.elements.serversSearchInputField().should('be.visible').clear().type(name)
        },
        isVisibleServerOption: (name) => {
            this.elements.serversDropdownOptions().contains(name).should('be.visible')
        },
        isVisibleNothingFound: (text) => {
            this.elements.nothingFoundLbl(text).should('be.visible')
        },
        clickEmailNotifySwitch: () => {
            this.elements.emailNotifySwitch().click()
        },
        isCheckedEmailNotifySwitch: () => {
            this.elements.emailNotifySwitch().should('be.checked')
        },
        clickTrustedEmailNotifySwitch: () => {
            this.elements.trustedEmailNotifySwitch().click()
        },
        clickTrustedEmailsEditBtn: () => {
            this.elements.trustedEmailsEditBtn().should('be.visible').click()
            this.elements.trustedEmailInputField().should('be.visible')
        },
        sendTrustedEmail: (email) => {                  // pending email already has a valid link, failed one is resent
            cy.get('body').then(($body) => {
                const $row = $body.find(`tbody tr:contains("${email}")`)
                if ($row.length) {
                    if ($row.find('[qa-element="resend-to-email"]').length) this.elements.trustedEmailResendBtnRowByEmail(email).should('be.enabled').click()
                } else {
                    this.elements.trustedEmailInputField().clear().type(email)
                    this.elements.trustedEmailSendBtn().should('be.enabled').click()
                }
            })
        },
        isVisibleTrustedEmailConfirmedMsg: () => {
            cy.contains('Email успешно подтверждён', { timeout: 15000 }).should('be.visible')
        },
        hasConfirmedTrustedEmail: (email) => {          // yields true if email is already added and confirmed
            cy.get('[qa-element="trusted-email-count"]', { timeout: 15000 }).should('be.visible')
            cy.wait(2000) // trusted emails table is loaded after the count label
            return cy.get('body').then(($body) => {
                return $body.find(`tbody tr:contains("${email}") [qa-element="verified-at"]`).length > 0
            })
        },
        selectTrustedEmail: (email) => {
            this.elements.trustedEmailsDropdownList().should('be.visible').click()
            this.elements.trustedEmailsDropdownOption(email).should('be.visible').click()
            this.elements.trustedEmailsDropdownList().click()
        },
        isDisabledTelegramNotifySwitch: () => {
            this.elements.telegramNotifySwitch().should('be.disabled')
        },
        clickConnectTelegramBtn: () => {
            this.elements.connectTelegramBtn().scrollIntoView().should('be.visible').click()
        },
        isVisibleConnectTelegramModal: () => {
            this.elements.telegramQrCodeImg().should('be.visible')
            this.elements.telegramCodeInputField().should('be.visible')
            this.elements.telegramSubmitBtn().should('be.disabled')
        },
        clickTelegramCancelBtn: () => {
            this.elements.telegramCancelBtn().should('be.visible').click()
            this.elements.telegramQrCodeImg().should('not.exist')
        },
        clickDashboardNotifySwitch: () => {
            this.elements.dashboardNotifySwitch().click()
        },
        isVisibleNotifyOneRequiredMsg: (text) => {
            this.elements.notifyOneRequiredMsg(text).should('be.visible').and('have.class', 'text-danger')
        },
        clickCreateBtn: () => {
            this.elements.createBtn().scrollIntoView().should('be.enabled').click({ force: true })    // long metric name pushes the button out of view
        },
        clickSaveBtn: () => {
            this.elements.saveBtn().scrollIntoView().should('be.enabled').click()
        },
        clickCancelBtn: () => {
            this.elements.cancelBtn().should('be.visible').click()
        },
        isVisibleToast: (text) => {
            this.elements.toast(text).should('be.visible')
        },
        isVisibleAlertRowByName: (name) => {
            this.elements.alertRowByName(name).should('be.visible')
        },
        isNotVisibleAlertRowByName: (name) => {
            cy.contains('tbody tr', name).should('not.exist')
        },
        checkAlertRowValue: (name, text) => {
            this.elements.alertRowByName(name).should('contain', text)
        },
        clickEditIconRowByName: (name) => {
            this.elements.editIconRowByName(name).should('be.visible').click()
            this.elements.saveBtn().should('be.visible')
        },
        isDisabledAlertTypeDropdownList: () => {
            this.elements.alertTypeDropdownList().should('be.disabled')
        },
        isDisabledMetricTypeDropdownList: () => {
            this.elements.metricTypeDropdownList().should('be.disabled')
        },
        deleteTestAlertsByApi: () => {                  // cleanup of alerts created by autotests (alert-...-<timestamp>)
            cy.get('@getAlerts').then((interception) => {
                if (!interception) return
                const headers = {
                    Authorization: interception.request.headers.authorization,
                    'X-Region-Id': interception.request.headers['x-region-id'],
                    'X-Project-Tag': interception.request.headers['x-project-tag'],
                }
                cy.request({ url: interception.request.url, headers, timeout: 60000 }).then(({ body }) => {
                    body.data.content
                        .filter((alert) => /^alert-.*\d{13}/.test(alert.name))
                        .forEach((alert) => {
                            cy.request({ method: 'DELETE', url: `${interception.request.url}/${alert.id}`, headers, timeout: 60000 })
                        })
                })
            })
        },
        deleteAlertByName: (name) => {
            this.elements.deleteIconRowByName(name).should('be.visible').click()
            this.elements.confirmDeleteBtn().should('be.visible').click()
            this.actions.isVisibleToast('Оповещение успешно удалено')
            this.actions.isNotVisibleAlertRowByName(name)
        },
    }
}
module.exports = new Alerts()
