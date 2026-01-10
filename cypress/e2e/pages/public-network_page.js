class PublicNetwork {
    elements = {
        public_networkTxt: () => cy.get('[qa-element="tab-3"]'),
        public_networkNameTxt: () => cy.contains('NTesterUchun'),
        public_networkName2Txt: () => cy.contains('Nurillo'),
        public_ipPageTxt: () => cy.get('[qa-element="tab-1"]'),
        public_networkVisible: (text) => cy.contains(text),
    }
    actions = {
        isVisibleNetworkTxt: () => {
            this.elements.public_networkNameTxt().should("be.visible")
        },
        clickPuclickTxt: () => {
            this.elements.public_networkTxt().click()
        },
        clickSelectIpLbl: () => {
            this.elements.public_networkNameTxt().click()
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
            this.elements.public_ipPageTxt().click()
        },
        isVisiblePublicIpConnect: (text) => {
            this.elements.public_networkVisible(text).should("be.visible")
        },
        isNotVisiblePublicIpTxt: (text) => {
            this.elements.public_networkVisible(text).should('not.exist'); 
        },
        clickSelectIpTestingLbl: () => {
            this.elements.public_networkName2Txt().click()
        },
        
    }
}





module.exports = new PublicNetwork()