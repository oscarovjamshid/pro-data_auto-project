cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import server_page from "../pages/server_page";
import serverAction_page from "../pages/server-action_page"
import serverlist_page from "../pages/server-list_page";
import templates_page from "../pages/templates_page";
import configuration_page from "../pages/configuration_page";

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
    it('[PD-957] Virtual Server: Create Template: with Cyrillic letters (unsuccessful)', () => {
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
        templates_page.actions.typeTemplateName("Тестовый_шаблон")
        templates_page.actions.isDisabledCreateTemplateBtn()
    })
    it('[PD-958] Virtual Server: Create Template: with existing name (unsuccessful)', () => {
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
        templates_page.actions.isVisibleNotificationToastForExistingTempName("Имя шаблона должно быть уникальным в рамках компании")
    })
    it('[PD-959] Virtual Server: Create Template: when template limit/quota is not enough (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        server_page.actions.clickCreateServerBtn()
        server_page.actions.checkCreateServerPageLbl()
        server_page.actions.selectServerOs(0)    // first need to create an isolated VM with big Disk size which will be bigger than quota size of templates
        server_page.actions.selectVersionOs()
        server_page.actions.writeTitle(configData.test_server_without_backup)
        server_page.actions.writeDesc("for templates test when Disk size is big")
        server_page.actions.writeCpuTxt(2)
        server_page.actions.writeRamTxt(4)
        server_page.actions.setDisk(120)
        server_page.actions.enablePublicIp()
        server_page.actions.clickLoginTypeSSHBtn()
        server_page.actions.clickConfirmCreateServerBtn()
        server_page.actions.clickCloseModalBtn()
        server_page.actions.isVisibleCreatedServer(configData.test_server_without_backup)
        serverlist_page.actions.searchServer(configData.test_server_without_backup)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_without_backup)
        server_page.actions.checkElementTextPeriodically()
        serverlist_page.actions.clickServerCard(configData.test_server_without_backup)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_without_backup)
        serverAction_page.actions.isRunningServer()
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickStopServerBtn()
        serverAction_page.actions.checkStatus(25, 'Остановлен')
        serverAction_page.actions.clickServerActionsBtn()    // and now we check the template creation with big-sized disky-VM
        templates_page.actions.clickCreateTemplateBtnInActionsMenu()
        templates_page.actions.isVisibleErrorMsgForNotEnoughQuota("Невозможно создать шаблон из данного загрузочного диска, так как его размер превышает оставшуюся квоту")
        templates_page.actions.clickCancelBtnInModal()
        serverAction_page.actions.clickServerActionsBtn()   // in the end we delete this VM
        configuration_page.actions.isVisibleDangerBtn()
        configuration_page.actions.clickDeleteServerDangerBtn()
        configuration_page.actions.writeDeleteServerNameTxt(configData.test_server_without_backup)
        configuration_page.actions.clickVerifiedDeleteBtn()
        configuration_page.actions.isVisibleDeletedVMMessage("Сервер успешно удален")
    })
    it('[PD-960] Virtual Server: Create Template: when VM is in Running status (unsuccessful)', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickStartServerBtn()
        serverAction_page.actions.checkStatus(25, 'В работе')
        templates_page.actions.hoverOnCustomOSVmCreateTemplateBtn("Возможно только при остановленном сервере")
    })
    it('[PD-961] Virtual Server: Create Template: when VM is made from custom template (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        server_page.actions.clickCreateServerBtn()
        server_page.actions.checkCreateServerPageLbl()   // first we create a VM with custom OS and then we check the template creation from this VM
        server_page.actions.clickCustomOsTabBtn()
        server_page.actions.selectCustomOs(0)
        server_page.actions.clickServerTitleField()
        server_page.actions.writeTitle(configData.test_server_with_customOS)
        server_page.actions.writeDesc("with custom OS,NVME")
        server_page.actions.writeCpuTxt(2)
        server_page.actions.writeRamTxt(4)
        server_page.actions.clickDiskTypeNVMEBtn()
        server_page.actions.setDisk(10)
        server_page.actions.enablePublicIp()
        server_page.actions.clickConfirmCreateServerBtn()
        server_page.actions.clickCloseModalBtn()
        server_page.actions.isVisibleCreatedServer(configData.test_server_with_customOS)
        serverlist_page.actions.searchServer(configData.test_server_with_customOS)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_with_customOS)
        server_page.actions.checkElementTextPeriodically()
        serverlist_page.actions.clickServerCard(configData.test_server_with_customOS)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_with_customOS)
        serverAction_page.actions.isRunningServer()
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickStopServerBtn()
        serverAction_page.actions.checkStatus(25, 'Остановлен')
        templates_page.actions.hoverOnCustomOSVmCreateTemplateBtn("Источник ВМ не поддерживает count-init") // now we check template creation
        configuration_page.actions.isVisibleDangerBtn() // in the end we delete this VM
        configuration_page.actions.clickDeleteServerDangerBtn()
        configuration_page.actions.writeDeleteServerNameTxt(configData.test_server_with_customOS)
        cy.wait(1000)
        configuration_page.actions.clickVerifiedDeleteBtn()
        configuration_page.actions.isVisibleDeletedVMMessage("Сервер успешно удален")
    }) 

})
//Test-Server will stay in Stopped state after above tests