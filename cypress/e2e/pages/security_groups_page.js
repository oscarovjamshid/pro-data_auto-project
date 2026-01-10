class SecurityGroups {
    elements = {
        addBtn: () => cy.get('[qa-element="create-security-group-show"]'),
        groupNameField: () => cy.get('[qa-element="firewall-name"]'),
        groupNameErrorLbl: () => cy.get('[qa-element="firewall-error"]'),
        submitBtnInAddGroupPopUp: () => cy.get('[qa-element="create-firewall-submit"]'),
        cancelBtnInAddGroupPopUp: () => cy.get('[qa-element="create-firewall-cancel"]'),
        addRuleBtn: () => cy.get('[qa-element="add-rule"]'),
        addRuleActionDropdownList: () => cy.get('[qa-element="firewall-action-open"]'),
        acceptActionOption: () => cy.get('[qa-element="firewall-action-0"]'),
        rejectActionOption: () => cy.get('[qa-element="firewall-action-1"]'),
        addRuleTemplateDropdownList: () => cy.get('[qa-element="firewall-template-open"]'),
        addRuleProtocolDropdownList: () => cy.get('[qa-element="firewall-protocol-open"]'),
        addRuleProtocolOptions: () => cy.get('div.dropdown-menu.show ul a'),
        inboundSourcePortsInputField: () => cy.get('[qa-element="source"]'),
        inboundIpDestinationIpRangeInputField: () => cy.get('[qa-element="destination-port"]'),
        outboundSourcePortsInputField: () => cy.get('[qa-element="source-port"]'),
        outboundIpDestinationIpRangeInputField: () => cy.get('[qa-element="destination"]'),
        addRuleSubmitBtn: () => cy.get('[qa-element="group-rules-submit"]'),
        addRulesCancelBtn: () => cy.get('[qa-element="group-rules-hide"]'),
        addRuleActionErrorLbl: () => cy.get('[qa-element="firewall-action-error"]'),
        destinationPortErrorLbl: () => cy.get('[qa-element="group-rules-destination-error"]'),
        ipSourceIpRangeErrorLbl: () => cy.get('[qa-element="group-rules-source-error"]'),
        ipSourceIpRangeErrorLbl2: () => cy.get('[qa-element="group-rules-source-port-error"]'),
        backBtn: () => cy.get('[qa-element="to-group"]'),
        deleteRuleBtn: () => cy.get('[qa-element="delete-rule-0"]'),
        saveBtnInRulesPage: () => cy.get('[qa-element="reorder-rules-save"]'),
        cancelBtnInRulesPage: () => cy.get('[qa-element="group-rules-cancel"]'),
        attachRulesBtn: () => cy.get('[qa-element="link-vm-show"]'),
        serversListDropdownList: () => cy.get('[qa-element="user-vm-guid-open"]'),
        networkInterfaceDropdownList: () => cy.get('[qa-element="select-network"]'),
        detachRulesBtn: () => cy.get('[qa-element="unlink-vm-show"]'),
        detachRulesPopUpYesBtn: () => cy.get('[qa-element="unlink-vm-submit"]'),
        detachRulesPopUpCancelBtn: () => cy.get('[qa-element="unlink-vm-cancel"]'),
        addedInboundRuleRowByName: (name) => cy.get('tbody').eq(0).find('tr').contains(name),
        addedOutboundRuleRowByName: (name) => cy.get('tbody').eq(1).find('tr').contains(name),
        createdSecurityGroupRow: (name) => cy.get('tbody tr').contains(name),
        resourceVisibilityIconPerRowName: (name) => cy.get('tbody').contains('tr', name).find('[qa-element="change-resource-visibility"]'),
        resourceVisibilityProjectDropdownList: () => cy.get('[qa-element="select-project"]'),
        resourceVisibilityProjectDropdownListFirstActiveOption: () => cy.get('[qa-element="project-1"]'),
        resourceVisibilitySubmitBtn: () => cy.get('[qa-element="resource-change-submit"]'),
        editSecurityGroupIconPerRowName: (name) => cy.get('tbody').contains('tr', name).find('[qa-element="edit-table-group"]'),
        settingsIconPerRowName: (name) => cy.get('tbody').contains('tr', name).find('[qa-element="to-firewall-settings"]'),
        attachRulesIconPerRowName: (name) => cy.get('tbody').contains('tr', name).find('[qa-element="link-vm"]'),
        deleteIconPerRowName: (name) => cy.get('tbody').contains('tr', name).find('[qa-element="delete-group-show"]'),
        cancelBtnInDeleteGroupPopUp: () => cy.get('[qa-element="delete-group-cancel"]'),
        yesBtnInDeleteGroupPopUp: () => cy.get('[qa-element="delete-group-submit"]'),
        closeXicon: () => cy.get('.btn-close'),
        a: () => cy.get('[qa-element=""]'),
        a: () => cy.get('[qa-element=""]'),
        a: () => cy.get('[qa-element=""]'),
    }
    actions = {
        clickAddSecurityGroupBtn: () => {
            this.elements.addBtn().click();
        },
        isVisibleAddBtn: () => {
            this.elements.addBtn().should('be.visible')
        },
        clickXCloseIcon: () => {
            this.elements.closeXicon().click()
        },
        typeSecurityGroupName: (name) => {
            this.elements.groupNameField().clear()
            this.elements.groupNameField().type(name)
        },
        clearSecurityGroupName: () => {
            this.elements.groupNameField().clear()
        },
        isVisibleSecurityGroupErrorLbl: (errorTxt) => {
            this.elements.groupNameErrorLbl().should('be.visible');
            this.elements.groupNameErrorLbl().contains(errorTxt);
        },
        clickSubmitBtnInAddSecurityGroupPopUp: () => {
            this.elements.submitBtnInAddGroupPopUp().click();
        },
        clickCancelBtnInAddSecurityGroupPopUp: () => {
            this.elements.cancelBtnInAddGroupPopUp().click();
        },
        clickAddInboundRuleBtn: () => {
            this.elements.addRuleBtn().eq(0).scrollIntoView().click();
        },
        clickAddOutboundRuleBtn: () => {
            this.elements.addRuleBtn().eq(1).scrollIntoView().click();
        },
        isVisibleActionTypeErrorLbl: (errorTxt) => {
            this.elements.addRuleActionErrorLbl().should('be.visible');
            this.elements.addRuleActionErrorLbl().contains(errorTxt);
        },
        selectAcceptActionInList: () => {
            this.elements.addRuleActionDropdownList().click()
            this.elements.acceptActionOption().click()
        },
        selectRejectActionInList: () => {
            this.elements.addRuleActionDropdownList().click()
            this.elements.rejectActionOption().click()
        },
        selectProtocolOptionByName: (name) => {
            this.elements.addRuleProtocolDropdownList().click()
            this.elements.addRuleProtocolOptions().contains(name).click()
        },
        typeDestinationPortNumberForInbound: (number) => {
            this.elements.inboundIpDestinationIpRangeInputField().clear()
            this.elements.inboundIpDestinationIpRangeInputField().type(number)
        },
        typeDestinationPortNumberForOutbound: (number) => {
            this.elements.outboundIpDestinationIpRangeInputField().clear()
            this.elements.outboundIpDestinationIpRangeInputField().type(number)
        },
        isVisibleDestinationPortErrorLbl: (errorTxt) => {
            this.elements.destinationPortErrorLbl().should('be.visible');
            this.elements.destinationPortErrorLbl().contains(errorTxt);
        },
        isVisibleDestinationPortErrorLbl: (errorTxt) => {
            this.elements.destinationPortErrorLbl().should('be.visible');
            this.elements.destinationPortErrorLbl().contains(errorTxt);
        },
        typeIpSourceRangeNumberForInbound: (number) => {
            this.elements.inboundSourcePortsInputField().clear()
            this.elements.inboundSourcePortsInputField().type(number)
        },
        typeIpSourceRangeNumberForOutbound: (number) => {
            this.elements.outboundSourcePortsInputField().clear()
            this.elements.outboundSourcePortsInputField().type(number)
        },
        isVisibleIpSourceRangeErrorLbl: (errorTxt) => {
            this.elements.ipSourceIpRangeErrorLbl().should('be.visible');
            this.elements.ipSourceIpRangeErrorLbl().contains(errorTxt);
        },
        isVisibleIpSourceRangeErrorLbl2: (errorTxt) => {
            this.elements.ipSourceIpRangeErrorLbl2().should('be.visible');
            this.elements.ipSourceIpRangeErrorLbl2().contains(errorTxt);
        },
        clickSubmitBtnInAddRulePopUp: () => {
            this.elements.addRuleSubmitBtn().click()
        },
        clickCancelBtnInAddRulePopUp: () => {
            this.elements.addRulesCancelBtn().click()
        },
        isVisibleAddedInboundRule: (name) => {
            this.elements.addedInboundRuleRowByName(name).should('be.visible')
        },
        isNotVisibleInboundAddedRule: (name) => {
            this.elements.addedInboundRuleRowByName(name).should('not.be.visible')
        },
        isVisibleAddedOutboundRule: (name) => {
            this.elements.addedOutboundRuleRowByName(name).should('be.visible')
        },
        isNotVisibleOutboundAddedRule: (name) => {
            this.elements.addedOutboundRuleRowByName(name).should('not.be.visible')
        },
        isVisibleAddedGroup: (name) => {
            this.elements.createdSecurityGroupRow(name).should('be.visible')
        },
        isNotVisibleAddedGroup: (name) => {
            this.elements.createdSecurityGroupRow(name).should('not.be.visible')
        },
        clickDeleteRuleBtnInAddRuleSection: () => {
            this.elements.deleteRuleBtn().click()
        },
        clickSaveBtnInAddRulePage: () => {
            this.elements.saveBtnInRulesPage().scrollIntoView().click({ force: true })
        },
        clickCancelBtnInAddRulePage: () => {
            this.elements.cancelBtnInRulesPage().click()
        },
        clickBackBtnInAddRulePage: () => {
            this.elements.backBtn().click()
        },
        clickAttachRulesBtnInAddRulePage: () => {
            this.elements.attachRulesBtn().click()
        },
        /*clickServersListInAttachRulesPopUp: () => {
            this.elements.serversListDropdownList().click()
        },
        clickNetworkInterfaceListInAttachRulesPopUp: () => {
            this.elements.networkInterfaceDropdownList().click()
        },*/
        selectServerOptionByNameInAttachRulesList: (name) => {
            this.elements.serversListDropdownList().contains(name).click()
        },
        selectNetworkInterfaceOptionByNameInAttachRulesList: (name) => {
            this.elements.networkInterfaceDropdownList().contains(name).click()
        },
        clickSubmitBtnInAttachRulesPopUp: () => {
            this.elements.clickSubmitBtnInAttachRulesPopUp().click()
        },
        clickDetachRulesBtnInAddRulePage: () => {
            this.elements.detachRulesBtn().click()
        },
        clickYesBtnInDetachRulesPopUp: () => {
            this.elements.detachRulesPopUpYesBtn().click()
        },
        clickResourceVisibilityBtnByRowName: (name) => {
            this.elements.resourceVisibilityIconPerRowName(name).click()
        },
        selectProjectInResourceVisibilityList: () => {
            this.elements.resourceVisibilityProjectDropdownList().click()
            this.elements.resourceVisibilityProjectDropdownListFirstActiveOption().click()
        },
        clickSubmitBtnInResourceVisibilityPopUp: () => {
            this.elements.resourceVisibilitySubmitBtn().click()
        },
        clickEditBtnByRowName: (name) => {
            this.elements.editSecurityGroupIconPerRowName(name).click()
        },
        clickSettingsBtnBtnByRowName: (name) => {
            this.elements.settingsIconPerRowName(name).click()
        },
        clickAttachRulesBtnByRowName: (name) => {
            this.elements.attachRulesIconPerRowName(name).click()
        },
        clickDeleteBtnByRowName: (name) => {
            this.elements.deleteIconPerRowName(name).click()
        },
        clickYesBtnInDeletePopUp: () => {
            this.elements.yesBtnInDeleteGroupPopUp().click()
        },
        clickCancelBtnInDeletePopUp: () => {
            this.elements.cancelBtnInDeleteGroupPopUp().click()
        },
        isDisabledDeleteSecurityGroupBtn: (name) => {
            this.elements.deleteIconPerRowName(name).should('be.disabled')
        },
        isNotAvailableDeletedSecurityGroupBtnPerRowName: (name) => {
            this.elements.createdSecurityGroupRow(name).should('not.exist')
        },














    }
}
module.exports = new SecurityGroups()