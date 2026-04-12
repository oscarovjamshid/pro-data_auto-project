class PublicNetwork {
    elements = {
        networksTab: () => cy.get('[qa-element="tab-2"]'),
        public_networkTxt: () => cy.get('[qa-element="network-type-1"]'),
        public_networkNameTxt: (text) => cy.contains(text),
        public_networkName2Txt: (text) => cy.contains(text),
        public_ipTabInLocalNetworksPage: () => cy.get('[qa-element="undefined-1"]'),
        public_networkVisible: (text) => cy.contains(text),
    }
    actions = {
        isVisibleNetworkTxt: (text) => {
            this.elements.public_networkNameTxt(text).should("be.visible")
        },
        clickPublicIpTab: () => {   
            this.elements.networksTab().click()
            this.elements.public_networkTxt().click()
        },
        clickSelectIpLbl: (text) => {
            this.elements.public_networkNameTxt(text).click()
        },
        publicIpSuccessAdded: () => {
            cy.wait('@publicIpSuccessAdd', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
            });
        },
        publicIpInValidAdded: () => {
            cy.wait('@publicIpInValidAdd1', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
            });
        },
        clickPublicIpPageTxt: () => {
            this.elements.public_ipTabInLocalNetworksPage().click()
        },
        isVisiblePublicIpConnect: (text) => {
            this.elements.public_networkVisible(text).should("be.visible")
        },
        isNotVisiblePublicIpTxt: (text) => {
            this.elements.public_networkVisible(text).should('not.exist'); 
        },
        clickSelectIpTestingLbl: (text) => {
            this.elements.public_networkName2Txt(text).click()
        },
    }
}
module.exports = new PublicNetwork()