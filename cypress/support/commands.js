import login_page from "../e2e/pages/login_page";

Cypress.Commands.add('login', (baseUrl, login, password) => {
    cy.visit(baseUrl)
    login_page.actions.isVisibleLoginTxt()
    login_page.actions.clickeditLanguage()
    login_page.actions.clickRusLanguage()
    login_page.actions.enterLogin(login)
    login_page.actions.isVisiblePasswordTxt()
    login_page.actions.enterPassword(password)
    login_page.actions.isVisibleLoginBtn()
    login_page.actions.clickLoginBtn()
    login_page.actions.isLogined()
})