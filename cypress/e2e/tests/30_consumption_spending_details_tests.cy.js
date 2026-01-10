cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import consuption_page from "../pages/consuption_page";

describe('30.Consumption - Spending Details tab', () => {
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

        cy.intercept('GET', `${configData.base_url}/panel-main/api/v1/reports/cost-details/by-service?page=0&size=50&tab=details&regionId=6&projectId=93&dateFrom=${firstDayOfMonth}&dateTo=${currentFormattedDate}`).as('detailedInvoiceRequest');
        cy.intercept('GET', `${configData.base_url}/panel-main/api/v1/reports/cost-details?page=0&size=50&tab=details&regionId=6&projectId=93&dateFrom=${firstDayOfMonth}&dateTo=${currentFormattedDate}`).as('detailedInvoiceFilterRequest');

        cy.intercept('GET', `${configData.base_url}/panel-main/api/v1/reports/cost-details/by-service?page=0&size=50&tab=details&dateFrom=${firstDayOfMonth}&dateTo=${currentFormattedDate}`).as('detailedInvoiceAllRequest');
        cy.intercept('GET', `${configData.base_url}/panel-main/api/v1/reports/cost-details/by-service?page=0&size=50&tab=details&resourceType=GLOBAL_DISK&regionId=6&projectId=93&dateFrom=${firstDayOfMonth}&dateTo=${currentFormattedDate}`).as('detailedInvoiceDiskRequest');
        cy.intercept('GET', `${configData.base_url}/panel-main/api/v1/reports/cost-details/by-service?page=0&size=50&tab=details&resourceType=PUBLIC_IP&regionId=6&projectId=93&dateFrom=${firstDayOfMonth}&dateTo=${currentFormattedDate}`).as('detailedInvoicePublicIpRequest');
        cy.intercept('GET', `${configData.base_url}/panel-main/api/v1/reports/cost-details/by-service?page=0&size=50&tab=details&resourceType=KUBERNETES&regionId=6&projectId=93&dateFrom=${firstDayOfMonth}&dateTo=${currentFormattedDate}`).as('detailedInvoiceKuberRequest');
        cy.intercept('GET', `${configData.base_url}/panel-main/api/v1/reports/cost-details/by-service?page=0&size=50&tab=details&resourceType=OBJECT_STORAGE&regionId=6&projectId=93&dateFrom=${firstDayOfMonth}&dateTo=${currentFormattedDate}`).as('detailedInvoiceObjectStorageRequest');
    })
    it('[PD-242] Детализация расходов кейс-2', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        consuption_page.actions.clickDetailedInvoiceBtn()
        //consuption_page.actions.getDetailedInvoiceRequest('@detailedInvoiceRequest', 2, 4, 10)
    })
    it('[PD-230] Детализация расходов кейс-1', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        consuption_page.actions.clickDetailedInvoiceBtn()
        consuption_page.actions.clickDetailedProjectFilterBtn()
        consuption_page.actions.selectFilterOption("Все проекты")
        consuption_page.actions.clickDetailedRegionFilterBtn()
        consuption_page.actions.selectFilterOption("Все регионы")
        consuption_page.actions.clickDetailedServiceFilterBtn()
        consuption_page.actions.selectFilterOption("Все сервисы")
        //consuption_page.actions.getDetailedInvoiceRequest('@detailedInvoiceAllRequest', 2, 4, 10)
    })
    it('[PD-243] Детализация расходов с глобальным Диском', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        consuption_page.actions.clickDetailedInvoiceBtn()
        consuption_page.actions.clickDetailedServiceFilterBtn()
        consuption_page.actions.selectFilterOption("Глобальный диск")
        //consuption_page.actions.getDetailedInvoiceRequest('@detailedInvoiceDiskRequest', 2, 4, 7)
    })
    it('[PD-244] Детализация расходов с Публичный IP', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        consuption_page.actions.clickDetailedInvoiceBtn()
        consuption_page.actions.clickDetailedServiceFilterBtn()
        consuption_page.actions.selectFilterOption("Публичный IP")
        //consuption_page.actions.getDetailedInvoiceRequest('@detailedInvoicePublicIpRequest', 2, 4, 6)
    })
    it('[PD-245] Детализация расходов с Объектное хранилище', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        consuption_page.actions.clickDetailedInvoiceBtn()
        consuption_page.actions.clickDetailedServiceFilterBtn()
        consuption_page.actions.selectFilterOption("Объектное хранилище")
        //consuption_page.actions.getDetailedInvoiceRequest('@detailedInvoiceObjectStorageRequest', 2, 4, 5)
    })
    it('[PD-248] Итоговые суммы между детализованным и группированным отчётом равны при одинаковых фильтров', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        consuption_page.actions.clickDetailedInvoiceBtn()
        //consuption_page.actions.getDetailedInvoiceRequest('@detailedInvoiceRequest', 2, 4, 10)
        consuption_page.actions.clickDetailedReportFilterBtn()
        cy.wait(1000)
        //consuption_page.actions.getDetailedInvoiceRequest('@detailedInvoiceFilterRequest', 2, 3, 8)
    })
})