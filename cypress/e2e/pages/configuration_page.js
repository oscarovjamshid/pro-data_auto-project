class ConfigurationList {
    elements = {
        server_searchTxt: () => cy.get('[qa-element="search-input"]'),
        click_serverDetailLbl: () => cy.get('.selectable > :nth-child(1)'),
        server_dangerBtn: () => cy.get('[qa-element="vm-delete-show"]'),
        server_enterVnNameTxt: () => cy.get('[qa-element="vm-edit-name"]'),
        server_deleteVmNameTxt: () => cy.get('[qa-element="vm-delete-name"]'),
        server_verifiedDeleteBtn: () => cy.get('[qa-element="vm-delete-submit"]'),
        server_configuration: () => cy.get('[qa-element="tab-0"]'),
        server_backupSchedule: () => cy.get('[qa-element="tab-5"]'),
        server_scheduleDeleteBtn: () => cy.get('[qa-element="delete-schedule-submit"]'),
        server_backupPageBtn: () => cy.get('[data-active="true"]'),
        server_scheduleDeleteAllBtn: () => cy.get('[qa-element="delete-schedule-show"]').first(),
        server_schedulePageTxt: () => cy.get('[qa-element="tab-4"]'),
        server_scheduleBackupPageTxt: () => cy.get('[qa-element="tab-5"]'),
        server_editedBtn: () => cy.get('[qa-element="to-vm-edit"]'),
        server_enterNameLbl: () => cy.get('[qa-element="vm-edit-name"]'),
        server_editServerBtn: () => cy.get('[qa-element="server-reboot-show"]').first(),
        server_inValidMessageTxt: () => cy.get('[qa-element="edit-vm-name-error"]'),
        server_inValidDeleteMessageTxt: () => cy.get(':nth-child(1) > .invalid-feedback'),
        server_visibleCpuLbl: () => cy.get('[qa-element="edit-vm-cpu-range-input"]'),
        server_visibleRamLbl: () => cy.get('[qa-element="edit-vm-ram-range-input"]'),
        configuration_PrimaryBtn: () => cy.get('[qa-element="server-reboot-submit"]'),
        configuration_messageVisibleInValid: () => cy.get('[qa-element="edit-vm-name-error"]'),
        configuration_messageVisibleInValidCpu: () => cy.get('[qa-element="range-input-error"]'),
        configuration_messageInValidTxtVisible: () => cy.get('[qa-element="edit-vm-ram-range-error"]'),
        server_editServerBtn2: () => cy.get('[qa-element="change-config"]')

    }
    actions = {
        checkServerStatusStopped: () => {
            cy.wait('@serverStatusStopped', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body).to.have.property('data');
                expect(interception.response.body.data).to.have.property('vms');

                const serverListStatus = interception.response.body.data.vms;

                for (let server of serverListStatus) {
                    if (server.vmName === "Test-Server") {
                        cy.log(`Found Test-Server server: ${server.vmName}`);
                        this.elements.server_searchTxt().clear().type(server.vmName);
                        this.elements.click_serverDetailLbl().click()
                        break;
                    }
                }
            });
        },
        deleteScheduledBackups: () => {
            this.elements.server_backupSchedule().click()
            this.elements.server_scheduleDeleteAllBtn().click()
            this.elements.server_scheduleDeleteBtn().should("be.visible")
            this.elements.server_scheduleDeleteBtn().click()
            this.elements.server_configuration().click()
        },
        tests: () => {
            this.elements.server_backupSchedule().click()
            if (this.elements.server_scheduleDeleteAllBtn().should("be.visible")) {
                this.elements.server_scheduleDeleteAllBtn().click()
                this.elements.server_scheduleDeleteBtn().should("be.visible")
                this.elements.server_scheduleDeleteBtn().click()
                this.elements.server_backupPageBtn().click()
                this.elements.server_dangerBtn().should("be.visible").click()
                this.elements.server_dangerBtn()
                this.elements.server_schedulePageTxt().click()
                this.elements.server_scheduleDeleteAllBtn().should("be.visible")
                this.elements.server_scheduleDeleteAllBtn().click()
                this.elements.server_scheduleDeleteBtn().click()


            }
            if (this.elements.server_schedulePageTxt().click()) {
                this.elements.server_scheduleDeleteAllBtn().should("be.visible")
                this.elements.server_scheduleDeleteAllBtn().click()

            } else {
                cy.log("Hellogodd")
            }
        },

        isVisibleDangerBtn: () => {
            this.elements.server_dangerBtn().should("be.visible")
        },
        navigateSchedulePageTxt: () => {
            this.elements.server_backupSchedule().click()
        },
        isVisibleMarkBtn: () => {
            this.elements.server_scheduleDeleteAllBtn().should("be.visible")
        },
        clickMarkBtn: () => {
            this.elements.server_scheduleDeleteAllBtn().click()
        },
        clickScheduleVerifiedBtn: () => {
            this.elements.server_scheduleDeleteBtn()
        },
        clickBackupPageBtn: () => {
            this.elements.server_backupPageBtn().click()
        },
        clickDeleteServerBtn: () => {
            this.elements.server_dangerBtn().click()
        },
        isVisibleEnterVnNameInput: () => {
            this.elements.server_enterVnNameTxt().should("be.visible")
        },
        writeDeleteServerNameTxt: (text) => {
            this.elements.server_deleteVmNameTxt().clear().type(text)
        },
        clickVerifiedDeleteBtn: () => {
            this.elements.server_verifiedDeleteBtn().click()
        },
        clickEditServerBtn: () => {
            this.elements.server_editedBtn().click()
        },
        isVisibleServerNameLbl: () => {
            this.elements.server_enterNameLbl().should("be.visible")
        },
        enterServerNameLbl: (text) => {
            this.elements.server_enterNameLbl().clear().type(text)

        },
        clickEditServerNameBtn: () => {
            this.elements.server_editServerBtn().click({ force: true });
        },
        clickEditServerNameBtnDisable: () => {
            this.elements.server_editServerBtn2().should('be.disabled')
        },
        clickEditServerNameBtn2: () => {
            this.elements.server_editServerBtn2().click({ force: true });
        },
        isVisibleInvalidNameTxt: () => {
            this.elements.server_inValidMessageTxt().should("be.visible")
        },
        clickDeleteServerDangerBtn: () => {
            this.elements.server_dangerBtn().click()
        },
        isVisibleDeleteInValidMessage: () => {
            this.elements.server_inValidDeleteMessageTxt()
        },
        isVisibleCpuInp: () => {
            this.elements.server_visibleCpuLbl().should('be.visible')
        },
        enterNegativeNumberCpu: (text) => {
            this.elements.server_visibleCpuLbl().clear().type(text)
        },
        isNotChangedCpu: () => {
            cy.wait('@serverEditNegativeCpu', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(500);
            });
        },
        isVisibleRamInp: () => {
            this.elements.server_visibleRamLbl().should('be.visible')
        },
        enterNegativeNumberRam: (text) => {
            this.elements.server_visibleRamLbl().clear().type(text)
        },
        clickVerificationConfigurationBtn: () => {
            this.elements.configuration_PrimaryBtn().click({ force: true })
        },
        isVisibleConfigurationInValidMessage: () => {
            this.elements.configuration_messageVisibleInValid().should('be.visible')
        },
         isVisibleConfigurationInValidMessageCpu: () => {
            this.elements.configuration_messageVisibleInValidCpu().should('be.visible')
        },
        isVisibleShowInValidMessageCpu: () => {
            this.elements.configuration_messageInValidTxtVisible().should('be.visible')
        }
    }
}


module.exports = new ConfigurationList()