class ManageUser {
    elements = {
        addNewUserButton: () => cy.get('a[href="/account/users/add"]').first(),
        userLoginTxt: () => cy.get('[qa-element="user-create-login"]'), //user-create-login
        userFullNameTxt: () => cy.get('[qa-element="user-create-fullname"]'), //user-create-fullname
        projectListDropdown: () => cy.get('[qa-element="select-project"]'), //project
        projectListDropdownOption: () => cy.get('ul.list-unstyled > a').contains('Default project'), 
        createUserBtn: () => cy.get('[qa-element="user-create-submit"]'), //user-create-submit
        createdUser: (name) => cy.get('tbody').find('tr').contains(name),
        blockedUserStatusLbl: () => cy.get('tbody').find('tr').contains('Заблокирован'),
        activeUserStatusLbl: () => cy.get('tbody').find('tr').contains('Активный'),
        userEditBtn: (name) => cy.get('tbody').find('tr').contains(name).parent().parent().parent().find('a').first(),
        userDeleteBtn: (name) => cy.get('tbody').find('tr').contains(name).parent().parent().parent().find('button').first(),
        editUserPageHeaderLbl: () => cy.get('[qa-element="user-edit"]').contains('Настройки пользователя'), //user-edit
        editUserPhoneTxt: () => cy.get('[qa-element="phone-input"]'), //phone-input
        editUserSaveBtn: () => cy.get('[qa-element="user-edit-save"]').contains('Сохранить'), //user-edit-save
        successMessage: () => cy.get('.toast').first(),
        activateObjectMemoryBtn: () => cy.get('[qa-element="service-activation-show"]').contains('Активировать'), //service-activation-show
        activateObjectMemoryConfBtn: () => cy.get('.modal-footer').contains('Да'), 
        resetPswBtn: () => cy.get('[qa-element="user-password-resest-show"]').contains('Сбросить'), //user-password-resest-show
        resetPswAcceptBtn: () => cy.get('button').contains('Ок'),
        actionConfBtn: () => cy.get('.modal-footer').contains('Подтвердить'),
        newPasswordTitleLbl: () => cy.get('.toast-header').contains('Успешно'),
        userExistLbl: () => cy.get('.toast-header').contains('Пользователь с таким email уже существует'),
        newPasswordLbl: () => cy.get('.modal-body').find('span').first(),
        blockUserBtn: () => cy.get('[qa-element="user-change-status-show"]'), //user-change-status-show
        userDeleteConfBtn: () => cy.get('[qa-element="delete-user-submit"]').contains('Удалить'), //delete-user-submit
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
        isVisibleSuccessMessage: () => {
            this.elements.successMessage().should('be.visible')
        },
        clickActivateObjectMemoryBtn: () => {
            this.elements.activateObjectMemoryBtn().click()
        },
        clickActivateObjectMemoryConfBtn: () => {
            this.elements.activateObjectMemoryConfBtn().click()
        },
        isDisabledActivateObjectMemoryBtn: () => {
            this.elements.activateObjectMemoryBtn().should('be.disabled')
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
        isVisibleNewPasswordTitleLbl: () => {
            this.elements.newPasswordTitleLbl().should('be.visible')
        },
        isVisibleUserExistLbl: () => {
            this.elements.userExistLbl().should('be.visible')
        },
        clickBlockUserBtn: () => {
            this.elements.blockUserBtn().click()
        },
        isVisibleBlockedUserStatusLbl: () => {
            this.elements.blockedUserStatusLbl().should('be.visible')
        },
        isVisibleActiveUserStatusLbl: () => {
            this.elements.activeUserStatusLbl().should('be.visible')
        },
        clickUserDeleteBtn: (name) => {
            this.elements.userDeleteBtn(name).click()
        },
        clickUserDeleteConfBtn: () => {
            this.elements.userDeleteConfBtn().click()
        },

    }
}





module.exports = new ManageUser()