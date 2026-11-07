class Yopmail {
    actions = {
        getTextFromLatestEmail(email) {
            cy.visit('https://yopmail.com/')
            return cy.origin('https://yopmail.com', { args: { email } }, ({ email }) => {
                cy.get('#login').clear().type(`${email}{enter}`)
                cy.get('iframe#ifmail', { timeout: 30000 })      // inbox page shows the latest email inside #ifmail iframe
                    .its('0.contentDocument.body.innerText').should('not.be.empty')
            })
        },
    }
}
module.exports = new Yopmail()
