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
    it('Удалить сервер с публичным IP. (должна появиться галка об отключении IP)', () => {
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
        configuration_page.actions.isVisibleDeleteInValidMessage()
    })
    it('[PD-126] Удалить сервер с пользовательким образом', () => {
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
        configuration_page.actions.isVisibleDeleteInValidMessage()
    })
    it('Редактировать конфигурацию сервера ( слова с пробелами )', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        configuration_page.actions.checkServerStatusStopped()
        configuration_page.actions.isVisibleDangerBtn()
        configuration_page.actions.clickEditServerBtn()
        configuration_page.actions.isVisibleServerNameLbl()
        configuration_page.actions.enterServerNameLbl("рыввыор№3873hshdshj")
        configuration_page.actions.clickEditServerNameBtn2()
        configuration_page.actions.isVisibleInvalidNameTxt()

    })
    it('Редактировать конфигурацию сервера ( пустое называние )', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        configuration_page.actions.checkServerStatusStopped()
        configuration_page.actions.isVisibleDangerBtn()
        configuration_page.actions.clickEditServerBtn()
        configuration_page.actions.isVisibleServerNameLbl()
        configuration_page.actions.enterServerNameLbl("                          ")
        configuration_page.actions.clickEditServerNameBtn2()
        configuration_page.actions.isVisibleInvalidNameTxt()

    })
    it('Редактировать конфигурацию сервера (не латиница)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        configuration_page.actions.checkServerStatusStopped()
        configuration_page.actions.isVisibleDangerBtn()
        configuration_page.actions.clickEditServerBtn()
        configuration_page.actions.isVisibleServerNameLbl()
        configuration_page.actions.enterServerNameLbl("Редактировать конфигурацию сервера (не латиница)")
        configuration_page.actions.clickEditServerNameBtn2()
        configuration_page.actions.isVisibleInvalidNameTxt()

    })
    it('Удалить сервер, имеющим бекапы. (должен появиться запрет и предупреждение)', () => {
        // Buni ishlatmaslikni tavsiya qilinadi !!!!!!!!!!!!!
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_with_backup)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_with_backup)
        serverlist_page.actions.clickServerCard(configData.test_server_with_backup)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_with_backup)
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickStopServerBtn()
        try {
            serverAction_page.actions.isServerStoppedStatus()
        } catch {
            cy.wait(30000)
            serverAction_page.actions.isServerStoppedStatus()
        }
        configuration_page.actions.deleteScheduledBackups()
        configuration_page.actions.isVisibleDangerBtn()
        configuration_page.actions.clickDeleteServerDangerBtn()
        configuration_page.actions.writeDeleteServerNameTxt(configData.test_server_with_backup)
        configuration_page.actions.clickVerifiedDeleteBtn()
        configuration_page.actions.isVisibleDeleteInValidMessage()
    })
    it('Редактировать конфигурацию сервера (CPU - негативное число )', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        configuration_page.actions.checkServerStatusStopped()
        configuration_page.actions.clickEditServerBtn()
        configuration_page.actions.isVisibleCpuInp()
        configuration_page.actions.enterNegativeNumberCpu("324242")
        configuration_page.actions.enterNegativeNumberCpu("-324242")
        configuration_page.actions.clickEditServerNameBtn2();
        configuration_page.actions.isVisibleShowInValidMessageCpu()
    })
    it('Редактировать конфигурацию сервера ( CPU - математическый символ )', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        configuration_page.actions.checkServerStatusStopped()
        configuration_page.actions.clickEditServerBtn()
        configuration_page.actions.isVisibleCpuInp()
        configuration_page.actions.enterNegativeNumberCpu("-+-+")
        configuration_page.actions.clickEditServerNameBtnDisable()
    })
    it('Редактировать конфигурацию сервера ( CPU - превышает лимит )', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        configuration_page.actions.checkServerStatusStopped()
        configuration_page.actions.clickEditServerBtn()
        configuration_page.actions.isVisibleCpuInp()
        configuration_page.actions.enterNegativeNumberCpu("478294729472")
        configuration_page.actions.clickEditServerNameBtn2();
        configuration_page.actions.isVisibleShowInValidMessageCpu()
    })
    it('Редактировать конфигурацию сервера ( RAM - негативное число )', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        configuration_page.actions.checkServerStatusStopped()
        configuration_page.actions.clickEditServerBtn()
        configuration_page.actions.isVisibleRamInp()
        configuration_page.actions.enterNegativeNumberRam("-4872")
        configuration_page.actions.enterNegativeNumberCpu("478294729472")
        configuration_page.actions.clickEditServerNameBtn2();
        configuration_page.actions.isVisibleShowInValidMessageCpu()
    })
    it('Редактировать конфигурацию сервера ( RAM - математическый символ )', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        configuration_page.actions.checkServerStatusStopped()
        configuration_page.actions.clickEditServerBtn()
        configuration_page.actions.isVisibleRamInp()
        configuration_page.actions.enterNegativeNumberRam("-+-+")
        configuration_page.actions.clickEditServerNameBtnDisable()

    })
    it('Редактировать конфигурацию сервера ( RAM - превышает лимит )', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        configuration_page.actions.checkServerStatusStopped()
        configuration_page.actions.clickEditServerBtn()
        configuration_page.actions.isVisibleRamInp()
        configuration_page.actions.enterNegativeNumberRam("74784389539")
        configuration_page.actions.clickEditServerNameBtn2();
        configuration_page.actions.isVisibleShowInValidMessageCpu()
    })
})