class DnsServerAddresses {
    elements = {
        dnsServerAddressesTab: () => cy.get('[qa-element="undefined-2"]'),
        addDnsBtn: () => cy.get('[qa-element="dns-create-add"]'),
        closeBtnInModal: () => cy.get('.btn-close'), // qa-element is needed
        inValidValidationMessage: () => cy.get('[qa-element="create-dns-mask-error"]'),//invalid msg 
        dnsNameInputField: () => cy.get('[qa-element="dns-mask"]'),
        addBtnInAddModal: () => cy.get('[qa-element="dns-create-submit"]'),
        createdDnsServerAddressRow: (name) => cy.get('tbody').find('tr').contains(name),
        resourceVisibilityBtnOnDnsRowPerName: (name) => cy.get('tbody').find('tr').contains(name).parent().find('td').last().find('[qa-element="dns-change-show-0"]').first(),
        resourceNameTxt: (name) => cy.contains(name), 
        submitBtnInResourceVisibilityModal: () => cy.get('[qa-element="resource-change-submit"]'),
        projectDropdownListInResourceVisibilityModal: () => cy.get('[qa-element="project-toggle"]'),
        defaultProjectTxtDropdownListInResourceVisibilityModal: (name) => cy.get('[qa-element="project-0"]').contains(name),
        secondProjectTxtDropdownListInResourceVisibilityModal: (name) => cy.get('[qa-element="project-1"]').contains(name),
        deleteBtnOnDnsRowPerName: (name) => cy.contains('tr', name).find('[qa-element^="delete-dns-"]'),
        dnsRowPerName: (name) => cy.contains(name),
        deleteSubmitBtnInModal: () => cy.get('[qa-element="delete-dns-submit"]'),
    }
    actions = {
        isVisibleDnsServerAddressesTab: () => {
            this.elements.dnsServerAddressesTab().should('be.visible')
            this.elements.dnsServerAddressesTab().contains('Адреса DNS-серверов')
        },
        clickDnsServerAddressesTab: () => {
            this.elements.dnsServerAddressesTab().click()
        },
        clickAddNewDnsBtn: () => {
            this.elements.addDnsBtn().click()
        },
        clickCloseBtnInModal: () => {
            this.elements.closeBtnInModal().click()
        },
        enterDnsNameInputLbl: (text) => {
            this.elements.dnsNameInputField().clear().type(text)
        },
        checkInvalidDnsErrorLbl: (text) => {
            this.elements.inValidValidationMessage().should('be.visible')
            this.elements.inValidValidationMessage().contains(text)
        },
        clickAddBtnInAddModal: () => {
            this.elements.addBtnInAddModal().click()
        },
        isDisabledAddBtnInAddModal: () => {
            this.elements.addBtnInAddModal().should('be.disabled')
        },
        dnsServerAddressSuccessAddedNew: () => {
            cy.wait('@dnsServerAddressAddNew', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
            });
        },
        isVisibleAddDnsBtn: () => {
            this.elements.addDnsBtn().should('be.visible')
        },
        isVisibleCreatedDns: (name) => {
            this.elements.createdDnsServerAddressRow(name).should('be.visible')
        },
        clickResourceVisibilityBtn: (name) => {
            this.elements.resourceVisibilityBtnOnDnsRowPerName(name).click()
        },
        isVisibleNewDnsResourceNameInModal: (name) => {
            this.elements.resourceNameTxt(name)
        },
        clickProjectsDropdownList: () => {
            this.elements.projectDropdownListInResourceVisibilityModal().click()
        },
        checkDefaultProjectStateInList: (name) => {
            this.elements.defaultProjectTxtDropdownListInResourceVisibilityModal(name).should('be.disabled')
        },
        isVisibleAnotherProjectInList: (name) => {
            this.elements.secondProjectTxtDropdownListInResourceVisibilityModal(name).should('be.enabled')
        },
        clickAnotherProjectInList: (name) => {
            this.elements.secondProjectTxtDropdownListInResourceVisibilityModal(name).click()
        },
        clickSubmitBtnInResourceVisibilityModal: () => {
            this.elements.submitBtnInResourceVisibilityModal().click()
        },
        checkDropdownListHasBothDefaultAndNewProjects: (text) => {
            this.elements.projectDropdownListInResourceVisibilityModal().should('have.text', text)
        },
        clickDeleteBtn: (name) => {
            this.elements.deleteBtnOnDnsRowPerName(name).click()
        },
        clickDeleteSubmitBtnInModal: () => {
            this.elements.deleteSubmitBtnInModal().click()
        },
        isNotExistDeletedDns: (name) => {
            this.elements.dnsRowPerName(name).should('not.exist')
        }
    }
}
module.exports = new DnsServerAddresses()