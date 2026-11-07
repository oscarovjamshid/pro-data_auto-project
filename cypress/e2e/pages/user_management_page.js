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
        projectListOptionCheckboxes: () => cy.get('[qa-element^="project-"]:visible:not([qa-element="project-toggle"])').find('input[type="checkbox"]'),
        userEditBtnByEmail: (email) => cy.contains('tbody tr', email).find('a').first(),
        userRowByEmail: (email) => cy.contains('tbody tr', email, { timeout: 30000 }),
        userFullNameError: () => cy.get('[qa-element="create-user-fullname-error"]'),
        projectOptions: () => cy.get('[qa-element^="project-"]:visible:not([qa-element="project-toggle"])'),
        userInfoBtnByEmail: (email) => cy.contains('tbody tr', email).find('[qa-element^="info-user"]'),
        userInfoTooltip: () => cy.get('[class*="Tooltip_tooltip"]'),                // later change this to qa-element tag
        userDeleteBtnByEmail: (email) => cy.contains('tbody tr', email).find('[qa-element^="delete-user"]'),
        userRestoreBtnByEmail: (email) => cy.contains('tbody tr', email).find('[qa-element^="restore-user"]'),
        userRestoreConfBtn: () => cy.get('[qa-element="restore-user-submit"]'),
        userRestoreCancelBtn: () => cy.get('[qa-element="restore-user-cancel"]'),
        hideDeletedCheckbox: () => cy.get('[qa-element="hide-deleted-users"]'),
        resetPswCancelBtn: () => cy.get('[qa-element="user-password-resest-cancel"]'),
        blockCancelBtn: () => cy.get('[qa-element="user-change-status-cancel"]'),
        changeLoginBtn: () => cy.get('[qa-element="change-login"]'),
        changeLoginTxt: () => cy.get('[qa-element="new-email"]'),
        changeLoginSubmitBtn: () => cy.get('[qa-element="change-login-confirm"]'),
        changeLoginCancelBtn: () => cy.get('[qa-element="change-login-cancel"]'),
        changeLoginError: () => cy.get('[class*="Modal_modal"] [class*="FormText_error"]'),      // later change this to qa-element tag
        toastMessage: () => cy.get('[qa-element="toast"]'),
        modal: () => cy.get('[class*="Modal_modal"]'),                              // later change this to qa-element tag
        toast: () => cy.get('[class*="Toast_toastHeader"]', { timeout: 15000 }),       // later change this to qa-element tag
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
        isActiveUser: (email) => {
            return this.elements.activeUserRow(email).should('be.visible').invoke('text').then((text) => text.includes('Активный'))
        },
        selectAllProjects: () => {
            this.elements.projectListDropdown().click()
            this.elements.projectListOptionCheckboxes().check({ force: true })
            this.elements.projectListDropdown().click()
        },
        clickUserEditBtnByEmail: (email) => {
            this.elements.userEditBtnByEmail(email).click()
        },
        clearEditUserPhoneTxt: () => {                  // root user edit page has no phone delete button
            this.elements.editUserPhoneTxt().clear()
        },
        getEditUserPhone: () => {
            return this.elements.editUserPhoneTxt().should('be.visible').invoke('val').then((value) => value.replace(/\D/g, ''))
        },
        checkCreateUserLoginError: (text) => {
            this.elements.userExistLbl(text).should('be.visible')
        },
        checkCreateUserFullNameError: (text) => {
            this.elements.userFullNameError().should('be.visible')
            this.elements.userFullNameError().contains(text)
        },
        selectProjects: (count) => {
            this.elements.projectListDropdown().click()
            this.elements.projectOptions().should('have.length.gte', count)
            for (let i = 0; i < count; i++) {
                this.elements.projectOptions().eq(i).click()
            }
            this.elements.projectListDropdown().click()
        },
        selectProjectByName: (name, owner) => {         // project names are not unique (every user has "Default project"), so owner too
            this.elements.projectListDropdown().click()
            this.elements.projectOptions().filter(`:contains("${name}")`).filter(`:contains("${owner}")`).click()
            this.elements.projectListDropdown().click()
        },
        checkToast: (text) => {
            this.elements.toastMessage().should('be.visible').and('contain.text', text)
        },
        checkUserRowContains: (email, text) => {
            this.elements.userRowByEmail(email).should('be.visible').and('contain.text', text)
        },
        isVisibleUserByEmail: (email) => {
            this.elements.userRowByEmail(email).should('be.visible')
        },
        isNotVisibleUserByEmail: (email) => {
            cy.contains('tbody tr', email).should('not.exist')
        },
        hoverUserInfoBtn: (email) => {
            this.elements.userInfoBtnByEmail(email).trigger('mouseover')
        },
        checkUserInfoTooltip: (text) => {
            this.elements.userInfoTooltip().should('be.visible').and('contain.text', text)
        },
        clickUserInfoBtn: (email) => {
            this.elements.userInfoBtnByEmail(email).click()
        },
        checkModalContains: (text) => {
            this.elements.modal().should('be.visible').and('contain.text', text)
        },
        isNotVisibleModal: () => {
            this.elements.modal().should('not.exist')
        },
        isDisabledResetPswBtn: () => {
            this.elements.resetPswBtn().should('be.disabled')
        },
        isDisabledChangeLoginBtn: () => {
            this.elements.changeLoginBtn().should('be.disabled')
        },
        clickResetPswCancelBtn: () => {
            this.elements.resetPswCancelBtn().click()
        },
        clickBlockCancelBtn: () => {
            this.elements.blockCancelBtn().click()
        },
        clickChangeLoginBtn: () => {
            this.elements.changeLoginBtn().click()
        },
        typeChangeLoginTxt: (login) => {
            this.elements.changeLoginTxt().clear()
            this.elements.changeLoginTxt().type(login)
        },
        clearChangeLoginTxt: () => {
            this.elements.changeLoginTxt().clear()
        },
        clickChangeLoginSubmitBtn: () => {
            this.elements.changeLoginSubmitBtn().click()
        },
        clickChangeLoginCancelBtn: () => {
            this.elements.changeLoginCancelBtn().click()
        },
        checkChangeLoginError: (text) => {
            this.elements.changeLoginError().should('be.visible')
            this.elements.changeLoginError().contains(text)
        },
        clickUserDeleteBtnByEmail: (email) => {
            this.elements.userDeleteBtnByEmail(email).click()
        },
        clickUserRestoreBtnByEmail: (email) => {
            this.elements.userRestoreBtnByEmail(email).click()
        },
        clickUserRestoreConfBtn: () => {
            this.elements.userRestoreConfBtn().click()
        },
        clickUserRestoreCancelBtn: () => {
            this.elements.userRestoreCancelBtn().click()
        },
        checkHideDeleted: () => {
            this.elements.hideDeletedCheckbox().check()
        },
        uncheckHideDeleted: () => {
            this.elements.hideDeletedCheckbox().uncheck()
        },
        isNotVisibleToast: () => {
            this.elements.toast().should('not.exist')
        },
        deleteUsersByPrefix: (prefix) => {              // cleanup: deletes one by one all not deleted users whose email starts with prefix
            cy.get('tbody').then(($tbody) => {
                const row = $tbody.find(`tr:contains("${prefix}")`).has('[qa-element^="delete-user"]').first()
                if (!row.length) return
                const email = row.text().match(new RegExp(`${prefix}[\\w.-]*@mailinator\\.com`))[0]
                this.elements.userDeleteBtnByEmail(email).click()
                this.elements.userDeleteConfBtn().click()
                cy.contains('tbody tr', email).should('not.exist')
                this.actions.deleteUsersByPrefix(prefix)
            })
        },
    }
}





module.exports = new ManageUser()