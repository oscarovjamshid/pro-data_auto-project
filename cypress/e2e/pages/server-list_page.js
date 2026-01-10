class ServerList {
    elements = {
        server_titleLbl: (id, title) => cy.get(`tbody > :nth-child(${id + 1}) > :nth-child(1)`).contains('div', title),
        server_idLbl: (id, vmId) => cy.get(`tbody > :nth-child(${id + 1}) > :nth-child(2)`).contains(vmId),
        server_searchTxt: () => cy.get('[qa-element="search-input"]'),
        server_searchLbl: (text) => cy.contains(text),
        server_searchLblInp: () => cy.contains("Test-Server"),
        server_searchIpLbl: () => cy.get('.selectable > :nth-child(7)').contains("td", "100.100.100.164"),
        server_detailLbl: (text) => cy.get('.font-button-l').contains("h3", text),
        server_disabledLbl: () => cy.get('.disabledSelect').first(),
        server_NotVisible: () => cy.get('.tooltip-inner'),
        server_backNavigateBtn: () => cy.get('[qa-element="to-back"]'),
        server_detailNotVisible: () => cy.get('[qa-element="vm-delete-show"]'),


    }
    actions = {
        checkServerList: () => {
            cy.wait('@serverListRequest').then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body).to.have.property('data');
                expect(interception.response.body.data).to.have.property('vms');
                const serverList = interception.response.body.data.vms
                for(let i = 0; i < serverList.length; i++){
                    this.elements.server_titleLbl(i, serverList[i].vmName)
                    this.elements.server_idLbl(i, serverList[i].id)
                }
            });
        },
        searchServer: (text) => {
            this.elements.server_searchTxt().type(text)
        },
        isVisibleSearchTxtServer: (text) => {
            this.elements.server_searchLbl(text).should('be.visible');
        },
        isVisibleSearchIpServer: () => {
            this.elements.server_searchIpLbl().should('be.visible');
        },
        clickServerCard: (text) => {
            this.elements.server_searchLbl(text).click()
        },
        isVisibleServerDetail: (text) => {
            this.elements.server_detailLbl(text).should('be.visible');
        },
        isNotVisibleServerDetail: (text) => {
            this.elements.server_detailLbl(text).should('not.be.visible');
        },
        checkServerListStatus: () => {
            cy.wait('@serverListStatus', {wait: 10000}).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body).to.have.property('data');
                expect(interception.response.body.data).to.have.property('vms');
        
                const serverListStatus = interception.response.body.data.vms;
                serverListStatus.forEach((server) => {
                    if (server.status == "STATUS_NEW") {
                        cy.log(`Found STATUS_NEW server: ${server.vmName}`);
                        this.elements.server_searchTxt().clear().type(server.vmName);
                        this.elements.server_disabledLbl().click();
                    }
                });
            });
        },
        isVisibleDisableTooltip: () => {
            this.elements.server_NotVisible().should('be.visible');
        },
        isVisibleTestServerTxt: () => {
            this.elements.server_searchLblInp().should('be.visible')
        },
        clickNavigateToMainBtn: () => {
            this.elements.server_backNavigateBtn().click()
        },
        isNotVisibleServerDetailLbl: () => {
            this.elements.server_detailNotVisible().should('not.exist')
        }
    }
}





module.exports = new ServerList()