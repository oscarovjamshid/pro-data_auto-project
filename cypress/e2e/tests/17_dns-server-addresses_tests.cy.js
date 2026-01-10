cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import sidebar from "../pages/sidebar";
import dns_page from "../pages/dns-server-addresses_page";
import localNetworks2_page from "../pages/localNetworks2_page";

describe('17.Networks - Dns tab', () => {
    let configData;
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('GET', `${configData.base_url}panel-main/api/panel/getUserDns`).as('dnsServerAddressAddNew');
    })
    it('PD-459 Creating DNS with valid addess', () => { // Test Cases 459-467
        const testData = {
            dnsName: '111.111.111.111'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        dns_page.actions.clickDnsServerAddressesTab()
        dns_page.actions.isVisibleDnsServerAddressesTab()        
        dns_page.actions.clickAddNewDnsBtn()
        dns_page.actions.enterDnsNameInputLbl(testData.dnsName)
        dns_page.actions.clickAddBtnInAddModal()
        dns_page.actions.isVisibleCreatedDns(testData.dnsName) 
    })
    it('PD-460 Creating DNS with invalid IP address (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        dns_page.actions.clickDnsServerAddressesTab()
        dns_page.actions.isVisibleDnsServerAddressesTab()        
        dns_page.actions.clickAddNewDnsBtn()
        dns_page.actions.enterDnsNameInputLbl('300.30.30.30')
        dns_page.actions.clickAddBtnInAddModal()
        dns_page.actions.checkInvalidDnsErrorLbl('Некорректный DNS')
    })
    it('PD-461 Creating DNS with empty value (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        dns_page.actions.clickDnsServerAddressesTab()
        dns_page.actions.isVisibleDnsServerAddressesTab()        
        dns_page.actions.clickAddNewDnsBtn()
        dns_page.actions.clickAddBtnInAddModal()
        dns_page.actions.checkInvalidDnsErrorLbl('DNS не выбран')
    })
    it('PD-462 Creating DNS with existing adress (unsuccessful)', () => {
        const testData = {
            dnsName: '111.111.111.111'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        dns_page.actions.clickDnsServerAddressesTab()
        dns_page.actions.isVisibleDnsServerAddressesTab()        
        dns_page.actions.clickAddNewDnsBtn()
        dns_page.actions.enterDnsNameInputLbl(testData.dnsName) 
        dns_page.actions.clickAddBtnInAddModal()
        dns_page.actions.checkInvalidDnsErrorLbl('Указанный DNS уже существует')
    })
    it('PD-465 X icon while adding DNS', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        dns_page.actions.clickDnsServerAddressesTab()
        dns_page.actions.isVisibleDnsServerAddressesTab()        
        dns_page.actions.clickAddNewDnsBtn()
        dns_page.actions.clickCloseBtnInModal() 
        dns_page.actions.isVisibleAddDnsBtn()
    })
    it('PD-463 Resource visibility - attaching DNS to a single project', () => {
        const dnsName = '111.111.111.111';
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        dns_page.actions.clickDnsServerAddressesTab()
        dns_page.actions.isVisibleDnsServerAddressesTab()        
        dns_page.actions.clickResourceVisibilityBtn(dnsName)
        dns_page.actions.isVisibleNewDnsResourceNameInModal(dnsName) 
        dns_page.actions.clickProjectsDropdownList()
        dns_page.actions.clickAnotherProjectInList()
        dns_page.actions.clickSubmitBtnInResourceVisibilityModal()
        cy.wait(2000);
        dns_page.actions.clickResourceVisibilityBtn(dnsName)
        dns_page.actions.checkDropdownListHasBothDefaultAndNewProjects('Default project, Test-Project')
    })
    it('PD-464 Resource visibility - detaching project from DNS', () => {
        const dnsName = '111.111.111.111';
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        dns_page.actions.clickDnsServerAddressesTab()
        dns_page.actions.isVisibleDnsServerAddressesTab()        
        dns_page.actions.clickResourceVisibilityBtn(dnsName)
        dns_page.actions.isVisibleNewDnsResourceNameInModal(dnsName) 
        dns_page.actions.clickProjectsDropdownList()
        dns_page.actions.clickAnotherProjectInList()
        dns_page.actions.clickSubmitBtnInResourceVisibilityModal()
        dns_page.actions.clickResourceVisibilityBtn(dnsName)
        dns_page.actions.checkDropdownListHasBothDefaultAndNewProjects('Default project')
    })
    it('PD-466 X icon while assigning for Resource visibility', () => {
        const dnsName = '111.111.111.111';
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        dns_page.actions.clickDnsServerAddressesTab()
        dns_page.actions.isVisibleDnsServerAddressesTab()        
        dns_page.actions.clickResourceVisibilityBtn(dnsName)
        dns_page.actions.isVisibleNewDnsResourceNameInModal(dnsName) 
        dns_page.actions.clickCloseBtnInModal()
        dns_page.actions.isVisibleAddDnsBtn()
    }) 
    it('PD-467 Deleting DNS address', () => {
        const dnsName = '111.111.111.111';
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        dns_page.actions.clickDnsServerAddressesTab()
        dns_page.actions.isVisibleDnsServerAddressesTab()        
        dns_page.actions.clickDeleteBtn(dnsName)
        cy.wait(1000)
        dns_page.actions.isNotExistDeletedDns(dnsName) 
    })
})