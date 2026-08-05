cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import server_page from "../pages/server_page";
import serverAction_page from "../pages/server-action_page"
import serverlist_page from "../pages/server-list_page";
import templates_page from "../pages/templates_page";

describe('21.Custom Templates Tests', () => {
    let configData;
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
    })
    it('[PD-951, PD-954] Virtual Server: Create Template: with latin letters', () => {        // 2 test cases in 1 autotest
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        templates_page.actions.clickCreateTemplateBtnInActionsMenu()
        templates_page.actions.typeTemplateName("Test-template")
        templates_page.actions.clickCreateTemplateBtnInModal()
        templates_page.actions.clickCancelBtnAfterCreationInConfirmationModal()
        cy.wait(30000) // wait for template creation - first temp takes a bit longer 
        templates_page.actions.clickTemplatesTab()
        templates_page.actions.waitForCreatedTemplateRowByName("Test-template")
    })
    it('[PD-952] Virtual Server: Create Template: with numbers', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        templates_page.actions.clickCreateTemplateBtnInActionsMenu()
        templates_page.actions.typeTemplateName("1234567890")
        templates_page.actions.clickCreateTemplateBtnInModal()
        templates_page.actions.clickCancelBtnAfterCreationInConfirmationModal()
        templates_page.actions.clickTemplatesTab()
        templates_page.actions.waitForCreatedTemplateRowByName("1234567890")
    })
    it('[PD-953] Virtual Server: Create Template: with underscore and hyphen', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        templates_page.actions.clickCreateTemplateBtnInActionsMenu()
        templates_page.actions.typeTemplateName("Test_template-hyphen")
        templates_page.actions.clickCreateTemplateBtnInModal()
        templates_page.actions.clickCancelBtnAfterCreationInConfirmationModal()
        templates_page.actions.clickTemplatesTab()
        templates_page.actions.waitForCreatedTemplateRowByName("Test_template-hyphen")
    })
    it('[PD-955] Virtual Server: Create Template: with Available to all projects disabled', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        templates_page.actions.clickCreateTemplateBtnInActionsMenu()
        templates_page.actions.typeTemplateName("Test_template-all-projects-disabled")
        templates_page.actions.clickAvailableToAllProjectsCheckbox()
        templates_page.actions.clickCreateTemplateBtnInModal()
        templates_page.actions.clickCancelBtnAfterCreationInConfirmationModal()
        templates_page.actions.clickTemplatesTab()
        templates_page.actions.waitForCreatedTemplateRowByName("Test_template-all-projects-disabled")
    })
    it('[PD-956] Virtual Server: Create Template: empty name (unsuccessful)', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        templates_page.actions.clickCreateTemplateBtnInActionsMenu()
        templates_page.actions.isDisabledCreateTemplateBtn()
    })
})
//Test-Server won't be touched in this test suite