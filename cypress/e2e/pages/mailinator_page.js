class Mailinator {
    actions = {
        getLinkFromLatestEmail(email, linkText) {
            cy.visit('https://www.mailinator.com/')
            return cy.origin('https://www.mailinator.com', { args: { email, linkText } }, ({ email, linkText }) => {
                cy.get('#search').clear().type(`${email}{enter}`)
                cy.get('.table-striped tbody tr:first-child')
                    .contains('noreply@pro-data.tech', { timeout: 30000 }).click()
                cy.get('iframe[id$="msg_body"]', { timeout: 15000 })     // html emails - #html_msg_body, plain text emails - #texthtml_msg_body
                    .should(($frames) => expect([...$frames].some((frame) => frame.contentDocument.body.innerHTML.trim())).to.be.true)
                    .then(($frames) => [...$frames].find((frame) => frame.contentDocument.body.innerHTML.trim()).contentDocument.body)
                    .then(cy.wrap)
                    .find(linkText ? `a:contains("${linkText}")` : 'a')
                    .first()
                    .invoke('attr', 'href')
            })
        },
        getTextFromLatestEmail(email) {
            cy.visit('https://www.mailinator.com/')
            return cy.origin('https://www.mailinator.com', { args: { email } }, ({ email }) => {
                cy.get('#search').clear().type(`${email}{enter}`)
                cy.get('.table-striped tbody tr:first-child')
                    .contains('noreply@pro-data.tech', { timeout: 30000 }).click()
                cy.get('iframe[id$="msg_body"]', { timeout: 15000 })     // html emails - #html_msg_body, plain text emails - #texthtml_msg_body
                    .should(($frames) => expect([...$frames].some((frame) => frame.contentDocument.body.innerHTML.trim())).to.be.true)
                    .then(($frames) => [...$frames].find((frame) => frame.contentDocument.body.innerHTML.trim()).contentDocument.body.innerText)
            })
        },
        checkLatestEmailContains(email, text) {
            cy.visit('https://www.mailinator.com/')
            cy.origin('https://www.mailinator.com', { args: { email, text } }, ({ email, text }) => {
                cy.get('#search').clear().type(`${email}{enter}`)
                cy.get('.table-striped tbody tr:first-child')
                    .contains('noreply@pro-data.tech', { timeout: 30000 }).click()
                cy.get('iframe[id$="msg_body"]', { timeout: 15000 })     // html emails - #html_msg_body, plain text emails - #texthtml_msg_body
                    .should(($frames) => expect([...$frames].some((frame) => frame.contentDocument.body.innerHTML.trim())).to.be.true)
                    .then(($frames) => [...$frames].find((frame) => frame.contentDocument.body.innerHTML.trim()).contentDocument.body)
                    .then(cy.wrap)
                    .should('contain.text', text)
            })
        },
    }
}
module.exports = new Mailinator()
