cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import server_page from "../pages/server_page";
import sidebar from "../pages/sidebar";
import configuration_page from "../pages/configuration_page";
import serverlist_page from "../pages/server-list_page";
import serverAction_page from "../pages/server-action_page";

describe('4.Servers - Configuration tab', () => {
    let configData;
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('GET', `${configData.base_url}panel-main/api/panel/vm/list`).as('serverStatusStopped');
        cy.intercept('GET', `${configData.base_url}panel-main/api/panel/vm/list`).as('serverStatusStopped2');
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/${configData.test_server_id}/edit`).as('serverEditNegativeCpu');

    })
    it('Delete server with public IP (checkbox should appear)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_without_backup)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_without_backup)
        serverlist_page.actions.clickServerCard(configData.test_server_without_backup)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_without_backup)
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickStopServerBtn()
        try {
            serverAction_page.actions.isServerStoppedStatus()
        } catch {
            cy.wait(30000)
            serverAction_page.actions.isServerStoppedStatus()
        }
        configuration_page.actions.isVisibleDangerBtn()
        configuration_page.actions.clickDeleteServerDangerBtn()
        configuration_page.actions.writeDeleteServerNameTxt(configData.test_server_without_backup)
        configuration_page.actions.clickVerifiedDeleteBtn()
        configuration_page.actions.isVisibleDeletedVMMessage("Сервер успешно удален")
    })
    it('[PD-126] Delete server with custom image', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_with_customOS)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_with_customOS)
        serverlist_page.actions.clickServerCard(configData.test_server_with_customOS)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_with_customOS)
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickStopServerBtn()
        try {
            serverAction_page.actions.isServerStoppedStatus()
        } catch {
            cy.wait(30000)
            serverAction_page.actions.isServerStoppedStatus()
        }
        configuration_page.actions.isVisibleDangerBtn()
        configuration_page.actions.clickDeleteServerDangerBtn()
        configuration_page.actions.writeDeleteServerNameTxt(configData.test_server_with_customOS)
        configuration_page.actions.clickVerifiedDeleteBtn()
        configuration_page.actions.isVisibleDeletedVMMessage("Сервер успешно удален")
    })
    it('Edit server configuration with invalid data (words with spaces)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        configuration_page.actions.checkServerStatusStopped()
        configuration_page.actions.clickEditServerBtn()
        configuration_page.actions.isVisibleServerNameLbl()
        configuration_page.actions.enterServerNameLbl("рыввыор№3873hshdshj")
        configuration_page.actions.clickEditServerNameBtnDisabled()
    })
    it('Edit server configuration with invalid data (empty name)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        configuration_page.actions.checkServerStatusStopped()
        configuration_page.actions.clickEditServerBtn()
        configuration_page.actions.isVisibleServerNameLbl()
        configuration_page.actions.enterServerNameLbl("                          ")
        configuration_page.actions.clickEditServerNameBtnDisabled()
    })
    it('Edit server configuration with invalid data (non-Latin characters)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        configuration_page.actions.checkServerStatusStopped()
        configuration_page.actions.clickEditServerBtn()
        configuration_page.actions.isVisibleServerNameLbl()
        configuration_page.actions.enterServerNameLbl("Редактировать конфигурацию сервера (не латиница)")
        configuration_page.actions.clickEditServerNameBtnDisabled()
    })
    it('Delete server with backups (warning and restriction should appear)', () => {
        // Buni ishlatmaslikni tavsiya qilinadi !!!!!!!!!!!!!
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_with_backup)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_with_backup)
        serverlist_page.actions.clickServerCard(configData.test_server_with_backup)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_with_backup)
        configuration_page.actions.deleteScheduledBackups()
        serverAction_page.actions.clickServerActionsBtn()
        configuration_page.actions.clickDeleteServerDangerBtn()
        configuration_page.actions.writeDeleteServerNameTxt(configData.test_server_with_backup)
        configuration_page.actions.clickVerifiedDeleteBtn()
        configuration_page.actions.isVisibleDeletedVMMessage("Сервер успешно удален")
    })
    it('Edit server configuration with invalid data (CPU - negative number)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        configuration_page.actions.checkServerStatusStopped()
        configuration_page.actions.clickEditServerBtn()
        configuration_page.actions.isVisibleCpuInp()
        configuration_page.actions.setCpu("-324242")
        configuration_page.actions.clickEditServerNameBtn2();
        configuration_page.actions.clickEditServerNameBtnDisabled()
    })
    it('Edit server configuration with invalid data (CPU - math symbol)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        configuration_page.actions.checkServerStatusStopped()
        configuration_page.actions.clickEditServerBtn()
        configuration_page.actions.isVisibleCpuInp()
        configuration_page.actions.setCpu("-+-+")
        configuration_page.actions.clickEditServerNameBtnDisabled()
    })
    // it('Edit server configuration with invalid data (CPU - exceeds limit)', () => {
    //     cy.login(configData.base_url, configData.login, configData.password)
    //     sidebar.actions.clickServersIcon()
    //     server_page.actions.checkServerPageLbl()
    //     configuration_page.actions.checkServerStatusStopped()
    //     configuration_page.actions.clickEditServerBtn()
    //     configuration_page.actions.isVisibleCpuInp()
    //     configuration_page.actions.setCpu("600")
    //     configuration_page.actions.isEditCPUIncreaseBtnDisabled()
    // })
    it('Edit server configuration with invalid data (RAM - negative number)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        configuration_page.actions.checkServerStatusStopped()
        configuration_page.actions.clickEditServerBtn()
        configuration_page.actions.isVisibleRamInp()
        configuration_page.actions.setRam("-4872")
        configuration_page.actions.clickEditServerNameBtnDisabled()
    })
    it('Edit server configuration with invalid data (RAM - math symbol)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        configuration_page.actions.checkServerStatusStopped()
        configuration_page.actions.clickEditServerBtn()
        configuration_page.actions.isVisibleRamInp()
        configuration_page.actions.setRam("-+-+")
        configuration_page.actions.clickEditServerNameBtnDisabled()

    })
    // it('Edit server configuration with invalid data (RAM - exceeds limit)', () => {
    //     cy.login(configData.base_url, configData.login, configData.password)
    //     sidebar.actions.clickServersIcon()
    //     server_page.actions.checkServerPageLbl()
    //     configuration_page.actions.checkServerStatusStopped()
    //     configuration_page.actions.clickEditServerBtn()
    //     configuration_page.actions.isVisibleRamInp()
    //     configuration_page.actions.setRam("600")
    //     configuration_page.actions.clickEditServerNameBtnDisabled()
    // })
})
// Test-Server remains Stopped after above tests