class ManageUser {
    elements = {
        addNewUserButton: () => cy.get('[qa-element="to-add-user"]'),
        userLoginTxt: () => cy.get('[qa-element="user-create-login"]'),
        userFullNameTxt: () => cy.get('[qa-element="user-create-fullname"]'),
        projectListDropdown: () => cy.get('[qa-element="project-toggle"]'),
        projectListDropdownOption: () => cy.contains('Default project'),
        createUserBtn: () => cy.get('[qa-element="user-create-submit"]'),
        createdUser: (name) => cy.get('tbody').find('tr').contains(name),
        blockedUserStatusLbl: () => cy.get('tbody').find('tr').contains('Заблокирован'),
        activeUserRow: (employee) => cy.contains('tbody tr', employee),
        userEditBtn: (name) => cy.get('tbody').find('tr').contains(name).parent().parent().parent().find('a').first(),
        userDeleteBtn: (name) => cy.contains('tbody tr', name).find('[qa-element^="delete-user"]'),
        editUserPageHeaderLbl: () => cy.get('[qa-element="user-edit"]').contains('Настройки пользователя'),
        editUserPhoneTxt: () => cy.get('[qa-element="phone-input"]'),
        editUserSaveBtn: () => cy.get('[qa-element="user-edit-save"]').contains('Сохранить'),
        successMessage: (text) => cy.contains(text),
        actionsBtnInEditUserManagementPage: () => cy.contains('Действие'),
        activateObjectMemoryBtn: (text) => cy.get('[qa-element="service-activation-show"]').contains('button', text),
        activateObjectMemoryConfBtn: () => cy.get('[qa-element="service-activation-submit"]'),
        resetPswBtn: () => cy.get('[qa-element="user-password-resest-show"]'),
        resetPswAcceptBtn: () => cy.get('[qa-element="user-password-resest-submit"]'),
        actionConfBtn: () => cy.get('.modal-footer').contains('Подтвердить'),
        newPasswordTitleLbl: (text) => cy.contains(text),
        userExistLbl: (text) => cy.get('[qa-element="create-user-login-error"]').contains(text),
        newPasswordLbl: () => cy.get('.modal-body').find('span').first(),
        blockUserBtn: () => cy.get('[qa-element="user-change-status-show"]'),
        blockUserBtnText: (text) => cy.contains(text),
        userDeleteConfBtn: () => cy.get('[qa-element="delete-user-submit"]'),
        userPhoneNumberDeleteBtn: () => cy.get('[qa-element="user-edit-clear"]'),
        blockConfirmBtn: () => cy.get('[qa-element="user-change-status-submit"]'),
        unblockBtn: () => cy.contains('Разблокировать'),
    }
    actions = {
        clickAddNewUserButton: () => {
            this.elements.addNewUserButton().click()
        },
        typeUserLoginTxt: (login) => {
            this.elements.userLoginTxt().type(login)
        },
        typeUserFullNameTxt: (name) => {
            this.elements.userFullNameTxt().type(name)
        },
        clickProjectListDropdown: () => {
            this.elements.projectListDropdown().click()
        },
        clickProjectListDropdownOption: () => {
            this.elements.projectListDropdownOption().click()
        },
        clickCreateUserBtn: () => {
            this.elements.createUserBtn().click()
        },
        isVisibleUser: (name) => {
            this.elements.createdUser(name).should('be.visible')
        },
        clickUserEditBtn: (name) => {
            this.elements.userEditBtn(name).click()
        },
        isVisibleEditUserPageHeaderLbl: () => {
            this.elements.editUserPageHeaderLbl().should('be.visible')
        },
        typeEditUserPhoneTxt: (phone) => {
            this.elements.editUserPhoneTxt().clear()
            this.elements.editUserPhoneTxt().type(phone)
        },
        clickEditUserSaveBtn: () => {
            this.elements.editUserSaveBtn().click()
        },
        isVisibleSuccessMessage: (text) => {
            this.elements.successMessage(text).should('be.visible')
        },
        clickActivateObjectMemoryBtn: (text) => {
            this.elements.activateObjectMemoryBtn(text).click()
        },
        clickActivateObjectMemoryConfBtn: () => {
            this.elements.activateObjectMemoryConfBtn().click()
        },
        isDisabledActivateObjectMemoryBtn: (text) => {
            this.elements.activateObjectMemoryBtn(text).should('be.disabled')
        },
        clickResetPswBtn: () => {
            this.elements.resetPswBtn().click()
        },
        clickResetPswAcceptBtn: () => {
            this.elements.resetPswAcceptBtn().click()
        },
        clickActionConfBtn: () => {
            this.elements.actionConfBtn().click()
        },
        isVisibleNewPasswordTitleLbl: (text) => {
            this.elements.newPasswordTitleLbl(text).should('be.visible')
        },
        isVisibleUserExistLbl: (text) => {
            this.elements.userExistLbl(text).should('be.visible')
        },
        clickBlockUserBtn: () => {
            this.elements.blockUserBtn().click()
        },
        isVisibleBlockedUserStatusLbl: () => {
            this.elements.blockedUserStatusLbl().should('be.visible')
        },
        isVisibleActiveUserStatusLbl: (employee) => {
            this.elements.activeUserRow(employee)
                .should('be.visible')
                .and('contain.text', 'Активный')
        },
        clickUserDeleteBtn: (name) => {
            this.elements.userDeleteBtn(name).click()
        },
        clickUserDeleteConfBtn: () => {
            this.elements.userDeleteConfBtn().click()
        },
        clickUserPhoneNumberDeleteBtn: () => {
            this.elements.userPhoneNumberDeleteBtn().click()
        },
        isEmptyPhoneNumberField: () => {
            this.elements.editUserPhoneTxt().should('have.value', '')
        },
        clickEditUserPageActionsBtn: () => {
            this.elements.actionsBtnInEditUserManagementPage().click()
        },
        clickResetPswAcceptBtnInResetPswConfModal: () => {
            this.elements.resetPswAcceptBtn().click()
        },
        clickBlockUserConfBtn: () => {
            this.elements.blockConfirmBtn().click()
        },
        isVisibleBlockUserBtnText: (text) => {
            this.elements.blockUserBtnText(text).should('be.visible')
        },
        clickUnblockUserBtn: () => {
            this.elements.unblockBtn().click()
        },
        isVisibleUnblockBtn: () => {
            this.elements.unblockBtn().should('be.visible')
        },
        isNotVisibleUser: (name) => {
            this.elements.createdUser(name).should('not.exist')
        },
    }
}





module.exports = new ManageUser()