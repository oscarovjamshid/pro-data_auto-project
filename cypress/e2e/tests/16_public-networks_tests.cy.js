cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import sidebar from "../pages/sidebar";
import localNetworks_page from "../pages/localNetworks_page";
import publicNetwork_page from "../pages/public-network_page";
import publicNetworks_page from "../pages/publicNetworks_page";

describe('16.Networks - Public IPs tab', () => {
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
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/createPublicNet`).as('publicIpAddNew');
    })
    it('PD-172 Создать сети (Локальные сети)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        publicNetworks_page.actions.isVisibleNetworkTxt()
        publicNetworks_page.actions.clickAddNewNetworksBtn()
        publicNetworks_page.actions.enterNetworkNameInpLbl("NTesterUchun")
        publicNetworks_page.actions.clickAddNetworkModalBtn2()
        publicNetworks_page.actions.publicIpSuccessAddedNew2()
    })
    it('PD-185 Создать сети с пустым названием (Публичные IP)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        publicNetworks_page.actions.isVisibleNetworkTxt()
        publicNetworks_page.actions.clickAddNewNetworksBtn()
        publicNetworks_page.actions.enterNetworkNameInpLbl("     ")
        publicNetworks_page.actions.clickAddNetworkModalBtn2()
        publicNetworks_page.actions.isVisibleShowMessage()

    })
    it('PD-186 Создать сети с математический символ (Публичные IP)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        publicNetworks_page.actions.isVisibleNetworkTxt()
        publicNetworks_page.actions.clickAddNewNetworksBtn()
        publicNetworks_page.actions.enterNetworkNameInpLbl("--++++")
        publicNetworks_page.actions.clickAddNetworkModalBtn2()
        publicNetworks_page.actions.isVisibleShowMessage()

    })
    it('PD-187 Подключение и проверка Публичные IP на сервере', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        localNetworks_page.actions.checkServerStatusStopped3()
        publicNetwork_page.actions.clickPuclickTxt()
        cy.wait(2000)
        localNetworks_page.actions.clickAddNetworkBtn()
        localNetworks_page.actions.clickNetworkWithoutRebootBtn()
        publicNetworks_page.actions.clickSelectServerListsFn()
        publicNetwork_page.actions.isVisibleNetworkTxt()
        publicNetwork_page.actions.clickSelectIpLbl()
        localNetworks_page.actions.clickAddNetworkSuccessBtn()
        cy.wait(4000)
        localNetworks_page.actions.isVisibleNetworkDeleteBtn()
        sidebar.actions.clickNetworksIcon()
        publicNetwork_page.actions.clickPublicIpPageTxt()
        publicNetwork_page.actions.isVisiblePublicIpConnect(configData.test_server_name)
    })
    it('PD-188 Должна быть невозможность удаления используемого IP-адреса', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        publicNetworks_page.actions.isVisibleNetworkTxt()
        cy.wait(2000)
        publicNetworks_page.actions.clickDeleteBtnDisabled()
    })
    it('PD-189 Удалить сеть (Публичные IP)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        localNetworks_page.actions.checkServerStatusStopped3()
        publicNetwork_page.actions.clickPuclickTxt()
        cy.wait(2000)
        localNetworks_page.actions.isVisibleNetworkDeleteBtn()
        cy.wait(2000)
        localNetworks_page.actions.clickDeleteNetworkBtn()
        localNetworks_page.actions.clickConfirmCheckbox()
        localNetworks_page.actions.clickNetworkDeleteConfirmBtn()
        cy.wait(3000)
        sidebar.actions.clickNetworksIcon()
        publicNetworks_page.actions.isVisibleNetworkTxt()
        cy.wait(2000)
        publicNetworks_page.actions.clickDeleteNewSuccessNetwork()
        publicNetworks_page.actions.clickVerifyDeleteBtn()
        cy.wait(1000)
    })
})