cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import server_page from "../pages/server_page";
import sidebar from "../pages/sidebar";
import serverlist_page from "../pages/server-list_page";
import serverAction_page from "../pages/server-action_page"

describe('5.Servers - Actions', () => {
    let configData;
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
    })
    it('[PD-96] Start', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickStartServerBtn()
        serverAction_page.actions.checkStatus(25, 'В работе')
    })
    it('[PD-97] Reboot', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickServerRestartBtn()
        serverAction_page.actions.isRestartingServer()
        serverAction_page.actions.checkStatus(25, 'В работе')
    })
    it('[PD-98] Pause', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickServerPauseBtn()
        serverAction_page.actions.checkStatus(25, 'На паузе')
    })
    it('[PD-100] Resume', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickServerResumeBtn()
        serverAction_page.actions.checkStatus(25, 'В работе')
    })
    it('[PD-99] Hibernate', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickServerHibernationBtn()
        serverAction_page.actions.checkStatus(25, 'В гибернации')
        //* Test ends here, below code is to return server to running status
        serverAction_page.actions.clickServerResumeBtn()
        serverAction_page.actions.checkStatus(8, 'В работе')
    })
    it('[PD-101] Shutdown', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickServerTurnOffBtn()
        serverAction_page.actions.isTurningOffServer()

        serverAction_page.actions.checkStatus(40, 'Остановлен')
    })
    it('[PD-102] Stop', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickStartServerBtn()
        serverAction_page.actions.checkStatus(25, 'В работе')
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickStopServerBtn()
        serverAction_page.actions.checkStatus(25, 'Остановлен')
    })
})
// Test-Server remains Stopped after above tests