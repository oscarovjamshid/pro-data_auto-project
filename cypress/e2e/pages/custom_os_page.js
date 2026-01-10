class CustomOs {
    elements = {
        uploadNewCustomOsBtn: () => cy.get('[qa-element="os-template-upload"]'),
        customOsnameTxt: () => cy.get('[qa-element="os-template-name"]').first(),
        customOsFileBtn: () => cy.get('[qa-element="upload-file"]'),
        customOsFileTxt: () => cy.get('#template-upload-input'),
        customOsFileConfBtn: () => cy.get('[qa-element="os-upload-submit"]'),
        customOsUploadProgress: () => cy.get('.progress'),
        customOsMinParamsCheckbox: () => cy.get('.form-check').find('input[type="checkbox"]'),
        customOsUploadModal: () => cy.get('.modal-content'),
        customOsNameErrorLbl: () => cy.get('[qa-element="os-upload-name-error"], [qa-element="os-upload-file-error"]'),
        minCpuTxt: () => cy.get('[qa-element="os-upload-cpu-cores-range-input"]'),
        minRamTxt: () => cy.get('[qa-element="os-upload-ram-range-input"]'),
        minDiskTxt: () => cy.get('[qa-element="os-upload-disk-range-input"]'),
        createdCustomOsDeleteBtn: (name) => cy.get('tbody').find('tr').contains(name).parent().find('td').last().find('button').last(),
        createdCustomDiskDeleteBtn: () => cy.get('tbody').find('tr').contains(name).parent().find('td'),
        deleteCustomOsFileConfBtn: () => cy.get('[qa-element="delete-vm-template-submit"]'),
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
        isVisibleCustomOsUploadProgress: () => {
            this.elements.customOsUploadProgress()
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
        }
    }
}





module.exports = new CustomOs()