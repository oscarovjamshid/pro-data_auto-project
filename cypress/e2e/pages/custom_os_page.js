class CustomOs {
    elements = {
        uploadNewCustomOsBtn: () => cy.get('[qa-element="os-template-upload"]'),
        customOsnameTxt: () => cy.get('[qa-element="os-template-name"]').first(),
        customOsFileBtn: () => cy.get('[qa-element="upload-file"]'),
        customOsFileTxt: () => cy.get('#template-upload-input'),
        customOsFileConfBtn: () => cy.get('[qa-element="os-upload-submit"]'),
        customOsUploadProgress: (text) => cy.contains(text),            // qa-element neeed here for progress element bar
        customOsMinParamsCheckbox: () => cy.get('[qa-element="use-min-params"]'),
        customOsUploadModal: () => cy.get('.modal-content'),
        customOsNameErrorLbl: () => cy.get('[qa-element="os-upload-name-error"], [qa-element="os-upload-file-error"]'),
        minCpuTxt: () => cy.get('[qa-element="os-upload-cpu-cores-range-input"]'),
        minRamTxt: () => cy.get('[qa-element="os-upload-ram-range-input"]'),
        minDiskTxt: () => cy.get('[qa-element="os-upload-disk-range-input"]'),
        createdCustomOsDeleteBtn: (name) => cy.get('tbody').find('tr').contains(name).parent().find('td').last().find('button').last(),
        createdCustomDiskDeleteBtn: () => cy.get('tbody').find('tr').contains(name).parent().find('td'),
        deleteCustomOsFileConfBtn: () => cy.get('[qa-element="delete-vm-template-submit"]'),
        isVisibleCreatedCustomOsRowName: (name) => cy.contains(name),
        createServerBtnPerRowName: (name) => cy.contains('tr', name).find('[qa-element^="to-create-vm-custom-template-"]'),
        customOsCpuValue: () => cy.get('[qa-element="os-upload-cpu-cores-range"]'),
        customOsRamValue: () => cy.get('[qa-element="os-upload-ram-range"]'),
        customOsDiskValue: () => cy.get('[qa-element="os-upload-disk-range"]'),
        customOsCpuDecreaseBtn: () => cy.get('[qa-element="os-upload-cpu-cores-range-decrease"]'),
        customOsCpuIncreaseBtn: () => cy.get('[qa-element="os-upload-cpu-cores-range-increase"]'),
        customOsRamDecreaseBtn: () => cy.get('[qa-element="os-upload-ram-range-decrease"]'),
        customOsRamIncreaseBtn: () => cy.get('[qa-element="os-upload-ram-range-increase"]'),
        customOsDiskDecreaseBtn: () => cy.get('[qa-element="os-upload-disk-range-decrease"]'),
        customOsDiskIncreaseBtn: () => cy.get('[qa-element="os-upload-disk-range-increase"]'),
    }
    actions = {
        clickUploadNewCustomOsBtn: () => {
            this.elements.uploadNewCustomOsBtn().click()
        },
        typeCustomOsnameTxt: (name) => {
            this.elements.customOsnameTxt().clear()
            this.elements.customOsnameTxt().type(name)
        },
        clickCustomOsfileBtn: () => {
            this.elements.customOsFileBtn().click()
        },
        attachFileCustomOsFileTxt: () => {
            this.elements.customOsFileTxt().attachFile('custom_os.iso', { force: true });
        },
        attachFileCustomOsFileTxtForMin: () => {
            this.elements.customOsFileTxt().attachFile('TinyIsoTesty.iso', { force: true });
        },
        attachFileCustomOsFileTxt2: () => {
            this.elements.customOsFileTxt().attachFile('custom_os_2.iso', { force: true });
        },
        attachFileCustomOsFileTxt3: () => {
            this.elements.customOsFileTxt().attachFile('custom_os_3.iso', { force: true });
        },
        clickCustomOsFileConfBtn: () => {
            this.elements.customOsFileConfBtn().click()
        },
        isCustomOsFileConfBtnDisabled: () => {
            this.elements.customOsFileConfBtn().should('be.disabled')
        },
        isVisibleCustomOsUploadProgress: (text) => {
            this.elements.customOsUploadProgress(text).should('be.visible')
        },
        checkCustomOsMinParamsCheckbox: () => {
            this.elements.customOsMinParamsCheckbox().check()
        },
        isModalClosed: () => {
            cy.get(this.elements.customOsUploadModal(), { timeout: 10000 })
                .should('not.be.visible');
        },
        isVisibleCustomOsNameErrorLbl: () => {
            this.elements.customOsNameErrorLbl().should('be.visible')
            this.elements.customOsNameErrorLbl().contains('Обязательное поле')
        },
        typeMinCpuTxt: (cpu) => {
            this.elements.minCpuTxt().clear()
            this.elements.minCpuTxt().type(cpu)
        },
        typeMinRamTxt: (ram) => {
            this.elements.minRamTxt().clear()
            this.elements.minRamTxt().type(ram)
        },
        typeMinDiskTxt: (disk) => {
            this.elements.minDiskTxt().clear()
            this.elements.minDiskTxt().type(disk)
        },
        clickCreatedCustomDiskDeleteBtn: () => {
            this.elements.createdCustomDiskDeleteBtn().click()
        },
        createdCustomOsDeleteBtn: (name) => {
            this.elements.createdCustomOsDeleteBtn(name).click()
        },
        clickdeleteCustomOsFileConfBtn: () => {
            this.elements.deleteCustomOsFileConfBtn().click()
        },
        isVisibleCreatedCustomOsName: (name) => {
            this.elements.isVisibleCreatedCustomOsRowName(name).should('be.visible')
        },
        waitForCustomOsReadyStatus: (name) => {                         // Used to wait any custom OS till it becomes Успешно
            cy.log(`Waiting for custom OS "${name}" to become Успешно...`)
            cy.contains('tr', name, { timeout: 600000 }).should('contain', 'Успешно')
        },
        clickCreateServerBtnPerRowName: (name) => {
            this.elements.createServerBtnPerRowName(name).click()
        },
        setCustomOsCpu: (target) => {
            this.elements.customOsCpuValue().then(($el) => {
                const min = Number($el.attr('min')) || 1
                const max = Number($el.attr('max')) || 13
                const current = Number($el.val())
                const desired = Math.min(max, Math.max(min, Number(target)))
                const diff = desired - current
                const button = diff > 0 ? this.elements.customOsCpuIncreaseBtn() : this.elements.customOsCpuDecreaseBtn()
                Cypress._.times(Math.abs(diff), () => button.click())
            })
        },
        setCustomOsRam: (target) => {
            this.elements.customOsRamValue().then(($el) => {
                const min = Number($el.attr('min')) || 1
                const max = Number($el.attr('max')) || 4
                const current = Number($el.val())
                const desired = Math.min(max, Math.max(min, Number(target)))
                const diff = desired - current
                const button = diff > 0 ? this.elements.customOsRamIncreaseBtn() : this.elements.customOsRamDecreaseBtn()
                Cypress._.times(Math.abs(diff), () => button.click())
            })
        },
        setCustomOsDisk: (target) => {
            this.elements.customOsDiskValue().then(($el) => {
                const min = Number($el.attr('min')) || 1
                const max = Number($el.attr('max')) || 10
                const current = Number($el.val())
                const desired = Math.min(max, Math.max(min, Number(target)))
                const diff = desired - current
                const button = diff > 0 ? this.elements.customOsDiskIncreaseBtn() : this.elements.customOsDiskDecreaseBtn()
                Cypress._.times(Math.abs(diff), () => button.click())
            })
        },
        isCustomOsCpuIncreaseBtnDisabled: () => {
            this.elements.customOsCpuIncreaseBtn().should('be.disabled')
        },
        isCustomOsRamIncreaseBtnDisabled: () => {
            this.elements.customOsRamIncreaseBtn().should('be.disabled')
        },
        isCustomOsDiskIncreaseBtnDisabled: () => {
            this.elements.customOsDiskIncreaseBtn().should('be.disabled')
        },
    }
}
module.exports = new CustomOs()