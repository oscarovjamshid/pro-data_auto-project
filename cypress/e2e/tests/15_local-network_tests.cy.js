cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import sidebar from "../pages/sidebar";
import localNetworks_page from "../pages/local-networks_page";
import publicNetworks_page from "../pages/public-networks2_page";
import localNetworks2_page from "../pages/local-networks2_page";
import server_page from "../pages/server_page";
import serverlist_page from "../pages/server-list_page";
import serverAction_page from "../pages/server-action_page";

describe('15.Networks - Local Network tab ', () => {
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
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/createLocalNet`).as('localIpAddNew');
        cy.intercept('GET', `${configData.base_url}panel-main/api/panel/netList`).as('localSuccessProjects');
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/${configData.test_server_id}/unlinkNet`).as('networkSuccessDelete');
    })
    it('PD-172 Create local network', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        localNetworks2_page.actions.clickAddNewLocalNetworksBtn()
        localNetworks2_page.actions.isVisibleLocalNetworkInp()
        localNetworks2_page.actions.enterLocalNetworkNameFn('TestUchunLocal')
        localNetworks2_page.actions.enterLocalAddressData('192.168.2.0')
        localNetworks2_page.actions.enterLocalNetworkShlyuz('192.168.2.1')
        publicNetworks_page.actions.clickAddNetworkModalBtn2()
        localNetworks2_page.actions.LocalIpSuccessAddedNew2()
    })
    it('PD-173 Create local network (with existing name)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        localNetworks2_page.actions.clickAddNewLocalNetworksBtn()
        localNetworks2_page.actions.isVisibleLocalNetworkInp()
        localNetworks2_page.actions.enterLocalNetworkNameFn('TestUchunLocal')
        localNetworks2_page.actions.enterLocalAddressData('192.168.2.0')
        localNetworks2_page.actions.enterLocalNetworkShlyuz('192.168.2.1')
        publicNetworks_page.actions.clickAddNetworkModalBtn2()
        localNetworks2_page.actions.LocalIpErrorAddedNew2()
    })
    it('PD-174 Create local network (with invalid network address)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        localNetworks2_page.actions.clickAddNewLocalNetworksBtn()
        localNetworks2_page.actions.isVisibleLocalNetworkInp()
        localNetworks2_page.actions.enterLocalNetworkNameFn('ErrorTestName')
        localNetworks2_page.actions.enterLocalAddressData('192.160.100.0')
        localNetworks2_page.actions.enterLocalNetworkShlyuz('192.160.100.1')
        publicNetworks_page.actions.clickAddNetworkModalBtn2()
        localNetworks2_page.actions.LocalIpErrorAddedNew3()

    })
    // it('PD-176 Assign visibility of local network to another project', () => {   this test is not actual anymore since visibility icon was removed from UI
    //     cy.login(configData.base_url, configData.login, configData.password)
    //     sidebar.actions.clickServersIcon()
    //     sidebar.actions.clickNetworksIcon()
    //     localNetworks2_page.actions.clickLocalVisibleIconFn()
    //     localNetworks2_page.actions.clickProjectsSelectListFn()
    //     localNetworks2_page.actions.clickLocalModalVerifyBtn()
    //     localNetworks2_page.actions.LocalSuccessProjectsLists()
    // })
    it('PD-177 Connect and check local network on server', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        localNetworks_page.actions.clickLocalNetworkTxt()
        localNetworks_page.actions.clickAddNetworkBtn()
        localNetworks2_page.actions.clickListServerLocalFn()
        localNetworks_page.actions.isVisibleNetworkIp('TestUchunLocal')
        localNetworks_page.actions.clickNetworkIpBtn('TestUchunLocal')
        localNetworks_page.actions.clickAddNetworkSuccessBtn()
        sidebar.actions.clickNetworksIcon()
        localNetworks2_page.actions.isVisibleServerNameLocalPg(configData.test_server_name)
    })
    it('PD-178 Detach local network from server', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        localNetworks2_page.actions.isVisibleServerNameLocalPg(configData.test_server_name)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        localNetworks_page.actions.clickLocalNetworkTxt()
        localNetworks_page.actions.isVisibleNetworkDetachBtn()
        localNetworks_page.actions.clickDetachNetworkBtn()
        localNetworks_page.actions.clickConfirmCheckbox()
        localNetworks_page.actions.clickNetworkDeleteConfirmBtn()
        localNetworks_page.actions.isNotVisibleNetworkEditeBtn()
    })
    it('PD-247 Delete local network which is not connected to server', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        localNetworks2_page.actions.clickLocalDeleteIpFn('TestUchunLocal')
        localNetworks2_page.actions.clickNetworkDeleteConfirmBtn()
        localNetworks2_page.actions.isNotVisibleServerNameLocal('TestUchunLocal')
        // need to turn off server after above tests
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickStopServerBtn()
        serverAction_page.actions.checkStatus(25, 'Остановлен')
    })
})
// Test-Server remains in Stopped status after above tests