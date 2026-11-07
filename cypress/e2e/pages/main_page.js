class MainPage {
    elements = {
        // Navbar
        logoImg: () => cy.get('[class*="SideMenu_linksList"] > svg[class*="SideMenu_logo"]', { timeout: 30000 }),     // later change this to qa-element tag
        pageTitleLbl: () => cy.get('[qa-element="breadcrumbs"] h1', { timeout: 30000 }),

        // Projects
        projectSelector: () => cy.get('[qa-element="project-selector"]', { timeout: 30000 }),
        projectList: () => cy.get('[class*="ProjectDropdown_container"]'),                         // later change this to qa-element tag
        projectOptions: () => cy.get('button[qa-element^="project-"]:not([qa-element="project-selector"])'),
        projectOptionById: (qaElement) => cy.get(`[qa-element="${qaElement}"]`),
        createNewProjectBtn: () => cy.get('[qa-element="project-create-new"]'),

        // Locations
        regionSelector: () => cy.get('[qa-element="region-selector"]', { timeout: 30000 }),
        regionList: () => cy.get('[qa-element="region-selector"] + [class*="ProjectSelector_menu"]'),   // later change this to qa-element tag
        regionOptions: () => cy.get('button[qa-element^="region-"]:not([qa-element="region-selector"])'),
        regionOptionById: (qaElement) => cy.get(`[qa-element="${qaElement}"]`),

        // Info
        infoBtn: () => cy.get('[class*="HelpCard_toggle"]'),                                        // later change this to qa-element tag
        infoPopover: () => cy.get('[qa-element="help-card-popover"]'),
        supportCenterLink: () => cy.get('[qa-element="help-card-support"]'),
        faqLink: () => cy.get('[qa-element="help-card-faq"]'),
        telegramBotLink: () => cy.get('[qa-element="help-card-telegram"]'),

        // Notifications
        notificationsBellBtn: () => cy.get('[class*="Header_actions"] > button[class*="NavLink_onlyIcon"]:not([class*="HelpCard_toggle"])'),     // later change this to qa-element tag
        notificationsDropdown: () => cy.get('[qa-element="app-notifications-list"]'),
        notificationItems: () => cy.get('[qa-element="app-notifications-list"] [qa-element="show-notification"]'),
        notificationsShowAllBtn: () => cy.get('[qa-element="app-notifications-list"] a[href="/settings/notifications-list"]'),     // later change this to qa-element tag
        notificationTableLbl: () => cy.get('[qa-element="app-notification-table"]', { timeout: 30000 }),

        // Account
        userMenuToggle: () => cy.get('[qa-element="user-menu-toggle"]'),
        userMenu: () => cy.get('[qa-element="user-menu"]'),
        userMenuNameLbl: () => cy.get('[qa-element="user-menu"] [class*="UserCard_name"]'),       // later change this to qa-element tag
        userMenuLoginLbl: () => cy.get('[qa-element="user-menu"] [class*="UserCard_login"]'),     // later change this to qa-element tag
        languageBtn: (lang) => cy.get(`[qa-element="lang-switcher-${lang === 'en' ? 1 : 0}"]`),  // 0 - RU, 1 - EN
        loginTxt: () => cy.get('[qa-element="auth-email"]', { timeout: 30000 }),
        cancelLogoutBtn: () => cy.get('[qa-element="cancel-logout"]'),
        confirmLogoutBtn: () => cy.get('[qa-element="confirm-logout"]'),

        // Resources and Quotas
        quotaCards: () => cy.get('[class*="CloudPlatform_card__"]', { timeout: 30000 }),           // later change this to qa-element tag
        quotaForwardLinks: () => cy.get('[qa-element^="resource_"][qa-element$="_link"]'),
        quotaPrevBtn: () => cy.get('[qa-element="resources_slider_left_arrow"]'),
        quotaNextBtn: () => cy.get('[qa-element="resources_slider_right_arrow"]'),

        // Create something new
        createNewItems: () => cy.get('[qa-element^="create_/"]', { timeout: 30000 }),

        // Useful information
        knowledgeBaseBtns: () => cy.get('[qa-element^="useful_info_"]', { timeout: 30000 }),
        knowledgeBaseBtn: (name) => cy.get(`[qa-element="useful_info_${name}_knowledge_base"]`),       // name: vm, k8s, faq

        sidebarLoadedLbl: () => cy.get('[qa-element="nav_link_servers"]', { timeout: 30000 }),
    }

    actions = {
        trackPanelRequests: () => {
            this.lastPanelRequestAt = Date.now()
            cy.intercept('GET', '**/panel-main/api/panel/backup/quotas*', () => {
                this.lastPanelRequestAt = Date.now()
            })
        },
        waitForPanelToLoad: () => {     // panel re-renders on each backup/quotas request and closes opened menus
            cy.waitUntil(() => Date.now() - this.lastPanelRequestAt > 3000, {
                timeout: 30000,
                interval: 500,
                errorMsg: 'Panel did not finish loading within 30000ms'
            })
        },
        getMainPagePath: () => {
            this.elements.quotaCards().should('have.length.greaterThan', 0)
            this.actions.waitForPanelToLoad()
            return cy.location('pathname')
        },

        // Navbar
        isVisibleLogo: () => {
            this.elements.logoImg().should('be.visible')
        },
        checkPageTitle: (text) => {
            this.elements.pageTitleLbl().should('be.visible').and('have.text', text)
        },

        // Projects
        checkCurrentProject: (projectName, ownerName) => {
            this.elements.projectSelector().should('be.visible').and('contain.text', projectName).and('contain.text', ownerName)
        },
        clickProjectSelector: () => {
            this.elements.projectSelector().should('be.visible').click()
        },
        openProjectList: () => {
            this.actions.clickProjectSelector()
            this.elements.projectList().should('be.visible')
        },
        isNotVisibleProjectList: () => {
            this.elements.projectList().should('not.be.visible')
        },
        getProjects: () => {                    // current project is disabled in the list, returns { current, other } - other is undefined if user has only one project
            return this.elements.projectOptions().should('have.length.greaterThan', 0).then(($options) => {
                const toProject = (option) => ({
                    id: option.getAttribute('qa-element'),
                    name: option.querySelector('span > span:first-child').innerText.trim(),
                    owner: option.querySelector('span > span:last-child').innerText.trim(),
                })
                const current = [...$options].find((option) => option.disabled)
                const other = [...$options].find((option) => !option.disabled)
                return { current: toProject(current), other: other && toProject(other) }
            })
        },
        selectProject: (project) => {
            this.elements.projectOptionById(project.id).should('be.enabled').click()
            this.actions.checkCurrentProject(project.name, project.owner)
            this.actions.isNotVisibleProjectList()
            this.actions.waitForPanelToLoad()
        },
        selectProjectByName: (name, owner) => {         // panel remembers last selected project, names are not unique - owner is checked too
            this.actions.openProjectList()
            this.elements.projectOptions().filter((index, option) => {
                return option.querySelector('span > span:first-child').innerText.trim() === name
                    && option.querySelector('span > span:last-child').innerText.trim() === owner
            }).should('have.length', 1).then(($option) => {
                if ($option.is(':disabled')) {
                    this.actions.clickProjectSelector()         // already current project - just close the list
                } else {
                    cy.wrap($option).click()
                }
            })
            this.actions.isNotVisibleProjectList()
            this.actions.checkCurrentProject(name, owner)
        },
        clickCreateNewProjectBtn: () => {
            this.elements.createNewProjectBtn().should('be.visible').click()
        },
        isOpenedProjectsPage: () => {
            cy.location('pathname', { timeout: 30000 }).should('eq', '/settings/projects')
        },

        // Locations
        openRegionList: () => {
            this.elements.regionSelector().should('be.visible').click()
            this.elements.regionList().should('be.visible')
        },
        getRegions: () => {                     // current region is disabled in the list, returns { current, other } - other is undefined if only one region is available
            return this.elements.regionOptions().should('have.length.greaterThan', 0).then(($options) => {
                const toRegion = (option) => ({ id: option.getAttribute('qa-element'), name: option.innerText.trim() })
                const current = [...$options].find((option) => option.disabled)
                const other = [...$options].find((option) => !option.disabled)
                return { current: toRegion(current), other: other && toRegion(other) }
            })
        },
        checkCurrentRegion: (name) => {
            this.elements.regionSelector().should('have.text', name)
        },
        checkRegionListContains: (region) => {
            this.elements.regionOptionById(region.id).should('be.visible').and('have.text', region.name)
        },
        selectRegion: (region) => {
            this.elements.regionOptionById(region.id).should('be.enabled').click()
            this.actions.checkCurrentRegion(region.name)
            this.elements.quotaCards().should('have.length.greaterThan', 0)       // quotas are reloaded for the new region
            this.actions.waitForPanelToLoad()
        },

        // Info
        clickInfoBtn: () => {
            this.elements.infoBtn().should('be.visible').click()
            this.elements.infoPopover().should('be.visible')
        },
        checkExternalLink: (link, href) => {            // external pages are not opened - only href and new tab are checked
            link().should('be.visible').and('have.attr', 'target', '_blank')
            link().should('have.attr', 'href', href)
        },
        checkSupportCenterLink: () => {
            this.actions.checkExternalLink(this.elements.supportCenterLink, 'https://helpdesk.pro-data.tech')
        },
        checkFaqLink: () => {
            this.actions.checkExternalLink(this.elements.faqLink, 'https://helpdesk.pro-data.tech/portal/ru/kb/faq')
        },
        checkTelegramBotLink: () => {
            this.actions.checkExternalLink(this.elements.telegramBotLink, 'https://t.me/PRO_DATA_Support_Bot')
        },

        // Notifications
        clickNotificationsBellBtn: () => {
            this.elements.notificationsBellBtn().should('be.visible').click()
        },
        isVisibleNotificationsDropdown: () => {
            this.elements.notificationsDropdown().should('be.visible').and('contain.text', 'Список уведомлений')
            this.elements.notificationItems().should('have.length.greaterThan', 0)
        },
        clickNotificationsShowAllBtn: () => {
            this.elements.notificationsShowAllBtn().should('be.visible').click()
        },
        isOpenedNotificationListPage: () => {
            cy.location('pathname', { timeout: 30000 }).should('eq', '/settings/notifications-list')
            this.elements.notificationTableLbl().should('contain.text', 'Список уведомлений')
        },

        // Account
        openUserMenu: () => {
            this.elements.userMenuToggle().should('be.visible').click()
            this.elements.userMenu().should('be.visible')
        },
        checkUserMenuInfo: (email) => {             // full name differs per account - only checked that it is shown above email
            this.elements.userMenuNameLbl().should('be.visible').invoke('text').invoke('trim').should('not.be.empty')
            this.elements.userMenuLoginLbl().should('be.visible').and('have.text', email)
            this.elements.userMenuNameLbl().next().should('have.text', email)          // name is right above email
        },
        clickLanguageBtn: (lang) => {           // user menu stays opened after language change
            this.elements.languageBtn(lang).should('be.visible').click()
            this.elements.languageBtn(lang).should('have.attr', 'data-active', 'true')
        },
        isOpenedSettingsPage: () => {
            cy.location('pathname', { timeout: 30000 }).should('eq', '/settings/account')
            cy.get('[qa-element="nav_link_account"]', { timeout: 30000 }).should('be.visible')
        },
        isVisibleLoginForm: () => {
            this.elements.loginTxt().should('be.visible')
        },
        clickCancelLogoutBtn: () => {
            this.elements.cancelLogoutBtn().should('be.visible').click()
        },
        isNotVisibleLogoutModal: () => {
            this.elements.confirmLogoutBtn().should('not.exist')
        },

        // Resources and Quotas
        getQuotaForwardLinksCount: () => {
            return this.elements.quotaForwardLinks().should('have.length.greaterThan', 0).its('length')
        },
        clickQuotaForwardLinkByIndex: (index) => {          // returns href of the clicked link
            return this.elements.quotaForwardLinks().eq(index).invoke('attr', 'href').then((href) => {
                this.elements.quotaForwardLinks().eq(index).click({ force: true })      // cards behind the slider edge are clipped
                return cy.wrap(href)
            })
        },
        goBackToMainPage: (mainPath) => {           // no cy.visit - page reload logs user out (refresh-token 401)
            cy.go('back')
            cy.location('pathname', { timeout: 30000 }).should('eq', mainPath)
            this.elements.quotaCards().should('have.length.greaterThan', 0)
        },
        getFirstQuotaCardLeft: () => {
            return this.elements.quotaCards().first().then(($card) => $card[0].getBoundingClientRect().left)
        },
        isDisabledQuotaPrevBtn: () => {
            this.elements.quotaPrevBtn().should('be.disabled')
        },
        isEnabledQuotaPrevBtn: () => {
            this.elements.quotaPrevBtn().should('be.enabled')
        },
        clickQuotaNextBtn: () => {
            this.elements.quotaNextBtn().should('be.enabled').click()
        },
        clickQuotaPrevBtn: () => {
            this.elements.quotaPrevBtn().should('be.enabled').click()
        },
        checkFirstQuotaCardMovedLeft: (initialLeft) => {        // slider moves cards with animation - should() retries until it ends
            this.elements.quotaCards().first().should(($card) => {
                expect($card[0].getBoundingClientRect().left).to.be.lessThan(initialLeft)
            })
        },
        checkFirstQuotaCardLeft: (initialLeft) => {
            this.elements.quotaCards().first().should(($card) => {
                expect(Math.round($card[0].getBoundingClientRect().left)).to.eq(Math.round(initialLeft))
            })
        },

        // Create something new
        checkCreateNewItemsCount: (count) => {
            this.elements.createNewItems().should('have.length', count)
        },
        clickCreateNewItemByIndex: (index) => {             // returns href of the clicked item
            this.elements.createNewItems().eq(index).parent().find('svg').should('be.visible')        // icon is next to the link
            return this.elements.createNewItems().eq(index).invoke('attr', 'href').then((href) => {
                this.elements.createNewItems().eq(index).click()
                return cy.wrap(href)
            })
        },
        isOpenedPage: (path) => {
            cy.location('pathname', { timeout: 30000 }).should('eq', path)
            this.elements.sidebarLoadedLbl().should('exist')        // some items open page with create modal over the sidebar
        },

        // Useful information
        checkKnowledgeBaseBtnsCount: (count) => {
            this.elements.knowledgeBaseBtns().should('have.length', count)
        },
        checkKnowledgeBaseLink: (name, href) => {       // helpdesk is external and slow - only href and new tab are checked
            this.actions.checkExternalLink(() => this.elements.knowledgeBaseBtn(name), href)
        },
    }
}
module.exports = new MainPage()
