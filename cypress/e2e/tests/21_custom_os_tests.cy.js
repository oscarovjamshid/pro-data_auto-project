cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import custom_os_page from "../pages/custom_os_page";
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
    it.only('[PD-163] upload custom OS (without specifying minimum parameters)', () => {
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
        custom_os_page.actions.waitForCustomOsReadyStatus(osName);
    })
    it.only('[PD-167] upload custom OS (with specifying minimum parameters)', () => {
        const osName = `Custom_OS_with_min`
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickCustomOS_icon()
        custom_os_page.actions.clickUploadNewCustomOsBtn()
        custom_os_page.actions.typeCustomOsnameTxt(osName)
        custom_os_page.actions.clickCustomOsfileBtn()
        custom_os_page.actions.attachFileCustomOsFileTxtForMin()
        custom_os_page.actions.checkCustomOsMinParamsCheckbox()
        custom_os_page.actions.clickCustomOsFileConfBtn()
        custom_os_page.actions.isVisibleCustomOsUploadProgress("Идет загрузка, не закрывайте браузер")
        custom_os_page.actions.waitForCustomOsReadyStatus(osName);
    })
    it.only('[PD-166] Upload custom OS (without name)', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickCustomOS_icon()
        custom_os_page.actions.clickUploadNewCustomOsBtn()
        custom_os_page.actions.clickCustomOsfileBtn()
        custom_os_page.actions.attachFileCustomOsFileTxt2()
        custom_os_page.actions.clickCustomOsFileConfBtn()
        custom_os_page.actions.isVisibleCustomOsNameErrorLbl()
    })
    it('[PD-170] Create server with uploaded custom OS', () => {
        const osName = `Custom_OS_with_min`
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickCustomOS_icon()
        custom_os_page.actions.clickUploadNewCustomOsBtn()
        custom_os_page.actions.typeCustomOsnameTxt(osName)
        custom_os_page.actions.clickCustomOsfileBtn()
        custom_os_page.actions.attachFileCustomOsFileTxt3()
        custom_os_page.actions.clickCustomOsFileConfBtn()
        custom_os_page.actions.isVisibleCustomOsUploadProgress()
        custom_os_page.actions.waitForCustomOsReadyStatus(osName);
        //* Need to add create server test with custom os
    })
    it('[PD-168] Upload new custom OS (with specifying minimum parameters up to maximum)', () => {
        const osName = `Custom_OS_with_min`
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickCustomOS_icon()
        custom_os_page.actions.clickUploadNewCustomOsBtn()
        custom_os_page.actions.typeCustomOsnameTxt(osName)
        custom_os_page.actions.clickCustomOsfileBtn()
        custom_os_page.actions.attachFileCustomOsFileTxt()
        custom_os_page.actions.checkCustomOsMinParamsCheckbox()
        custom_os_page.actions.typeMinCpuTxt(16)
        custom_os_page.actions.typeMinRamTxt(32)
        custom_os_page.actions.typeMinDiskTxt(500)
        custom_os_page.actions.clickCustomOsFileConfBtn()
    })
    it('[PD-169] Upload new custom OS (with specifying minimum parameters exceeding maximum)', () => {
        const osName = `Custom_OS_with_min`
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickCustomOS_icon()
        custom_os_page.actions.clickUploadNewCustomOsBtn()
        custom_os_page.actions.typeCustomOsnameTxt(osName)
        custom_os_page.actions.clickCustomOsfileBtn()
        custom_os_page.actions.attachFileCustomOsFileTxt()
        custom_os_page.actions.checkCustomOsMinParamsCheckbox()
        custom_os_page.actions.typeMinCpuTxt(320)
        custom_os_page.actions.typeMinRamTxt(640)
        custom_os_page.actions.typeMinDiskTxt(10240)
        custom_os_page.actions.clickCustomOsFileConfBtn()
    })
    it('[PD-171] Delete custom OS not attached to servers', () => {
        const osName = `Custom_OS_without_min`
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickCustomOS_icon()
        custom_os_page.actions.createdCustomOsDeleteBtn(osName)
        custom_os_page.actions.clickdeleteCustomOsFileConfBtn()
    })
})