class ServerDisks {

    elements = {
        diskListItems: () => cy.get('tbody tr'),
        serverDisksTab: () => cy.get('[qa-element="tab-1"]').contains("Диски"), //tab-1
        addNewServerDiskBtn: () => cy.get('[qa-element="show-disk-modal"]'), //show-disk-modal
        connectNewServerDiskBtn: () => cy.get('[qa-element="show-link-disk"]').contains('Привязать диск'), //show-link-disk
        newDiskNameTxt: () => cy.get('[qa-element="disk-name"]'), //disk-name
        newDiskTypeHDDBtn: () => cy.get('[qa-element="hdd-ssd-0"]'), //hdd-ssd-0
        newDiskTypeSSDBtn: () => cy.get('[qa-element="hdd-ssd-1"]'),// hdd-ssd-1
        newDiskTypeNVMEBtn: () => cy.get('[qa-element="hdd-ssd-2"]'),// hdd-ssd-2
        changeDiskTypeHDDBtn: () => cy.get('[qa-element="external-internal-0"]'), //external-internal-0
        changeDiskTypeSSDBtn: () => cy.get('[qa-element="external-internal-1"]'), //external-internal-1
        newDiskSizeTxt: () => cy.get('[qa-element="disk-size-range-input"]'), //disk-size-range-input
        confirmNewDiskBtn: () => cy.get('[qa-element="add-disk"]'), //add-disk
        createdDiskTitleLbl: (text) => cy.get('.react-table').contains('div', text),
        newDiskNameErrorLbl: () => cy.get('[qa-element="add-disk-name-error"]'), //add-disk-name-error
        newDiskSizeErrorLbl: (text) => cy.get('[qa-element="disk-size-range-error"]').contains(text), //disk-size-range-error    
        newDiskSizeErrorLbl2: (text) => cy.get('[qa-element="increase-disk-size-range-error"]').contains(text),
        diskDeleteBtn: () => cy.get('tbody').contains('tr', 'Test-Created-Disk').find('[qa-element="delete-disk-show"]').first(), //increase-size-1-show
        diskDeleteBtn2: () => cy.get('tbody').contains('tr', 'Test-Created-Disk2').find('[qa-element="delete-disk-show"]').first(),
        diskDisconnectBtn: () => cy.get('tbody').contains('tr', 'Test-Disk').find('[qa-element="unlink-disk-show"]').first(), //unlink-disk-show
        diskChangeTypeBtn: () => cy.get('tbody').contains('tr', 'Test-Created-Disk').find('[qa-element="disk-change-type"]').first(), //disk-change-type-1
        diskChangeTypeBtn2: () => cy.get('tbody').contains('tr', 'Test-Created-Disk2').find('button.btn-outline-primary').first(), //disk-change-type-1
        diskChangeTypeBtn2ndRow: () => cy.get('tbody').contains('tr', 'Test-Created-Disk2').find('[qa-element="disk-change-type"]').first(), //disk-change-type
        diskSizeUpBtn: () => cy.get('tbody').contains('tr', 'Test-Created-Disk').find('[qa-element="disk-increase-size"]').first(), //disk-increase-size-1
        diskMakeUploadBtn: () => cy.get('tbody').contains('tr', 'Test-Created-Disk').find('[qa-element="as-boot-show"]').first(),  //as-boot-1-show
        remakeUploadBtn: () => cy.get('tbody').contains('tr', 'Загрузочный диск').find('[qa-element="as-boot-show"]').first(),  //as-boot-1-show
        confDeleteDiskBtn: () => cy.get('[qa-element="delete-disk-submit"]'), //increase-size-1-submit
        noLimitsOfDiskLbl: () => cy.get('.modal-body > .fade'),
        standartDiskLimits: () => cy.get('.resources-limits__container').contains('span', 'Стандартный диск: ').parent().find('strong'),
        diskSizeUpModalBtn: () => cy.get('[qa-element="disk-increase-submit"]').contains('Увеличить'), //disk-increase-submit
        changeDiskTypeConfBtn: () => cy.get('[qa-element="disk-change"]').contains('Изменить'), //disk-change
        diskSizeUpModalTxt: () => cy.get('[qa-element="increase-disk-size-range-input"]'), //increase-disk-size-range-input
        diskmakeUploadConfirmBtn: () => cy.get('[qa-element="as-boot-submit"]').contains('Подтвердить'), //as-boot-1-submit
        diskSizeUpModalErrorLbl: () => cy.get('div[role="alert"].alert-danger'),
        connectDiskSelector: () => cy.get('[qa-element="select-disk-open"]'), //select-disk-open
        connectDiskOption: () => cy.get('.modal-body').find('div#input-dropdown').contains('a', 'Test-Disk'), //select-disk-0
        connectNvmeDiskOption: () => cy.get('.modal-body').find('div#input-dropdown').contains('a', 'Test-Edited-NVME-Disk'), //select-disk-1
        connectDiskModalBtn: () => cy.get('[qa-element="link-disk-submit"]').contains('Добавить'), //link-disk-submit
        disconnectDiskModalBtn: () => cy.get('[qa-element="unlink-disk-submit"]').contains('Да'), //unlink-disk-submit
        modalCloseBtn: () => cy.get('.btn-close'),
        diskChangeNameBtn: () => cy.get('tbody').contains('tr', 'Test-NVME-Disk').find('[qa-element="disk-rename"]').first(), //rename disk button
        cancelButtonInRenameDiskModal: () => cy.get('[qa-element="cancel-rename"]').contains('Отмена'),
        renameDiskModalNameInputField: () => cy.get('[qa-element="rename-input"]'),
        renameDiskModalConfirmBtn: () => cy.get('[qa-element="confirm-rename"]'),
        renameDiskNameErrorLbl: () => cy.get('[qa-element="rename-error"]'), //add-disk-name-error
        nvmeDiskSizeUpBtn: () => cy.get('tbody').contains('tr', 'Test-Edited-NVME-Disk').find('[qa-element="disk-increase-size"]').first(), //disk-increase-size-2
        changeDiskSizeWithoutServerRebootRadioBtn: () => cy.get('#disk-increase-form > div:nth-child(2) > div > label').click(),
        changeDiskSizeWithServerRebootRadioBtn: () => cy.get('#disk-increase-form > div:nth-child(1) > div > label').click(),
        nvmeDiskChangeToBootBtn: () => cy.get('tbody').contains('tr', 'Test-Edited-NVME-Disk').find('[qa-element="as-boot-show"]').first(),
        bootDiskChangeToBootBtn: () => cy.get('tbody').contains('tr', 'Загрузочный диск').find('[qa-element="as-boot-show"]').first(),// as-boot-cancel
        nvmeDiskChangeToBootCancelBtn: () => cy.get('[qa-element="as-boot-cancel"]').first(),
        nvmeDiskDetachBtn: () => cy.get('tbody').contains('tr', 'Test-Edited-NVME-Disk').find('[qa-element="unlink-disk-show"]').first(), //unlink-disk-show
        nvmeDiskDetachModalCancelBtn: () => cy.get('[qa-element="unlink-disk-cancel"]').first(),
        nvmeDiskRowInServersDisksTab: () => cy.get('tbody').contains('tr', 'Test-Edited-NVME-Disk'),
        nvmeDiskDeleteBtn: () => cy.get('tbody').contains('tr', 'Test-Edited-NVME-Disk').find('[qa-element="delete-disk-show"]').first(),
        nvmeDiskDeleteModalCancelBtn: () => cy.get('[qa-element="delete-disk-cancel"]').first(),
        anyDiskRenameBtn: (name) => cy.get('tbody').contains('tr', name).find('[qa-element="disk-rename"]').first(), //rename disk button per custom name
        anyDiskChangeTypeBtn: (name) => cy.get('tbody').contains('tr', name).find('[qa-element="disk-change-type"]').first(), //change disk type per custom name
        anyDiskIncreaseSizeBtn: (name) => cy.get('tbody').contains('tr', name).find('[qa-element="disk-increase-size"]').first(), //increase disk size per custom name
        anyDiskMarkAsBootBtn: (name) => cy.get('tbody').contains('tr', name).find('[qa-element="as-boot-show"]').first(),  //mark disk as boot per custom name
        anyDiskDetachBtn: (name) => cy.get('tbody').contains('tr', name).find('[qa-element="unlink-disk-show"]').first(),  //detach disk per custom name
        anyDiskRowInServersDisksTab: (name) => cy.get('tbody').contains('tr', name), //search any disk per custom name
        anyDiskInAttachList: (name) => cy.get('.modal-body').find('div#input-dropdown').contains('a', name),  //select any disk name in attach list per custom name
    }
    actions = {
        clickServerDisksTab: () => {
            this.elements.serverDisksTab().click()
        },
        clickAddNewServerDiskBtn: () => {
            this.elements.addNewServerDiskBtn().click()
        },
        writeNewDiskNameTxt: (name) => {
            this.elements.newDiskNameTxt().clear()
            this.elements.newDiskNameTxt().type(name)
        },
        clickDiskTypeHDDBtn: () => {
            this.elements.newDiskTypeHDDBtn().click()
        },
        clickDiskTypeNVMEBtn: () => {
            this.elements.newDiskTypeNVMEBtn().click()
        },
        clickModalCloseBtn: () => {
            this.elements.modalCloseBtn().click()
        },
        writeNewDiskSizeTxt: (size) => {
            this.elements.newDiskSizeTxt().clear()
            this.elements.newDiskSizeTxt().type(size)
        },
        clickConfirmNewDiskBtn: () => {
            this.elements.confirmNewDiskBtn().click()
            cy.wait(3000)
        },
        /*checkCreateDiskAPI: (diskName) => {
            cy.wait('@createNewDisk').then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body).to.have.property('data');
                expect(interception.response.body.data).to.have.property('id');
                const serverDisks = interception.response.body.data.disks
                const newDisk = serverDisks.find(disk => {
                    return disk.name == diskName
                })
                cy.wrap(newDisk).should('not.be.empty');
            })
        }, */
        checkLinkDiskAPI: () => {
            cy.wait('@linkDisk').then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
            })
        },
        isVisibleCreatedDisk: (text) => {
            this.elements.createdDiskTitleLbl(text).should('be.visible')
        },
        isVisiblenoLimitsOfDiskLbl: () => {
            this.elements.noLimitsOfDiskLbl().should('be.visible')
        },
        checkNewDiskNameErrorLbl: (text) => {
            this.elements.newDiskNameErrorLbl().should('be.visible')
            this.elements.newDiskNameErrorLbl().should('have.text', text)
        },
        checkNewDiskNameContainsErrorLbl: (text) => {
            this.elements.newDiskNameErrorLbl().should('be.visible')
            this.elements.newDiskNameErrorLbl().should('contain.text', text)
        },
        checkNewDiskSizeErrorLbl: (text) => {
            this.elements.newDiskSizeErrorLbl(text).contains(text)
        },
        checkNewDiskSizeErrorLbl2: (text) => {
            this.elements.newDiskSizeErrorLbl2(text).should('have.text', text)
        },
        checkNewDiskSizeContainsErrorLbl: (text) => {
            this.elements.newDiskSizeErrorLbl2().should('be.visible')
            this.elements.newDiskSizeErrorLbl2().should('contain.text', text)
        },
        clickDeleteDiskBtn: () => {
            this.elements.diskDeleteBtn().click()
        },
        clickDeleteDiskBtn2: () => {
            this.elements.diskDeleteBtn2().click()
        },
        clickConfDeleteBtn: () => {
            this.elements.confDeleteDiskBtn().click()
        },

        isDeleteBtnDisabled: () => {
            this.elements.diskDeleteBtn().should('be.disabled');
        },

        clickDiskSizeUpBtn: () => {
            this.elements.diskSizeUpBtn().click()
        },
        clickDiskSizeUpModalBtn: () => {
            this.elements.diskSizeUpModalBtn().click()
        },
        writeDiskSizeUpModalTxt: (size) => {
            this.elements.diskSizeUpModalTxt().clear()
            this.elements.diskSizeUpModalTxt().type(size)
        },
        checkDiskSizeUpErrorLblText: () => {
            this.elements.diskSizeUpModalErrorLbl().invoke('text').then((text) => {
                expect(text).to.equal("Total hdd_size limit exceeded");
            })
        },
        checkDiskSizeUpModalTxtisRed: () => {
            this.elements.diskSizeUpModalTxt().should('have.css', 'border-color', 'rgb(232, 95, 92)');
        },
        checkAddNewDiskServerBtnIsDisabled: () => {
            this.elements.addNewServerDiskBtn().should('be.disabled');
        },
        clickConnectNewServerDiskBtn: () => {
            this.elements.connectNewServerDiskBtn().click()
        },
        clickConnectDiskSelector: () => {
            this.elements.connectDiskSelector().click()
        },
        selectConnectDiskOption: () => {
            this.elements.connectDiskOption().click()
        },
        clickConnectDiskModalBtn: () => {
            this.elements.connectDiskModalBtn().click()
        },
        checkconnectNewDiskServerBtnIsDisabled: () => {
            this.elements.connectNewServerDiskBtn().parent().should('be.disabled');
        },
        clickDiskDisconnectBtn: () => {
            this.elements.diskDisconnectBtn().click()
        },
        isDiskDisconnectBtnDisabled: () => {
            this.elements.diskDisconnectBtn().should('be.disabled');
        },
        clickDisconnectDiskModalBtn: () => {
            this.elements.disconnectDiskModalBtn().click()
        },
        clickDiskMakeUploadBtn: () => {
            this.elements.diskMakeUploadBtn().click()
        },
        clickDiskmakeUploadConfirmBtn: () => {
            this.elements.diskmakeUploadConfirmBtn().click()
        },
        clickRemakeUploadBtn: () => {
            this.elements.remakeUploadBtn().click()
        },
        clickDiskChangeTypeBtn: () => {
            this.elements.diskChangeTypeBtn().click()
        },
        clickDiskChangeTypeBtn2: () => {
            this.elements.diskChangeTypeBtn2().click()
        },
        clickDiskChangeTypeBtn2ndRow: () => {
            this.elements.diskChangeTypeBtn2ndRow().click()
        },
        clickChangeDiskTypeSSDBtn: () => {
            this.elements.changeDiskTypeSSDBtn().click()
        },
        clickChangeDiskTypeSSDBtnInAddDiskModal: () => {
            this.elements.newDiskTypeSSDBtn().click()
        },
        clickChangeDiskTypeHDDBtn: () => {
            this.elements.changeDiskTypeHDDBtn().click()
        },
        clickChangeDiskTypeConfBtn: () => {
            this.elements.changeDiskTypeConfBtn().click()
        },
        isDisabledDiskSizeUpModalBtn: () => {
            this.elements.diskSizeUpModalBtn().should('be.disabled');
        },
        clickDiskSizeUpModalBtn: () => {
            this.elements.diskSizeUpModalBtn().click();
        },
        clickRenameDiskBtn: () => {
            this.elements.diskChangeNameBtn().click();
        },
        checkAddDiskBtnExists: () => {
            this.elements.addNewServerDiskBtn().should('be.visible')
        },
        clickCancelBtnInRenameModal: () => {
            this.elements.cancelButtonInRenameDiskModal().click();
        },
        clearTextInRenameDiskNameModal: () => {
            this.elements.renameDiskModalNameInputField().clear()
        },
        editDiskNameTxt: (name) => {
            this.elements.renameDiskModalNameInputField().clear()
            this.elements.renameDiskModalNameInputField().type(name)
        },
        clickConfirmBtnInRenameModal: () => {
            this.elements.renameDiskModalConfirmBtn().click();
        },
        isDisabledRenameDiskModalConfirmBtn: () => {
            this.elements.renameDiskModalConfirmBtn().should('be.disabled');
        },
        checkRenamedDiskNameErrorLbl: (text) => {
            this.elements.renameDiskNameErrorLbl().should('be.visible')
            this.elements.renameDiskNameErrorLbl().should('have.text', text)
        },
        checkRenamedDiskNameContainsErrorLbl: (text) => {
            this.elements.renameDiskNameErrorLbl().should('be.visible')
            this.elements.renameDiskNameErrorLbl().should('contain.text', text)
        },
        clickNvmeIncreaseDiskSizeBtn: () => {
            this.elements.nvmeDiskSizeUpBtn().click()
        },
        clickWithServerRebootIncreaseDiskSizeBtn: () => {
            this.elements.changeDiskSizeWithServerRebootRadioBtn().click()
        },
        clickWithoutServerRebootIncreaseDiskSizeBtn: () => {
            this.elements.changeDiskSizeWithoutServerRebootRadioBtn().click()
        },
        clickNvmeDiskChangeToBootDiskBtn: () => {
            this.elements.nvmeDiskChangeToBootBtn().click();
        },
        clickBootDiskChangeToBootDiskBtn: () => {
            this.elements.bootDiskChangeToBootBtn().click();
        },
        clickChangeToBootDiskModalCancelBtn: () => {
            this.elements.nvmeDiskChangeToBootCancelBtn().click();
        },
        checkNvmeDiskChangedToBootDisk: () => {
            this.elements.nvmeDiskChangeToBootBtn().should('be.disabled')
            this.elements.bootDiskChangeToBootBtn().should('be.enabled')
        },
        checkBootDiskChangedToBootDisk: () => {
            this.elements.bootDiskChangeToBootBtn().should('be.disabled')
            this.elements.nvmeDiskChangeToBootBtn().should('be.enabled')
        },
        clickNvmeDiskDetachBtn: () => {
            this.elements.nvmeDiskDetachBtn().click();
        },
        clickNvmeDiskDetachModalCancelBtn: () => {
            this.elements.nvmeDiskDetachModalCancelBtn().click();
        },
        checkNvmeDiskNotExists: () => {
            this.elements.nvmeDiskRowInServersDisksTab().should('not.exist')
        },
        checkNvmeDiskExists: () => {
            this.elements.nvmeDiskRowInServersDisksTab().should('exist')
        },
        selectConnectNvmeDiskOption: () => {
            this.elements.connectNvmeDiskOption().click();
        },
        clickNvmeDiskDeleteModalCancelBtn: () => {
            this.elements.nvmeDiskDeleteModalCancelBtn().click();
        },
        clickNvmeDiskDeleteBtn: () => {
            this.elements.nvmeDiskDeleteBtn().click();
        },
        getDiskCount: () => {
            return this.elements.diskListItems().its('length');
        },
        isAddNewDiskBtnDisabled: () => {
            this.elements.addNewServerDiskBtn().should('be.disabled');
        },
        clickAnyDiskChangeNameBtn: (name) => {
            this.elements.anyDiskRenameBtn(name).click()
        },
        clickAnyDiskChangeTypeBtn: (name) => {
            this.elements.anyDiskChangeTypeBtn(name).click()
        },
        clickAnyDiskIncreaseSizeBtn: (name) => {
            this.elements.anyDiskIncreaseSizeBtn(name).click()
        },
        clickAnyDiskMarkAsBootBtn: (name) => {
            this.elements.anyDiskMarkAsBootBtn(name).click()
        },
        clickAnyDiskDetachBtn: (name) => {
            this.elements.anyDiskDetachBtn(name).click()
        },
        checkDiskUnderThisNameExists: (name) => {
            this.elements.anyDiskRowInServersDisksTab(name).should('exist')
        },
        checkDiskUnderThisNameNotExists: (name) => {
            this.elements.anyDiskRowInServersDisksTab(name).should('not.exist')
        },
        IsMarkAsBootBtnOfDiskIsEnabled: (name) => {
            this.elements.anyDiskMarkAsBootBtn(name).should('be.enabled') //
        },
        IsMarkAsBootBtnOfDiskIsDisabled: (name) => {
            this.elements.anyDiskMarkAsBootBtn(name).should('be.disabled')
        },
        selectAnyDiskInAttachDiskList: (name) => {
            this.elements.anyDiskInAttachList(name).click();
        },



    }
}




module.exports = new ServerDisks()