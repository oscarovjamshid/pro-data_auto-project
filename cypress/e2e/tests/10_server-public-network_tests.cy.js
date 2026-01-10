cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import server_page from "../pages/server_page";
import sidebar from "../pages/sidebar";
import localNetworks_page from "../pages/localNetworks_page";
import publicNetwork_page from "../pages/public-network_page";

describe('10.Servers - Public IPs tab', () => {
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
    it('PD-77 Добавить сеть (С перезагрузкой сервера). должен появиться НЕ свободным в списке публичных сетей', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        localNetworks_page.actions.checkServerStatusStopped3()
        publicNetwork_page.actions.clickPuclickTxt()
        cy.wait(2000)
        localNetworks_page.actions.clickAddNetworkBtn()
        localNetworks_page.actions.isVisibleSelectListNetwork()
        localNetworks_page.actions.clickSelectListNetwork()
        publicNetwork_page.actions.isVisibleNetworkTxt()
        publicNetwork_page.actions.clickSelectIpLbl()
        localNetworks_page.actions.clickAddNetworkSuccessBtn()
        //publicNetwork_page.actions.publicIpSuccessAdded()
        localNetworks_page.actions.isVisibleNetworkDeleteBtn()
        sidebar.actions.clickNetworksIcon()
        publicNetwork_page.actions.clickPublicIpPageTxt()
        publicNetwork_page.actions.isVisiblePublicIpConnect(configData.test_server_name)
        sidebar.actions.clickServersIcon()
        localNetworks_page.actions.checkServerStatusStopped3()
        publicNetwork_page.actions.clickPuclickTxt()
        localNetworks_page.actions.isVisibleNetworkDeleteBtn()
        cy.wait(1000)
        localNetworks_page.actions.clickDeleteNetworkBtn()
        localNetworks_page.actions.clickConfirmCheckbox()
        localNetworks_page.actions.clickNetworkDeleteConfirmBtn()
        //localNetworks_page.actions.networkSuccessDeleted()
        cy.wait(3000)

    })
    it('PD-78 Добавить сеть (Без перезагрузки сервера)  должен появиться НЕ свободным в списке публичных сетей', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        // server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        publicNetwork_page.actions.clickPuclickTxt()
        cy.wait(2000)
        localNetworks_page.actions.clickAddNetworkBtn()
        localNetworks_page.actions.clickNetworkWithoutRebootBtn()
        localNetworks_page.actions.isVisibleSelectListNetwork()
        localNetworks_page.actions.clickSelectListNetwork()
        publicNetwork_page.actions.isVisibleNetworkTxt()
        publicNetwork_page.actions.clickSelectIpLbl()
        localNetworks_page.actions.clickAddNetworkSuccessBtn()
        //publicNetwork_page.actions.publicIpSuccessAdded()
        localNetworks_page.actions.isVisibleNetworkDeleteBtn()
        sidebar.actions.clickNetworksIcon()
        publicNetwork_page.actions.clickPublicIpPageTxt()
        publicNetwork_page.actions.isVisiblePublicIpConnect(configData.test_server_name)
        sidebar.actions.clickServersIcon()
        // server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        publicNetwork_page.actions.clickPuclickTxt()
        localNetworks_page.actions.isVisibleNetworkDeleteBtn()
        cy.wait(1000)
        localNetworks_page.actions.clickDeleteNetworkBtn()
        localNetworks_page.actions.clickConfirmCheckbox()
        localNetworks_page.actions.clickNetworkDeleteConfirmBtn()
        //localNetworks_page.actions.networkSuccessDeleted()
        cy.wait(3000)

    })
    it('PD-80 Отвязать сеть (С подтверждаю перезагрузку). должен появиться свободным в списке публичных сетей', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        localNetworks_page.actions.checkServerStatusStopped3()
        publicNetwork_page.actions.clickPuclickTxt()
        cy.wait(2000)
        localNetworks_page.actions.clickAddNetworkBtn()
        localNetworks_page.actions.clickNetworkWithoutRebootBtn()
        localNetworks_page.actions.isVisibleSelectListNetwork()
        localNetworks_page.actions.clickSelectListNetwork()
        publicNetwork_page.actions.isVisibleNetworkTxt()
        publicNetwork_page.actions.clickSelectIpLbl()
        localNetworks_page.actions.clickAddNetworkSuccessBtn()
        //publicNetwork_page.actions.publicIpSuccessAdded()
        localNetworks_page.actions.isVisibleNetworkDeleteBtn()
        localNetworks_page.actions.clickDeleteNetworkBtn()
        localNetworks_page.actions.clickConfirmCheckbox()
        localNetworks_page.actions.clickNetworkDeleteConfirmBtn()
        cy.wait(3000)
        //localNetworks_page.actions.networkSuccessDeleted()
        sidebar.actions.clickNetworksIcon()
        publicNetwork_page.actions.clickPublicIpPageTxt()
        publicNetwork_page.actions.isNotVisiblePublicIpTxt(configData.test_server_name)
        cy.wait(3000)

    })
})