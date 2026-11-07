class ProjectManagement {
    elements = {
        projectSettingsBtn: (index) => cy.get(`[qa-element="setting-project-${index}"]`),
        projectEditModal: () => cy.get('[class*="Modal_modal"]'),          // later change this to qa-element tag
        projectEditCancelBtn: () => cy.get('[qa-element="project-edit-cancel"]'),
    }
    actions = {
        clickProjectSettingsBtn: (index) => {
            this.elements.projectSettingsBtn(index).click()
        },
        clickProjectEditCancelBtn: () => {
            this.elements.projectEditCancelBtn().click()
            this.elements.projectEditModal().should('not.exist')
        },
        isMemberOfProject: (index, fullName) => {        // @projectMembers is registered in the spec
            this.elements.projectSettingsBtn(index).click()
            cy.wait('@projectMembers')
            this.elements.projectEditModal().should('contain.text', fullName)
            this.elements.projectEditCancelBtn().click()
            this.elements.projectEditModal().should('not.exist')
        },
        isNotMemberOfProject: (index, fullName) => {
            this.elements.projectSettingsBtn(index).click()
            cy.wait('@projectMembers')
            this.elements.projectEditModal().should('contain.text', 'Участников на проекте').and('not.contain.text', fullName)
            this.elements.projectEditCancelBtn().click()
            this.elements.projectEditModal().should('not.exist')
        },
    }
}
module.exports = new ProjectManagement()
