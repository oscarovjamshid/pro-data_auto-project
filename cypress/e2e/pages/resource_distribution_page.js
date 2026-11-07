class ResourceDistribution {
    exactText = (text) => new RegExp(`^\\s*${Cypress._.escapeRegExp(text)}\\s*$`)
    // project = { name, owner } - several projects can have the same name (e.g. 'Default project' of child user)
    isProjectOption = (el, project) => el.innerText.includes(project.name) && el.innerText.includes(project.owner)
    projectOption = (selector, project, options = {}) => cy.get(selector, options).filter((i, el) => this.isProjectOption(el, project)).first()

    elements = {
        settings_icon: () => cy.get('[qa-element="nav_link_account"]', { timeout: 30000 }).first(),
        distribution_icon: () => cy.get('[qa-element="nav_link_resources"]', { timeout: 30000 }),
        pageTitleLbl: () => cy.get('[qa-element="resources"]', { timeout: 30000 }),
        projectDropdownList: () => cy.get('[qa-element="project-selector"]').first(),
        projectDropdownOptions: () => cy.get('button[qa-element^="project-"]:visible:not([qa-element="project-selector"]):not([qa-element^="project-resource-filter"])'),
        projectDropdownOption: (project) => this.projectOption('button[qa-element^="project-"]:visible:not([qa-element="project-selector"]):not([qa-element^="project-resource-filter"])', project),
        resourceTypeDropdownList: () => cy.get('[qa-element="project-resource-filter-toggle"]'),
        resourceTypeDropdownOption: (text) => cy.get('[qa-element^="project-resource-filter-"]:not([qa-element$="-toggle"])').contains(this.exactText(text)),
        tableRows: () => cy.get('tbody tr', { timeout: 30000 }),
        resourceRowByName: (name) => cy.contains('tbody tr td', this.exactText(name), { timeout: 30000 }).parent('tr'),     // exact name: 'for-distribution' is part of 'for-distribution-test'
        resourceTypeCells: () => cy.get('tbody tr td:nth-child(3)'),                                 // later change this to qa-element tag
        projectCells: () => cy.get('tbody tr td:nth-child(4)'),                                      // later change this to qa-element tag
        checkboxRowByName: (name) => this.elements.resourceRowByName(name).find('[qa-element^="select-project-resource-"]'),
        changeProjectIconRowByName: (name) => this.elements.resourceRowByName(name).find('[qa-element^="resource-change-"]:not([qa-element^="resource-change-show"])'),
        resourceVisibilityIconRowByName: (name) => this.elements.resourceRowByName(name).find('[qa-element^="resource-change-show-"]'),

        // Move multiple resources (shown when 2+ resources are selected)
        targetProjectDropdownList: () => cy.get('[qa-element="destination-project-toggle"]'),
        targetProjectDropdownOption: (project) => this.projectOption('[qa-element^="destination-project-"]:visible:not([qa-element$="-toggle"])', project),
        moveBtn: () => cy.get('[qa-element="move-resources-show"]'),

        // Move confirmation popup
        confirmMoveTxt: (text) => cy.get('[qa-element="move-resources-submit"]').parents().eq(2).contains(text),
        confirmMoveBtn: () => cy.get('[qa-element="move-resources-submit"]'),
        cancelMoveBtn: () => cy.get('[qa-element="move-resources-cancel"]'),

        // Change project modal (single resource)
        changeProjectModalTitle: () => cy.contains('Сменить проект'),                                // later change this to qa-element tag
        changeProjectModalDropdownList: () => cy.get('[qa-element="project"] [qa-element="project-selector"]'),
        changeProjectModalDropdownOption: (project) => this.projectOption('button[qa-element^="project-"]:visible:not([qa-element="project-selector"]):not([qa-element^="project-resource-filter"])', project),
        changeProjectSubmitBtn: () => cy.get('[qa-element="resource-change-prject-submit"]'),
        modalCloseBtn: () => cy.get('[qa-element="modal-close"]'),

        // Resource visibility modal
        resourceVisibilityModalTitle: () => cy.contains('Видимость ресурса'),                        // later change this to qa-element tag
        resourceVisibilityDropdownList: () => cy.get('[qa-element="project-toggle"]'),
        resourceVisibilityProjectOption: (project) => this.projectOption('button[qa-element^="project-"]:visible:not([qa-element="project-toggle"]):not([qa-element="project-selector"]):not([qa-element^="project-resource-filter"])', project),
        resourceVisibilityAllProjectsCheckbox: () => cy.get('[qa-element="resource-all-projects"]'),
        resourceVisibilitySaveBtn: () => cy.get('[qa-element="resource-change-submit"]'),

        // Pagination
        pageSizeDropdownList: () => cy.get('[qa-element="undefined-toggle"]'),                     // qa-element has 'undefined' name on panel side
        pageSizeLbl: () => cy.contains('Элементов на странице'),                                    // later change this to qa-element tag
        paginationPageBtn: (number) => cy.contains('button:not([qa-element])', this.exactText(String(number))),   // later change this to qa-element tag


        // Project selector in services sidebar
        sidebarProjectDropdownList: () => cy.get('[qa-element="project-selector"]', { timeout: 30000 }).first({ timeout: 30000 }),     // sidebar is re-rendered after project change
        sidebarProjectOption: (project) => this.projectOption('button[qa-element^="project-"]:visible:not([qa-element="project-selector"])', project, { timeout: 10000 }),
    }

    actions = {
        openDistributionPage: () => {
            this.elements.settings_icon().scrollIntoView().click({ force: true })     // Settings is at the bottom of sidebar, hidden without scroll
            this.elements.distribution_icon().click()
            cy.url().should('include', '/settings/resources')
            this.elements.pageTitleLbl().should('contain.text', 'Распределение ресурсов по проектам')
        },

        // Project / resource type filters
        clickProjectDropdownList: () => {
            this.elements.projectDropdownList().should('be.visible').click()
        },
        selectProject: (project) => {
            this.elements.projectDropdownList().should('be.visible').click()
            this.elements.projectDropdownOption(project).should('be.visible').click()
        },
        checkProjectDropdownListText: (project) => {
            this.elements.projectDropdownList().should('contain.text', project.name).and('contain.text', project.owner)
        },
        isVisibleProjectDropdownOptions: () => {
            this.elements.projectDropdownOptions().should('have.length.greaterThan', 0)
        },
        getProjects: () => {                                         // all projects from dropdown list as { name, owner }
            let projects
            this.elements.projectDropdownList().should('be.visible').click()
            this.elements.projectDropdownOptions().then(($options) => {
                projects = [...$options].map((option) => {
                    const [name, owner] = option.innerText.split('\n').map((line) => line.trim())     // option has project name + owner
                    return { name, owner }
                })
            })
            this.elements.projectDropdownList().click()                   // close list
            return cy.then(() => projects)
        },
        selectPageSize: (size) => {
            this.elements.pageSizeDropdownList().should('be.visible').click()
            cy.get('[qa-element^="undefined-"]:not([qa-element$="-toggle"])').contains(this.exactText(String(size))).click()
        },
        getProjectUnderMainProject: (mainProject) => {               // target project - the one right under main project in project dropdown list
            return this.actions.getProjects().then((projects) => {
                const mainIndex = projects.findIndex((project) => project.name === mainProject.name && project.owner === mainProject.owner)
                expect(mainIndex, 'main project in list').to.be.greaterThan(-1)
                const targetProject = projects[mainIndex + 1]
                expect(targetProject, 'project under main project').to.exist
                return targetProject
            })
        },
        selectResourceType: (text) => {
            this.elements.resourceTypeDropdownList().should('be.visible').click()
            this.elements.resourceTypeDropdownOption(text).scrollIntoView().should('be.visible').click()
        },
        checkResourceTypeDropdownListText: (text) => {
            this.elements.resourceTypeDropdownList().should('contain.text', text)
        },

        // API checks - list request must be successful and contain only the expected type
        checkResourcesResponse: (apiType) => {
            return cy.wait('@resourcesList', { timeout: 30000 }).then(({ request, response }) => {
                expect(response.statusCode).to.eq(200)
                expect(response.body.success).to.eq(true)
                if (apiType) {
                    expect(request.url).to.include(`type=${apiType}`)
                    response.body.data.content.forEach((resource) => {
                        expect(resource.type, `type of ${resource.name}`).to.eq(apiType)
                    })
                }
                return response.body.data
            })
        },
        checkResourceInResponse: (data, name, apiType) => {
            const resource = data.content.find((item) => item.name === name)
            expect(resource, `${name} in API response`).to.exist
            expect(resource.type).to.eq(apiType)
        },

        // Table
        isVisibleResourceRowByName: (name) => {
            this.elements.resourceRowByName(name).should('be.visible')
        },
        isNotVisibleResourceRowByName: (name) => {
            cy.contains('tbody tr td', this.exactText(name)).should('not.exist')
        },
        checkAllRowsResourceType: (label) => {
            this.elements.resourceTypeCells().should(($cells) => {          // retries until table is re-rendered after filter
                [...$cells].forEach((cell) => expect(cell.innerText.trim()).to.eq(label))
            })
        },
        checkAllRowsProject: (projectName) => {
            this.elements.projectCells().should(($cells) => {
                [...$cells].forEach((cell) => expect(cell.innerText.trim()).to.eq(projectName))
            })
        },
        checkRowsCount: (count) => {
            this.elements.tableRows().should('have.length', count)
        },
        clickCheckboxRowByName: (name) => {
            this.elements.checkboxRowByName(name).click()
        },

        // Move multiple resources
        selectTargetProject: (project) => {
            this.elements.targetProjectDropdownList().should('be.visible').click()
            this.elements.targetProjectDropdownOption(project).should('be.visible').click()
            this.elements.targetProjectDropdownList().should('contain.text', project.name)
        },
        clickMoveBtn: () => {
            this.elements.moveBtn().should('be.enabled').click()
        },
        checkConfirmMoveTxt: (projectName) => {
            this.elements.confirmMoveTxt(`Указанные вами ресурсы будут перенесены в проект ${projectName}`).should('be.visible')
        },
        clickConfirmMoveBtn: () => {
            this.elements.confirmMoveBtn().should('be.visible').click()
        },
        clickCancelMoveBtn: () => {
            this.elements.cancelMoveBtn().should('be.visible').click()
            this.elements.confirmMoveBtn().should('not.exist')
        },

        // Change project (single resource)
        clickChangeProjectIconRowByName: (name) => {
            this.elements.changeProjectIconRowByName(name).should('be.visible').click()
            this.elements.changeProjectModalTitle().should('be.visible')
        },
        selectChangeProjectModalProject: (project) => {
            this.elements.changeProjectModalDropdownList().should('be.visible').click()
            this.elements.changeProjectModalDropdownOption(project).should('be.visible').click()
        },
        clickChangeProjectSubmitBtn: () => {
            this.elements.changeProjectSubmitBtn().should('be.enabled').click()
        },
        isDisabledChangeProjectSubmitBtn: () => {
            this.elements.changeProjectSubmitBtn().should('be.disabled')
        },
        clickModalCloseBtn: () => {
            this.elements.modalCloseBtn().should('be.visible').click()
        },
        isNotVisibleModal: () => {
            this.elements.modalCloseBtn().should('not.exist')
        },

        // Resource visibility
        clickResourceVisibilityIconRowByName: (name) => {
            this.elements.resourceVisibilityIconRowByName(name).should('be.visible').click()
            this.elements.resourceVisibilityModalTitle().should('be.visible')
            cy.wait('@netVisibility').its('response.statusCode').should('eq', 200)     // checkboxes are reset when current visibility is loaded
        },
        clickResourceVisibilityDropdownList: () => {
            this.elements.resourceVisibilityDropdownList().should('be.visible').click()
        },
        clickResourceVisibilityProjectOption: (project) => {
            this.elements.resourceVisibilityProjectOption(project).should('be.visible').click()
        },
        isCheckedResourceVisibilityProject: (project) => {
            this.elements.resourceVisibilityProjectOption(project).find('input[type="checkbox"]').should('be.checked')
        },
        isNotCheckedResourceVisibilityProject: (project) => {
            this.elements.resourceVisibilityProjectOption(project).find('input[type="checkbox"]').should('not.be.checked')
        },
        clickResourceVisibilitySaveBtn: () => {
            this.elements.resourceVisibilitySaveBtn().should('be.enabled').click()
        },

        // Pagination
        isVisiblePagination: () => {
            this.elements.pageSizeDropdownList().should('be.visible').and('contain.text', '10')
            this.elements.pageSizeLbl().should('be.visible')
            this.elements.paginationPageBtn(1).should('be.visible')
        },
        clickPaginationPageBtn: (number) => {
            this.elements.paginationPageBtn(number).should('be.visible').click()
        },
        checkActivePage: (number) => {
            this.elements.paginationPageBtn(number).should('be.disabled')       // active page button is disabled
        },

        selectSidebarProject: (project) => {                         // switches current project of the panel
            this.elements.sidebarProjectDropdownList().scrollIntoView()       // sidebar can be scrolled down
            this.elements.sidebarProjectDropdownList().should('be.visible').and(($toggle) => {
                expect($toggle.text().trim()).not.to.be.empty           // project name is loaded
            })
            this.elements.sidebarProjectDropdownList().then(($toggle) => {
                if (this.isProjectOption($toggle[0], project)) return    // already current project
                this.elements.sidebarProjectDropdownList().click()
                this.elements.sidebarProjectOption(project).should('be.visible').then(($option) => {
                    if ($option.is(':disabled')) {                   // current project option is disabled - just close list
                        this.elements.sidebarProjectDropdownList().click()
                        return
                    }
                    cy.wrap($option).click()
                })
                this.elements.sidebarProjectDropdownList().should('contain.text', project.name).and('contain.text', project.owner)
            })
        },
    }
}
module.exports = new ResourceDistribution()
