cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import server_page from "../pages/server_page";
import sidebar from "../pages/sidebar";
import localNetworks_page from "../pages/local-networks_page";
import publicNetwork_page from "../pages/public-network_page";
import serverlist_page from "../pages/server-list_page";

describe('10.Servers - Public IPs tab', () => {
    const publicIP = 'NTesterUchun';
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
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/${configData.test_server_id}/linkPublicNet`).as('publicIpInValidAdd1');
    })
    it('PD-78 Add IP (Without reboot) - should appear as not free in the list of public networks', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        publicNetwork_page.actions.clickPublicIpTab()
        localNetworks_page.actions.clickAddNetworkBtn()
        localNetworks_page.actions.isVisibleSelectListNetwork()
        localNetworks_page.actions.clickSelectListNetwork()
        publicNetwork_page.actions.isVisibleNetworkTxt(publicIP)
        publicNetwork_page.actions.clickSelectIpLbl(publicIP)
        localNetworks_page.actions.clickAddNetworkSuccessBtn()
        localNetworks_page.actions.isVisibleNetworkDetachBtn()
        sidebar.actions.clickNetworksIcon()
        publicNetwork_page.actions.clickPublicIpPageTxt()
        publicNetwork_page.actions.isVisiblePublicIpConnect(configData.test_server_name)
        sidebar.actions.clickServersIcon()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        publicNetwork_page.actions.clickPublicIpTab()
        localNetworks_page.actions.isVisibleNetworkDetachBtn()
        localNetworks_page.actions.clickDetachNetworkBtn()
        localNetworks_page.actions.clickConfirmCheckbox()
        localNetworks_page.actions.clickNetworkDeleteConfirmBtn()
    })
    it('PD-77 Add IP (With reboot) - should appear as not free in the list of public networks', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        publicNetwork_page.actions.clickPublicIpTab()
        localNetworks_page.actions.clickAddNetworkBtn()
        localNetworks_page.actions.clickNetworkWithRebootBtn()
        localNetworks_page.actions.isVisibleSelectListNetwork()
        localNetworks_page.actions.clickSelectListNetwork()
        publicNetwork_page.actions.isVisibleNetworkTxt(publicIP)
        publicNetwork_page.actions.clickSelectIpLbl(publicIP)
        localNetworks_page.actions.clickAddNetworkSuccessBtn()
        localNetworks_page.actions.isVisibleNetworkDetachBtn()
        sidebar.actions.clickNetworksIcon()
        publicNetwork_page.actions.clickPublicIpPageTxt()
        publicNetwork_page.actions.isVisiblePublicIpConnect(configData.test_server_name)
        sidebar.actions.clickServersIcon()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        publicNetwork_page.actions.clickPublicIpTab()
        localNetworks_page.actions.isVisibleNetworkDetachBtn()
        localNetworks_page.actions.clickDetachNetworkBtn()
        localNetworks_page.actions.clickConfirmCheckbox()
        localNetworks_page.actions.clickNetworkDeleteConfirmBtn()
    })
    it('PD-80 Detach network (With reboot confirmation) - should appear as free in the list of public networks', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        publicNetwork_page.actions.clickPublicIpTab()
        localNetworks_page.actions.clickAddNetworkBtn()
        localNetworks_page.actions.clickNetworkWithRebootBtn()
        localNetworks_page.actions.isVisibleSelectListNetwork()
        localNetworks_page.actions.clickSelectListNetwork()
        publicNetwork_page.actions.isVisibleNetworkTxt(publicIP)
        publicNetwork_page.actions.clickSelectIpLbl(publicIP)
        localNetworks_page.actions.clickAddNetworkSuccessBtn()
        localNetworks_page.actions.isVisibleNetworkDetachBtn()
        localNetworks_page.actions.clickDetachNetworkBtn()
        localNetworks_page.actions.clickConfirmCheckbox()
        localNetworks_page.actions.clickNetworkDeleteConfirmBtn()
        sidebar.actions.clickNetworksIcon()
        publicNetwork_page.actions.clickPublicIpPageTxt()
        publicNetwork_page.actions.isNotVisiblePublicIpTxt(configData.test_server_name)
    })
})
//Test-Server remains in Running status after above tests