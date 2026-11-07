cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import main_page from "../pages/main_page";

describe('39.Main Page Tests', () => {
    let configData;

    function openMainPage() {
        cy.login(configData.base_url, configData.login, configData.password)
        return main_page.actions.getMainPagePath()
    }

    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        main_page.actions.trackPanelRequests()
    })

    it('[PD-647] Main Page - Pro-Data logo (successful)', () => {
        openMainPage()
        main_page.actions.isVisibleLogo()
    })
    it('[PD-648] Main Page - Default project display (successful)', () => {
        openMainPage()
        main_page.actions.selectProjectByName(configData.main_project_name, configData.main_project_owner)
    })
    it('[PD-649] Main Page - List of projects: change to another project (successful)', () => {
        openMainPage()
        main_page.actions.openProjectList()
        main_page.actions.getProjects().then((projects) => {
            if (!projects.other) {
                cy.log('user has only one project, switching is not checked')
                return
            }
            main_page.actions.selectProject(projects.other)
            main_page.actions.openProjectList()                                     // switch back - other specs expect default project
            main_page.actions.selectProject(projects.current)
        })
    })
    it('[PD-651] Main Page - List of projects: Create new button (successful)', () => {
        openMainPage()
        main_page.actions.openProjectList()
        main_page.actions.clickCreateNewProjectBtn()
        main_page.actions.isOpenedProjectsPage()                                    // project is not created
    })
    it('[PD-652] Main Page - Locations: list display (successful)', () => {
        openMainPage()
        main_page.actions.openRegionList()
        main_page.actions.getRegions().then((regions) => {
            main_page.actions.checkCurrentRegion(regions.current.name)
            main_page.actions.checkRegionListContains(regions.current)
        })
    })
    it('[PD-653] Main Page - Locations: change to another location (successful)', () => {
        openMainPage()
        main_page.actions.openRegionList()
        main_page.actions.getRegions().then((regions) => {
            if (!regions.other) {
                cy.log('only one location is available, switching is not checked')
                return
            }
            main_page.actions.selectRegion(regions.other)
            main_page.actions.openRegionList()                                      // switch back - other specs expect initial location
            main_page.actions.selectRegion(regions.current)
        })
    })
    it('[PD-654] Main Page - Info: Support Center (successful)', () => {
        openMainPage()
        main_page.actions.clickInfoBtn()
        main_page.actions.checkSupportCenterLink()
    })
    it('[PD-655] Main Page - Info: FAQ (successful)', () => {
        openMainPage()
        main_page.actions.clickInfoBtn()
        main_page.actions.checkFaqLink()
    })
    it('[PD-656] Main Page - Info: Telegram Support Bot (successful)', () => {
        openMainPage()
        main_page.actions.clickInfoBtn()
        main_page.actions.checkTelegramBotLink()
    })
    it('[PD-657] Main Page - Notifications: list display (successful)', () => {
        openMainPage()
        main_page.actions.clickNotificationsBellBtn()
        main_page.actions.isVisibleNotificationsDropdown()
    })
    it('[PD-658] Main Page - Notifications: Show all (successful)', () => {
        openMainPage()
        main_page.actions.clickNotificationsBellBtn()
        main_page.actions.clickNotificationsShowAllBtn()
        main_page.actions.isOpenedNotificationListPage()
    })
    it('[PD-660] Main Page - Account: Full Name and email display (successful)', () => {
        openMainPage()
        main_page.actions.openUserMenu()
        main_page.actions.checkUserMenuInfo(configData.login)
    })
    it('[PD-661] Main Page - Account: Languages: changing to EN (successful)', () => {
        openMainPage()
        main_page.actions.openUserMenu()
        main_page.actions.clickLanguageBtn('en')
        main_page.actions.checkPageTitle('Main Page')
        main_page.actions.clickLanguageBtn('ru')                                    // switch back - other specs assert russian text
        main_page.actions.checkPageTitle('Главная страница')
    })
    it('[PD-662] Main Page - Account: Languages: changing to RU (successful)', () => {
        openMainPage()
        main_page.actions.openUserMenu()
        main_page.actions.clickLanguageBtn('en')
        main_page.actions.checkPageTitle('Main Page')
        main_page.actions.clickLanguageBtn('ru')
        main_page.actions.checkPageTitle('Главная страница')
    })
    it('[PD-659] Main Page - Account: Settings button (successful)', () => {
        openMainPage()
        sidebar.actions.clickUserIcon()
        sidebar.actions.clickSettingsIcon()
        main_page.actions.isOpenedSettingsPage()
    })
    it('[PD-663] Main Page - Account: Sign Out (successful)', () => {
        openMainPage()
        sidebar.actions.clickLogOutBtn()
        sidebar.actions.clickConfLogoutBtn()
        main_page.actions.isVisibleLoginForm()
    })
    it('[PD-1206] Main Page - Account: Sign Out: Cancel button (successful)', () => {
        openMainPage().then((mainPath) => {
            sidebar.actions.clickLogOutBtn()
            main_page.actions.clickCancelLogoutBtn()
            main_page.actions.isNotVisibleLogoutModal()
            main_page.actions.isOpenedPage(mainPath)
            main_page.actions.checkUserMenuInfo(configData.login)            // user menu stays opened, user is still logged in
        })
    })
    it('[PD-1202] Main Page - Resources & Quotas dashboard: visit each Forward link (successful)', () => {
        openMainPage().then((mainPath) => {
            main_page.actions.getQuotaForwardLinksCount().then((linksCount) => {
                Cypress._.times(linksCount, (index) => {
                    main_page.actions.clickQuotaForwardLinkByIndex(index).then((href) => {
                        main_page.actions.isOpenedPage(href)
                    })
                    main_page.actions.goBackToMainPage(mainPath)
                })
            })
        })
    })
    it('[PD-1205] Main Page - Resources & Quotas dashboard: next and previous buttons (successful)', () => {
        openMainPage()
        main_page.actions.isDisabledQuotaPrevBtn()
        main_page.actions.getFirstQuotaCardLeft().then((initialLeft) => {
            main_page.actions.clickQuotaNextBtn()
            main_page.actions.checkFirstQuotaCardMovedLeft(initialLeft)
            main_page.actions.isEnabledQuotaPrevBtn()
            main_page.actions.clickQuotaPrevBtn()
            main_page.actions.checkFirstQuotaCardLeft(initialLeft)
            main_page.actions.isDisabledQuotaPrevBtn()
        })
    })
    it('[PD-1203] Main Page - Create something new: visit each icon (successful)', () => {
        const itemsCount = 8
        openMainPage().then((mainPath) => {
            main_page.actions.checkCreateNewItemsCount(itemsCount)
            Cypress._.times(itemsCount, (index) => {
                main_page.actions.clickCreateNewItemByIndex(index).then((href) => {
                    main_page.actions.isOpenedPage(href)
                })
                main_page.actions.goBackToMainPage(mainPath)                        // resources are not created
                main_page.actions.checkCreateNewItemsCount(itemsCount)
            })
        })
    })
    it('[PD-1204] Main Page - Useful information: visit each Knowledge base button (successful)', () => {
        const testData = {
            vm: `https://helpdesk.pro-data.tech/portal/ru/kb/${encodeURI('виртуальные-серверы-с-панелью-управления')}`,
            k8s: 'https://helpdesk.pro-data.tech/portal/ru/kb/managed-kubernetes',
            faq: 'https://helpdesk.pro-data.tech/portal/ru/kb/faq',
        }
        openMainPage()
        main_page.actions.checkKnowledgeBaseBtnsCount(Object.keys(testData).length)
        Object.entries(testData).forEach(([name, href]) => {
            main_page.actions.checkKnowledgeBaseLink(name, href)
        })
    })
})
