cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import server_page from "../pages/server_page";
import sidebar from "../pages/sidebar";
import backup_page from "../pages/backup_page";
import serverlist_page from "../pages/server-list_page";
import serverAction_page from "../pages/server-action_page";

describe('11.Servers - Backups tab', () => {
    let configData;
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('GET', `${configData.base_url}panel-main/api/panel/vm/list`).as('serverStatusStopped3');
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/${configData.test_server_id}/linkLocalNet`).as('networkSuccessAdd');
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/${configData.test_server_id}/unlinkNet`).as('networkSuccessDelete');
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/${configData.test_server_id}/nets/3351/edit`).as('networkIpEditSuccess');
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/${configData.test_server_id}/linkPublicNet`).as('publicIpSuccessAdd');
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/${configData.test_server_id}/linkPublicNet`).as('publicIpInValidAdd');
    })
    it('PD-72 Create backup', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        backup_page.actions.clickBackupTab()
        backup_page.actions.isVisibleCreateNewBackupBtn()
        backup_page.actions.clickCreateBackup()
        backup_page.actions.enterBackupNameInp("TesterNwL")
        backup_page.actions.clickVerifiedBackupCreateBtn()
        // cy.wait(10000) // appearing progress bar takes time
        // backup_page.actions.isVisibleProgressBar() // qa-element is needed for progress bar
        backup_page.actions.waitForBackupSuccess("TesterNwL")
        backup_page.actions.isVisibleBackupDeleteBtn()
    })
    it('PD-73 Create backup (Without name)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        backup_page.actions.clickBackupTab()
        backup_page.actions.isVisibleCreateNewBackupBtn()
        backup_page.actions.clickCreateBackup()
        backup_page.actions.isDisabledCreateBtn()
    })
    it('PD-76 Create backup (With duplicate name)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        backup_page.actions.clickBackupTab()
        backup_page.actions.isVisibleCreateNewBackupBtn()
        backup_page.actions.clickCreateBackup()
        backup_page.actions.enterBackupNameInp("TesterNwL")
        backup_page.actions.clickVerifiedBackupCreateBtn()
        // later here add a method to assert whether the error message is visible or not, after adding duplicate backup name - for now qa-element is needed for error message
    })
    it('PD-74 Restore backup (Replace the current server)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        backup_page.actions.clickBackupTab()
        backup_page.actions.isVisibleSuccessAddbackup()
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickStopServerBtn()
        serverAction_page.actions.checkStatus(25, 'Остановлен')
        backup_page.actions.clickBackupRestoreBtn()
        backup_page.actions.clickBackupRestoreConfirmBtn()
        serverlist_page.actions.waitForServerStatus(configData.test_server_name, "Восстановление бэкапа")
        serverlist_page.actions.waitForServerStatus(configData.test_server_name, "Остановлен")
    })
    it('PD-75 Delete backup', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        backup_page.actions.clickBackupTab()
        backup_page.actions.isVisibleSuccessAddbackup()
        backup_page.actions.clickDeleteBackupBtn()
        backup_page.actions.clickDeleteBackupSuccessBtn1()
        backup_page.actions.isNotVisibleBackupDeleteBtn()
    })
})
//Test-Server remains in Stopped status after above tests
