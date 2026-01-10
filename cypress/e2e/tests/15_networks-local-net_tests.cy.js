cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import sidebar from "../pages/sidebar";
import localNetworks_page from "../pages/localNetworks_page";
import publicNetwork_page from "../pages/public-network_page";
import publicNetworks_page from "../pages/publicNetworks_page";
import localNetworks2_page from "../pages/localNetworks2_page";
import server_page from "../pages/server_page";

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
    it('PD-172 Создать сети (Локальные сети)', () => {
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
    it('PD-173 Создать сети с одинаковые названия (Локальные сети)', () => {
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
    it('PD-174 Создать сети с Неверный сетевой адрес (Локальные сети)', () => {
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
    it('PD-176 Назначить видимость локальной сети для другого проекта', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        localNetworks2_page.actions.clickLocalVisibleIconFn()
        localNetworks2_page.actions.clickProjectsSelectListFn()
        localNetworks2_page.actions.clickLocalModalVerifyBtn()
        localNetworks2_page.actions.LocalSuccessProjectsLists()

    })
    it('PD-177 Подключение и проверка локальной сети на сервере', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        localNetworks_page.actions.clickLocalNetworkTxt()
        localNetworks_page.actions.clickAddNetworkBtn()
        localNetworks2_page.actions.clickListServerLocalFn()
        localNetworks_page.actions.isVisibleNetworkIp('TestUchunLocal')
        localNetworks_page.actions.clickNetworkIpBtn('TestUchunLocal')
        cy.wait(2000)
        localNetworks_page.actions.clickAddNetworkSuccessBtn()
        cy.wait(1000)
        sidebar.actions.clickNetworksIcon()
        localNetworks2_page.actions.isVisibleServerNameLocalPg('Test-Server')

    })
    it('PD-178 Удалить сеть привязанную к серверу (Локальные сети)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        localNetworks2_page.actions.isVisibleServerNameLocalPg('Test-Server')
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        localNetworks_page.actions.clickLocalNetworkTxt()
        localNetworks_page.actions.isVisibleNetworkDeleteBtn()
        cy.wait(3000)
        localNetworks_page.actions.clickDeleteNetworkBtn()
        localNetworks_page.actions.clickConfirmCheckbox()
        localNetworks_page.actions.clickNetworkDeleteConfirmBtn()
        cy.wait(3000)
        cy.reload()
        localNetworks_page.actions.isNotVisibleNetworkEditeBtn()

    })
    it('PD-247 Удалить сеть не привязанную к серверу (Локальные сети)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        localNetworks2_page.actions.clickLocalDeleteIpFn()
        localNetworks2_page.actions.clickNetworkDeleteConfirmBtn()
        localNetworks2_page.actions.isNotVisibleServerNameLocal('TestUchunLocal')

    })
})