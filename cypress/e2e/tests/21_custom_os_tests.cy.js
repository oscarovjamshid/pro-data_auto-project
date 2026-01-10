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

    it('[PD-163] Загрузить новый пользовательский образ (без указание минимальных параметров)', () => {
        const osName = `Custom_OS_without_min`
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickCustomOS_icon()
        custom_os_page.actions.clickUploadNewCustomOsBtn()
        custom_os_page.actions.typeCustomOsnameTxt(osName)
        custom_os_page.actions.clickCustomOsfileBtn()
        custom_os_page.actions.attachFileCustomOsFileTxt()
        custom_os_page.actions.clickCustomOsFileConfBtn()
        custom_os_page.actions.isVisibleCustomOsUploadProgress()
        cy.wait(5000)
    })
    it('[PD-167] Загрузить новый пользовательский образ (с указанием минимальных параметров)', () => {
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
        custom_os_page.actions.isVisibleCustomOsUploadProgress()
        cy.wait(5000)
        custom_os_page.actions.isModalClosed()
    })
    it('[PD-166] Загрузить новый пользовательский образ (Нет называние)', () => {
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickCustomOS_icon()
        custom_os_page.actions.clickUploadNewCustomOsBtn()
        custom_os_page.actions.clickCustomOsfileBtn()
        custom_os_page.actions.attachFileCustomOsFileTxt2()
        custom_os_page.actions.clickCustomOsFileConfBtn()
        custom_os_page.actions.isVisibleCustomOsNameErrorLbl()
    })
    it('[PD-170] Создать сервер с загруженным пользовательским образом', () => {
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
        cy.wait(5000)
        //* Need to add create server test with custom os
    })
    it('[PD-168] Загрузить новый пользовательский образ (с указанием минимальных параметров до максимума)', () => {
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
    it('[PD-169] Загрузить новый пользовательский образ (с указанием минимальных параметров превышая максимума)', () => {
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
    it('[PD-171] Удалить пользовательский образ, не связанный с серверами', () => {
        const osName = `Custom_OS_without_min`
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickCustomOS_icon()
        custom_os_page.actions.createdCustomOsDeleteBtn(osName)
        cy.wait(2000)
        custom_os_page.actions.clickdeleteCustomOsFileConfBtn()
    })
})