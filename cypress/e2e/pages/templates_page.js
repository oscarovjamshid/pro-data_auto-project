class Templates {
    elements = {
        customOS_icon: () => cy.get('[qa-element="nav_link_templates"]'),
        templates_tab: () => cy.get('[qa-element="backup-type-1"]'),
        actions_createTemplateBtn: () => cy.get('[qa-element="vm-open-create-template-form"]'),
        newTemplate_nameInputField: () => cy.get('[qa-element="vm-create-template-name"]'),
        newTemplate_requiredHintMsg: (text) => cy.get('[qa-element="vm-create-template-name-feedback"]').contains(text),
        newTemplate_warningMsgAboutBootDiskBeingCopied: (text) => cy.get('[qa-element="vm-create-template-warning"]').contains(text),
        newTemplate_availableToAllProjectsCheckbox: () => cy.get('[qa-element="all-projects"]'),
        newTemplate_priceText: (text) => cy.contains(text),
        newTemplate_cancelBtn: () => cy.get('[qa-element="vm-create-template-cancel"]'),
        newTemplate_createBtn: () => cy.get('[qa-element="vm-create-template-submit"]'),
        newTemplate_cancelBtnAfterCreationInConfirmationModal: () => cy.get('[qa-element="vm-create-template-close-success"]'),
        newTemplate_closeModalBtn: () => cy.get('[qa-element="modal-close"]'),
        newTemplate_notificationToastForExistingTempName: (text) => cy.get('[qa-element="toast"]').contains(text),
        addVM_customRadioBtn: () => cy.get('[qa-element="os-template-filter-users"]'),
        addVM_customDropdownList: () => cy.get('[qa-element="filtered-os-template-toggle"]'),
        addVM_customDropdownOption: (text) => cy.get('[qa-element^="filtered-os-template"]').contains(text),
        templates_tab_createdTempRowByName: (name) => cy.get('tbody').find('tr').contains(name),
        templates_tab_tempStatusRowByName: (templateName, status) => cy.getTemplateRow(templateName).within(() => { cy.get('[qa-element="status"]').should('contain', status) }),
        templates_tab_resourceVisibilityIconRowByName: (name) => cy.get('tbody').contains('tr', name).find('[qa-element^="template-change"]'),
        templates_tab_createServerIconRowByName: (name) => cy.get('tbody').contains('tr', name).find('[qa-element^="to-create-vm-user-template"]'),
        templates_tab_deleteIconRowByName: (name) => cy.get('tbody').contains('tr', name).find('[qa-element^="delete-vm-user-template"]'),
        resourceVisibilityDropdownList: () => cy.get('[qa-element="project-toggle"]'),
        resourceVisibilityProjectOptionCheckbox: (projectName) => cy.get('[qa-element="project-1"]').contains(projectName).find('input[type="checkbox"]'),
        resourceVisibilitySaveBtn: () => cy.get('[qa-element="resource-change-submit"]'),
        cancelDeleteTemplateBtn: () => cy.get('[qa-element="delete-vm-user-template-cancel"]'),
        confirmDeleteTemplateBtn: () => cy.get('[qa-element="delete-vm-user-template-submit"]'),
    }

    actions = {
        // Create Template functions in the Add VM page
        clickTemplatesTab: () => {
            this.elements.customOS_icon().click()
            this.elements.templates_tab().click()
        },
        clickCreateTemplateBtnInActionsMenu: () => {
            this.elements.actions_createTemplateBtn().should('be.visible').click()
        },
        typeTemplateName: (name) => {
            this.elements.newTemplate_nameInputField().should('be.visible').type(name)
        },
        isDisabledCreateTemplateBtn: () => {
            this.elements.newTemplate_createBtn().should('be.disabled')
        },
        isVisibleRequiredHintMsg: (text) => {
            this.elements.newTemplate_requiredHintMsg(text).should('be.visible')
        },
        isVisibleWarningMsgAboutBootDiskBeingCopied: (text) => {
            this.elements.newTemplate_warningMsgAboutBootDiskBeingCopied(text).should('be.visible')
        },
        isVisibleNotificationToastForExistingTempName: (text) => {
            this.elements.newTemplate_notificationToastForExistingTempName(text).should('be.visible')
        },
        isVisiblePriceText: (text) => {
            this.elements.newTemplate_priceText(text).should('be.visible')
        },
        clickAvailableToAllProjectsCheckbox: () => {
            this.elements.newTemplate_availableToAllProjectsCheckbox().should('be.visible').click()
        },
        clickCreateTemplateBtnInModal: () => {
            this.elements.newTemplate_createBtn().should('be.visible').click()
        },
        clickCancelBtnAfterCreationInConfirmationModal: () => {
            this.elements.newTemplate_cancelBtnAfterCreationInConfirmationModal().should('be.visible').click()
        },
        clickCancelBtnInModal: () => {
            this.elements.newTemplate_cancelBtn().should('be.visible').click()
        },
        clickCloseModalBtn: () => {
            this.elements.newTemplate_closeModalBtn().should('be.visible').click()
        },
        hoverOnCustomOSVmCreateTemplateBtn: (text) => {
            this.elements.actions_createTemplateBtn().trigger('mouseover') // or use .realHover(); method from cypress-real-events plugin if installed
            cy.contains(text).should('be.visible');
        },
        // Custom dropdown in Add VM page
        isCheckedCustomRadioBtnInAddVMPage: () => {
            this.elements.addVM_customRadioBtn().should('be.checked')
        },
        clickCustomRadioBtnInAddVMPage: () => {
            this.elements.addVM_customRadioBtn().should('be.visible').click()
        },
        clickCustomDropdownListInAddVMPage: () => {
            this.elements.addVM_customDropdownList().should('be.visible').click()
        },
        clickCustomDropdownOptionInAddVMPage: (text) => {
            this.elements.addVM_customDropdownOption(text).should('be.visible').click()
        },
        // Templates table functions
        isVisibleCreatedTemplateRowByName: (name) => {
            this.elements.templates_tab_createdTempRowByName(name).should('be.visible')
        },
        waitForCreatedTemplateRowByName: (name, timeout = 300000, interval = 5000, refreshEvery = 300000) => {
            let nextRefreshAt = Date.now() + refreshEvery

            cy.waitUntil(() => {
                cy.log('Waiting for template creation')

                return cy.get('body').then(($body) => {
                    if ($body.find('tbody tr').text().includes(name)) return true

                    const now = Date.now()
                    if (now < nextRefreshAt) return false

                    cy.log('Waiting for template creation - refreshing page')
                    nextRefreshAt = now + refreshEvery
                    return cy.reload().then(() => false)
                })
            }, {
                timeout,
                interval,
                errorMsg: `Template '${name}' was not found within ${timeout}ms`
            })

            this.actions.isVisibleCreatedTemplateRowByName(name)
        },
        clickResourceVisibilityIconInRowByName: (name) => {
            this.elements.templates_tab_resourceVisibilityIconRowByName(name).should('be.visible').click()
        },
        clickCreateServerIconInRowByName: (name) => {
            this.elements.templates_tab_createServerIconRowByName(name).should('be.visible').click()
        },
        clickDeleteIconInRowByName: (name) => {
            this.elements.templates_tab_deleteIconRowByName(name).should('be.visible').click()
        },
        isVisibleTemplateStatusRowByName: (templateName, status) => {
            this.elements.templates_tab_tempStatusRowByName(templateName, status).should('be.visible')
        },
        // Resource visibility modal functions
        clickResourceVisibilityProjectOptionCheckbox: (projectName) => {
            this.elements.resourceVisibilityProjectOptionCheckbox(projectName).should('be.visible').click()
        },
        clickResourceVisibilitySaveBtn: () => {
            this.elements.resourceVisibilitySaveBtn().should('be.visible').click()
        },
        isVisibleResourceVisibilityDropdownList: () => {
            this.elements.resourceVisibilityDropdownList().should('be.visible')
        },
        iScheckedResourceVisibilityProjectOptionCheckbox: (projectName) => {
            this.elements.resourceVisibilityProjectOptionCheckbox(projectName).should('be.checked')
        },
        isNotCheckedResourceVisibilityProjectOptionCheckbox: (projectName) => {
            this.elements.resourceVisibilityProjectOptionCheckbox(projectName).should('not.be.checked')
        },
        // Delete template modal functions
        clickCancelDeleteTemplateBtn: () => {
            this.elements.cancelDeleteTemplateBtn().should('be.visible').click()
        },
        clickConfirmDeleteTemplateBtn: () => {
            this.elements.confirmDeleteTemplateBtn().should('be.visible').click()
        },
        isNotVisibleDeleteTemplateModal: (default_text) => {
            this.elements.confirmDeleteTemplateBtn().should('not.exist')
            cy.contains(default_text).should('be.visible')
        }
    }
}

module.exports = new Templates()