class ChangePassword {
    elements = {
       changePassword: () => cy.get('[qa-element="sidemenu-nav-account-settings-sublink-account-change-pass"]'),
       passwordOldInp: () => cy.get('[qa-element="password-input"]').eq(0),
       passwordNewInp: () => cy.get('[qa-element="password-input"]').eq(1),
       passwordRepeatInp: () => cy.get('[qa-element="password-input"]').eq(2),
       changePassordBtn: () => cy.get('[qa-element="change-pass-save"]'),
       inValidMessage: () => cy.get('[qa-element="password-input-error"]')


    }
    actions = {
        clickChangePasswordTxt: () => {
            this.elements.changePassword().click()
        },
        enterOldPasswordInp: (text) => {
            this.elements.passwordOldInp().type(text)
        },
        enterNewPasswordInp: (text) => {
            this.elements.passwordNewInp().type(text)
        },
        enterRepeatPasswordInp: (text) => {
            this.elements.passwordRepeatInp().type(text)
        },
        clickChangePasswordBtn: () => {
            this.elements.changePassordBtn().click()
        },
        successChangePassword: () => {
            cy.wait('@successChangePassword', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
            });
        },
        failChangePassword: () => {
            cy.wait('@successChangePassword', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(400);
            });
        },
        isVisiblePasswordInValid: () => {
            this.elements.inValidMessage().should('be.visible')
        }

    }
}





module.exports = new ChangePassword()