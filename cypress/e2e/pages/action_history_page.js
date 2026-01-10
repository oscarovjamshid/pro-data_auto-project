class ActionHistory {
    elements = {
       actoon_searchTxt: () => cy.get('[qa-element="search-input"]'),
       foundLog: (text) => cy.get('.table').find('tbody').find('tr').first().find('td').contains(text),
       filterByDateBtn: () => cy.get('[qa-element="date-range-filter"]'),
       selectTodayBtn: () => cy.get('[qa-element="today"]'),
       selectYesterdayBtn: () => cy.get('[qa-element="yesterday"]'),
       applyDateFilterBtn: () => cy.get('[qa-element="date-range-submit"]'),
       applyFilterBtn: () => cy.get('[qa-element="apply-filter"]'),
       actionTypeSelectBtn: () => cy.get('[qa-element="select-action-type"]'),
       actionTypeOption: () => cy.get('[qa-element="action-type"]'),
    }
    actions = {
        typeActoon_searchTxt: (text) => {
            this.elements.actoon_searchTxt().clear()
            this.elements.actoon_searchTxt().type(text)
        },
        isVisibleFoundLog: (text) => {
            this.elements.foundLog(text).should('be.visible')
        },
        clickFilterByDateBtn: () => {
            this.elements.filterByDateBtn().click()
        },
        doubleClickSelectTodayBtn: () => {
            this.elements.selectTodayBtn().dblclick()
        },
        doubleClickSelectYesterdayBtn: () => {
            this.elements.selectYesterdayBtn().dblclick()
        },
        clickApplyDateFilterBtn: () => {
            this.elements.applyDateFilterBtn().click()
        },
        clickApplyFilterBtn: () => {
            this.elements.applyFilterBtn().click()
        },
        clickActionTypeSelectBtn: () => {
            this.elements.actionTypeSelectBtn().click()
        },
        selectActionTypeOption: (optionText) => {
            this.elements.actionTypeOption().contains(optionText).click()
        }
    }
}





module.exports = new ActionHistory()