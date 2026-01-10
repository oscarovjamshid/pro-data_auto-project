class Login {
    elements = {
        loginTxt: () => cy.get('[qa-element="auth-email"]'),
        passwordTxt: () => cy.get('[qa-element="auth-password"]'),
        loginBtn: () => cy.get('[qa-element="login"]'),
        languageBtn: () => cy.get('[qa-element="language-selector-open"]'),
        russianTxt: () => cy.get('[qa-element="language-selector-0"]'),
        passwordErrorLbl: () => cy.get('[qa-element="password-error"]'), 
    }
    actions = {
        isVisibleLoginTxt: () => {
            this.elements.loginTxt().should('be.visible');
        },
        enterLogin: (login) => {
            this.elements.loginTxt().clear()
            this.elements.loginTxt().type(login)
        },
        isVisiblePasswordTxt: () => {
            this.elements.passwordTxt().should('be.visible');
        },
        enterPassword: (password) => {
            this.elements.passwordTxt().type(password)
        },
        isVisibleLoginBtn: () => {
            this.elements.loginBtn().should('be.visible');
        },
        clickLoginBtn: () => {
            this.elements.loginBtn().click()
        },
        isLogined: () => {
            cy.wait('@signInRequest').then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body).to.have.property('data');
                expect(interception.response.body.data).to.have.property('accessToken');
                // expect(interception.response.body.data).to.have.property('user');
            });
        },
        isNotLogined: () => {
            cy.wait('@signInRequest').then((interception) => {
                expect(interception.response.statusCode).to.eq(404);
            });
        },
        clickeditLanguage: () => {
            this.elements.languageBtn().click()
        },
        clickRusLanguage: () => {
            this.elements.russianTxt().click()
        },
        enterInvalidLogins: () => {
            const testData = ["tester123", 1234567, "___", "tester!@#abc"]
            for(let item of testData){
                this.elements.loginTxt().clear()
                this.elements.loginTxt().type(item)
                this.elements.loginBtn().click()
               // this.elements.loginTxt().should('have.css', 'border-color', 'rgb(232, 95, 92)'); -- commented out cuz red border color was removed from login txt on panel
            }
        },
        blockAccount: () => {
            const testData = ["testpsw1", "testpsw2", "testpsw3", "testpsw4", "testpsw5"]
            for(let item of testData){
                this.elements.passwordTxt().clear()
                this.elements.passwordTxt().type(item)
                this.elements.loginBtn().click()
            }
        },
        isBlocked: () => {
            cy.wait('@loginBlocked').then((interception) => {
                expect(interception.response.statusCode).to.eq(403);
                expect(interception.response.body).to.have.property('data');
                // expect(interception.response.body.errors[0].message).to.equal("User Temporary Blocked");
            });
        },
        isVisiblePasswordErrorLbl: (text) => {
            this.elements.passwordErrorLbl().should('be.visible')
            this.elements.passwordErrorLbl().contains(text)
        },
    }
}





module.exports = new Login()