class AccessHistory {
    elements = {
        accessTxt: () => cy.get('[qa-element="sidemenu-nav-account-settings-sublink-account-access-keys"]'),
        createKeyBtnWhenNoRecords: () => cy.get('[class*="Button_btn"], button'),
        createKeyBtn: () => cy.get('[qa-element="create-key-open"], button'),
        keyAccessTxt: () => cy.get('[qa-element="generated-access-key"]'),
        btnClose: () => cy.get('.btn-close, [class="btn-close"]'),
        deleteAccessKey: () => cy.get('[qa-element="delete-key-show"]').first(),
        deleteAccessKeyVerified: () => cy.get('[qa-element="delete-key-submit"], button'),
        activeModal: () => cy.get('.modal-content:visible, .modal:visible').first(),
        modalTitle: () => cy.get('.modal-content:visible, .modal:visible').first().find('h1, h2, h3, .modal-title').first(),
        requiredFieldError: () => cy.get('.modal-content:visible, .modal:visible').first().find('[qa-element$="-error"], .invalid-feedback, .error, .text-danger').contains(/Required Field|Обязательное поле/i),
        nameInput: () => cy.get('.modal-content:visible, .modal:visible').first().find('[qa-element="access-key-name"], [qa-element="key-name"], input[name="name"], input[placeholder="Enter key name"]').first(),
        descriptionInput: () => cy.get('.modal-content:visible, .modal:visible').first().find('[qa-element="access-key-description"], [qa-element="key-description"], textarea[name="description"], input[name="description"]').first(),
        ownerDropdown: () => cy.get('.modal-content:visible, .modal:visible').first().find('[qa-element="access-key-owner-open"], [qa-element="owner-open"], [qa-element="owner-toggle"], [qa-element="owner"], [name="owner"]').first(),
        expirationDropdown: () => cy.get('.modal-content:visible, .modal:visible').first().find('[qa-element="access-key-expiration-open"], [qa-element="expiration-date-open"], [qa-element="expiration-open"], [qa-element="expiration-date"], [name="expirationDate"]').first(),
        customScopeRadio: () => cy.get('.modal-content:visible, .modal:visible').first().contains('label, span, div', /^Custom$/i).first(),
        readOnlyScopeRadio: () => cy.get('.modal-content:visible, .modal:visible').first().contains('label, span, div', /^Read-only$/i).first(),
        fullScopeRadio: () => cy.get('.modal-content:visible, .modal:visible').first().contains('label, span, div', /^Full access$/i).first(),
        scopeMatrix: () => cy.get('.modal-content:visible, .modal:visible').first().find('table, .table').first(),
        generateKeyBtn: () => cy.get('.modal-content:visible, .modal:visible').first().find('[qa-element="create-key-submit"], [qa-element="generate-key"], button'),
        cancelBtnInModal: () => cy.get('.modal-content:visible, .modal:visible').first().find('button').contains('Cancel'),
        saveBtnInEditModal: () => cy.get('.modal-content:visible, .modal:visible').first().find('[qa-element="edit-key-submit"], [qa-element="save-key"], button').contains('Save'),
        keyRowByName: (name) => cy.contains('tbody tr, .table tbody tr, tr', name),
        keyScopeCellByName: (name) => cy.contains('tbody tr, .table tbody tr, tr', name).find('td').eq(2),
        keyEditBtnByName: (name) => cy.contains('tbody tr, .table tbody tr, tr', name).find('[qa-element="edit-key-show"], [qa-element^="edit-key"], button, a').filter(':visible').first(),
        keyDeleteBtnByName: (name) => cy.contains('tbody tr, .table tbody tr, tr', name).find('[qa-element="delete-key-show"], [qa-element^="delete-key"], button, a').filter(':visible').last(),
        permissionLinkByName: (name) => cy.contains('tbody tr, .table tbody tr, tr', name).find('td').eq(2).find('a, button, [qa-element^="permissions"]').first(),
        duplicatedNameError: () => cy.get('.modal-content:visible, .modal:visible').first().find('[qa-element*="name-error"], .invalid-feedback, .error, .text-danger').contains(/already exists|уже существует/i),
    }

