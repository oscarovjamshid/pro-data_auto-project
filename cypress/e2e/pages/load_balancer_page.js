class LoadBalancer {
    elements = {
        termsOfServiceLink: () => cy.get('.text-start li:nth-child(1) a'),
        priceListLink: () => cy.get('.text-start li:nth-child(2) a'),
        createLoadBalancerBtn: () => cy.get('[qa-element="to-create-lb"]').last(),
        balancer_nameTxt: () => cy.get('[qa-element="lb-create-name"]'),
        balancer_descriptionTxt: () => cy.get('[qa-element="lb-create-desc"]'),
        balancerTypeOuterBtn: () => cy.get('[qa-element="external-internal-0"]'),
        balancerTypeInnerBtn: () => cy.get('[qa-element="external-internal-1"]'),
        balancerLocalNetworkSelector: () => cy.get('[qa-element="lb-subnet-open"]').first(),
        balancerIpSelector: () => cy.get('[qa-element="lb-subnet-0"]').last(),
        balancerLocalNetwrokOption: (name) => cy.get('.dropdown-menu').find('a').contains(name),
        balancerIpOption: (name) => cy.get('.dropdown-menu').find('a').contains(name),
        balancerProtocolTCPBtn: () => cy.get('[qa-element="tcp-udp-0"]'),
        balancerProtocolUDPBtn: () => cy.get('[qa-element="tcp-udp-1"]'),
        balancerPortAddBtn: () => cy.get('[qa-element="lb-ports-add"]'),
        balancerPortTxt: () => cy.get('[qa-element="lb-port"]'),
        balancerPortConfBtn: () => cy.get('[qa-element="lb-ports-submit"]'),
        loadBalancerPortInvalidErrorLbl: () => cy.get('[qa-element="lb-ports-balancer-error"]'),
        backendGroupPortInvalidErrorLbl: () => cy.get('[qa-element="lb-ports-backend-error"]'),
        balancerBackPortTxt: () => cy.get('[qa-element="backend-port"]'),
        balancerBackendAddBtn: () => cy.get('[qa-element="add-backend"]'),
        balancerBackendOption: (name) => cy.get('tbody > tr').contains(name).parent().find('input'),
        balancerBackendConfBtn: () => cy.get('[qa-element="add-backend-confirm"]'),
        balancerCreateConfBtn: () => cy.get('[qa-element="create-lb-submit"]'),
        createdBalancer: (name) => cy.get('tbody > tr').contains(name),
        balancerStatusPerRowName: (name) => cy.get('tbody > tr').contains(name).parent().find('td').eq(5),
        balancerNameErrorLbl: () => cy.get('[qa-element="create-lb-name-error"]'),
        balancerIpNagruzkaLbl: () => cy.get('[qa-element="lb-ip-open"]'),
        createdPort: (name) => cy.get('tbody > tr').contains(name),
        editPortBtn: () => cy.get('[qa-element="lb-ports-edit-0"]'),
        deletePortBtn: () => cy.get('[qa-element="ports-delete-0-show"]'),
        deleteBackendBtn: () => cy.get('[qa-element="backend-delete-0-show"]'),
        createdBackendGroup: (name) => cy.get('tbody > tr').contains(name),
        confirmDeletePortBtn: () => cy.get('[qa-element="ports-delete-submit"]'),
        confirmDeleteBackendBtn: () => cy.get('[qa-element="backend-delete-submit"]'),
        deleteBalancerBtnPerRowName: (name) => cy.get('tbody > tr').contains(name).parent().find('td').eq(7),
        confirmDeleteBalancerBtn: () => cy.get('[qa-element="delete-lb-submit"]'),
        editBalancerBtnPerRowName: (name) => cy.get('tbody > tr').contains(name).parent().find('td').eq(6),
        cancelButtonInEditPage: () => cy.get('[qa-element="to-lb-list"]'),
        cancelButtonInAddPage: () => cy.get('[qa-element="to-create-lb"]'),
        confirmBtnInEditPage: () => cy.get('[qa-element="edit-lb-submit"]'),
        invalidBalancerNameErrorLblInEditPage: () => cy.get('[qa-element="edit-lb-name-error"]'),
        balancerNameFieldEditPage: () => cy.get('[qa-element="lb-edit-name"]'),
        balancerDescFieldEditPage: () => cy.get('[qa-element="lb-edit-desc"]')
    }
    actions = {
        clickOnTermsOfServiceLink: () => {
            this.elements.termsOfServiceLink().should('be.visible')
            this.elements.termsOfServiceLink().invoke('removeAttr', 'target').click()
        },
        isVisibleTermsOfServiceLink: () => {
            this.elements.termsOfServiceLink().should('be.visible')
        },
        clickOnPriceListLink: () => {
            this.elements.priceListLink().should('be.visible')
            this.elements.priceListLink().invoke('removeAttr', 'target').click()
        },
        isVisiblePriceListLink: () => {
            this.elements.priceListLink().should('be.visible')
        },
        clickCreateLoadBalancerBtn: () => {
            cy.wait(2000)
            this.elements.createLoadBalancerBtn().click();
        },
        isVisibleCreateBtn: () => {
            this.elements.createLoadBalancerBtn().should('be.visible')
        },
        typeBalancerName: (name) => {
            this.elements.balancer_nameTxt().clear()
            this.elements.balancer_nameTxt().type(name)
        },
        editBalancerName: (name) => {
            this.elements.balancerNameFieldEditPage().clear()
            this.elements.balancerNameFieldEditPage().type(name)
        },
        typeBalancerDescription: (description) => {
            this.elements.balancer_descriptionTxt().clear()
            this.elements.balancer_descriptionTxt().type(description)
        },
        editBalancerDescription: (description) => {
            this.elements.balancerDescFieldEditPage().clear()
            this.elements.balancerDescFieldEditPage().type(description)
        },
        clickBalancerTypeOuterBtn: () => {
            this.elements.balancerTypeOuterBtn().click()
        },
        clickBalancerTypeInnerBtn: () => {
            this.elements.balancerTypeInnerBtn().click()
        },
        clickLocalNetworkSelector: () => {
            this.elements.balancerLocalNetworkSelector().click()
        },
        clickBalancerIpSelector: () => {
            this.elements.balancerIpSelector().click()
        },
        clickLocalNetworkOption: (name) => {
            this.elements.balancerLocalNetwrokOption(name).click()
        },
        clickBalancerIpOption: (name) => {
            this.elements.balancerIpOption(name).click()
        },
        clickBalancerProtocolTCPBtn: () => {
            this.elements.balancerProtocolTCPBtn().click()
        },
        clickBalancerProtocolUDPBtn: () => {
            this.elements.balancerProtocolUDPBtn().click()
        },
        typeBalancerPort: (port) => {
            this.elements.balancerPortTxt().clear()
            this.elements.balancerPortTxt().type(port)
        },
        typeBackendPort: (port) => {
            this.elements.balancerBackPortTxt().clear()
            this.elements.balancerBackPortTxt().type(port)
        },
        clickBackendAddBtn: () => {
            this.elements.balancerBackendAddBtn().click()
        },
        checkBalancerBackOption: (name) => {
            this.elements.balancerBackendOption(name).should('be.visible')
            this.elements.balancerBackendOption(name).check()
        },
        clickbalancerBackendConfBtn: () => {
            this.elements.balancerBackendConfBtn().click()
        },
        clickBalancerCreateConfBtn: () => {
            this.elements.balancerCreateConfBtn().click()
        },
        isDisabledBalancerCreateConfBtn: () => {
            this.elements.balancerCreateConfBtn().should('be.disabled');
        },
        isVisibleCreatedBalancer: (name) => {
            this.elements.createdBalancer(name).should('be.visible')
        },
        waitForLoadBalancerReadyStatus: (name) => {                         // Used to wait any load balancer till it becomes in Running status
            cy.log(`Waiting for load balancer "${name}" to become В работе...`)
            cy.wrap(null).then(() => {
                const checkStatus = () => {
                    this.elements.balancerStatusPerRowName(name).invoke('text').then((text) => {
                        const status = text.trim()
                        cy.log(`Current status: ${status}`)
                        if (status !== 'В работе') {
                            cy.wait(5000).then(checkStatus)                  // re-checks in every 5 seconds
                        } else {
                            cy.log(`Load Balancer "${name}" is В работе`)
                        }
                    })
                }
                checkStatus()
            })
        },
        isVisibleBalancerNameErrorLbl: (errorTxt) => {
            this.elements.balancerNameErrorLbl().should('be.visible');
            this.elements.balancerNameErrorLbl().contains(errorTxt);
        },
        isVisibleLoadBalancerPortErrorLbl: (errorTxt) => {
            this.elements.loadBalancerPortInvalidErrorLbl().should('be.visible');
            this.elements.loadBalancerPortInvalidErrorLbl().contains(errorTxt);
        },
        isVisibleBackendGroupPortLbl: (errorTxt) => {
            this.elements.backendGroupPortInvalidErrorLbl().should('be.visible');
            this.elements.backendGroupPortInvalidErrorLbl().contains(errorTxt);
        },
        clickBalancerPortAddBtn: () => {
            this.elements.balancerPortAddBtn().click()
        },
        clickBalancerPortConfBtn: () => {
            this.elements.balancerPortConfBtn().click()
        },
        clickBalancerSelectIpNagruz: () => {
            this.elements.balancerIpNagruzkaLbl().click()
        },
        isVisiblePortNumberUnderThisValue: (name) => {
            this.elements.createdPort(name).should('be.visible')
        },
        isNotVisiblePortNumberUnderThisValue: (name) => {
            this.elements.createdPort(name).should('not.exist')
        },
        clickEditBtnPerPortRowName: () => {
            this.elements.editPortBtn().click()
        },
        clickDeleteBtnPerPortRowName: () => {
            this.elements.deletePortBtn().click()
        },
        clickConfirmDeletePortBtn: () => {
            this.elements.confirmDeletePortBtn().click()
        },
        clickDeleteBtnPerBackendRowName: () => {
            this.elements.deleteBackendBtn().click()
        },
        clickConfirmDeleteBackendBtn: () => {
            this.elements.confirmDeleteBackendBtn().click()
        },
        clickEditLoadBalancerBtnPerRowName: (name) => {
            this.elements.editBalancerBtnPerRowName(name).click()
        },
        clickCancelBtnInAddPage: () => {
            this.elements.cancelButtonInAddPage().click()
        },
        clickCancelBtnInEditPage: () => {
            this.elements.cancelButtonInEditPage().click()
        },
        clickDeleteLoadBalancerBtnPerRowName: (name) => {
            this.elements.deleteBalancerBtnPerRowName(name).click()
        },
        clickDeleteBalancerConfirmBtn: () => {
            this.elements.confirmDeleteBalancerBtn().click()
        },
        isNotVisibleDeletedBalancerPerRowName: (name) => {
            this.elements.createdBalancer(name).should('not.exist')
        },
        clickConfirmBtnInEditPage: () => {
            this.elements.confirmBtnInEditPage().click()
        },
        isVisibleBalancerNameErrorLblInEditPage: (errorTxt) => {
            this.elements.invalidBalancerNameErrorLblInEditPage().should('be.visible');
            this.elements.invalidBalancerNameErrorLblInEditPage().contains(errorTxt);
        },
    }
}
module.exports = new LoadBalancer()