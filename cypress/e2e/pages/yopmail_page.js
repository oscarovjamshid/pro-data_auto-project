class Yopmail {
    actions = {
        getTextFromLatestEmail(email) {
            const login = email.split('@')[0]
            cy.visit(`https://yopmail.com/?login=${login}`)
            return cy.origin('https://yopmail.com', () => {
                cy.get('iframe#ifmail', { timeout: 30000 })      // latest email is opened in #ifmail, inbox list is in #ifinbox
                    .its('0.contentDocument.body.innerText').should('not.be.empty')
            })
        },
    }
}
module.exports = new Yopmail()
