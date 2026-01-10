class ObjectStorageCorsRules {
    elements = {
        addCorsRuleBtn: () => cy.get('[qa-element="cors-add"]'),
        allowedOriginsInputField: () => cy.get('[qa-element="allowed-origins"]'),
        addAllowedOriginsBtn: () => cy.get('[qa-element="add-allowed-origins"]'),
        secondAllowedOriginsInputField: () => cy.get('#allowedOrigins\\[1\\]'),
        removeAllowedOriginsBtn: () => cy.get('[qa-element="remove-allowed-origins"]'),
        getCheckbox: () => cy.get('[qa-element="allowed-method-get"]'),
        postCheckbox: () => cy.get('[qa-element="allowed-method-post"]'),
        putCheckbox: () => cy.get('[qa-element="allowed-method-put"]'),
        deleteCheckbox: () => cy.get('[qa-element="allowed-method-delete"]'),
        headCheckbox: () => cy.get('[qa-element="allowed-method-head"]'),
        allowedHeadersInputField: () => cy.get('[qa-element="allowed-headers"]'),
        allowedHeadersAddBtn: () => cy.get('[qa-element="add-allowed-headers"]'),
        secondAllowedHeadersInputField: () => cy.get('#allowedHeaders\\[1\\]'),
        removeAllowedHeadersBtn: () => cy.get('[qa-element="remove-allowed-headers"]'),
        exposeHeadersInputField: () => cy.get('[qa-element="expose-headers"]'),
        exposeHeadersAddBtn: () => cy.get('[qa-element="add-expose-headers"]'),
        secondExposeHeadersInputField: () => cy.get('#exposeHeaders\\[1\\]'),
        removeExposeHeadersBtn: () => cy.get('[qa-element="remove-expose-headers"]'),
        maxAgeSecondsInputField: () => cy.get('[qa-element="max-age-seconds"]'),
        addCorsRulesCancelBtn: () => cy.get('[qa-element="cancel-bucket-settings"]'),
        saveBtn: () => cy.get('[qa-element="save-bucket-settings"]'),
        invalidErrorMsgForAllowedOriginsField: () => cy.get(''),
        invalidErrorMsgForAllowedHeadersField: () => cy.get(''),
        invalidErrorMsgForExposeHeadersField: () => cy.get(''),
        corsRulesRowPerName: (name) => cy.get('tbody').contains('tr', name),         
        corsRulesRowEditButtonPerName: (name) => cy.get('tbody tr').contains('td', name).parent('tr').find('[qa-element="delete-rules"]'),
        corsRulesRowDeleteButtonPerName: (name) => cy.get('tbody tr').contains('td', name).parent('tr').find('[qa-element="delete-cors-rule-show"]'),
        confirmDeleteBtnInDeleteModal: () => cy.get('[qa-element="delete-cors-rule-submit"]'),
        cancelBtnInDeleteModal: () => cy.get('[qa-element="delete-cors-rule-cancel"]'),
    }
    actions = {
        clickOnAddCorsRulesBtn: () => {
            this.elements.addCorsRuleBtn().click()
            this.elements.allowedOriginsInputField().should('exist')
        },
        checkGetCheckbox: () => {
            this.elements.getCheckbox().check()
            this.elements.getCheckbox().should('be.checked')
        },
        checkPostCheckbox: () => {
            this.elements.postCheckbox().check()
            this.elements.postCheckbox().should('be.checked')
        },
        checkPutCheckbox: () => {
            this.elements.putCheckbox().check()
            this.elements.putCheckbox().should('be.checked')
        },
        checkDeleteCheckbox: () => {
            this.elements.deleteCheckbox().check()
            this.elements.deleteCheckbox().should('be.checked')
        },
        checkHeadCheckbox: () => {
            this.elements.headCheckbox().check()
            this.elements.headCheckbox().should('be.checked')
        },
        enterTextToAllowedOriginsInputField: (text) => {
            this.elements.allowedOriginsInputField().clear().type(text)
        },
        enterTextToAllowedHeadersInputField: (text) => {
            this.elements.allowedHeadersInputField().clear().type(text)
        },
        enterTextToExposeHeadersInputField: (text) => {
            this.elements.exposeHeadersInputField().clear().type(text)
        },
        enterTextToMaxAgeSecondsField: (text) => {
            this.elements.maxAgeSecondsInputField().clear().type(text)
        },
        enterTextToSecondAllowedOriginsInputField: (text) => {
            this.elements.secondAllowedOriginsInputField().clear().type(text)
        },
        enterTextToSecondAllowedHeadersInputField: (text) => {
            this.elements.secondAllowedHeadersInputField().clear().type(text)
        },
        enterTextToSecondExposeHeadersInputField: (text) => {
            this.elements.secondExposeHeadersInputField().clear().type(text)
        },
        clickAddBtnUnderAllowedOriginsField: () => {
            this.elements.addAllowedOriginsBtn().click()
            this.elements.secondAllowedOriginsInputField().should('exist')
        },
        clickRemoveBtnInAllowedOriginsField: () => {
            this.elements.removeAllowedOriginsBtn().click()
            this.elements.secondAllowedOriginsInputField().should('not.exist')
        },
        clickAddBtnUnderAllowedHeadersField: () => {
            this.elements.allowedHeadersAddBtn().click()
            this.elements.secondAllowedHeadersInputField().should('be.visible')
        },
        clickRemoveBtnInAllowedHeadersField: () => {
            this.elements.removeAllowedHeadersBtn().click()
            this.elements.secondAllowedHeadersInputField().should('not.exist')
        },
        clickAddBtnUnderExposeHeadersField: () => {
            this.elements.exposeHeadersAddBtn().click()
            this.elements.secondExposeHeadersInputField().should('be.visible')
        },
        clickRemoveBtnInExposeHeadersField: () => {
            this.elements.removeExposeHeadersBtn().click()
            this.elements.secondExposeHeadersInputField().should('not.exist')
        },
        clickOnCancelCorsRulesBtnInAddModal: () => {
            this.elements.addCorsRulesCancelBtn().click()
            this.elements.allowedOriginsInputField().should('not.exist')
        },
        clickOnSaveCorsRulesBtnInAddModal: () => {
            this.elements.saveBtn().click()
            this.elements.allowedOriginsInputField().should('not.exist')
        },
        checkInvalidMsgForAllowedOriginsField: (text) => {
            this.elements.invalidErrorMsgForAllowedOriginsField().should('be.visible')
            this.elements.invalidErrorMsgForAllowedOriginsField().contains(text)
        },
        checkInvalidMsgForAllowedHeadersField: (text) => {
            this.elements.invalidErrorMsgForAllowedHeadersField().should('be.visible')
            this.elements.invalidErrorMsgForAllowedHeadersField().contains(text)
        },
        checkInvalidMsgForExposeHeadersField: (text) => {
            this.elements.invalidErrorMsgForExposeHeadersField().should('be.visible')
            this.elements.invalidErrorMsgForExposeHeadersField().contains(text)
        },
        isVisibleCreatedCorsRule: (name) => {
            this.elements.corsRulesRowPerName(name).should('be.visible')
        },
        clickCorsRuleEditBtnPerRowName: (name) => {
            this.elements.corsRulesRowEditButtonPerName(name).click()
        },
        clickCorsRuleDeleteBtnPerRowName: (name) => {
            this.elements.corsRulesRowDeleteButtonPerName(name).click()
        },
        isNotVisibleDeletedCorsRule: (name) => {
            this.elements.corsRulesRowPerName(name).should('not.exist')
        },
        clickOnConfirmDeleteBtnInDeleteModal: () => {
            this.elements.confirmDeleteBtnInDeleteModal().click()
        },
        clickOnCancelBtnInDeleteModal: () => {
            this.elements.cancelBtnInDeleteModal().click()
        },
        clearAllowedOriginsField:() => {
            this.elements.allowedOriginsInputField().clear()
        },
        clearAllowedHeadersField:() => {
            this.elements.allowedHeadersInputField().clear()
        },
        clearExposeHeadersField:() => {
            this.elements.exposeHeadersInputField().clear()
        }
    }
}
module.exports = new ObjectStorageCorsRules()