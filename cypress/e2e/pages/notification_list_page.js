class NotificationList {
    exactText = (text) => new RegExp(`^\\s*${Cypress._.escapeRegExp(text)}\\s*$`)

    elements = {
        settings_icon: () => cy.get('[qa-element="nav_link_account"]', { timeout: 30000 }).first(),
        notificationList_icon: () => cy.get('[qa-element="nav_link_notifications-list"]', { timeout: 30000 }),
        pageTitleLbl: () => cy.get('[qa-element="app-notification-table"]', { timeout: 30000 }),
        tableRows: () => cy.get('tbody tr', { timeout: 30000 }),
        subjectCells: () => cy.get('tbody tr td:nth-child(2)'),                                      // later change this to qa-element tag
        dateCells: () => cy.get('tbody tr td:nth-child(3)'),                                         // later change this to qa-element tag
        showIconByIndex: (index) => cy.get(`[qa-element="notification-show-${index}"]`),

        // Notification pop-up
        notificationModal: () => cy.get('[class*="Modal_modalDialog"]'),                            // later change this to qa-element tag
        notificationModalTitle: () => cy.get('[class*="AppNotificationModal_headerInner"]'),        // later change this to qa-element tag
        notificationModalText: () => cy.get('[class*="AppNotificationModal_appNotificationModal__text"]'),  // later change this to qa-element tag
        modalCloseIcon: () => cy.get('[qa-element="modal-close"]'),
        modalCloseBtn: () => cy.get('[qa-element="notification-close"]'),

        // Pagination
        pageSizeDropdownList: () => cy.get('[qa-element="undefined-toggle"]'),                     // qa-element has 'undefined' name on panel side
        pageSizeOption: (size) => cy.contains('[qa-element^="undefined-"]:not([qa-element="undefined-toggle"])', this.exactText(String(size))),
        pageSizeLbl: () => cy.contains('Элементов на странице'),                                    // later change this to qa-element tag
        paginationPageBtn: (number) => cy.contains('[class*="TablePagination_paginationInner"] button', this.exactText(String(number))),   // later change this to qa-element tag
    }

    actions = {
        openNotificationListPage: () => {
            this.elements.settings_icon().scrollIntoView()          // Settings is at the bottom of sidebar, hidden without scroll
            this.elements.settings_icon().click({ force: true })    // separate query - sidebar re-renders after login, chained click hits detached element
            this.elements.notificationList_icon().click()
            cy.url().should('include', '/settings/notifications-list')
            this.elements.pageTitleLbl().should('contain.text', 'Список уведомлений')
        },
        checkNotificationsResponse: (page, size) => {            // panel sends the list request twice on load - skip requests of other page/size
            return cy.wait('@notificationsList', { timeout: 30000 }).then(({ request, response }) => {
                const params = new URL(request.url).searchParams
                if ((page !== undefined && params.get('page') !== String(page)) || (size !== undefined && params.get('size') !== String(size))) {
                    return this.actions.checkNotificationsResponse(page, size)
                }
                expect(response.statusCode).to.eq(200)
                expect(response.body.error).to.eq(0)
                return response.body.data
            })
        },
        checkRowsCount: (count) => {
            this.elements.tableRows().should('have.length', count)
        },
        checkFirstRowSubject: (subject) => {
            this.elements.subjectCells().first().should('have.text', subject)
        },

        // Notification pop-up
        clickShowIconByIndex: (index) => {
            this.elements.showIconByIndex(index).should('be.visible').click()
        },
        checkNotificationModal: (subject, text) => {
            this.elements.notificationModal().should('be.visible')
            this.elements.notificationModalTitle().should('contain.text', subject)
            this.elements.notificationModalText().should('contain.text', text)
        },
        clickModalCloseBtn: () => {
            this.elements.modalCloseBtn().should('be.visible').click()
        },
        clickModalCloseIcon: () => {
            this.elements.modalCloseIcon().should('be.visible').click()
        },
        isNotVisibleNotificationModal: () => {
            this.elements.notificationModal().should('not.exist')
        },

        // Date created column
        checkDateFormat: () => {
            this.elements.dateCells().each(($cell) => {
                expect($cell.text().trim()).to.match(/^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/)
            })
        },
        checkFirstRowDate: (dispatchDate) => {             // API returns UTC, panel shows browser local time
            const date = new Date(dispatchDate)
            const pad = (value) => String(value).padStart(2, '0')
            const expected = `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`
            this.elements.dateCells().first().should('have.text', expected)
        },

        // Vertical scrolling
        scrollToLastRow: () => {
            this.elements.tableRows().last().scrollIntoView()
            this.elements.tableRows().last().should('be.visible')
            this.elements.pageSizeLbl().should('be.visible')
        },

        // Pagination
        isVisiblePagination: (size) => {
            this.elements.pageSizeDropdownList().should('be.visible').and('contain.text', size)
            this.elements.pageSizeLbl().should('be.visible')
            this.elements.paginationPageBtn(1).should('be.visible')
        },
        selectPageSize: (size) => {
            this.elements.pageSizeDropdownList().should('be.visible').click()
            this.elements.pageSizeOption(size).should('be.visible').click()
            this.elements.pageSizeDropdownList().should('contain.text', size)
        },
        clickPaginationPageBtn: (number) => {
            this.elements.paginationPageBtn(number).should('be.visible').click()
        },
        checkActivePage: (number) => {
            this.elements.paginationPageBtn(number).should('be.disabled')       // active page button is disabled
        },
    }
}
module.exports = new NotificationList()
