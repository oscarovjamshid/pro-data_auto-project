cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import consuption_page from "../pages/consuption_page";

describe('30.Consumption - Charges Graph tab', () => {
    let configData;
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentFormattedDate = `${year}-${month}-${day}`;
    const oneMonthAgo = new Date(today);
    const originalDay = oneMonthAgo.getDate();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    if (oneMonthAgo.getDate() !== originalDay) {
        oneMonthAgo.setDate(0);
    }
    const yearOld = oneMonthAgo.getFullYear();
    const monthOld = String(oneMonthAgo.getMonth() + 1).padStart(2, '0');
    const dayOld = String(oneMonthAgo.getDate()).padStart(2, '0');
    const oldFormattedDate = `${yearOld}-${monthOld}-${dayOld}`;
    const firstDayOfMonth = `${year}-${month}-01`;
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('GET', `${configData.base_url}/panel-main/api/transactions/monthly?dateFrom=${firstDayOfMonth}&dateTo=${currentFormattedDate}&prediction=false&regionId=6`).as('graphicInvoiceMonthRequest');
        cy.intercept('GET', `${configData.base_url}/panel-main/api/transactions/daily?dateFrom=${firstDayOfMonth}&dateTo=${currentFormattedDate}&prediction=false&regionId=6`).as('graphicInvoiceDailyRequest');
        cy.intercept('GET', `${configData.base_url}/panel-main/api/transactions/monthly?dateFrom=${firstDayOfMonth}&dateTo=${currentFormattedDate}&prediction=true&regionId=6`).as('graphicPredictedMonthRequest');
        cy.intercept('GET', `${configData.base_url}/panel-main/api/transactions/daily?dateFrom=${firstDayOfMonth}&dateTo=${currentFormattedDate}&prediction=true&regionId=6`).as('graphicPredictedDailyRequest');

        cy.intercept('GET', `${configData.base_url}/panel-main/api/transactions/monthly?dateFrom=${firstDayOfMonth}&dateTo=${currentFormattedDate}&prediction=false`).as('graphicInvoiceMonthRequestAll');
        cy.intercept('GET', `${configData.base_url}/panel-main/api/transactions/daily?dateFrom=${firstDayOfMonth}&dateTo=${currentFormattedDate}&prediction=false`).as('graphicInvoiceDailyRequestAll');
        cy.intercept('GET', `${configData.base_url}/panel-main/api/transactions/monthly?dateFrom=${firstDayOfMonth}&dateTo=${currentFormattedDate}&prediction=true`).as('graphicPredictedMonthRequestAll');
        cy.intercept('GET', `${configData.base_url}/panel-main/api/transactions/daily?dateFrom=${firstDayOfMonth}&dateTo=${currentFormattedDate}&prediction=true`).as('graphicPredictedDailyRequestAll');
    })
    it('[PD-222] График расходов (по месяцам)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        consuption_page.actions.clickGraphicInvoiceBtn()
        //consuption_page.actions.getGraphicInvoiceMonthRequest('@graphicInvoiceMonthRequest')
    })
    it('[PD-223] График расходов (по дням)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        consuption_page.actions.clickGraphicInvoiceBtn()
        consuption_page.actions.clickGraphInvoiceTimeFilterBtn()
        consuption_page.actions.selectFilterOption('По дням')
        //consuption_page.actions.getGraphicInvoiceDailyRequest('@graphicInvoiceDailyRequest')
    })
    it('[PD-224] График расходов с прогноз (по месяцам)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        consuption_page.actions.clickGraphicInvoiceBtn()
        consuption_page.actions.checkGraphInvoicePredictBtn()
        //consuption_page.actions.getGraphicInvoiceMonthRequest('@graphicPredictedMonthRequest')
    })
    it('[PD-225] График расходов с прогноз (по дням)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        consuption_page.actions.clickGraphicInvoiceBtn()
        consuption_page.actions.clickGraphInvoiceTimeFilterBtn()
        consuption_page.actions.selectFilterOption('По дням')
        consuption_page.actions.checkGraphInvoicePredictBtn()
        //consuption_page.actions.getGraphicInvoiceDailyRequest('@graphicPredictedDailyRequest')
    })
    it('[PD-226] График расходов все локации (по месяцам)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        consuption_page.actions.clickGraphicInvoiceBtn()
        consuption_page.actions.clickGraphInvoiceRegionFilterBtn()
        consuption_page.actions.selectFilterOption("Все локации")
        //consuption_page.actions.getGraphicInvoiceMonthRequest('@graphicInvoiceMonthRequestAll')
    })
    it('[PD-227] График расходов все локации (по дням)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        consuption_page.actions.clickGraphicInvoiceBtn()
        consuption_page.actions.clickGraphInvoiceRegionFilterBtn()
        consuption_page.actions.selectFilterOption("Все локации")
        consuption_page.actions.clickGraphInvoiceTimeFilterBtn()
        consuption_page.actions.selectFilterOption('По дням')
        //consuption_page.actions.getGraphicInvoiceDailyRequest('@graphicInvoiceDailyRequestAll')
    })
    it('[PD-228] График расходов все локации с прогноз (по месяцам)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        consuption_page.actions.clickGraphicInvoiceBtn()
        consuption_page.actions.clickGraphInvoiceRegionFilterBtn()
        consuption_page.actions.selectFilterOption("Все локации")
        consuption_page.actions.checkGraphInvoicePredictBtn()
        //consuption_page.actions.getGraphicInvoiceMonthRequest('@graphicPredictedMonthRequestAll')
    })
    it('[PD-229] График расходов все локации с прогноз (по дням)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        consuption_page.actions.clickGraphicInvoiceBtn()
        consuption_page.actions.clickGraphInvoiceRegionFilterBtn()
        consuption_page.actions.selectFilterOption("Все локации")
        consuption_page.actions.clickGraphInvoiceTimeFilterBtn()
        consuption_page.actions.selectFilterOption('По дням')
        consuption_page.actions.checkGraphInvoicePredictBtn()
        // consuption_page.actions.getGraphicInvoiceDailyRequest('@graphicPredictedDailyRequestAll')
    })
})