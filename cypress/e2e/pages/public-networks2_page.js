class PublicNetworks2 {
    elements = {
        public_ip_tab: () => cy.get('[qa-element="undefined-1"]'),
        clickAddNetworkBtn: () => cy.get('[qa-element="network-create-ip-add"]'),
        inValidValidationMessage: () => cy.contains('div', 'Недопустимые символы'),
        enterNetworkNameInp: () => cy.get('[qa-element="network-create-name"]'),
        clickAddBtn: () => cy.get('[qa-element="network-create-submit"]'),
        confDeleteDiskBtn: () => cy.get('[qa-element="delete-nework-submit"]'),
        deleteBtn: (name) => cy.contains('tr', name).find('[qa-element^="delete-nework-"]'),
        clickServerListsLbl: () => cy.get('[qa-element="local-network-id-open"]'),
        clickModalTitleTxt1: () => cy.get('.modal-title')
    }
    actions = {
        clickPublicIpTab: () => {
            this.elements.public_ip_tab().click()
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
        clickDeleteNewSuccessNetwork: (text) => {
            this.elements.deleteBtn(text).click({ multiple: true, force: true });
        },
        clickVerifyDeleteBtn: () => {
            this.elements.confDeleteDiskBtn().click();
        },
        isVisibleShowMessage: () => {
            this.elements.inValidValidationMessage().should('be.visible')
        },
        clickDeleteBtnDisabled: (text) => {
            this.elements.deleteBtn(text).should('be.disabled');
        },
        clickSelectServerListsFn: () => {
            this.elements.clickServerListsLbl().click()
        }
    }
}
module.exports = new PublicNetworks2()