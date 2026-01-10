cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
const { faker } = require('@faker-js/faker');
import server_page from "../pages/server_page";
import sidebar from "../pages/sidebar";
import serverlist_page from "../pages/server-list_page";
import backup_page from "../pages/backup_page";
import localNetworks_page from "../pages/localNetworks_page";
import configuration_page from "../pages/configuration_page";
import serverAction_page from "../pages/server-action_page";

describe('13.Servers list Tests ', () => {
    let configData;
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('GET', `${configData.base_url}panel-main/api/panel/vm/list`).as('serverListRequest');
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/prepare`).as('createServerRequest');
    })
    it('Отображение список серверов', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        // server_page.actions.checkServerPageLbl()
        serverlist_page.actions.checkServerList()
    })
    it('Поиск серверов по называнию', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        // server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleTestServerTxt()
    })
    // it('Поиск серверов по IP адресс', () => {
    //     cy.login(configData.base_url, configData.login, configData.password)
    //     sidebar.actions.clickServersIcon()
    //     server_page.actions.checkServerPageLbl()
    //     serverlist_page.actions.searchServer("192.168.1.0")
    //     serverlist_page.actions.isVisibleSearchIpServer()
    // })
    it('Открыть детали сервера (с нажатием на сервер в списке)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        // server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
    })
    /*
    it('PD-107 Если в списке есть сервер, в статусе Восстановление бэкапа, то невозможно зайти в его детали', () => {
        const serverName = faker.lorem.word() + Math.round(Math.random() * 10000)
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        backup_page.actions.clickBackupTxt()
        cy.wait(2000)
        backup_page.actions.isVisibleCreateNewBackupBtn()
        backup_page.actions.clickCreateBackup()
        backup_page.actions.enterBackupNameInp("TesterNwL")
        backup_page.actions.clickVerifiedBackupCreateBtn()
        cy.wait(10000)
        backup_page.actions.isVisibleProgressBar()
        cy.wait(50000)
        cy.reload()
        backup_page.actions.isVisibleSuccessAddbackup()
        backup_page.actions.clickBackupRestoreBtn2()
        backup_page.actions.clickBackupRestoreConfirmBtn2()
        cy.wait(4000)
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        cy.wait(1000)
        serverlist_page.actions.isNotVisibleServerDetailLbl()
        cy.wait(50000)
        cy.reload()
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        backup_page.actions.clickBackupTxt()
        cy.wait(2000)
        backup_page.actions.isVisibleSuccessAddbackup()
        backup_page.actions.clickDeleteBackupBtn()
        backup_page.actions.clickDeleteBackupSuccessBtn1()
        cy.wait(2000)
        backup_page.actions.isNotVisibleBackupDeleteBtn()
    })
    it('Если в списке есть сервер, в статусе Новый, то невозможно зайти в его детали', () => {
        const serverName = faker.lorem.word() + Math.round(Math.random() * 10000)
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        server_page.actions.clickCreateServerBtn()
        server_page.actions.checkCreateServerPageLbl()
        server_page.actions.clickOsTxt()
        server_page.actions.isOpenedModal()
        server_page.actions.selectServerOs(1)
        server_page.actions.clickConfirmOsBtn()
        cy.wait(3000)
        server_page.actions.writeTitle(serverName)
        server_page.actions.writeDesc("Test Description about Server")
        server_page.actions.writeCpuTxt(2)
        server_page.actions.writeRamTxt(4)
        server_page.actions.clickDiskTypeSSDBtn()
        server_page.actions.typeDiskSize(10)
        server_page.actions.enablePublicIp()
        //server_page.actions.clickLoginTypeSSHBtn()
        server_page.actions.clickConfirmCreateServerBtn()
        server_page.actions.isOpenedModal()
        server_page.actions.clickCloseModalBtn()
        server_page.actions.checkCreateApi(serverName)
        server_page.actions.isVisibleCreatedServer(serverName)
        serverlist_page.actions.searchServer(serverName)
        serverlist_page.actions.isVisibleSearchTxtServer(serverName)
        serverlist_page.actions.clickServerCard(serverName)
        cy.wait(2000)
        serverlist_page.actions.isVisibleDisableTooltip()
        server_page.actions.checkElementTextPeriodically()
        serverlist_page.actions.clickServerCard(serverName)
        serverlist_page.actions.isVisibleServerDetail(serverName)
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
        configuration_page.actions.writeDeleteServerNameTxt(serverName)
        configuration_page.actions.clickVerifiedDeleteBtn()
        configuration_page.actions.isVisibleDeleteInValidMessage()
    })
     need to correct tests flow to the new implementation - need to stop VM and then assert other actions/expectations */ 
})