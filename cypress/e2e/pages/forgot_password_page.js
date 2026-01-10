class ForgotPassword {
    elements = {
        forgotPasswordBtn: () => cy.get('[qa-element="forgot-password"]'), 
        emailInputField: () => cy.get('[qa-element="email"]'),
        forgotPasswordInvalidMsg: () => cy.get('[qa-element="email-error"]'),        
        sendBtn: () => cy.get('[qa-element="send"]'),  
        passwordResetModal: () => cy.get('body > div.fade.modal.show > div > div'),
        okBtn: () => cy.get('[qa-element="ok"]'),  
        closeBtn: () => cy.get('.btn-close'),
        resetPwdPageNewPwdInputField: () => cy.get('#password'),
        resetPwdPageConfirmPwdInputField: () => cy.get('#passwordConfirm'),
        resetPwdPageSaveBtn: () => cy.get('[qa-element="password-reset-save"]'),
        resetPwdPageBackToMainBtn: () => cy.get('[qa-element="to-main"]'),
        resetPwdPageNewPwdFieldInvalidMsg: () => cy.get('[class^="mb-3"]').eq(0).find('[qa-element="password-input-error"]'),       
        resetPwdPageConfirmPwdFieldInvalidMsg: () => cy.get('[class^="mb-3"]').eq(1).find('[qa-element="password-input-error"]'),

    }
    actions = {
        clickForgotPasswordBtn: () => {
            this.elements.forgotPasswordBtn().click()
        },
        enterEmailToForgotPwdField: (login) => {
            this.elements.emailInputField().clear()
            this.elements.emailInputField().type(login)
        },
        checkInvalidErrorLblForForgotPwdField: (text) => {
            this.elements.forgotPasswordInvalidMsg().should('be.visible')
            this.elements.forgotPasswordInvalidMsg().contains(text)
        }, 
        clearOnlyForgotPwdField: ()=> {
            this.elements.emailInputField().clear()
        },
        clickSendBtn: () => {
            this.elements.sendBtn().click()
        },
        isVisiblePasswordResetModal: () => {
            this.elements.passwordResetModal().should('be.visible');
        },
        clickOkBtnInPasswordResetModal: () => {
            this.elements.okBtn().click()
        },
        clickCloseBtnInPasswordResetModal: () => {
            this.elements.closeBtn().click()
        },
        IsNotVisibleResetPwdEmailField: () => {
            this.elements.emailInputField().should('not.exist')  
        },
        getPasswordResetUrl(email) {
            cy.visit('https://www.mailinator.com/')
            return cy.origin('https://www.mailinator.com', { args: { email } }, ({ email }) => {
            
           
                cy.get('#search').clear().type(`${email}{enter}`) // enter email address on landing page

                cy.get('.table-striped tbody tr:first-child') // find the first mail in the inbox list
                .contains('noreply@pro-data.tech', { timeout: 15000 }).click()
                 
                cy.wait(2000)
                cy.get('iframe#html_msg_body', { timeout: 15000 }) // find the first link in the email
                .its('0.contentDocument.body').should('not.be.empty')
                .then(cy.wrap)
                .find('a')
                .invoke('attr', 'href')
                .as('resetLink')  
                /*cy.wait(3000)
                cy.get('#pills-links-tab').click()
                cy.wait(3000)
                cy.get('#pills-links-content table tbody tr td:nth-child(2) a').click()
                cy.wait(2000)*/
            }
            )
        },
        getSuccessfulPwdResetText(email) {
            cy.visit('https://www.mailinator.com/')
            return cy.origin('https://www.mailinator.com', { args: { email } }, ({ email }) => {
            
           
                cy.get('#search').clear().type(`${email}{enter}`) // enter email address on landing page

                cy.get('.table-striped tbody tr:first-child') // find the first mail in the inbox list
                .contains('noreply@pro-data.tech', { timeout: 15000 }).click()
                 
                cy.wait(2000)
                cy.get('iframe#html_msg_body', { timeout: 15000 }) // find the first link in the email
                .its('0.contentDocument.body').should('not.be.empty')
                .then(cy.wrap)
                .find('p')
                .contains('Ваш пароль от панели управления Pro-Data успешно сброшен') 
            }
            )
        },
        getExpiredLinkText(email) {
            cy.visit('https://www.mailinator.com/')
            return cy.origin('https://www.mailinator.com', { args: { email } }, ({ email }) => {
            
           
                cy.get('#search').clear().type(`${email}{enter}`) // enter email address on landing page

                cy.get('.table-striped tbody tr').eq(1) // find the first mail in the inbox list
                .contains('noreply@pro-data.tech', { timeout: 15000 }).click()
                 
                cy.wait(2000)
                cy.get('iframe#html_msg_body', { timeout: 15000 }) // find the first link in the email
                .its('0.contentDocument.body').should('not.be.empty')
                .then(cy.wrap)
                .find('a')
                .invoke('attr', 'href')
                .as('resetLink') 
            }
            )
        },
        enterPwdToResetPwdPageNewPasswordField: (pwd) => {
            this.elements.resetPwdPageNewPwdInputField().clear()
            this.elements.resetPwdPageNewPwdInputField().type(pwd)
        },  
        enterPwdToResetPwdPageConfirmPasswordField: (pwd) => {
            this.elements.resetPwdPageConfirmPwdInputField().clear()
            this.elements.resetPwdPageConfirmPwdInputField().type(pwd)
        },  
        clearResetPwdPageNewPasswordField: () => {
            this.elements.resetPwdPageNewPwdInputField().clear()
        },  
        clearResetPwdPageConfirmPasswordField: () => {
            this.elements.resetPwdPageConfirmPwdInputField().clear()
        }, 
        checkInvalidErrorLblForResetPageNewPwdField: (text) => {
            this.elements.resetPwdPageNewPwdFieldInvalidMsg().should('be.visible')
            this.elements.resetPwdPageNewPwdFieldInvalidMsg().contains(text)
        },  
        checkInvalidErrorLblForResetPageConfirmPwdField: (text) => {
            this.elements.resetPwdPageConfirmPwdFieldInvalidMsg().should('be.visible')
            this.elements.resetPwdPageConfirmPwdFieldInvalidMsg().contains(text)
        }, 
        clickResetPwdSaveBtn: () => {
            this.elements.resetPwdPageSaveBtn().click()
        },
        clickResetPwdBackToMainBtn: () => {
            this.elements.resetPwdPageBackToMainBtn().click()
        },
    }
}
module.exports = new ForgotPassword()