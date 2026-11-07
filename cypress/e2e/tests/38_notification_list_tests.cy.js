cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import notification_list_page from "../pages/notification_list_page";

describe('38.Notification List Tests', () => {
    let configData;

    function openNotificationList() {
        cy.login(configData.base_url, configData.login, configData.password)
        notification_list_page.actions.openNotificationListPage()
        return notification_list_page.actions.checkNotificationsResponse(0).then((data) => {
            cy.wait('@notificationsList')       // panel sends list request twice on load, late 2nd response overwrites table if page/size changed before it
            return cy.wrap(data)
        })
    }

    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('GET', '**/panel-main/api/user/notifications/all?*').as('notificationsList');
    })

    it('[PD-643] Notification List - View notification (successful)', () => {
        openNotificationList().then((data) => {
            const notification = data.list[0]
            notification_list_page.actions.clickShowIconByIndex(0)
            notification_list_page.actions.checkNotificationModal(notification.subjectText, notification.notificationText)
        })
    })
    it('[PD-644] Notification List - View Notification pop-up - Close button (successful)', () => {
        openNotificationList().then((data) => {
            notification_list_page.actions.clickShowIconByIndex(0)
            notification_list_page.actions.checkNotificationModal(data.list[0].subjectText, data.list[0].notificationText)
            notification_list_page.actions.clickModalCloseBtn()
            notification_list_page.actions.isNotVisibleNotificationModal()
        })
    })
    it('[PD-645] Notification List - View Notification pop-up - X icon (successful)', () => {
        openNotificationList().then((data) => {
            notification_list_page.actions.clickShowIconByIndex(0)
            notification_list_page.actions.checkNotificationModal(data.list[0].subjectText, data.list[0].notificationText)
            notification_list_page.actions.clickModalCloseIcon()
            notification_list_page.actions.isNotVisibleNotificationModal()
        })
    })
    it('[PD-1198] Notification List - Date created column: date and time format (successful)', () => {
        openNotificationList().then((data) => {
            notification_list_page.actions.checkRowsCount(data.list.length)
            notification_list_page.actions.checkDateFormat()
            notification_list_page.actions.checkFirstRowDate(data.list[0].dispatchDate)
        })
    })
    it('[PD-646] Notification List - Vertical scrolling (successful)', () => {
        openNotificationList().then((data) => {
            notification_list_page.actions.checkRowsCount(data.list.length)
            notification_list_page.actions.scrollToLastRow()
        })
    })
    it('[PD-1148] Notification List - Footer: Items per page (successful)', () => {
        openNotificationList().then((data) => {
            const defaultSize = data.size
            notification_list_page.actions.isVisiblePagination(defaultSize)
            ;[10, 50, 100].filter((size) => size !== defaultSize).concat(defaultSize).forEach((size) => {     // last one returns default size back
                notification_list_page.actions.selectPageSize(size)
                notification_list_page.actions.checkNotificationsResponse(0, size).then((page) => {
                    expect(page.list.length).to.eq(Math.min(size, page.totalElements))
                    notification_list_page.actions.checkRowsCount(page.list.length)
                    notification_list_page.actions.checkActivePage(1)
                })
            })
        })
    })
    it('[PD-1149] Notification List - Footer: the last page button (successful)', () => {
        openNotificationList().then((firstPage) => {
            if (firstPage.totalPages <= 1) {
                cy.log('only one page of notifications, navigation is not checked')
                return
            }
            notification_list_page.actions.clickPaginationPageBtn(firstPage.totalPages)
            notification_list_page.actions.checkNotificationsResponse(firstPage.totalPages - 1).then((lastPage) => {
                expect(lastPage.list.length).to.eq(firstPage.totalElements - firstPage.size * (firstPage.totalPages - 1))
                notification_list_page.actions.checkActivePage(firstPage.totalPages)
                notification_list_page.actions.checkRowsCount(lastPage.list.length)
            })
        })
    })
    it('[PD-1150] Notification List - Footer: the first page button (successful)', () => {
        openNotificationList().then((firstPage) => {
            if (firstPage.totalPages <= 1) {
                cy.log('only one page of notifications, navigation is not checked')
                return
            }
            notification_list_page.actions.clickPaginationPageBtn(firstPage.totalPages)
            notification_list_page.actions.checkNotificationsResponse(firstPage.totalPages - 1)
            notification_list_page.actions.checkActivePage(firstPage.totalPages)
            notification_list_page.actions.clickPaginationPageBtn(1)
            notification_list_page.actions.checkNotificationsResponse(0).then((data) => {
                notification_list_page.actions.checkActivePage(1)
                notification_list_page.actions.checkRowsCount(data.list.length)
                notification_list_page.actions.checkFirstRowSubject(firstPage.list[0].subjectText)
            })
        })
    })
    it('[PD-1151] Notification List - Footer: any page (successful)', () => {
        openNotificationList().then((firstPage) => {
            if (firstPage.totalPages <= 1) {
                cy.log('only one page of notifications, navigation is not checked')
                return
            }
            notification_list_page.actions.clickPaginationPageBtn(2)
            notification_list_page.actions.checkNotificationsResponse(1).then((secondPage) => {
                expect(secondPage.page).to.eq(1)
                notification_list_page.actions.checkActivePage(2)
                notification_list_page.actions.checkRowsCount(secondPage.list.length)
                notification_list_page.actions.checkFirstRowSubject(secondPage.list[0].subjectText)
            })
        })
    })
})
