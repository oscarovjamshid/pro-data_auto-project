class AccessHistory {
    elements = {
       accessTxt: () => cy.get('[qa-element="sidemenu-nav-account-settings-sublink-account-access-keys"]'),
       createKeyBtn: () => cy.get('[qa-element="create-key-open"]'),
       keyAccessTxt: () => cy.get('[qa-element="generated-access-key"]'),
       btnClose: () => cy.get('[class="btn-close"]'),
       deleteAccessKey: () => cy.get('[qa-element="delete-key-show"]').first(),
       deleteAccessKeyVerified: () => cy.get('[qa-element="delete-key-submit"]'),
       

    }
    actions = {
        clickAccessTxt: () => {
            this.elements.accessTxt().click()
        },
        isVisibleCreateKeyBtn: () => {
            this.elements.createKeyBtn().should('be.visible')
        },
        clickCreateKeyBtn: () => {
            this.elements.createKeyBtn().click()
        },
        isVisibleKeyAccessTxt: () => {
            this.elements.keyAccessTxt().should('be.visible')
        },
        successAddedKeyAccount: () => {
            cy.wait('@successCreateAccess', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
            });
        },
        clickCloseModalBtn1: () => {
            this.elements.btnClose().click()
        },
        clickDeleteAccessKey: () => {
            this.elements.deleteAccessKey().click()
        },
        clickDeleteAccessKeyVerified: () => {
            this.elements.deleteAccessKeyVerified().click()
        },
    }
}





module.exports = new AccessHistory()