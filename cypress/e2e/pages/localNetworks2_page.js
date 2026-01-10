class LocalNetworks2 {
    elements = {
        clickAddLocalNetworkBtn: () => cy.get('[qa-element="network-create-show"]'),
        localNetworkNameInp: () => cy.get('[qa-element="network-create-name"]'),
        localEnterAddressInp: () => cy.get('[qa-element="address-mask"]'),
        localEnterShlyuzInp: () => cy.get('[qa-element="gateway-mask"]'),
        localVisibleProjectIcon: () => cy.get('[qa-element="network-change-show-0"]'),
        clickProjectsSelect: () => cy.get('[qa-element="project"]'),
        localClickVerifyBtn: () => cy.get('[qa-element="resource-change-submit"]'),
        LocalServerNameTxt: (text) => cy.contains('a', text),
        localServerDeleteBtn: () => cy.get('[qa-element="network-change-show-1"]'),
        network_deleteConfirmNetworks: () => cy.get('[qa-element="delete-nework-submit"]'),
        LocalNetworksNameTxt: (text) => cy.contains('td', text),
        localNetworksClickListsLbl: () => cy.get('[qa-element="local-network-id-open"]'),
        localDeleteIpBtn: () => cy.get('[qa-element="delete-nework-1-show"]')

    }
    actions = {
        
        clickAddNewLocalNetworksBtn: () => {
            this.elements.clickAddLocalNetworkBtn().click()
        },
        isVisibleLocalNetworkInp: () => {
            this.elements.localNetworkNameInp().should('be.visible')
        },
        enterLocalNetworkNameFn: (text) => {
            this.elements.localNetworkNameInp().clear().type(text)
        },
        enterLocalAddressData: (text) => {
            this.elements.localEnterAddressInp().clear().type(text)
        },
        enterLocalNetworkShlyuz: (text) => {
            this.elements.localEnterShlyuzInp().clear().type(text)
        },
        LocalIpSuccessAddedNew2: () => {
            cy.wait('@localIpAddNew', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
            });
        },
        LocalIpErrorAddedNew2: () => {
            cy.wait('@localIpAddNew', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(400);
            });
        },
        LocalIpErrorAddedNew3: () => {
            cy.wait('@localIpAddNew', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(400);
            });
        },
        clickLocalVisibleIconFn: () => {
            this.elements.localVisibleProjectIcon().click()
        },
        clickProjectsSelectListFn: () => {
            this.elements.clickProjectsSelect().click()
        },
        clickLocalModalVerifyBtn: () => {
            this.elements.localClickVerifyBtn().click()
        },
        LocalSuccessProjectsLists: () => {
            cy.wait('@localSuccessProjects', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
            });
        },
        isVisibleServerNameLocalPg: (text) => {
            this.elements.LocalServerNameTxt(text).should('be.visible')
        },
        clickLocalServerDeleteBtnFn: () => {
            this.elements.localServerDeleteBtn().should('not.be.enabled')

        },
        clickLocalSuccessDeleteBtnFn: () => {
            this.elements.localServerDeleteBtn().click()
        },
        clickNetworkDeleteConfirmBtn: () => {
            this.elements.network_deleteConfirmNetworks().click()
        },
        isNotVisibleServerNameLocal: (text) => {
            this.elements.LocalNetworksNameTxt(text).should('not.exist')
        },
        clickListServerLocalFn: () => {
            this.elements.localNetworksClickListsLbl().click()
        },
        clickLocalDeleteIpFn: () => {
            this.elements.localDeleteIpBtn().click()
        }
        
    }
}





module.exports = new LocalNetworks2()