cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import sidebar from "../pages/sidebar";
import localNetworks_page from "../pages/local-networks_page";
import publicNetworks_page from "../pages/public-networks2_page";
import serverList_page from "../pages/server-list_page";

describe('16.Networks - Public IPs tab', () => {
    let configData;
    const publicIP = 'Test_Public_Ip';
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
        publicNetworks_page.actions.isVisibleNetworkTxt()
        publicNetworks_page.actions.clickAddNewNetworksBtn()
        publicNetworks_page.actions.enterNetworkNameInpLbl(publicIP)
        publicNetworks_page.actions.clickAddNetworkModalBtn2()
        publicNetworks_page.actions.publicIpSuccessAddedNew2()
    })
    it('PD-185 Add Public IP with empty name', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        publicNetworks_page.actions.isVisibleNetworkTxt()
        publicNetworks_page.actions.clickAddNewNetworksBtn()
        publicNetworks_page.actions.enterNetworkNameInpLbl("     ")
        publicNetworks_page.actions.clickAddNetworkModalBtn2()
        publicNetworks_page.actions.isVisibleShowMessage()
    })
    it('PD-186 Add Public IP with math symbols', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        publicNetworks_page.actions.isVisibleNetworkTxt()
        publicNetworks_page.actions.clickAddNewNetworksBtn()
        publicNetworks_page.actions.enterNetworkNameInpLbl("--++++")
        publicNetworks_page.actions.clickAddNetworkModalBtn2()
        publicNetworks_page.actions.isVisibleShowMessage()
    })
    it('PD-187 Attach Public IP to server', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        serverList_page.actions.searchServer(configData.test_server_name)
        serverList_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverList_page.actions.clickServerCard(configData.test_server_name)
        serverList_page.actions.isVisibleServerDetail(configData.test_server_name)
        publicNetworks_page.actions.clickPublicIpPageTxt()
        localNetworks_page.actions.clickAddNetworkBtn()
        localNetworks_page.actions.clickNetworkWithRebootBtn()
        publicNetworks_page.actions.clickSelectServerListsFn()
        publicNetworks_page.actions.isVisibleNetworkTxt()
        publicNetworks_page.actions.clickSelectIpLbl()
        localNetworks_page.actions.clickAddNetworkSuccessBtn()
        localNetworks_page.actions.isVisibleNetworkDetachBtn()
        sidebar.actions.clickNetworksIcon()
        publicNetworks_page.actions.clickPublicIpPageTxt()
        publicNetworks_page.actions.isVisiblePublicIpConnect(configData.test_server_name)
    })
    it('PD-188 Not possible to delete used Public IP', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        publicNetworks_page.actions.isVisibleNetworkTxt()
        publicNetworks_page.actions.clickDeleteBtnDisabled()
    })
    it('PD-189 Delete Public IP', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        localNetworks_page.actions.checkServerStatusStopped3()
        publicNetworks_page.actions.clickPublicIpPageTxt()
        localNetworks_page.actions.isVisibleNetworkDetachBtn()
        localNetworks_page.actions.clickDetachNetworkBtn()
        localNetworks_page.actions.clickConfirmCheckbox()
        localNetworks_page.actions.clickNetworkDeleteConfirmBtn()
        sidebar.actions.clickNetworksIcon()
        publicNetworks_page.actions.isVisibleNetworkTxt()
        publicNetworks_page.actions.clickDeleteNewSuccessNetwork()
        publicNetworks_page.actions.clickVerifyDeleteBtn()
    })
})