class Disk {
    elements = {
        createDiskBtn: () => cy.get('[qa-element="disk-create-show"]'), 
        newDiskNameTxt: () => cy.get('[qa-element="disk-name"]'), 
        newDiskTypeHDDBtn: () => cy.get('[qa-element="hdd-ssd-0"]').contains('Стандартный'), 
        newDiskTypeSSDBtn: () => cy.get('[qa-element="hdd-ssd-1"]').contains('Быстрый'), 
        editDiskTypeHDDBtn: () => cy.get('[qa-element="external-internal-0"]').contains('Стандартный'), 
        editDiskTypeSSDBtn: () => cy.get('[qa-element="external-internal-1"]').contains('Быстрый'), 
        newDiskSizeTxt: () => cy.get('[qa-element="create-disk-size-range-value"]'), 
        newDiskCreateConfBtn: () => cy.get('[qa-element="add-disk-submit"]').contains('Создать'), 
        createdDisk: (name) => cy.get('tbody').find('tr').contains(name), 
        deletedDisk: (name) => cy.get('tbody').find('tr').should('not.contain', name),
        newDiskNameErrorLbl: () => cy.get('[qa-element="create-disk-name-error"]'), 
        changeDiskTypeBtn: (name) => cy.get('tbody').find('tr').contains(name).parent().find('td').last().find('[qa-element="disk-change-type"]').first(),
        changeDiskTypeConfBtn: () => cy.get('[qa-element="disk-change"]').contains('Изменить'), 
        standartDiskLimitsLbl: () => cy.get('[qa-element="hdd-size-limit"]'), 
        fastDiskLimitsLbl: () => cy.get('[qa-element="ssd-size-limit"]'),
        changeDiskTypeErrorLbl: () => cy.get('.modal-body > .fade'), 
        linkDiskBtn: (name) => cy.get('tbody').find('tr').contains(name).parent().find('td').last().find('[qa-element="disk-link-vm"]').first(),
        linkDiskServerSelectorBtn: () => cy.get('[qa-element="select-vm-open"]').contains('Выберите сервер'), 
        linkDiskServerOption: (name) => cy.get('.dropdown-menu').find('a').contains(name), 
        linkDiskServerOptionDisabled: (name) => cy.get('#input-dropdown > .dropdown-menu > .list-unstyled').find('a').contains(name),
        linkDiskServerConfBtn: () => cy.get('[qa-element="disk-link-submit"]').contains('Подтвердить'), 
        unlinkDiskServerConfBtn: () => cy.get('[qa-element="unlink-disk-submit"]').contains('Подтвердить'), 
        diskLinkedServerIdLbl: (name) => cy.get('tbody').find('tr').contains(name).parent().find('td'),
        deleteDiskBtn: (name) => cy.get('tbody').find('tr').contains(name).parent().find('td').last().find('[qa-element="delete-disk-show"]').first(),
        deleteDiskServerConfBtn: () => cy.get('[qa-element="delete-disk-submit"]').contains('Удалить'), 
    }
    actions = {
        clickCreateDiskBtn: () => {
            this.elements.createDiskBtn().click()
        },
        fillNewDiskNameTxt: (name) => {
            this.elements.newDiskNameTxt().type(name)
        },
        clickNewDiskTypeHDDBtn: () => {
            this.elements.newDiskTypeHDDBtn().click()
        },
        clickNewDiskTypeSSDBtn: () => {
            this.elements.newDiskTypeSSDBtn().click()
        },
        clickEditDiskTypeHDDBtn: () => {
            this.elements.editDiskTypeHDDBtn().click()
        },
        clickEditDiskTypeSSDBtn: () => {
            this.elements.editDiskTypeSSDBtn().click()
        },
        fillNewDiskSizeTxt: (size) => {
            this.elements.newDiskSizeTxt().clear()
            this.elements.newDiskSizeTxt().type(size)
        },
        clickNewDiskCreateConfBtn: () => {
            this.elements.newDiskCreateConfBtn().click()
        },
        isVisibleCreatedDisk: (name) => {
            this.elements.createdDisk(name).should('be.visible')
        },
        isNotVisibleDisk: (name) => {
            this.elements.deletedDisk(name)
        },
        isVisibleNewDiskNameErrorLbl: (text) => {
            this.elements.newDiskNameErrorLbl().should('be.visible')
            this.elements.newDiskNameErrorLbl().contains(text)
        },
        clickChangeDiskTypeBtn: (name) => {
            this.elements.changeDiskTypeBtn(name).click()
        },
        clickChangeDiskTypeConfBtn: () => {
            this.elements.changeDiskTypeConfBtn().click()
        },
        isVisibleDiskChangeTypeErrorLbl: (text) => {
            this.elements.changeDiskTypeErrorLbl().should('be.visible')
            this.elements.changeDiskTypeErrorLbl().contains(text)
        },
        clickLinkDiskBtn: (name) => {
            this.elements.linkDiskBtn(name).click()
        },
        isDisabledLinkDiskBtn: (name) => {
            this.elements.linkDiskBtn(name).should('be.disabled')
        },
        clickLinkDiskServerSelectorBtn: () => {
            this.elements.linkDiskServerSelectorBtn().click()
        },
        clickLinkDiskServerOption: (name) => {
            this.elements.linkDiskServerOption(name).click()
        },
        isDisabledLinkDiskServerOption: (name) => {
            this.elements.linkDiskServerOption(name).parent().parent().parent().should('have.class', 'disabled')
        },
        clickLinkDiskServerConfBtn: () => {
            this.elements.linkDiskServerConfBtn().click()
        },
        clickUnlinkDiskServerConfBtn: () => {
            this.elements.unlinkDiskServerConfBtn().click()
        },
        isLinkedServer: (name, id) => {
            this.elements.diskLinkedServerIdLbl(name).contains(id)
        },
        clickDeleteDiskBtn: (name) => {
            this.elements.deleteDiskBtn(name).click()
        },
        isDisabledDeleteDiskBtn: (name) => {
            this.elements.deleteDiskBtn(name).should('be.disabled')
        },
        clickDeleteDiskServerConfBtn: () => {
            this.elements.deleteDiskServerConfBtn().click({force: true})
        },
    }
}





module.exports = new Disk()