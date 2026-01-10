class LocalNetworks {
    elements = {
        click_serverDetailLbl: () => cy.get('.selectable > :nth-child(1)'),
        server_searchTxt: () => cy.get('[qa-element="search-input"]'),
        server_localNetworkTxt: () => cy.get('.navbar-custom__nav > :nth-child(3)'),
        networks_addNetworkBtn: () => cy.get('[qa-element="show-link-modal"]'),
        network_selectList: () => cy.get('[qa-element="local-network-id-open"]'),
        network_selectIpTxt: (name) => cy.contains(name),
        network_selectInValidIpTxt: () => cy.contains('Test_IP'),
        network_addNetworkSuccess: () => cy.get('[qa-element="network-link-submit"]'),
        network_deleteBtn: () => cy.get('[qa-element="network-unlink"]'),
        network_confirmCheckbox: () => cy.get('[qa-element="vm-confirm-reboot"]'),
        network_deleteConfirmNetworks: () => cy.get('[qa-element="network-unlink-submit"]'),
        network_editBtn: () => cy.get('[qa-element="network-edit"]'),
        network_withoutRebootLbl: () => cy.get('#reboot'),
        network_closedModalBtn: () => cy.get('.btn-close'),
        network_serverIpInp: () => cy.get('[qa-element="free-ip-address"]'),
        network_serverIpInvalidMessage: () => cy.get('[qa-element="local-network-id-error"]'),
        network_editServerIpInp: () => cy.get('[qa-element="free-ip-address"]'),
        network_verifiedSuccessCheckbox: () => cy.get('#confirm-reboot'),
        network_saveEditIpBtn: () => cy.get('[qa-element="network-edit-submit"]'),
        network_IpInValidMessageTxt: () => cy.get('[qa-element="free-ip-address-error"]'),
        network_actionsSelectBtn: () => cy.get('[qa-element="vm-action"]'),
        network_actionsServerIpTxt: () => cy.get('[qa-element="free-ip-address-7"]'),
        network_clickModalTxt1: () => cy.get('.modal-title'),
        network_lblSelect: () => cy.get('qa-element="free-ip-address-0"')
// qa-element="free-ip-address"
// qa-element="free-ip-address-0"
    }
    actions = {
        checkServerStatusStopped3: () => {
            cy.wait('@serverStatusStopped3', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body).to.have.property('data');
                expect(interception.response.body.data).to.have.property('vms');
        
                const serverListStatus = interception.response.body.data.vms;
        
                for (let server of serverListStatus) {
                    if (server.vmName == "Test-Server") {
                        cy.log(`Found server: ${server.vmName}`);
                        this.elements.server_searchTxt().clear().type(server.vmName);
                        this.elements.click_serverDetailLbl().click();
                        break; // Birinchi topilgan serverni bosadi va tsikldan chiqadi
                    }
                }
            });
        },        
        networkSuccessAdded: () => {
            cy.wait('@networkSuccessAdd', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
            });
        },
        networkSuccessDeleted: () => {
            cy.wait('@networkSuccessDelete', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
            });
        },
        networkSuccessEditIpFn: () => {
            cy.wait('@networkIpEditSuccess', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
            });
        },
        clickLocalNetworkTxt: () => {
            this.elements.server_localNetworkTxt().click()
        },
        clickAddNetworkBtn: () => {
            this.elements.networks_addNetworkBtn().click()
        },
        isVisibleSelectListNetwork: () => {
            this.elements.network_selectList().should("be.visible")
        },
        clickSelectListNetwork: () => {
            this.elements.network_selectList().click()
        },
        isVisibleNetworkIp: (name) => {
            this.elements.network_selectIpTxt(name).should("be.visible")
        },
        isVisibleInValidNetworkIp: () => {
            this.elements.network_selectInValidIpTxt().should("be.visible")
        },
        clickNetworkIpBtn: (name) => {
            this.elements.network_selectIpTxt(name).click()
        },
        clickNetworkInValidIpBtn2: () => {
            this.elements.network_selectInValidIpTxt().click()
        },
        clickAddNetworkSuccessBtn: () => {
            this.elements.network_addNetworkSuccess().click();
        },        
        isVisibleNetworkDeleteBtn: () => {
            this.elements.network_deleteBtn().should("be.visible")
        },
        clickDeleteNetworkBtn: () => {
            this.elements.network_deleteBtn().click()
        },
        clickConfirmCheckbox: () => {
            this.elements.network_confirmCheckbox().click()
        },
        clickNetworkDeleteConfirmBtn: () => {
            this.elements.network_deleteConfirmNetworks().click()
        },
        isNotVisibleNetworkEditeBtn: () => {
            this.elements.network_editBtn().should("not.exist");
        },
        clickNetworkWithoutRebootBtn: () => {
            this.elements.network_withoutRebootLbl().click()
        },
        isNotVisibleNetworkIpTxt: () => {
            this.elements.network_selectIpTxt().should("not.be.visible");
        },
        clickClosedModalBtn1: () => {
            this.elements.network_closedModalBtn({ multiple: true }).last().click({ force: true });
        },
        enterServerIpInp: (text) => {
            this.elements.network_serverIpInp().clear().type(text)
        },
        isVisibleInValidMessageServerIp: () => {
            this.elements.network_serverIpInvalidMessage().should("be.visible")
        },
        clickEditIpBtn: () => {
            this.elements.network_editBtn().click()
        },
        isVisibleEditIpServerInp: () => {
            this.elements.network_editServerIpInp().should("be.visible")
        },
        enterEditIpServerNetworkTxt: (text) => {
            this.elements.network_editServerIpInp().clear({ force: true }).type(text)
        },
        enterEditIpServerNetworkTxt2: () => {
            this.elements.network_lblSelect().click()
        },
        clickCheckboxVerifiedSuccessIp: () => {
            this.elements.network_verifiedSuccessCheckbox().click()
        },
        clickEditIpSavedBtn: () => {
            this.elements.network_saveEditIpBtn().click()
        },
        isVisibleIpEditMessageTxt: () => {
            this.elements.network_IpInValidMessageTxt().should("be.visible")
        },
        isDisabledDeleteBtn: () => {
            this.elements.network_deleteConfirmNetworks().should('be.disabled')
        },
        isNotVisibleDeleteBtn: () => (
            this.elements.network_deleteBtn().should('not.be.visible')
        ),
        isVisibleInvalidMessageTxt: () => {
            this.elements.network_InValidMessageLbl().should('be.visible')
        },
        clickActionsSelectBtn: () => {
            this.elements.network_actionsSelectBtn().click()
        },
        clickNetworkEditInpLbl1: () => {
            this.elements.network_editServerIpInp().click()
        },
        clickServerIpTxt1: () => {
            this.elements.network_actionsServerIpTxt().click()
        },
        clickModalCloseTxtBtn: () => {
            this.elements.network_clickModalTxt1().click()
        }
        
    }
}





module.exports = new LocalNetworks()