class PublicNetworks2 {
    elements = {
        public_networkNavigate: () => cy.get('[qa-element="tab-1"]'),
        clickAddNetworkBtn: () => cy.get('[qa-element="network-create-ip-add"]'),
        inValidValidationMessage: () => cy.contains('div', 'Недопустимые символы'),
        enterNetworkNameInp: () => cy.get('[qa-element="network-create-name"]'),
        clickAddBtn: () => cy.get('[qa-element="network-create-submit"]'),
        deleteNewNetworkBtn: () => cy.get('[qa-element="delete-nework-0-show"]'),
        confDeleteDiskBtn: () => cy.get('[qa-element="delete-nework-submit"]'),
        deleteBtnDisabled: () => cy.get('[qa-element="delete-nework-0-show"]'),
        clickServerListsLbl: () => cy.get('[qa-element="local-network-id-open"]'),
        clickModalTitleTxt1: () => cy.get('.modal-title')
        // qa-element="delete-nework-submit"

    }
    actions = {
        isVisibleNetworkTxt: () => {
            this.elements.public_networkNavigate().click()
        },
        clickModalTxtTitleFn: () => {
            this.elements.clickModalTitleTxt1().click()
        },
        clickAddNewNetworksBtn: () => {
            this.elements.clickAddNetworkBtn().click()
        },
        enterNetworkNameInpLbl: (text) => {
            this.elements.enterNetworkNameInp().clear().type(text)
        },
        clickAddNetworkModalBtn2: () => {
            this.elements.clickAddBtn().click()
        },
        publicIpSuccessAddedNew2: () => {
            cy.wait('@publicIpAddNew', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
            });
        },
        clickDeleteNewSuccessNetwork: () => {
            this.elements.deleteNewNetworkBtn().click({ multiple: true, force: true });
        },
        clickVerifyDeleteBtn: () => {
            this.elements.confDeleteDiskBtn().click();
        },
        isVisibleShowMessage: () => {
            this.elements.inValidValidationMessage().should('be.visible')
        },
        clickDeleteBtnDisabled: () => {
            this.elements.deleteBtnDisabled().should('be.disabled');
        },
        clickSelectServerListsFn: () => {
            this.elements.clickServerListsLbl().click()
        }
        
    }
}





module.exports = new PublicNetworks2()