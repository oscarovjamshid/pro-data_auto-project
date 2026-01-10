cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import consuption_page from "../pages/consuption_page";

describe('28.Consumption - Current Cost tab', () => {
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
        cy.intercept('GET', `${configData.base_url}/panel-main/api/transactions/invoice?dateFrom=${oldFormattedDate}&dateTo=${currentFormattedDate}&type=month`).as('invoiceMonthRequest');
        cy.intercept('GET', `${configData.base_url}/panel-main/api/transactions/invoice?dateFrom=${currentFormattedDate}&dateTo=${currentFormattedDate}&type=day`).as('invoiceDayRequest');
    })

    it('[PD-218] Текущая стоимость (в месяц)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        consuption_page.actions.checkMonthPriceFilter()
        //consuption_page.actions.getInvoiceRequest('@invoiceMonthRequest')
    })
    it('[PD-219] Текущая стоимость (в день)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        cy.wait(3000)
        consuption_page.actions.checkDayPriceFilter()
        //consuption_page.actions.getInvoiceRequest('@invoiceDayRequest')
    })
    it('[PD-220] Текущая стоимость все локации (в день)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        cy.wait(3000)
        consuption_page.actions.checkDayPriceFilter()
        consuption_page.actions.clickLocationFilterBtn()
        consuption_page.actions.selectLocation("Все локации")
        //consuption_page.actions.getInvoiceRequestAll('@invoiceDayRequest')
    })
    it('[PD-221] Текущая стоимость все локации (в месяц)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserCredentials()
        sidebar.actions.clickConsuptionIcon()
        consuption_page.actions.isVisibleConsuptionHeader()
        consuption_page.actions.checkMonthPriceFilter()
        consuption_page.actions.clickLocationFilterBtn()
        consuption_page.actions.selectLocation("Все локации")
        //consuption_page.actions.getInvoiceRequestAll('@invoiceMonthRequest')
    })
})