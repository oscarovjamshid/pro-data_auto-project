cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import custom_os_page from "../pages/custom_os_page";
import server_page from "../pages/server_page";
import serverAction_page from "../pages/server-action_page"
import serverlist_page from "../pages/server-list_page";
import configuration_page from "../pages/configuration_page";
const { faker } = require('@faker-js/faker');

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
    it('[PD-163] Upload custom OS (without specifying minimum parameters)', () => {
        const osName = `Custom_OS_without_min`
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickCustomOS_icon()
        custom_os_page.actions.clickUploadNewCustomOsBtn()
        custom_os_page.actions.typeCustomOsnameTxt(osName)
        custom_os_page.actions.clickCustomOsfileBtn()
        custom_os_page.actions.attachFileCustomOsFileTxt()
        custom_os_page.actions.clickCustomOsFileConfBtn()
        custom_os_page.actions.isVisibleCustomOsUploadProgress("Идет загрузка, не закрывайте браузер")
        custom_os_page.actions.waitForCustomOsReadyStatus(osName)
    })
    it('[PD-167] Upload custom OS (with specifying minimum parameters)', () => {
        const osName = `Custom_OS_with_min`
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickCustomOS_icon()
        custom_os_page.actions.clickUploadNewCustomOsBtn()
        custom_os_page.actions.typeCustomOsnameTxt(osName)
        custom_os_page.actions.clickCustomOsfileBtn()
        custom_os_page.actions.attachFileCustomOsFileTxtForMin()
        custom_os_page.actions.checkCustomOsMinParamsCheckbox()
        cy.wait(2000) // Need to wait for min params fields to appear after checking the checkbox
        custom_os_page.actions.clickCustomOsFileConfBtn()
        custom_os_page.actions.waitForCustomOsReadyStatus(osName);
    })
    it('[PD-166] Upload custom OS (without name)', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickCustomOS_icon()
        custom_os_page.actions.clickUploadNewCustomOsBtn()
        custom_os_page.actions.clickCustomOsfileBtn()
        custom_os_page.actions.attachFileCustomOsFileTxt2()
        custom_os_page.actions.isCustomOsFileConfBtnDisabled()
    })
    it('[PD-170] Create server with uploaded custom OS', () => {
        const osName = `Custom_OS_with_min`
        const customServerName = `server-with-custom-os`
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickCustomOS_icon()
        custom_os_page.actions.clickCreateServerBtnPerRowName(osName)
        server_page.actions.writeTitle(customServerName)
        server_page.actions.writeDesc("Test Description about Custom OS")
        server_page.actions.enableLocalIp()
        server_page.actions.clickLocalIpAddNewBtn()
        server_page.actions.writeLocalIpNameTxt(`Test_IP_for_custom_os`)
        server_page.actions.writeLocalIpAddressTxtforCustomOS("192.168.110.0")
        server_page.actions.writeLocalIpGatewayTxt("192.168.110.1")
        server_page.actions.clickLocalIpAddConfBtn()
        server_page.actions.clickLocalIpSelector()
        server_page.actions.selectLocalIpName(`Test_IP_for_custom_os`)
        server_page.actions.clickConfirmCreateServerBtn()
        server_page.actions.clickCloseModalBtn()
        server_page.actions.isVisibleCreatedServer(customServerName)
        serverAction_page.actions.checkStatus(25, 'В работе')
    })
    it('[PD-934] Delete server created with custom OS', () => {
        const osName = `Custom_OS_with_min`
        const customServerName = `server-with-custom-os`
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(customServerName)
        serverlist_page.actions.isVisibleSearchTxtServer(customServerName)
        serverlist_page.actions.clickServerCard(customServerName)
        serverlist_page.actions.isVisibleServerDetail(customServerName)
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickStopServerBtn()
        serverAction_page.actions.checkStatus(25, 'Остановлен')
        configuration_page.actions.isVisibleDangerBtn()
        configuration_page.actions.clickDeleteServerDangerBtn()
        configuration_page.actions.writeDeleteServerNameTxt(customServerName)
        configuration_page.actions.clickVerifiedDeleteBtn()
        configuration_page.actions.isVisibleDeletedVMMessage("Сервер успешно удален")
    })
    it('[PD-168] Upload new custom OS (with specifying minimum parameters up to maximum)', () => {
        const osName = `custom_os_with_max_min`
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickCustomOS_icon()
        custom_os_page.actions.clickUploadNewCustomOsBtn()
        custom_os_page.actions.typeCustomOsnameTxt(osName)
        custom_os_page.actions.clickCustomOsfileBtn()
        custom_os_page.actions.attachFileCustomOsFileTxt2()
        custom_os_page.actions.checkCustomOsMinParamsCheckbox()
        custom_os_page.actions.setCustomOsCpu(2)
        custom_os_page.actions.setCustomOsRam(4)
        custom_os_page.actions.setCustomOsDisk(10)
        custom_os_page.actions.clickCustomOsFileConfBtn()
        custom_os_page.actions.waitForCustomOsReadyStatus(osName)
    })
    it('[PD-169] Upload new custom OS (with specifying minimum parameters exceeding maximum)', () => {
        const osName = `custom_os_with_max_min`
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickCustomOS_icon()
        custom_os_page.actions.clickUploadNewCustomOsBtn()
        custom_os_page.actions.typeCustomOsnameTxt(osName)
        custom_os_page.actions.clickCustomOsfileBtn()
        custom_os_page.actions.attachFileCustomOsFileTxt3()
        custom_os_page.actions.checkCustomOsMinParamsCheckbox()
        custom_os_page.actions.setCustomOsCpu(1000)
        custom_os_page.actions.isCustomOsCpuIncreaseBtnDisabled()
        custom_os_page.actions.setCustomOsRam(1000)
        custom_os_page.actions.isCustomOsRamIncreaseBtnDisabled()
        custom_os_page.actions.setCustomOsDisk(1000)
        custom_os_page.actions.isCustomOsDiskIncreaseBtnDisabled()
    })
    it('[PD-171] Delete custom OS not attached to servers', () => {
        const osName1 = `Custom_OS_without_min`
        const osName2 = `Custom_OS_with_min`
        const osName3 = `custom_os_with_max_min`
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickCustomOS_icon()
        custom_os_page.actions.createdCustomOsDeleteBtn(osName1)
        custom_os_page.actions.clickdeleteCustomOsFileConfBtn()
        custom_os_page.actions.createdCustomOsDeleteBtn(osName2)
        custom_os_page.actions.clickdeleteCustomOsFileConfBtn()
        custom_os_page.actions.createdCustomOsDeleteBtn(osName3)
        custom_os_page.actions.clickdeleteCustomOsFileConfBtn()
    })
})