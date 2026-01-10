import './commands'
import 'cypress-wait-until';
import 'cypress-mochawesome-reporter/register';
import 'cypress-file-upload';
import '@shelex/cypress-allure-plugin';
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})