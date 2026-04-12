class Server {

    elements = {
        serversPageLbl: () => cy.get('[qa-element="vm-table"]'),
        createServerPageLbl: () => cy.get('[qa-element="vm-create"]'),
        createServerBtn: () => cy.get('[qa-element="to-create-vm"]'),
        modalWindow: () => cy.get('.modal-body'),
        modalDialog: () => cy.get('div[role="dialog"][aria-modal="true"].modal'),
        serverOsBtn: () => cy.get('[qa-element="templete-type-0"]'),
        customOsBtn: () => cy.get('[qa-element="templete-type-1"]'),
        serverOsOption: (index) => cy.get(`[qa-element="filtered-os-type-${index}"]`),
        customOsOption: (index) => cy.get(`[qa-element="custom-template-${index}"]`),
        serverOsOptionByName: (name) => cy.get('div[role="dialog"][aria-modal="true"]').contains('div', name),
        versionDropdownLabel: () => cy.get('[qa-element="filtered-os-template-toggle"]'), // version of OS list
        confirmOsBtn: () => cy.get('[qa-element="template-selector-submit"]'),
        serverTitleTxt: () => cy.get('[qa-element="vm-create-name"]'),
        serverDescTxt: () => cy.get('[qa-element="vm-create-desc"]'),
        
        // new selectors for cpu and ram, disk by buttons instead of typing fields
        cpuDecreaseBtn: () => cy.get('[qa-element="create-vm-cpu-range-decrease"]'),
        cpuIncreaseBtn: () => cy.get('[qa-element="create-vm-cpu-range-increase"]'),
        ramDecreaseBtn: () => cy.get('[qa-element="create-vm-ram-range-decrease"]'),
        ramIncreaseBtn: () => cy.get('[qa-element="create-vm-ram-range-increase"]'),
        diskDecreaseBtn: () => cy.get('[qa-element="local-disk-size-range-decrease"]'),
        diskIncreaseBtn: () => cy.get('[qa-element="local-disk-size-range-increase"]'),
        cpuValue: () => cy.get('[qa-element="create-vm-cpu-range"]'),
        ramValue: () => cy.get('[qa-element="create-vm-ram-range"]'),
        diskValue: () => cy.get('[qa-element="local-disk-size-range"]'),

        cpuTxt: () => cy.get('[qa-element="create-vm-cpu-range-input"]'),
        ramTxt: () => cy.get('[qa-element="create-vm-ram-range-input"]'),
        backupBtn: () => cy.get('[qa-element="add-backup-schedule"]'),
        backupTitleTxt: () => cy.get('[qa-element="backup-schedule-name"]'),
        backupCopiesBtn: () => cy.get('[qa-element="backup-limit-edit"]'),
        backupCopiesTxt: () => cy.get('[qa-element="add-backup-schedule-limit"]'),
        confirmBackupCopiesBtn: () => cy.get('[qa-element="backup-schedule-save"]').last(),
        periodSelector: () => cy.get('[qa-element="cron-period-toggle"]'),
        periodOption: (id) => cy.get(`[qa-element="cron-period-${id - 1}"]`),
        backupTimeSelector: () => cy.get('[qa-element="undefined-toggle"]'),
        backupTimeOption: (id) => cy.get(`[qa-element="undefined-${id}"]`),
        confirmBackupBtn: () => cy.get('[qa-element="backup-schedule-create"]'),
        publicIpBtn: () => cy.get('[qa-element="public-ip"]'),
        localIpBtn: () => cy.get('[qa-element="local-ip"]'),
        localIpNameTxt: () => cy.get('[qa-element="network-create-name"]'),
        localIpAddressTxt: () => cy.get('[qa-element="local-nets-toggle"]'),
        localIpGatewayTxt: () => cy.get('[qa-element="gateway-mask"]').last(),
        localIpTxt: () => cy.get('[qa-element="free-ip-address-toggle"]'),
        confirmCreateServerBtn: () => cy.get('[qa-element="vm-craete-submit"]').last(),
        closeModalBtn: () => cy.get('[qa-element="create-success-close"]'),
        createdServerTitleLbl: (text) => cy.get('.vm-table').contains('div', text),
        serverStatusLbl: () => cy.get('[qa-element="vm-status"]'),
        diskTypeSSDBtn: () => cy.get('[qa-element="disk-type-1"]'),
        diskTypeNVMEBtn: () => cy.get('[qa-element="disk-type-2"]'),
        diskTxt: () => cy.get('[qa-element="local-disk-size-range-input"]'),
        loginTypeSSHBtn: () => cy.get('[qa-element="authorize-ssh"]'),
        osErrorLbl: () => cy.get('[qa-element="version-error"]'),
        titleErrorLbl: () => cy.get('[qa-element="create-vm-name-error"]'), 
        publicIpLbl: () => cy.get('[qa-element="public-ip-label"]'), 
        localIpLbl: () => cy.get('[qa-element="user-local-ip-label"]'), 
        cpuErrorLbl: () => cy.get('[qa-element="create-vm-cpu-range-error"]'),
        ramErrorLbl: () => cy.get('[qa-element="create-vm-ram-range-error"]'), 
        localIpErrorLbl: () => cy.get('[qa-element="create-network-mask-error"]'), 
        localIpTitleErrorLbl: () => cy.get('[qa-element="create-network-name-error"]'), 
        localIpSelectTabBtn: () => cy.get('[qa-element="local-nets-open"]'), 
        localIpSelector: () => cy.get('[qa-element="local-nets"]'), 
        localIpOption: (localIpName) => cy.get('[qa-element="local-nets"]').contains(localIpName).first(),
        localIpAddNewBtn: () => cy.get('[qa-element="network-create-show"]'), 
        localIpAddConfBtn: () => cy.get('[qa-element="network-create-submit"]'), 
        fadeModal: () => cy.get('div[role="dialog"][aria-modal="true"]')
    }
    actions = {
        checkServerPageLbl: () => {
            this.elements.serversPageLbl().should('have.text', "Виртуальные серверы")
        },
        clickCreateServerBtn: () => {
            this.elements.createServerBtn().click()
        },
        checkCreateServerPageLbl: () => {
            this.elements.createServerPageLbl().should('have.text', "Новый сервер")
        },
        isOpenedModal: () => {
            this.elements.modalWindow().should('be.visible');
        },
        selectServerOs: (id) => {
            const index = id > 0 ? id - 1 : 0;
            this.elements.serverOsOption(index).click()
        },
        selectServerOsByName: (name) => {
            this.elements.serverOsOptionByName(name).click()
        },
        selectCustomOs: (id) => {
            const index = id > 0 ? id - 1 : 0;
            this.elements.customOsOption(index).click()
        },
        clickConfirmOsBtn: () => {
            this.elements.confirmOsBtn().click();
            cy.wait(5000)
        },
        clickCustomOsTabBtn: () => {
            this.elements.customOsBtn().click()
        },
        clickServerTitleField: () => {
            this.elements.serverTitleTxt().should('be.visible').click();
        },
        writeTitle: (text) => {
            this.elements.serverTitleTxt().type(text)
        },
        writeDesc: (text) => {
            this.elements.serverDescTxt().type(text)
        },

        // new methods for cpu and ram inserting by buttons instead of typing
        setCpu: (target) => {
            this.elements.cpuValue().then(($el) => {
                const min = Number($el.attr('min')) || 1
                const max = Number($el.attr('max')) || 13
                const current = Number($el.val())
                const desired = Math.min(max, Math.max(min, Number(target)))
                const diff = desired - current
                const button = diff > 0 ? this.elements.cpuIncreaseBtn() : this.elements.cpuDecreaseBtn()
                Cypress._.times(Math.abs(diff), () => button.click())
            })
        },
        setRam: (target) => {
            this.elements.ramValue().then(($el) => {
                const min = Number($el.attr('min')) || 1
                const max = Number($el.attr('max')) || 4
                const current = Number($el.val())
                const desired = Math.min(max, Math.max(min, Number(target)))
                const diff = desired - current
                const button = diff > 0 ? this.elements.ramIncreaseBtn() : this.elements.ramDecreaseBtn()
                Cypress._.times(Math.abs(diff), () => button.click())
            })
        },
        setDisk: (target) => {
            this.elements.diskValue().then(($el) => {
                const min = Number($el.attr('min')) || 1
                const max = Number($el.attr('max')) || 300
                const current = Number($el.val())
                const desired = Math.min(max, Math.max(min, Number(target)))
                const diff = desired - current
                const button = diff > 0 ? this.elements.diskIncreaseBtn() : this.elements.diskDecreaseBtn()
                Cypress._.times(Math.abs(diff), () => button.click())
            })
        },

        writeCpuTxt: (text) => {
            const target = Number(text)
            if (Number.isFinite(target)) {
                this.actions.setCpu(target)
            } else {
                this.elements.cpuTxt().invoke('val', text).trigger('input').trigger('change')
            }
        },
        writeRamTxt: (text) => {
            const target = Number(text)
            if (Number.isFinite(target)) {
                this.actions.setRam(target)
            } else {
                this.elements.ramTxt().invoke('val', text).trigger('input').trigger('change')
            }
        },
        isCpuIncreaseBtnDisabled: () => {
            this.elements.cpuIncreaseBtn().should('be.disabled')
        },
        isRamIncreaseBtnDisabled: () => {
            this.elements.ramIncreaseBtn().should('be.disabled')
        },
        isDiskIncreaseBtnDisabled: () => {
            this.elements.diskIncreaseBtn().should('be.disabled')
        },
        isCpuDescreaseBtnDisabled: () => {
            this.elements.cpuDecreaseBtn().should('be.disabled')
        },
        isRamDescreaseBtnDisabled: () => {
            this.elements.ramDecreaseBtn().should('be.disabled')
        },
        isDiskDescreaseBtnDisabled: () => {
            this.elements.diskDecreaseBtn().should('be.disabled')
        },
        toggleBackupBtn: () => {
            this.elements.backupBtn().click()
        },
        writeBackupTitle: (text) => {
            this.elements.backupTitleTxt().type(text)
        },
        clickBackupCopiesBtn: () => {
            this.elements.backupCopiesBtn().click()
        },
        writeBackupCopiesTxt: (text) => {
            this.elements.backupCopiesTxt().clear()
            this.elements.backupCopiesTxt().type(text)
        },
        clickConfirmBackupCopyBtn: () => {
            this.elements.confirmBackupCopiesBtn().click()
        },
        checkConfirmBackupCopyBtn: () => {
            this.elements.confirmBackupCopiesBtn().should('be.disabled')
        },
        selectBackupPeriod: (id) => {
            this.elements.periodSelector().click()
            this.elements.periodOption(id).click()
        },
        writeTimeSelector: (id) => {
            this.elements.backupTimeSelector().click()
            this.elements.backupTimeOption(id).click()
        },
        clickConfirmBackupBtn: () => {
            this.elements.confirmBackupBtn().click()
        },
        isBackupCopyBtnDisabled: () => {
            this.elements.confirmBackupBtn().should('be.disabled')
        },
        enablePublicIp: () => {
            this.elements.publicIpBtn().click()
        },
        enableLocalIp: () => {
            this.elements.localIpBtn().click()
        },
        writeLocalIpTxt: (ip) => {
            this.elements.localIpTxt().clear()
            this.elements.localIpTxt().type(ip)
        },
        writeLocalIpNameTxt: (name) => {
            this.elements.localIpNameTxt().clear()
            this.elements.localIpNameTxt().type(name)
        },
        writeLocalIpAddressTxt: (text) => {
            this.elements.localIpAddressTxt().clear()
            this.elements.localIpAddressTxt().type(text)
        },
        writeLocalIpGatewayTxt: (text) => {
            this.elements.localIpGatewayTxt().clear()
            this.elements.localIpGatewayTxt().type(text)
        },
        clickConfirmCreateServerBtn: () => {
            this.elements.confirmCreateServerBtn().click()
        },
        clickCloseModalBtn: () => {
            this.elements.closeModalBtn().click()
        },
        checkCreateApi: (name) => {
            cy.wait('@createServerRequest').then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body).to.have.property('data');
                expect(interception.response.body.data).to.have.property('id');
                expect(interception.response.body.data).to.have.property('vmName');
                expect(interception.response.body.data.vmName).to.eq(name);
                expect(interception.response.body.data).to.have.property('status');
                expect(interception.response.body.data.status).to.eq("STATUS_NEW");
                expect(interception.response.body.data).to.have.property('password');
                expect(interception.response.body.data).to.have.property('user');
            });
        },
        checkCustomBMApi: (name) => {
            cy.wait('@createServerRequest').then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body).to.have.property('data');
                expect(interception.response.body.data).to.have.property('id');
                expect(interception.response.body.data).to.have.property('vmName');
                expect(interception.response.body.data.vmName).to.eq(name);
                expect(interception.response.body.data).to.have.property('status');
                expect(interception.response.body.data.status).to.eq("STATUS_NEW");
            });
        },
        isVisibleCreatedServer: (text) => {
            this.elements.createdServerTitleLbl(text).should('be.visible')
        },
        clickDiskTypeSSDBtn: () => {
            this.elements.diskTypeSSDBtn().click()
        },
        clickDiskTypeNVMEBtn: () => {
            this.elements.diskTypeNVMEBtn().click()
        },
        typeDiskSize: (text) => {
            this.elements.diskTxt().clear()
            this.elements.diskTxt().type(text)
        },
        clickLoginTypeSSHBtn: () => {
            this.elements.loginTypeSSHBtn().click()
        },
        isVisibleOsRequiredLbl: () => { // os version label
            this.elements.osErrorLbl().should('be.visible')
        }, 
        isVisibleTitleRequiredLbl: () => {
            this.elements.titleErrorLbl().should('be.visible')
        },
        isRedPublicIpLbl: () => {
            this.elements.publicIpLbl().should('have.css', 'color', 'rgb(232, 95, 92)');
        },
        isRedLocalIpLbl: () => {
            this.elements.localIpLbl().should('have.css', 'color', 'rgb(232, 95, 92)');
        },
        checkTitleErrorLbl: (text) => {
            this.elements.titleErrorLbl().should('be.visible')
            this.elements.titleErrorLbl().should('have.text', text)
        },
        checkCpuErrorLbl: (text) => {
            // this.elements.cpuErrorLbl().should('be.visible')
            // this.elements.cpuErrorLbl().should('have.text', text)
        },
        checkRamErrorLbl: (text) => {
            // this.elements.ramErrorLbl().should('be.visible')
            // this.elements.ramErrorLbl().should('have.text', text)
        },
        isRedDiskTxt1: () => {
            this.elements.diskTxt().should('have.css', 'border-color', 'rgb(232, 95, 92)');
        },
        isRedDiskTxt2: () => {
            this.elements.diskTxt().should('have.css', 'border-color', 'rgb(235, 235, 235)');
        },
        isRedDiskTxt3: () => {
            this.elements.diskTxt().should('have.css', 'border-color', 'rgb(232, 92, 92)');
        },
        isRedLocalIpTxt: () => {
            this.elements.localIpTxt().should('have.css', 'border-color', 'rgb(232, 95, 92)');
        },
        checkLocalIpErrorLbl: (text) => {
            this.elements.localIpErrorLbl().should('be.visible')
            this.elements.localIpErrorLbl().should('have.text', text)
        },
        isRedLocalIpAddressTxt: () => {
            this.elements.localIpAddressTxt().should('have.css', 'border-color', 'rgb(232, 95, 92)');
        },
        isRedLocalIpTitleTxt: () => {
            this.elements.localIpNameTxt().should('have.css', 'border-color', 'rgb(232, 95, 92)');
        },
        checkLocalIpTitleErrorLbl: (text) => {
            this.elements.localIpTitleErrorLbl().should('be.visible')
            this.elements.localIpTitleErrorLbl().should('have.text', text)
        },
        clickLocalIpSelectTabBtn: () => {
            this.elements.localIpSelectTabBtn().click()
        },
        checkLocalIpAddressTxtNotEmpty: () => {
            this.elements.localIpAddressTxt().invoke('text').should('not.be.empty');
        },
        checkLocalIpGatewayTxtNotEmpty: () => {
            this.elements.localIpGatewayTxt().invoke('text').should('not.be.empty');
        },
        checkLocalIpTxtNotEmpty: () => {
            this.elements.localIpTxt().invoke('text').should('not.be.empty');
        },
        checkElementTextPeriodically: (maxIterations = 25) => {
            if (maxIterations <= 0) {
                expect(true, 'Превышено максимальное количество итераций').to.equal(false);
                return;
            }

            this.elements.serverStatusLbl().invoke('text').then((text1) => {
                if (text1.includes('В работе')) {
                    cy.log('success');
                } else {
                    cy.wait(5000);
                    this.actions.checkElementTextPeriodically(maxIterations - 1);
                }
            });
        },

        clickLocalIpSelector: () => {
            this.elements.localIpSelector().click()
        },
        selectLocalIpName: (name) => {
            this.elements.localIpOption(name).click()
        },
        clickLocalIpAddNewBtn: () => {
            this.elements.localIpAddNewBtn().click()
        },
        clickLocalIpAddConfBtn: () => {
            this.elements.localIpAddConfBtn().click()
        },
        isLocalIpAddConfBtnDisabled: () => {
            this.elements.localIpAddConfBtn().should('be.disabled')
        }
    }
}




module.exports = new Server()