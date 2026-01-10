cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import server_page from "../pages/server_page";
import sidebar from "../pages/sidebar";
import localNetworks_page from "../pages/localNetworks_page";
import backup_page from "../pages/backup_page";
import backup2_page from "../pages/backup2_page";
import serverList_page from "../pages/server-list_page";

describe('20.Backups Tests', () => {
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
        cy.intercept('GET', `${configData.base_url}panel-main/api/panel/backups/list`).as('backupListRequest');
    })
    it('PD-190 Отображение список Бэкапы', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        backup_page.actions.clickBackupTxt()
        cy.wait(2000)
        backup_page.actions.isVisibleCreateNewBackupBtn()
        backup_page.actions.clickCreateBackup()
        backup_page.actions.enterBackupNameInp("TesterUchun")
        backup_page.actions.clickVerifiedBackupCreateBtn()
        cy.wait(1000)
        backup_page.actions.isVisibleProgressBar()
        cy.wait(100000)
        backup_page.actions.isVisibleSuccessAddbackup()
    })
    it('PD-191 Поиск бэкапы по названию', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickBackupIcon()
        cy.wait(2000)
        serverList_page.actions.searchServer("TesterUchun")
        backup2_page.actions.isVisibleShowTxt()
    })
    it('PD-192 Поиск бэкапы по названию сервера', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickBackupIcon()
        cy.wait(2000)
        serverList_page.actions.searchServer("Test")
        backup2_page.actions.isVisibleShowTxt2()
    })
    it('PD-193 Восстановить бэкап', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickBackupIcon()
        cy.wait(1000)
        backup2_page.actions.clickRestoreBackup2Btn()
        backup2_page.actions.clickRestoreConfirmBtnFn()
        cy.wait(7000)
    })
    it('PD-195 Удалить бэкап', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickBackupIcon()
        backup2_page.actions.clickDeleteBackup2Btn()
        backup2_page.actions.clickDeleteBackup2ConfirmBtn()
        cy.wait(2000)
        backup_page.actions.isNotVisibleBackupDeleteBtn()

    })
})
