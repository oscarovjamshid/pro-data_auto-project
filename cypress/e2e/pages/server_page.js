

class Server {

    elements = {
        serversPageLbl: () => cy.get('[qa-element="vm-table"]'),
        createServerPageLbl: () => cy.get('[qa-element="vm-create"]'),
        createServerBtn: () => cy.get('[qa-element="to-create-vm"]'),
        serverOsTxt: () => cy.get('[qa-element="select-os-source"]'),
        modalWindow: () => cy.get('.modal-body'),
        modalDialog: () => cy.get('div[role="dialog"][aria-modal="true"].modal'),
        customOsTabBtn: () => cy.get('[qa-element="tab-1"]'),
        serverOsOption: (id) => cy.get(`[qa-element="filtered-os-template-${id - 1}"]`), //filtered-os-template-0
        customOsOption: (id) => cy.get(`[qa-element="custom-template-${id - 1}"]`), //custom-template-0
        confirmOsBtn: () => cy.get('[qa-element="template-selector-submit"]'), //template-selector-submit
        serverTitleTxt: () => cy.get('[qa-element="vm-create-name"]'), //vm-create-name
        serverDescTxt: () => cy.get('[qa-element="vm-create-desc"]'),
        cpuTxt: () => cy.get('[qa-element="create-vm-cpu-range-input"]'), //create-vm-cpu-range-input
        ramTxt: () => cy.get('[qa-element="create-vm-ram-range-input"]'), //create-vm-ram-range-input
        backupBtn: () => cy.get('[qa-element="add-backup-schedule"]'), //add-backup-schedule
        backupTitleTxt: () => cy.get('[qa-element="backup-schedule-name"]'), //backup-schedule-name
        backupCopiesBtn: () => cy.get('[qa-element="backup-limit-edit"]'), //backup-limit-edit
        backupCopiesTxt: () => cy.get('[qa-element="add-backup-schedule-limit"]'), //add-backup-schedule-limit
        confirmBackupCopiesBtn: () => cy.get('[qa-element="backup-schedule-save"]'), //backup-schedule-save
        periodSelector: () => cy.get('[qa-element="cron-period-open"]'), //cron-period
        periodOption: (id) => cy.get(`[qa-element="cron-period-${id - 1}"]`), //cron-period-0
        backupTimeSelector: () => cy.get('[qa-element="time-selector"]'), //time-selector
        confirmBackupBtn: () => cy.get('[qa-element="backup-schedule-create"]'), //backup-schedule-create
        publicIpBtn: () => cy.get('[qa-element="public-ip"]'), //public-ip
        localIpBtn: () => cy.get('[qa-element="local-ip"]'), //local-ip
        localIpNameTxt: () => cy.get('[qa-element="network-create-name"]'), //network-create-name    
        localIpAddressTxt: () => cy.get('[qa-element="address-mask"]'), //address-mask
        localIpGatewayTxt: () => cy.get('[qa-element="gateway-mask"]').last(), //gateway-mask
        localIpTxt: () => cy.get('[name="localIp"]'),
        confirmCreateServerBtn: () => cy.get('[qa-element="vm-craete-submit"]').last(), //vm-craete-submit
        closeModalBtn: () => cy.get('[qa-element="create-success-close"]'), //create-success-close
        createdServerTitleLbl: (text) => cy.get('.react-table').contains('div', text),
        serverStatusLbl: () => cy.get('.vm-status-badge').find('span'),
        diskTypeSSDBtn: () => cy.get('[qa-element="hdd-ssd-1"]'), //hdd-ssd-1
        diskTxt: () => cy.get('[qa-element="local-disk-size-range-input"]'), //local-disk-size-range-input
        loginTypeSSHBtn: () => cy.get('[qa-element="authorize-ssh-0"]'), //authorize-ssh-0
        osErrorLbl: () => cy.get('[qa-element="os-template-select-error"]'), //os-template-select-error
        titleErrorLbl: () => cy.get('[qa-element="create-vm-name-error"]'), //create-vm-name-error
        publicIpLbl: () => cy.get('[qa-element="public-ip-label"]'), //public-ip-label
        localIpLbl: () => cy.get('[qa-element="user-local-ip-label"]'), //user-local-ip-label
        cpuErrorLbl: () => cy.get('[qa-element="create-vm-cpu-range-error"]'), //create-vm-cpu-range-error
        ramErrorLbl: () => cy.get('[qa-element="create-vm-ram-range-error"]'), //create-vm-ram-range-error
        localIpErrorLbl: () => cy.get('[qa-element="create-network-mask-error"]'), //create-network-mask-error
        localIpTitleErrorLbl: () => cy.get('[qa-element="create-network-name-error"]'), //create-network-name-error
        localIpSelectTabBtn: () => cy.get('[qa-element="local-nets-open"]'), //local-nets-open
        localIpSelector: () => cy.get('[qa-element="local-nets-open"]'), //local-nets-open
        localIpOption: (localIpName) => cy.get('[qa-element="local-nets"]').contains(localIpName).first(), //local-nets
        localIpAddNewBtn: () => cy.get('[qa-element="network-create-show"]'), //network-create-show
        localIpAddConfBtn: () => cy.get('[qa-element="network-create-submit"]'), //network-create-submit
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
        clickOsTxt: () => {
            this.elements.serverOsTxt().click({force: true});
        },
        isOpenedModal: () => {
            this.elements.modalWindow().should('be.visible');
        },
        selectServerOs: (id) => {
            this.elements.serverOsOption(id).click()
        },
        selectCustomOs: (id) => {
            this.elements.customOsOption(id).click()
        },
        clickConfirmOsBtn: () => { 
            this.elements.confirmOsBtn().click();
            cy.wait(5000)
        },
        clickCustomOsTabBtn: () => {
            this.elements.customOsTabBtn().click()
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
        writeCpuTxt: (text) => {
            this.elements.cpuTxt().clear()
            this.elements.cpuTxt().type(text)
        },
        writeRamTxt: (text) => {
            this.elements.ramTxt().clear()
            this.elements.ramTxt().type(text)
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
        writeTimeSelector: (text) => {
            this.elements.backupTimeSelector().clear()
            this.elements.backupTimeSelector().type(text)
        },
        clickConfirmBackupBtn: () => {
            this.elements.confirmBackupBtn().click()
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
        typeDiskSize: (text) => {
            this.elements.diskTxt().clear()
            this.elements.diskTxt().type(text)
        },
        clickLoginTypeSSHBtn: () => {
            this.elements.loginTypeSSHBtn().click()
        },
        isVisibleOsRequiredLbl: () => {
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
            this.elements.localIpAddressTxt().invoke('val').should('not.be.empty');
        },
        checkLocalIpGatewayTxtNotEmpty: () => {
            this.elements.localIpGatewayTxt().invoke('val').should('not.be.empty');
        },
        checkLocalIpTxtNotEmpty: () => {
            this.elements.localIpTxt().invoke('val').should('not.be.empty');
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
        }
    }
}




module.exports = new Server()