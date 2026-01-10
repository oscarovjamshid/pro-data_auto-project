cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import server_page from "../pages/server_page";
import sidebar from "../pages/sidebar";
import localNetworks_page from "../pages/localNetworks_page";
import backup_page from "../pages/backup_page";

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
    it('PD-72 Создать бэкап', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        backup_page.actions.clickBackupTxt()
        cy.wait(2000)
        backup_page.actions.isVisibleCreateNewBackupBtn()
        backup_page.actions.clickCreateBackup()
        backup_page.actions.enterBackupNameInp("TesterNwL")
        backup_page.actions.clickVerifiedBackupCreateBtn()
        cy.wait(15000)
        backup_page.actions.isVisibleProgressBar()
        cy.wait(50000)
        cy.wait(50000)
        backup_page.actions.isVisibleBackupDeleteBtn()
    })
    it('PD-73 Создать бэкап (Без названия)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        backup_page.actions.clickBackupTxt()
        cy.wait(2000)
        backup_page.actions.isVisibleCreateNewBackupBtn()
        backup_page.actions.clickCreateBackup()
        backup_page.actions.isDisabledCreateBtn()
    })
    it('PD-76 Создать бэкап (С одинаковым названием)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        backup_page.actions.clickBackupTxt()
        cy.wait(2000)
        backup_page.actions.isVisibleSuccessAddbackup()
        backup_page.actions.clickCreateBackup()
        backup_page.actions.enterBackupNameInp("TesterNwL")
        backup_page.actions.clickVerifiedBackupCreateBtn()
        cy.wait(15000)
    })
    it('PD-74 Восстановить бэкап', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        backup_page.actions.clickBackupTxt()
        cy.wait(2000)
        backup_page.actions.isVisibleSuccessAddbackup()
        cy.wait(1000)
        backup_page.actions.clickBackupRestoreBtn2()
        backup_page.actions.clickBackupRestoreConfirmBtn2()
        cy.wait(90000)
    })
    it('PD-75 Удалить бэкап', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        backup_page.actions.clickBackupTxt()
        cy.wait(2000)
        backup_page.actions.isVisibleSuccessAddbackup()
        backup_page.actions.clickDeleteBackupBtn()
        backup_page.actions.clickDeleteBackupSuccessBtn1()
        cy.wait(10000)
        backup_page.actions.isNotVisibleBackupDeleteBtn()
    })
})
