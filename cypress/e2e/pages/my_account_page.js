class MyAccount {
    elements = {
        myAccountTxt: () => cy.get('[qa-element="nav_link_account"]').contains('Моя учетная запись'),
        accountInfoLbl: (text) => cy.contains(text, { timeout: 30000 }),
        rootUserBlock: () => cy.get('.user-edit-page', { timeout: 30000 }),     // later change this to qa-element tag - root user info has no qa-element yet
        deactivateBtn: () => cy.get('a[href="/settings/account/deactivate"]'),     // later change this to qa-element tag
        deactivationContinueBtn: () => cy.get('[qa-element="send-deactivate-letter"]'),
        deactivationModal: () => cy.contains('На ваш email была отправлена ссылка для завершения процедуры', { timeout: 30000 }),
        deactivationModalOkBtn: () => cy.get('[qa-element="deactivate-success-modal-close"]'),
    }
    actions = {
        clickMyAccountTxt: () => {
            this.elements.myAccountTxt().click()
        },
        checkEmail: (email) => {
            this.elements.accountInfoLbl(email).should('be.visible')
        },
        checkRootFullName: (fullName) => {
            this.elements.rootUserBlock().should('be.visible').and('contain.text', fullName)
        },
        checkRootEmail: (email) => {
            this.elements.rootUserBlock().should('be.visible').and('contain.text', email)
        },
        checkRootPhone: (phone) => {
            this.elements.rootUserBlock().should(($block) => {
                expect($block.text().replace(/\D/g, '')).to.contain(phone)     // phone is shown with mask: +998 94 661 1634
            })
        },
        isNotVisibleRootPhone: (rootEmail, phone) => {
            this.elements.rootUserBlock().should('contain.text', rootEmail).invoke('text').then((text) => {
                expect(text.replace(/\D/g, '')).not.to.contain(phone)
            })
        },
        isVisibleDeactivateBtn: () => {
            this.elements.deactivateBtn().should('be.visible')
        },
        clickDeactivateBtn: () => {
            this.elements.deactivateBtn().click()
        },
        clickDeactivationContinueBtn: () => {
            this.elements.deactivationContinueBtn().click()
        },
        isVisibleDeactivationModal: () => {
            this.elements.deactivationModal().should('be.visible')
        },
        clickDeactivationModalOkBtn: () => {
            this.elements.deactivationModalOkBtn().click()
        },
        isNotVisibleDeactivateBtn: (email) => {
            this.elements.accountInfoLbl(email).should('be.visible')
            this.elements.deactivateBtn().should('not.exist')
        },
    }
}





module.exports = new MyAccount()
