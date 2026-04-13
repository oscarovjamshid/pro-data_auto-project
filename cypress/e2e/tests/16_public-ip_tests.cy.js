cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import sidebar from "../pages/sidebar";
import localNetworks_page from "../pages/local-networks_page";
import publicNetworks_page from "../pages/public-networks2_page";
import publicNetwork_page from "../pages/public-network_page";
import serverList_page from "../pages/server-list_page";
import serverAction_page from "../pages/server-action_page";

describe('16.Networks - Public IPs tab', () => {
    let configData;
    const publicIP = 'New-Public-IP';
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('GET', `${configData.base_url}panel-main/api/panel/vm/list`).as('serverStatusStopped3');
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/createPublicNet`).as('publicIpAddNew');
    })
    it('PD-172 Add Public IP', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        publicNetworks_page.actions.clickPublicIpTab()
        publicNetworks_page.actions.clickAddNewNetworksBtn()
        publicNetworks_page.actions.enterNetworkNameInpLbl(publicIP)
        publicNetworks_page.actions.clickAddNetworkModalBtn2()
        publicNetworks_page.actions.publicIpSuccessAddedNew2()
    })
    it('PD-185 Add Public IP with empty name', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        publicNetworks_page.actions.clickPublicIpTab()
        publicNetworks_page.actions.clickAddNewNetworksBtn()
        publicNetworks_page.actions.enterNetworkNameInpLbl("     ")
        publicNetworks_page.actions.clickAddNetworkModalBtn2()
        publicNetworks_page.actions.isVisibleShowMessage()
    })
    it('PD-186 Add Public IP with math symbols', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        publicNetworks_page.actions.clickPublicIpTab()
        publicNetworks_page.actions.clickAddNewNetworksBtn()
        publicNetworks_page.actions.enterNetworkNameInpLbl("--++++")
        publicNetworks_page.actions.clickAddNetworkModalBtn2()
        publicNetworks_page.actions.isVisibleShowMessage()
    })
    it('PD-187 Attach new Public IP to server', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        serverList_page.actions.searchServer(configData.test_server_name)
        serverList_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverList_page.actions.clickServerCard(configData.test_server_name)
        serverList_page.actions.isVisibleServerDetail(configData.test_server_name)
        publicNetwork_page.actions.clickPublicIpTab()
        localNetworks_page.actions.clickAddNetworkBtn()
        localNetworks_page.actions.isVisibleSelectListNetwork()
        localNetworks_page.actions.clickSelectListNetwork()
        publicNetwork_page.actions.isVisibleNetworkTxt(publicIP)
        publicNetwork_page.actions.clickSelectIpLbl(publicIP)
        localNetworks_page.actions.clickAddNetworkSuccessBtn()
        localNetworks_page.actions.isVisibleNetworkDetachBtn()
        sidebar.actions.clickNetworksIcon()
        publicNetworks_page.actions.clickPublicIpTab()
        publicNetwork_page.actions.isVisiblePublicIpConnect(configData.test_server_name)
    })
    it('PD-188 Not possible to delete used Public IP', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        publicNetworks_page.actions.clickPublicIpTab()
        publicNetworks_page.actions.clickDeleteBtnDisabled(publicIP)
    })
    it('PD-189 Delete Public IP', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        serverList_page.actions.searchServer(configData.test_server_name)
        serverList_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverList_page.actions.clickServerCard(configData.test_server_name)
        serverList_page.actions.isVisibleServerDetail(configData.test_server_name)
        publicNetwork_page.actions.clickPublicIpTab()
        localNetworks_page.actions.isVisibleNetworkDetachBtn()
        localNetworks_page.actions.clickDetachNetworkBtn()
        localNetworks_page.actions.clickConfirmCheckbox()
        localNetworks_page.actions.clickNetworkDeleteConfirmBtn()
        sidebar.actions.clickNetworksIcon()
        publicNetworks_page.actions.clickPublicIpTab()
        publicNetworks_page.actions.clickDeleteNewSuccessNetwork(publicIP)
        publicNetworks_page.actions.clickVerifyDeleteBtn()
        publicNetwork_page.actions.isNotVisiblePublicIpTxt(configData.test_server_name)
        // need to turn off server after above tests
        sidebar.actions.clickServersIcon()
        serverList_page.actions.searchServer(configData.test_server_name)
        serverList_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverList_page.actions.clickServerCard(configData.test_server_name)
        serverList_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickStopServerBtn()
        serverAction_page.actions.checkStatus(25, 'Остановлен')
    })
})
// Test-Server remains in Stopped status after above tests