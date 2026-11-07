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
        getLinkFromNewInbox(email, linkText) {      // for unique (empty) inbox: reloads until the first email comes
            const inbox = email.split('@')[0]
            cy.visit(`https://www.mailinator.com/v4/public/inboxes.jsp?to=${inbox}`)
            return cy.origin('https://www.mailinator.com', { args: { inbox, linkText } }, ({ inbox, linkText }) => {
                const waitForEmail = (attempt) => {         // inbox list is not always live-updated, so reload (up to ~2 min)
                    cy.wait(10000)
                    cy.get('body').then(($body) => {
                        if ($body.find(`tr[id^="row_${inbox}-"]`).length) return
                        if (attempt >= 12) throw new Error(`No email in ${inbox} inbox`)
                        cy.reload()
                        waitForEmail(attempt + 1)
                    })
                }
                waitForEmail(1)
                cy.get(`tr[id^="row_${inbox}-"]`).first().contains('noreply@pro-data.tech').click()
                cy.get('iframe[id$="msg_body"]', { timeout: 15000 })     // html emails - #html_msg_body, plain text emails - #texthtml_msg_body
                    .should(($frames) => expect([...$frames].some((frame) => frame.contentDocument.body.innerHTML.trim())).to.be.true)
                    .then(($frames) => [...$frames].find((frame) => frame.contentDocument.body.innerHTML.trim()).contentDocument.body)
                    .then(cy.wrap)
                    .find(`a:contains("${linkText}")`)
                    .first()
                    .invoke('attr', 'href')
            })
        },
    }
}
module.exports = new Mailinator()