    actions = {
        clickAccessTxt: () => {
            this.elements.accessTxt().click()
        },
        isVisibleAccessKeysHeader: () => {
            cy.contains('h1', 'Ключи доступа').should('be.visible')
        },
        isVisibleCreateKeyBtn: () => {
            this.elements.createKeyBtn().should('be.visible')
        },
        clickCreateKeyBtnWhenNoRecords: () => {
            this.elements.createKeyBtnWhenNoRecords().click()
        },
        clickCreateKeyBtn: () => {
            this.elements.createKeyBtn().click()
        },
        isVisibleCreateModal: () => {
            this.elements.modalTitle().should('contain.text', 'New access key')
        },
        isVisibleKeyAccessTxt: () => {
            this.elements.keyAccessTxt().should('be.visible')
        },
        successAddedKeyAccount: () => {
            cy.wait('@successCreateAccess', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200)
            })
        },
        clickCloseModalBtn1: () => {
            this.elements.btnClose().click()
        },
        typeKeyName: (name) => {
            this.elements.nameInput().clear().type(name)
        },
        typeDescription: (description) => {
            this.elements.descriptionInput().clear().type(description)
        },
        clickOwnerDropdown: () => {
            this.elements.ownerDropdown().click({ force: true })
        },
        clickExpirationDropdown: () => {
            this.elements.expirationDropdown().click({ force: true })
        },
        selectDropdownOption: (text) => {
            cy.get('.modal-content:visible, .modal:visible').first().contains('li, a, button, span, div[role="option"]', text, { matchCase: false }).filter(':visible').first().click({ force: true })
        },
        selectOwner: (owner) => {
            this.actions.clickOwnerDropdown()
            this.actions.selectDropdownOption(owner)
        },
        selectFirstOwner: () => {
            this.actions.clickOwnerDropdown()
            cy.get('.modal-content:visible, .modal:visible').first()
                .find('li, a, [role="option"], .dropdown-item')
                .filter(':visible')
                .contains(/^(?!\s*select\s*$).+/i)
                .first()
                .click({ force: true })
        },
        selectExpiration: (expirationLabel) => {
            this.actions.clickExpirationDropdown()
            this.actions.selectDropdownOption(expirationLabel)
        },
        chooseCustomScope: () => {
            this.elements.customScopeRadio().click({ force: true })
        },
        chooseReadOnlyScope: () => {
            this.elements.readOnlyScopeRadio().click({ force: true })
        },
        chooseFullScope: () => {
            this.elements.fullScopeRadio().click({ force: true })
        },
        setCustomScopePermission: (serviceName, columnLabel) => {
            this.elements.scopeMatrix().find('thead th').then(($headers) => {
                const headers = [...$headers].map((h) => h.innerText.trim())
                const index = headers.findIndex((h) => h.toLowerCase() === columnLabel.toLowerCase())
                expect(index, `column ${columnLabel} should exist`).to.be.greaterThan(-1)

                this.elements.scopeMatrix().contains('tbody tr, tr', serviceName)
                    .find('td').eq(index)
                    .find('input, label, span, div').filter(':visible').first()
                    .click({ force: true })
            })
        },
        clickGenerateKeyBtn: () => {
            this.elements.generateKeyBtn().click({ force: true })
        },
        isVisibleRequiredFieldErrors: () => {
            this.elements.requiredFieldError().should('be.visible')
        },
        isVisibleDuplicatedNameError: () => {
            this.elements.duplicatedNameError().should('be.visible')
        },
        clickCancelBtnInModal: () => {
            this.elements.cancelBtnInModal().click({ force: true })
        },
        isNotVisibleModal: () => {
            cy.get('.modal-content:visible, .modal:visible').should('have.length', 0)
        },
        isVisibleKeyRowByName: (name) => {
            this.elements.keyRowByName(name).should('be.visible')
        },
        isNotVisibleKeyRowByName: (name) => {
            this.elements.keyRowByName(name).should('not.exist')
        },
        clickDeleteAccessKey: () => {
            this.elements.deleteAccessKey().click({ force: true })
        },
        clickDeleteAccessKeyByName: (name) => {
            this.elements.keyDeleteBtnByName(name).click({ force: true })
        },
        clickDeleteAccessKeyVerified: () => {
            this.elements.deleteAccessKeyVerified().click({ force: true })
        },
        isVisibleDeleteModal: () => {
            this.elements.modalTitle().should('contain.text', 'Delete key?')
        },
        clickEditAccessKeyByName: (name) => {
            this.elements.keyEditBtnByName(name).click({ force: true })
        },
        isVisibleEditModal: () => {
            this.elements.modalTitle().should('contain.text', 'Edit access key')
        },
        isDisabledSaveBtnInEditModal: () => {
            this.elements.saveBtnInEditModal().should('be.disabled')
        },
        isEnabledSaveBtnInEditModal: () => {
            this.elements.saveBtnInEditModal().should('not.be.disabled')
        },
        clickSaveBtnInEditModal: () => {
            this.elements.saveBtnInEditModal().click({ force: true })
        },
        clickPermissionLinkByName: (name) => {
            this.elements.permissionLinkByName(name).click({ force: true })
        },
        isVisiblePermissionDetails: () => {
            this.elements.modalTitle().invoke('text').should('match', /permission|access/i)
        },
        isVisibleOwnerDropdownOptions: () => {
            this.actions.clickOwnerDropdown()
            cy.get('.modal-content:visible, .modal:visible').first().find('li, a, [role="option"]').filter(':visible').should('have.length.greaterThan', 0)
        },
        isVisibleExpirationDropdownOptions: () => {
            this.actions.clickExpirationDropdown()
            cy.get('.modal-content:visible, .modal:visible').first().contains('li, a, div, span', /30 days|90 days|1 years|Never/i).should('be.visible')
        },
    }
}
module.exports = new AccessHistory()
