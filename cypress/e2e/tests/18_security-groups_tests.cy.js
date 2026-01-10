cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import server_page from "../pages/server_page";
import security_groups_page from "../pages/security_groups_page";

describe('18.Security Groups Tests', () => {
    let configData;
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('GET', `${configData.base_url}panel-main/api/panel/vm/list`).as('serverStatusStopped3');
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/${configData.test_server_id}/linkLocalNet`).as('networkSuccessAdd');
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/${configData.test_server_id}/unlinkNet`).as('networkSuccessDelete');
    })

    it('[PD-473, PD-476] Creating security group with inbound rule (Accept)', () => {
        const testData = {
            ruleName: 'inbound rule-Accept',
            protocol: 'Все',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickSecurityGroupsIcon()
        security_groups_page.actions.clickAddSecurityGroupBtn()
        security_groups_page.actions.typeSecurityGroupName(testData.ruleName)
        security_groups_page.actions.clickSubmitBtnInAddSecurityGroupPopUp()
        security_groups_page.actions.clickAddInboundRuleBtn()
        security_groups_page.actions.selectAcceptActionInList()
        security_groups_page.actions.selectProtocolOptionByName(testData.protocol)
        security_groups_page.actions.clickSubmitBtnInAddRulePopUp()
        cy.wait(1000)
        security_groups_page.actions.isVisibleAddedInboundRule(testData.protocol)
        security_groups_page.actions.clickSaveBtnInAddRulePage()
        security_groups_page.actions.clickBackBtnInAddRulePage()
        security_groups_page.actions.isVisibleAddedGroup(testData.ruleName)
        security_groups_page.actions.clickDeleteBtnByRowName(testData.ruleName)
        security_groups_page.actions.clickYesBtnInDeletePopUp()
        cy.wait(2000)
        //security_groups_page.actions.isNotAvailableDeletedSecurityGroupBtnPerRowName(testData.ruleName)
    })
    it('[PD-479, PD-482] Creating security group with inbound rule (Reject)', () => {
        const testData = {
            ruleName: 'inbound rule-Reject',
            protocol: 'TCP',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickSecurityGroupsIcon()
        security_groups_page.actions.clickAddSecurityGroupBtn()
        security_groups_page.actions.typeSecurityGroupName(testData.ruleName)
        security_groups_page.actions.clickSubmitBtnInAddSecurityGroupPopUp()
        security_groups_page.actions.clickAddInboundRuleBtn()
        security_groups_page.actions.selectRejectActionInList()
        security_groups_page.actions.selectProtocolOptionByName(testData.protocol)
        security_groups_page.actions.clickSubmitBtnInAddRulePopUp()
        cy.wait(1000)
        security_groups_page.actions.isVisibleAddedInboundRule(testData.protocol)
        security_groups_page.actions.clickSaveBtnInAddRulePage()
        cy.wait(1000)    // prevents interception cuz elements are overlapping
        security_groups_page.actions.clickBackBtnInAddRulePage()
        security_groups_page.actions.isVisibleAddedGroup(testData.ruleName)
    })
    it('[PD-488] Deleting added inbound rule', () => {
        const testData = {
            ruleName: 'inbound rule-Reject',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickSecurityGroupsIcon()
        security_groups_page.actions.clickDeleteBtnByRowName(testData.ruleName)
        security_groups_page.actions.clickYesBtnInDeletePopUp()
        cy.wait(2000)
        //security_groups_page.actions.isNotAvailableDeletedSecurityGroupBtnPerRowName(testData.ruleName)
    })
    it('[PD-489, PD-492] Creating security group with outbound rule (Accept)', () => {
        const testData = {
            ruleName: 'outbound rule-Accept',
            protocol: 'UDP',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickSecurityGroupsIcon()
        security_groups_page.actions.clickAddSecurityGroupBtn()
        security_groups_page.actions.typeSecurityGroupName(testData.ruleName)
        security_groups_page.actions.clickSubmitBtnInAddSecurityGroupPopUp()
        security_groups_page.actions.clickAddOutboundRuleBtn()
        security_groups_page.actions.selectAcceptActionInList()
        security_groups_page.actions.selectProtocolOptionByName(testData.protocol)
        security_groups_page.actions.clickSubmitBtnInAddRulePopUp()
        cy.wait(1000)
        security_groups_page.actions.isVisibleAddedOutboundRule(testData.protocol)
        security_groups_page.actions.clickSaveBtnInAddRulePage()
        cy.window().then((win) => { win.scrollBy(0, -500); }); // scroll up 500px
        security_groups_page.actions.clickBackBtnInAddRulePage()
        security_groups_page.actions.isVisibleAddedGroup(testData.ruleName)
        security_groups_page.actions.clickDeleteBtnByRowName(testData.ruleName)
        security_groups_page.actions.clickYesBtnInDeletePopUp()
        cy.wait(2000)
        //security_groups_page.actions.isNotAvailableDeletedSecurityGroupBtnPerRowName(testData.ruleName)
    })
    it('[PD-495, PD-498] Creating security group with outbound rule (Reject)', () => {
        const testData = {
            ruleName: 'outbound rule-Reject',
            protocol: 'ICMP',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickSecurityGroupsIcon()
        security_groups_page.actions.clickAddSecurityGroupBtn()
        security_groups_page.actions.typeSecurityGroupName(testData.ruleName)
        security_groups_page.actions.clickSubmitBtnInAddSecurityGroupPopUp()
        security_groups_page.actions.clickAddOutboundRuleBtn()
        security_groups_page.actions.selectRejectActionInList()
        security_groups_page.actions.selectProtocolOptionByName(testData.protocol)
        security_groups_page.actions.clickSubmitBtnInAddRulePopUp()
        cy.wait(1000)
        security_groups_page.actions.isVisibleAddedOutboundRule(testData.protocol)
        security_groups_page.actions.clickSaveBtnInAddRulePage()
        cy.wait(1000)    // prevents interception cuz elements are overlapping
        cy.window().then((win) => { win.scrollBy(0, -500); }); // scroll up 500px
        security_groups_page.actions.clickBackBtnInAddRulePage()
        security_groups_page.actions.isVisibleAddedGroup(testData.ruleName)
    })
    it('[PD-504] Deleting added outbound rule', () => {
        const testData = {
            ruleName: 'outbound rule-Reject',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickSecurityGroupsIcon()
        security_groups_page.actions.clickDeleteBtnByRowName(testData.ruleName)
        security_groups_page.actions.clickYesBtnInDeletePopUp()
        cy.wait(2000)
       // security_groups_page.actions.isNotAvailableDeletedSecurityGroupBtnPerRowName(testData.ruleName)
    })
    it('[PD-468] Creating group without rules (successful)', () => {
        const testData = {
            ruleName: 'empty',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickSecurityGroupsIcon()
        security_groups_page.actions.clickAddSecurityGroupBtn()
        security_groups_page.actions.typeSecurityGroupName(testData.ruleName)
        security_groups_page.actions.clickSubmitBtnInAddSecurityGroupPopUp()
        security_groups_page.actions.clickSaveBtnInAddRulePage()
        security_groups_page.actions.clickBackBtnInAddRulePage()
        security_groups_page.actions.isVisibleAddedGroup(testData.ruleName)
    })
    /*  need to continue working on below autotests - add btn selector is not correct
    it('[PD-469] Creating group with empty name (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickSecurityGroupsIcon()
        security_groups_page.actions.clickAddSecurityGroupBtn()
        security_groups_page.actions.clickSubmitBtnInAddSecurityGroupPopUp()
        security_groups_page.actions.isVisibleSecurityGroupErrorLbl('Обязательное поле')
    })
    it('[PD-470] Creating group with existing group name (unsuccessful)', () => {
        const testData = {
            ruleName: 'empty',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickSecurityGroupsIcon()
        security_groups_page.actions.clickAddSecurityGroupBtn()
        security_groups_page.actions.typeSecurityGroupName(testData.ruleName)
        security_groups_page.actions.clickSubmitBtnInAddSecurityGroupPopUp()
        security_groups_page.actions.isVisibleSecurityGroupErrorLbl('Ресурс с таким именем уже существует')
    })
    it('[PD-471] Cancel button while creating group', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickSecurityGroupsIcon()
        security_groups_page.actions.clickAddSecurityGroupBtn()
        security_groups_page.actions.clickCancelBtnInAddSecurityGroupPopUp()
        security_groups_page.actions.isVisibleAddBtn()
    })
    it('[PD-472] X icon while creating group', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickSecurityGroupsIcon()
        security_groups_page.actions.clickAddSecurityGroupBtn()
        security_groups_page.actions.clickXCloseIcon()
        security_groups_page.actions.isVisibleAddBtn()
    })
    it('[PD-477], [PD-483] Creating security group with inbound rule (Accept/Reject -> Protocal: Any, with valid port and IP)', () => {            // 4 test cases in 1 autotest
        const testData = {
            ruleName: 'inbound rule-with-IP/Port',
            protocol: 'TCP',
            destinationPort: '8080:8085',
            ipRange: '10.10.10.10',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickSecurityGroupsIcon()
        security_groups_page.actions.clickAddSecurityGroupBtn()
        security_groups_page.actions.typeSecurityGroupName(testData.ruleName)
        security_groups_page.actions.clickSubmitBtnInAddSecurityGroupPopUp()
        security_groups_page.actions.clickAddInboundRuleBtn()
        security_groups_page.actions.selectAcceptActionInList()
        security_groups_page.actions.selectProtocolOptionByName(testData.protocol)
        cy.wait(1000)
        security_groups_page.actions.typeDestinationPortNumberForInbound(testData.destinationPort)
        security_groups_page.actions.typeIpSourceRangeNumberForInbound(testData.ipRange)
        security_groups_page.actions.clickSubmitBtnInAddRulePopUp()
        cy.wait(1000)
        security_groups_page.actions.isVisibleAddedInboundRule(testData.protocol)

        security_groups_page.actions.clickAddInboundRuleBtn()
        security_groups_page.actions.selectRejectActionInList()
        security_groups_page.actions.selectProtocolOptionByName(testData.protocol)
        cy.wait(1000)
        security_groups_page.actions.typeDestinationPortNumberForInbound(testData.destinationPort)
        security_groups_page.actions.typeIpSourceRangeNumberForInbound(testData.ipRange)
        security_groups_page.actions.clickSubmitBtnInAddRulePopUp()
        cy.wait(1000)
        security_groups_page.actions.isVisibleAddedInboundRule(testData.protocol)
        security_groups_page.actions.clickSaveBtnInAddRulePage()
        security_groups_page.actions.clickBackBtnInAddRulePage()
        security_groups_page.actions.isVisibleAddedGroup(testData.ruleName)
        security_groups_page.actions.clickDeleteBtnByRowName(testData.ruleName)
        security_groups_page.actions.clickYesBtnInDeletePopUp()
        cy.wait(2000)
        security_groups_page.actions.isNotAvailableDeletedSecurityGroupBtnPerRowName(testData.ruleName)
    })
    it('[PD-478], [PD-484] Creating security group with inbound rule (Accept/Reject -> Protocal: Any, with invalid port and IP)', () => {            // 4 test cases in 1 autotest
        const testData = {
            ruleName: 'inbound rule-with-invalid-IP/Port',
            protocol: 'TCP',
            invalidDestinationPort: 'invalid',
            invalidIpRange: 'invalid',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickSecurityGroupsIcon()
        security_groups_page.actions.clickAddSecurityGroupBtn()
        security_groups_page.actions.typeSecurityGroupName(testData.ruleName)
        security_groups_page.actions.clickSubmitBtnInAddSecurityGroupPopUp()
        security_groups_page.actions.clickAddInboundRuleBtn()
        security_groups_page.actions.clickSubmitBtnInAddRulePopUp()
        security_groups_page.actions.isVisibleActionTypeErrorLbl('Обязательное поле')
        security_groups_page.actions.selectAcceptActionInList()
        security_groups_page.actions.selectProtocolOptionByName(testData.protocol)
        cy.wait(1000)
        security_groups_page.actions.typeDestinationPortNumberForInbound(testData.invalidDestinationPort)
        security_groups_page.actions.typeIpSourceRangeNumberForInbound(testData.invalidIpRange)
        security_groups_page.actions.isVisibleDestinationPortErrorLbl('Неверное значение')
        security_groups_page.actions.isVisibleIpSourceRangeErrorLbl('Неверное значение')
        security_groups_page.actions.clickCancelBtnInAddRulePopUp()
        security_groups_page.actions.clickBackBtnInAddRulePage()
        security_groups_page.actions.clickDeleteBtnByRowName(testData.ruleName)
        security_groups_page.actions.clickYesBtnInDeletePopUp()
        cy.wait(2000)
       // security_groups_page.actions.isNotAvailableDeletedSecurityGroupBtnPerRowName(testData.ruleName)
    })
    it('[PD-493], [PD-499] Creating security group with outbound rule (Accept/Reject -> Protocal: Any, with valid port and IP)', () => {            // 4 test cases in 1 autotest
        const testData = {
            ruleName: 'outbound rule-with-IP/Port',
            protocol: 'TCP',
            destinationPort: '8080:8085',
            ipRange: '10.10.10.10',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickSecurityGroupsIcon()
        security_groups_page.actions.clickAddSecurityGroupBtn()
        security_groups_page.actions.typeSecurityGroupName(testData.ruleName)
        security_groups_page.actions.clickSubmitBtnInAddSecurityGroupPopUp()
        security_groups_page.actions.clickAddOutboundRuleBtn()
        security_groups_page.actions.selectAcceptActionInList()
        security_groups_page.actions.selectProtocolOptionByName(testData.protocol)
        cy.wait(1000)
        security_groups_page.actions.typeIpSourceRangeNumberForOutbound(testData.destinationPort)
        security_groups_page.actions.typeDestinationPortNumberForOutbound(testData.ipRange)
        security_groups_page.actions.clickSubmitBtnInAddRulePopUp()
        cy.wait(1000)
        security_groups_page.actions.isVisibleAddedOutboundRule(testData.protocol)

        security_groups_page.actions.clickAddOutboundRuleBtn()
        security_groups_page.actions.selectRejectActionInList()
        security_groups_page.actions.selectProtocolOptionByName(testData.protocol)
        cy.wait(1000)
        security_groups_page.actions.typeIpSourceRangeNumberForOutbound(testData.destinationPort)
        security_groups_page.actions.typeDestinationPortNumberForOutbound(testData.ipRange)
        security_groups_page.actions.clickSubmitBtnInAddRulePopUp()
        cy.wait(1000)
        security_groups_page.actions.isVisibleAddedOutboundRule(testData.protocol)
        security_groups_page.actions.clickSaveBtnInAddRulePage()
        security_groups_page.actions.clickBackBtnInAddRulePage()
        security_groups_page.actions.isVisibleAddedGroup(testData.ruleName)
        security_groups_page.actions.clickDeleteBtnByRowName(testData.ruleName)
        security_groups_page.actions.clickYesBtnInDeletePopUp()
        cy.wait(2000)
       // security_groups_page.actions.isNotAvailableDeletedSecurityGroupBtnPerRowName(testData.ruleName)
    })
    it('[PD-494], [PD-500] Creating security group with outbound rule (Accept/Reject -> Protocal: Any, with invalid port and IP)', () => {            // 4 test cases in 1 autotest
        const testData = {
            ruleName: 'outbound rule-with-invalid-IP/Port',
            protocol: 'TCP',
            invalidDestinationPort: 'invalid',
            invalidIpRange: 'invalid',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickSecurityGroupsIcon()
        security_groups_page.actions.clickAddSecurityGroupBtn()
        security_groups_page.actions.typeSecurityGroupName(testData.ruleName)
        security_groups_page.actions.clickSubmitBtnInAddSecurityGroupPopUp()
        security_groups_page.actions.clickAddOutboundRuleBtn()
        security_groups_page.actions.clickSubmitBtnInAddRulePopUp()
        security_groups_page.actions.isVisibleActionTypeErrorLbl('Обязательное поле')
        security_groups_page.actions.selectAcceptActionInList()
        security_groups_page.actions.selectProtocolOptionByName(testData.protocol)
        cy.wait(1000)
        security_groups_page.actions.typeIpSourceRangeNumberForOutbound(testData.invalidDestinationPort)
        security_groups_page.actions.typeDestinationPortNumberForOutbound(testData.invalidIpRange)
        security_groups_page.actions.isVisibleDestinationPortErrorLbl('Неверное значение')
        security_groups_page.actions.isVisibleIpSourceRangeErrorLbl2('Неверное значение')
        security_groups_page.actions.clickCancelBtnInAddRulePopUp()
        security_groups_page.actions.clickBackBtnInAddRulePage()
        security_groups_page.actions.clickDeleteBtnByRowName(testData.ruleName)
        security_groups_page.actions.clickYesBtnInDeletePopUp()
        cy.wait(2000)
        //security_groups_page.actions.isNotAvailableDeletedSecurityGroupBtnPerRowName(testData.ruleName)
    }) */
})