cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import server_page from "../pages/server_page";
import serverlist_page from "../pages/server-list_page";
import serverAction_page from "../pages/server-action_page";
import configuration_page from "../pages/configuration_page";
import alerts_page from "../pages/alerts_page";
import mailinator_page from "../pages/mailinator_page";

describe('35.Alerts Tests', () => {
    let configData;
    let account;                                        // separate account from cypress.env.json, otherwise default one
    const trustedEmail = 'jamshid@mailinator.com'
    const testServerName = `TS-Alerts-${Cypress.env('runId')}`     // runId - one per run, spec code is re-evaluated after visiting mailinator
    const metricTypes = [
        { id: 'PD-860', name: 'CPU Usage', label: 'CPU использование', unit: '%' },
        { id: 'PD-861', name: 'Disk Read I/O', label: 'Диск чтение', unit: 'Байт/с.' },
        { id: 'PD-862', name: 'Disk Write I/O', label: 'Диск запись', unit: 'Байт/с.' },
        { id: 'PD-863', name: 'Disk Read Operation', label: 'Диск операция чтения', unit: 'Оп./с.' },
        { id: 'PD-864', name: 'Disk Write Operation', label: 'Диск операция запись', unit: 'Оп./с.' },
        { id: 'PD-865', name: 'Disk utilization', label: 'Диск использование', unit: '%' },
        { id: 'PD-866', name: 'Disk Inbound Bandwidth', label: 'Сеть пропуская способность входящая', unit: 'Байт/с.' },
        { id: 'PD-867', name: 'Disk Outbound Bandwidth', label: 'Сеть пропуская способность исходящая', unit: 'Байт/с.' },
    ]
    const conditions = [
        { id: 'PD-868', name: 'greater than', label: 'больше чем' },
        { id: 'PD-869', name: 'less than', label: 'меньше чем' },
        { id: 'PD-870', name: 'greater than or equal to', label: 'больше или равно' },
        { id: 'PD-871', name: 'less than or equal to', label: 'меньше или равно' },
        { id: 'PD-872', name: 'equal to', label: 'равно' },
        { id: 'PD-873', name: 'not equal to', label: 'не равно' },
    ]
    const operationTypes = [                            // all options of the operation dropdown (from API)
        { id: 'PD-886', name: 'VM is deleted', label: 'Удалена ВМ' },
        { id: 'PD-887', name: 'Backup is created', label: 'Создан бэкап' },
        { id: 'PD-888', name: 'Stop VM', label: 'Остановка ВМ' },
        { id: 'PD-889', name: 'Start VM', label: 'Запуск ВМ' },
        { id: 'PD-1135', name: 'VM is created', label: 'Создана ВМ' },
        { id: 'PD-1136', name: 'OS template is created from VM', label: 'Создан шаблон ОС из ВМ' },
        { id: 'PD-1137', name: 'Managed DB is created', label: 'Создана управляемая БД' },
        { id: 'PD-1138', name: 'Managed DB resources are changed', label: 'Изменены ресурсы управляемой БД' },
        { id: 'PD-1139', name: 'DB fault tolerance is changed', label: 'Изменена отказоустойчивость БД' },
    ]
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
            account = {
                login: Cypress.env('alerts_login') || data.login,
                password: Cypress.env('alerts_password') || data.password,
            }
        });
    })
    after(() => {                                       // stop and delete the server created for alerts tests (only if it exists)
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('GET', '**/panel-main/api/panel/vm/list*').as('vmList');
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
        cy.login(configData.base_url, account.login, account.password)
        sidebar.actions.clickServersIcon()
        cy.wait('@vmList').then(({ response }) => {
            if (!JSON.stringify(response.body).includes(testServerName)) return
            server_page.actions.checkServerPageLbl()
            serverlist_page.actions.searchServer(testServerName)
            serverlist_page.actions.isVisibleSearchTxtServer(testServerName)
            serverlist_page.actions.clickServerCard(testServerName)
            serverlist_page.actions.isVisibleServerDetail(testServerName)
            serverAction_page.actions.isRunningServer()
            serverAction_page.actions.clickServerActionsBtn()
            serverAction_page.actions.clickStopServerBtn()
            serverAction_page.actions.checkStatus(25, 'Остановлен')
            configuration_page.actions.isVisibleDangerBtn()
            configuration_page.actions.clickDeleteServerDangerBtn()
            configuration_page.actions.writeDeleteServerNameTxt(testServerName)
            cy.wait(1000)
            configuration_page.actions.clickVerifiedDeleteBtn()
            configuration_page.actions.isVisibleDeletedVMMessage("Сервер успешно удален")
        })
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('POST', '**/alerts').as('createAlert');
        cy.intercept('PUT', '**/alerts/*').as('editAlert');
        cy.intercept('DELETE', '**/alerts/*').as('deleteAlert');
        cy.intercept('GET', '**/panel-main/api/alerts').as('getAlerts');
    })
    afterEach(() => {
        alerts_page.actions.deleteTestAlertsByApi()
    })

    it('Alerts - Precondition: create test server (successful)', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/prepare`).as('createServerRequest');
        cy.login(configData.base_url, account.login, account.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        server_page.actions.clickCreateServerBtn()
        server_page.actions.checkCreateServerPageLbl()
        server_page.actions.selectServerOs(0)
        server_page.actions.selectVersionOs()
        server_page.actions.writeTitle(testServerName)
        server_page.actions.writeDesc("for alerts tests, deleted after all tests")
        server_page.actions.writeCpuTxt(1)              // minimal config - region may have no free capacity for bigger ones
        server_page.actions.writeRamTxt(1)
        server_page.actions.clickDiskTypeSSDBtn()
        server_page.actions.setDisk(10)
        server_page.actions.enablePublicIp()
        server_page.actions.clickLoginTypeSSHBtn()
        server_page.actions.clickConfirmCreateServerBtn()
        server_page.actions.clickCloseModalBtn()
        server_page.actions.checkCreateApi(testServerName)
        server_page.actions.isVisibleCreatedServer(testServerName)
        serverlist_page.actions.searchServer(testServerName)
        serverlist_page.actions.isVisibleSearchTxtServer(testServerName)
        server_page.actions.waitForServerStatusLbl()
        server_page.actions.checkElementTextPeriodically()
    })
    metricTypes.forEach((metric) => {
        it(`[${metric.id}] Alerts - Add: metric for ${metric.name} (successful)`, () => {
            const alertName = `alert-metric-${Date.now()}`
            cy.login(configData.base_url, account.login, account.password)
            alerts_page.actions.clickAlertsIcon()
            alerts_page.actions.clickCreateAlertBtn()
            alerts_page.actions.selectAlertType('Метрика')
            alerts_page.actions.selectMetricType(metric.label)
            alerts_page.actions.checkNameValue(metric.label)
            alerts_page.actions.checkMetricUnit(metric.unit)
            alerts_page.actions.enterThreshold('10')
            alerts_page.actions.enterName(alertName)
            alerts_page.actions.clickCreateBtn()
            cy.wait('@createAlert').its('response.statusCode').should('be.oneOf', [200, 201])
            alerts_page.actions.isVisibleToast('Оповещение успешно создано')
            alerts_page.actions.isVisibleAlertRowByName(alertName)
            alerts_page.actions.checkAlertRowValue(alertName, 'Метрика')
        })
    })
    conditions.forEach((condition) => {
        it(`[${condition.id}] Alerts - Add: any metric for condition ${condition.name} (successful)`, () => {
            const alertName = `alert-condition-${Date.now()}`
            cy.login(configData.base_url, account.login, account.password)
            alerts_page.actions.clickAlertsIcon()
            alerts_page.actions.clickCreateAlertBtn()
            alerts_page.actions.selectCondition(condition.label)
            alerts_page.actions.enterThreshold('50')
            alerts_page.actions.enterName(alertName)
            alerts_page.actions.clickCreateBtn()
            cy.wait('@createAlert').its('response.statusCode').should('be.oneOf', [200, 201])
            alerts_page.actions.isVisibleToast('Оповещение успешно создано')
            alerts_page.actions.isVisibleAlertRowByName(alertName)
        })
    })
    it('[PD-874] Alerts - Add: any metric with minimum Threshold (1) (successful)', () => {
        const alertName = `alert-min-threshold-${Date.now()}`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.enterThreshold('1')
        alerts_page.actions.checkThresholdValue('1')
        alerts_page.actions.enterName(alertName)
        alerts_page.actions.clickCreateBtn()
        cy.wait('@createAlert').its('request.body.metricCondition.thresholdValue').should('eq', 1)
        alerts_page.actions.isVisibleToast('Оповещение успешно создано')
    })
    it('[PD-875] Alerts - Add: any metric with maximum Threshold (100) (successful)', () => {
        const alertName = `alert-max-threshold-${Date.now()}`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.enterThreshold('100')
        alerts_page.actions.checkThresholdValue('100')
        alerts_page.actions.enterName(alertName)
        alerts_page.actions.clickCreateBtn()
        cy.wait('@createAlert').its('request.body.metricCondition.thresholdValue').should('eq', 100)
        alerts_page.actions.isVisibleToast('Оповещение успешно создано')
    })
    it('[PD-876] Alerts - Add: any metric with minimum Duration (5) (successful)', () => {
        const alertName = `alert-min-duration-${Date.now()}`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.selectDuration('5')
        alerts_page.actions.enterName(alertName)
        alerts_page.actions.clickCreateBtn()
        cy.wait('@createAlert').its('request.body.metricCondition.durationMinutes').should('eq', '5')
        alerts_page.actions.isVisibleToast('Оповещение успешно создано')
    })
    it('[PD-877] Alerts - Add: any metric with maximum Duration (60) (successful)', () => {
        const alertName = `alert-max-duration-${Date.now()}`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.selectDuration('60')
        alerts_page.actions.enterName(alertName)
        alerts_page.actions.clickCreateBtn()
        cy.wait('@createAlert').its('request.body.metricCondition.durationMinutes').should('eq', '60')
        alerts_page.actions.isVisibleToast('Оповещение успешно создано')
    })
    it('[PD-878] Alerts - Add: any metric with empty Threshold (unsuccessful)', () => {
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.enterThreshold('')
        alerts_page.actions.clickCreateBtn()
        alerts_page.actions.isVisibleThresholdErrorMsg('Обязательное поле')
        alerts_page.actions.isVisibleCreatePage()
    })
    it('[PD-879] Alerts - Add: any metric with empty Name (unsuccessful)', () => {
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.enterName('')
        alerts_page.actions.clickCreateBtn()
        alerts_page.actions.isVisibleNameErrorMsg('Обязательное поле')
        alerts_page.actions.isVisibleCreatePage()
    })
    it('[PD-880] Alerts - Add: any metric with maximum Name length (50) (successful)', () => {
        const alertName = `alert-max-name-${Date.now()}`.padEnd(55, 'a')
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.enterName(alertName)
        alerts_page.actions.checkNameLength(50)
        alerts_page.actions.clickCreateBtn()
        cy.wait('@createAlert').its('response.statusCode').should('be.oneOf', [200, 201])
        alerts_page.actions.isVisibleToast('Оповещение успешно создано')
    })
    it('[PD-881, PD-882, PD-883] Alerts - Add: unit symbol appears for %, Byte/s and Ops./s. based metrics (successful)', () => {
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        metricTypes.forEach((metric) => {               // [PD-881] '%', [PD-882] 'Байт/с.', [PD-883] 'Оп./с.'
            alerts_page.actions.selectMetricType(metric.label)
            alerts_page.actions.checkMetricUnit(metric.unit)
        })
    })
    it.skip("[PD-884] Alerts - Add: operation alert for 'Backup is deleted' (successful)", () => {
        // skipped: there is no 'Удалён бэкап' option in the operation dropdown
        // const alertName = `alert-operation-${Date.now()}`
        // cy.login(configData.base_url, account.login, account.password)
        // alerts_page.actions.clickAlertsIcon()
        // alerts_page.actions.clickCreateAlertBtn()
        // alerts_page.actions.selectAlertType('Событие')
        // alerts_page.actions.selectMetricType('Удалён бэкап')
        // alerts_page.actions.checkNameValue('Удалён бэкап')
        // alerts_page.actions.enterName(alertName)
        // alerts_page.actions.clickCreateBtn()
        // cy.wait('@createAlert').its('response.statusCode').should('be.oneOf', [200, 201])
        // alerts_page.actions.isVisibleToast('Оповещение успешно создано')
        // alerts_page.actions.isVisibleAlertRowByName(alertName)
        // alerts_page.actions.checkAlertRowValue(alertName, 'Событие')
    })
    it.skip("[PD-885] Alerts - Add: operation alert for 'Disk is deleted' (successful)", () => {
        // skipped: there is no 'Удалён диск' option in the operation dropdown
        // const alertName = `alert-operation-${Date.now()}`
        // cy.login(configData.base_url, account.login, account.password)
        // alerts_page.actions.clickAlertsIcon()
        // alerts_page.actions.clickCreateAlertBtn()
        // alerts_page.actions.selectAlertType('Событие')
        // alerts_page.actions.selectMetricType('Удалён диск')
        // alerts_page.actions.checkNameValue('Удалён диск')
        // alerts_page.actions.enterName(alertName)
        // alerts_page.actions.clickCreateBtn()
        // cy.wait('@createAlert').its('response.statusCode').should('be.oneOf', [200, 201])
        // alerts_page.actions.isVisibleToast('Оповещение успешно создано')
        // alerts_page.actions.isVisibleAlertRowByName(alertName)
        // alerts_page.actions.checkAlertRowValue(alertName, 'Событие')
    })
    operationTypes.forEach((operation) => {
        it(`[${operation.id}] Alerts - Add: operation alert for '${operation.name}' (successful)`, () => {
            const alertName = `alert-operation-${Date.now()}`
            cy.login(configData.base_url, account.login, account.password)
            alerts_page.actions.clickAlertsIcon()
            alerts_page.actions.clickCreateAlertBtn()
            alerts_page.actions.selectAlertType('Событие')
            alerts_page.actions.selectMetricType(operation.label)
            alerts_page.actions.checkNameValue(operation.label)
            alerts_page.actions.enterName(alertName)
            alerts_page.actions.clickCreateBtn()
            cy.wait('@createAlert').its('response.statusCode').should('be.oneOf', [200, 201])
            alerts_page.actions.isVisibleToast('Оповещение успешно создано')
            alerts_page.actions.isVisibleAlertRowByName(alertName)
            alerts_page.actions.checkAlertRowValue(alertName, 'Событие')
        })
    })
    it('[PD-890] Alerts - Add: any operation alert with empty Name (unsuccessful)', () => {
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.selectAlertType('Событие')
        alerts_page.actions.selectMetricType(operationTypes[0].label)
        alerts_page.actions.enterName('')
        alerts_page.actions.clickCreateBtn()
        alerts_page.actions.isVisibleNameErrorMsg('Обязательное поле')
        alerts_page.actions.isVisibleCreatePage()
    })
    it('[PD-891] Alerts - Add: any operation alert with maximum Name length (50) (successful)', () => {
        const alertName = `alert-operation-max-name-${Date.now()}`.padEnd(55, 'a')
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.selectAlertType('Событие')
        alerts_page.actions.selectMetricType(operationTypes[0].label)
        alerts_page.actions.enterName(alertName)
        alerts_page.actions.checkNameLength(50)
        alerts_page.actions.clickCreateBtn()
        cy.wait('@createAlert').its('response.statusCode').should('be.oneOf', [200, 201])
        alerts_page.actions.isVisibleToast('Оповещение успешно создано')
    })
    it('[PD-892] Alerts - Add: any alert with servers: All (successful)', () => {
        const alertName = `alert-all-servers-${Date.now()}`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.enterName(alertName)
        alerts_page.actions.clickCreateBtn()
        cy.wait('@createAlert').its('request.body.resourceScope').should('eq', 'ALL_OF_TYPE')
        alerts_page.actions.isVisibleToast('Оповещение успешно создано')
    })
    it('[PD-893] Alerts - Add: any alert with servers: single (successful)', () => {
        const alertName = `alert-single-server-${Date.now()}`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.enterName(alertName)
        alerts_page.actions.getServerNames().then((names) => {
            expect(names.length, 'servers on account (at least 2 needed)').to.be.greaterThan(1)
            alerts_page.actions.selectOnlyServers([names[0]])
            alerts_page.actions.clickCreateBtn()
            cy.wait('@createAlert').its('request.body.resourceIds').should('have.length', 1)
            alerts_page.actions.isVisibleToast('Оповещение успешно создано')
            alerts_page.actions.checkAlertRowValue(alertName, names[0])
        })
    })
    it('[PD-894] Alerts - Add: any alert with servers: multiple (successful)', () => {
        const alertName = `alert-multiple-servers-${Date.now()}`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.enterName(alertName)
        alerts_page.actions.getServerNames().then((names) => {
            alerts_page.actions.selectOnlyServers(names)            // all existing servers are selected
            alerts_page.actions.clickCreateBtn()
            cy.wait('@createAlert').its('response.statusCode').should('be.oneOf', [200, 201])
            alerts_page.actions.isVisibleToast('Оповещение успешно создано')
            names.forEach((name) => {
                alerts_page.actions.checkAlertRowValue(alertName, name)
            })
        })
    })
    it.skip('[PD-895] Alerts - Add: Server List: searching for valid server name (successful)', () => {
        // skipped: Server List dropdown has no search field
        // cy.login(configData.base_url, account.login, account.password)
        // alerts_page.actions.clickAlertsIcon()
        // alerts_page.actions.clickCreateAlertBtn()
        // alerts_page.actions.searchServer(testServerName)
        // alerts_page.actions.isVisibleServerOption(testServerName)
    })
    it.skip('[PD-896] Alerts - Add: Server List: searching for invalid server name (unsuccessful)', () => {
        // skipped: Server List dropdown has no search field
        // cy.login(configData.base_url, account.login, account.password)
        // alerts_page.actions.clickAlertsIcon()
        // alerts_page.actions.clickCreateAlertBtn()
        // alerts_page.actions.searchServer(`invalid-server-${Date.now()}`)
        // alerts_page.actions.isVisibleNothingFound('Ничего не найдено')
    })
    it("[PD-897] Alerts - Add: any alert with user's own email channel only (successful)", () => {
        const alertName = `alert-own-email-${Date.now()}`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.isCheckedEmailNotifySwitch()
        alerts_page.actions.enterName(alertName)
        alerts_page.actions.clickCreateBtn()
        cy.wait('@createAlert').its('request.body').should('include', { notifyByEmail: true, notifyByTelegram: false, notifyByPanel: false })
        alerts_page.actions.isVisibleToast('Оповещение успешно создано')
    })
    it('[PD-898] Alerts - Add: any alert with trusted email channel only (successful)', () => {
        cy.origin('https://www.mailinator.com', () => {
            Cypress.on('uncaught:exception', () => false)
        })
        const alertName = `alert-trusted-email-${Date.now()}`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.clickTrustedEmailsEditBtn()
        alerts_page.actions.hasConfirmedTrustedEmail(trustedEmail).then((isConfirmed) => {
            if (isConfirmed) return
            alerts_page.actions.sendTrustedEmail(trustedEmail)
            mailinator_page.actions.getLinkFromLatestEmail(trustedEmail).then((link) => {
                cy.visit(link)
                alerts_page.actions.isVisibleTrustedEmailConfirmedMsg()
            })
            cy.clearAllCookies()                        // session is broken after visiting mailinator - login again
            cy.clearAllLocalStorage()
            cy.login(configData.base_url, account.login, account.password)
            alerts_page.actions.clickAlertsIcon()
            alerts_page.actions.clickCreateAlertBtn()
        })
        cy.reload()                                     // only confirmed emails appear in the dropdown
        alerts_page.actions.clickEmailNotifySwitch()
        alerts_page.actions.clickTrustedEmailNotifySwitch()
        alerts_page.actions.selectTrustedEmail(trustedEmail)
        alerts_page.actions.enterName(alertName)
        alerts_page.actions.clickCreateBtn()
        cy.wait('@createAlert').its('request.body.trustedEmailsTONotify').should('have.length', 1)
        alerts_page.actions.isVisibleToast('Оповещение успешно создано')
    })
    it('[PD-899] Alerts - Add: any alert with Telegram bot channel only (successful)', () => {
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.isDisabledTelegramNotifySwitch()        // telegram bot is not connected on the test account
        alerts_page.actions.clickConnectTelegramBtn()
        alerts_page.actions.isVisibleConnectTelegramModal()
        alerts_page.actions.clickTelegramCancelBtn()
    })
    it('[PD-900] Alerts - Add: any alert with Dashboard channel only (successful)', () => {
        const alertName = `alert-dashboard-${Date.now()}`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.clickEmailNotifySwitch()
        alerts_page.actions.clickDashboardNotifySwitch()
        alerts_page.actions.enterName(alertName)
        alerts_page.actions.clickCreateBtn()
        cy.wait('@createAlert').its('request.body').should('include', { notifyByEmail: false, notifyByTelegram: false, notifyByPanel: true })
        alerts_page.actions.isVisibleToast('Оповещение успешно создано')
    })
    it('[PD-901] Alerts - Add: any alert with multiple alert channels (successful)', () => {
        const alertName = `alert-multiple-channels-${Date.now()}`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.clickDashboardNotifySwitch()
        alerts_page.actions.enterName(alertName)
        alerts_page.actions.clickCreateBtn()
        cy.wait('@createAlert').its('request.body').should('include', { notifyByEmail: true, notifyByPanel: true })
        alerts_page.actions.isVisibleToast('Оповещение успешно создано')
    })
    it('[PD-902] Alerts - Add: any alert with empty alert channel (unsuccessful)', () => {
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.clickEmailNotifySwitch()
        alerts_page.actions.clickCreateBtn()
        alerts_page.actions.isVisibleNotifyOneRequiredMsg('Должен быть выбран хотя бы один канал оповещения')
        alerts_page.actions.isVisibleCreatePage()
    })
    it('[PD-903] Alerts - Add: Cancel button (successful)', () => {
        const alertName = `alert-cancel-${Date.now()}`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.clickCreateAlertBtn()
        alerts_page.actions.enterName(alertName)
        alerts_page.actions.clickCancelBtn()
        alerts_page.actions.isVisibleAlertsListPage()
        alerts_page.actions.isNotVisibleAlertRowByName(alertName)
    })
    it('[PD-904] Alerts - Edit: editing with valid values (Name, threshold, duration) (successful)', () => {
        const alertName = `alert-edit-${Date.now()}`
        const newAlertName = `${alertName}-edited`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.createAlert(alertName)
        alerts_page.actions.clickEditIconRowByName(alertName)
        alerts_page.actions.enterName(newAlertName)
        alerts_page.actions.enterThreshold('75')
        alerts_page.actions.selectDuration('20')
        alerts_page.actions.clickSaveBtn()
        cy.wait('@editAlert').then(({ request, response }) => {
            expect(response.statusCode).to.be.oneOf([200, 201])
            expect(request.body.name).to.eq(newAlertName)
            expect(request.body.metricCondition.thresholdValue).to.eq(75)
            expect(request.body.metricCondition.durationMinutes).to.eq('20')
        })
        alerts_page.actions.isVisibleToast('Оповещение успешно изменено')
        alerts_page.actions.isVisibleAlertRowByName(newAlertName)
    })
    it('[PD-905] Alerts - Edit: editing with different options (server, alert channel) (successful)', () => {
        const alertName = `alert-edit-options-${Date.now()}`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.createAlert(alertName)
        alerts_page.actions.clickEditIconRowByName(alertName)
        alerts_page.actions.getServerNames().then((names) => {
            expect(names.length, 'servers on account (at least 2 needed)').to.be.greaterThan(1)
            alerts_page.actions.selectOnlyServers([names[0]])
            alerts_page.actions.clickDashboardNotifySwitch()
            alerts_page.actions.clickEmailNotifySwitch()
            alerts_page.actions.clickSaveBtn()
            cy.wait('@editAlert').then(({ request, response }) => {
                expect(response.statusCode).to.be.oneOf([200, 201])
                expect(request.body.resourceIds).to.have.length(1)
                expect(request.body.notifyByEmail).to.eq(false)
                expect(request.body.notifyByPanel).to.eq(true)
            })
            alerts_page.actions.isVisibleToast('Оповещение успешно изменено')
            alerts_page.actions.checkAlertRowValue(alertName, names[0])
        })
    })
    it('[PD-908] Alerts - Edit: assert that track and operation/metric type is disabled (successful)', () => {
        const metricAlertName = `alert-edit-disabled-metric-${Date.now()}`
        const operationAlertName = `alert-edit-disabled-operation-${Date.now()}`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.createAlert(metricAlertName)
        alerts_page.actions.createAlert(operationAlertName, operationTypes[0].label)
        alerts_page.actions.clickEditIconRowByName(metricAlertName)
        alerts_page.actions.isDisabledAlertTypeDropdownList()
        alerts_page.actions.isDisabledMetricTypeDropdownList()
        alerts_page.actions.clickCancelBtn()
        alerts_page.actions.clickEditIconRowByName(operationAlertName)
        alerts_page.actions.isDisabledAlertTypeDropdownList()
        alerts_page.actions.isDisabledMetricTypeDropdownList()
        alerts_page.actions.clickCancelBtn()
    })
    it('[PD-909] Alerts - Edit: Cancel button (successful)', () => {
        const alertName = `alert-edit-cancel-${Date.now()}`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.createAlert(alertName)
        alerts_page.actions.clickEditIconRowByName(alertName)
        alerts_page.actions.enterName(`${alertName}-edited`)
        alerts_page.actions.clickCancelBtn()
        alerts_page.actions.isVisibleAlertsListPage()
        alerts_page.actions.isNotVisibleAlertRowByName(`${alertName}-edited`)
        alerts_page.actions.isVisibleAlertRowByName(alertName)
    })
    it('[PD-906] Alerts - Delete: any metric alert (successful)', () => {
        const alertName = `alert-delete-metric-${Date.now()}`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.createAlert(alertName)
        alerts_page.actions.deleteAlertByName(alertName)
        cy.wait('@deleteAlert').its('response.statusCode').should('be.oneOf', [200, 204])
    })
    it('[PD-907] Alerts - Delete: any operation alert (successful)', () => {
        const alertName = `alert-delete-operation-${Date.now()}`
        cy.login(configData.base_url, account.login, account.password)
        alerts_page.actions.clickAlertsIcon()
        alerts_page.actions.createAlert(alertName, operationTypes[0].label)
        alerts_page.actions.deleteAlertByName(alertName)
        cy.wait('@deleteAlert').its('response.statusCode').should('be.oneOf', [200, 204])
    })
})
