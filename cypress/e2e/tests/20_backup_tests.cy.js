cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import server_page from "../pages/server_page";
import sidebar from "../pages/sidebar";
import backup_page from "../pages/backup_page";
import backup2_page from "../pages/backup2_page";
import serverList_page from "../pages/server-list_page";

describe('20.Backups Tests', () => {
    let configData;
    const backupName = "TesterUchun";
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('GET', `${configData.base_url}panel-main/api/panel/vm/list`).as('serverStatusStopped3');
        cy.intercept('GET', `${configData.base_url}panel-main/api/panel/backups/list`).as('backupListRequest');
    })
    it('PD-190 Display backup list', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverList_page.actions.searchServer(configData.test_server_name)
        serverList_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverList_page.actions.clickServerCard(configData.test_server_name)
        serverList_page.actions.isVisibleServerDetail(configData.test_server_name)
        backup_page.actions.clickBackupTab()
        backup_page.actions.isVisibleCreateNewBackupBtn()
        backup_page.actions.clickCreateBackup()
        backup_page.actions.enterBackupNameInp(backupName)
        backup_page.actions.clickVerifiedBackupCreateBtn()
        //cy.wait(10000) // appearing progress bar takes time
        // backup_page.actions.isVisibleProgressBar() qa-element is needed for bar
        backup_page.actions.waitForBackupSuccess(backupName)
        backup_page.actions.isVisibleSuccessAddbackup()
    })
    it('PD-191 Search backups by backup name', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickBackupIcon()
        serverList_page.actions.searchServer(backupName)
        backup2_page.actions.isVisibleShowTxt()
    })
    it('PD-192 Search backups by server name', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickBackupIcon()
        serverList_page.actions.searchServer(configData.test_server_name)
        backup2_page.actions.isVisibleShowTxt2()
    })
    it('PD-193 Restore backup (replace current one)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickBackupIcon()
        backup2_page.actions.clickRestoreBackup2Btn()
        backup2_page.actions.clickRestoreConfirmBtnFn()
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverList_page.actions.searchServer(configData.test_server_name)
        serverList_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverList_page.actions.waitForServerStatus(configData.test_server_name, "Восстановление бэкапа")
        serverList_page.actions.waitForServerStatus(configData.test_server_name, "Остановлен")
    })
    it('PD-195 Delete backup', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickBackupIcon()
        backup2_page.actions.clickDeleteBackup2Btn()
        backup2_page.actions.clickDeleteBackup2ConfirmBtn()
        backup_page.actions.isNotVisibleBackupDeleteBtn()
    })
})
//Test-Server remains in Stopped status after above tests
