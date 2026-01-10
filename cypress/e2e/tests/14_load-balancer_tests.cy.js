cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import server_page from "../pages/server_page";
import load_balancer_page from "../pages/load_balancer_page";
import localNetworks_page from "../pages/localNetworks_page";
import serverAction_page from "../pages/server-action_page";

describe('14.Load Balancer Tests', () => {
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

    it('[PD-455] Terms of Service link validation', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickOnTermsOfServiceLink()
        cy.wait(1000);
        cy.go('back');
        cy.wait(2000)
        load_balancer_page.actions.isVisibleCreateBtn()
    })
    it('[PD-456] Price List link validation', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickOnPriceListLink()
        cy.wait(1000);
        cy.go('back');
        load_balancer_page.actions.isVisibleCreateBtn()
    })
    it('[PD-135, PD-139] Create - External LB with TCP', () => {            // 2 test cases in 1 autotest
        const testData = {
            balancerName: 'External-LB-TCP',
            balancerDescription: 'Test External LB TCP',
            balancerPort: '80',
            backendPort: '80',
            serverName: configData.test_server_name
        }
        cy.login(configData.base_url, configData.login, configData.password)

        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        localNetworks_page.actions.clickLocalNetworkTxt()
        localNetworks_page.actions.clickAddNetworkBtn()
        localNetworks_page.actions.isVisibleSelectListNetwork()
        localNetworks_page.actions.clickSelectListNetwork()
        localNetworks_page.actions.isVisibleNetworkIp('Test_Local_Ip')
        localNetworks_page.actions.clickNetworkIpBtn('Test_Local_Ip')
        cy.wait(2000)
        localNetworks_page.actions.clickAddNetworkSuccessBtn()

        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickCreateLoadBalancerBtn()
        load_balancer_page.actions.typeBalancerName(testData.balancerName)
        load_balancer_page.actions.typeBalancerDescription(testData.balancerDescription)
        load_balancer_page.actions.clickBalancerTypeOuterBtn()
        load_balancer_page.actions.clickLocalNetworkSelector()
        load_balancer_page.actions.clickLocalNetworkOption('Test_Local_Ip')
        load_balancer_page.actions.clickBalancerProtocolTCPBtn()
        load_balancer_page.actions.clickBalancerPortAddBtn()
        load_balancer_page.actions.typeBalancerPort(testData.balancerPort)             //     Create - LB with same ports
        load_balancer_page.actions.typeBackendPort(testData.backendPort)
        load_balancer_page.actions.clickBalancerPortConfBtn()
        load_balancer_page.actions.clickBackendAddBtn()
        load_balancer_page.actions.checkBalancerBackOption(testData.serverName)
        load_balancer_page.actions.clickbalancerBackendConfBtn()
        load_balancer_page.actions.clickBalancerCreateConfBtn()
        cy.wait(10000)
        load_balancer_page.actions.isVisibleCreatedBalancer(testData.balancerName)
    })
    it('[PD-820, PD-451] Create - External LB with UDP', () => {            // 2 test cases in 1 autotest
        const testData = {
            balancerName: 'External-LB-UDP',
            balancerDescription: 'Test External LB UDP',
            balancerPort: '80',
            backendPort: '80',
            serverName: configData.test_server_name
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickCreateLoadBalancerBtn()
        load_balancer_page.actions.typeBalancerName(testData.balancerName)
        load_balancer_page.actions.typeBalancerDescription(testData.balancerDescription)
        load_balancer_page.actions.clickBalancerTypeOuterBtn()
        load_balancer_page.actions.clickLocalNetworkSelector()
        load_balancer_page.actions.clickLocalNetworkOption('Test_Local_Ip')
        load_balancer_page.actions.clickBalancerProtocolUDPBtn()
        load_balancer_page.actions.clickBalancerPortAddBtn()
        load_balancer_page.actions.typeBalancerPort(testData.balancerPort)
        load_balancer_page.actions.typeBackendPort(testData.backendPort)
        load_balancer_page.actions.clickBalancerPortConfBtn()
        load_balancer_page.actions.clickBackendAddBtn()
        load_balancer_page.actions.checkBalancerBackOption(testData.serverName)      // Create - LB with backend group - attaching single server
        load_balancer_page.actions.clickbalancerBackendConfBtn()
        load_balancer_page.actions.clickBalancerCreateConfBtn()
        cy.wait(10000)
        load_balancer_page.actions.isVisibleCreatedBalancer(testData.balancerName)
    })
    it('[PD-821] Create - Internal LB with TCP', () => {
        const testData = {
            balancerName: 'Internal-LB-TCP',
            balancerDescription: 'Test Internal LB TCP',
            balancerPort: '80',
            backendPort: '80',
            serverName: configData.test_server_name
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickCreateLoadBalancerBtn()
        load_balancer_page.actions.typeBalancerName(testData.balancerName)
        load_balancer_page.actions.typeBalancerDescription(testData.balancerDescription)
        load_balancer_page.actions.clickBalancerTypeInnerBtn()
        load_balancer_page.actions.clickLocalNetworkSelector()
        load_balancer_page.actions.clickLocalNetworkOption('Test_Local_Ip')
        load_balancer_page.actions.clickBalancerSelectIpNagruz()
        load_balancer_page.actions.clickBalancerIpOption('192.168.1.4')
        load_balancer_page.actions.clickBalancerProtocolTCPBtn()
        load_balancer_page.actions.clickBalancerPortAddBtn()
        load_balancer_page.actions.typeBalancerPort(testData.balancerPort)
        load_balancer_page.actions.typeBackendPort(testData.backendPort)
        load_balancer_page.actions.clickBalancerPortConfBtn()
        load_balancer_page.actions.clickBackendAddBtn()
        load_balancer_page.actions.checkBalancerBackOption(testData.serverName)
        load_balancer_page.actions.clickbalancerBackendConfBtn()
        load_balancer_page.actions.clickBalancerCreateConfBtn()
        cy.wait(10000)
        load_balancer_page.actions.isVisibleCreatedBalancer(testData.balancerName)
    })
    it('[PD-136, PD-446] Create - Internal LB with UDP', () => {           // 2 test cases in 1 autotest
        const testData = {
            balancerName: 'Internal-LB-UDP',
            balancerDescription: 'Test Internal LB UDP',
            balancerPort: '40',
            backendPort: '30',
            serverName: configData.test_server_name
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickCreateLoadBalancerBtn()
        load_balancer_page.actions.typeBalancerName(testData.balancerName)
        load_balancer_page.actions.typeBalancerDescription(testData.balancerDescription)
        load_balancer_page.actions.clickBalancerTypeInnerBtn()
        load_balancer_page.actions.clickLocalNetworkSelector()
        load_balancer_page.actions.clickLocalNetworkOption('Test_Local_Ip')
        load_balancer_page.actions.clickBalancerSelectIpNagruz()
        load_balancer_page.actions.clickBalancerIpOption('192.168.1.4')
        load_balancer_page.actions.clickBalancerProtocolUDPBtn()
        load_balancer_page.actions.clickBalancerPortAddBtn()
        load_balancer_page.actions.typeBalancerPort(testData.balancerPort)          // Create - LB with valid ports
        load_balancer_page.actions.typeBackendPort(testData.backendPort)
        load_balancer_page.actions.clickBalancerPortConfBtn()
        load_balancer_page.actions.clickBackendAddBtn()
        load_balancer_page.actions.checkBalancerBackOption(testData.serverName)
        load_balancer_page.actions.clickbalancerBackendConfBtn()
        load_balancer_page.actions.clickBalancerCreateConfBtn()
        cy.wait(10000)
        load_balancer_page.actions.isVisibleCreatedBalancer(testData.balancerName)
    })
    it('[PD-138] Create - LB with existing entity name (unsuccessful))', () => {
        const testData = {
            balancerName: 'Internal-LB-UDP',
            balancerDescription: 'Test Inner Balancer UDP',
            balancerPort: '80',
            backendPort: '80',
            serverName: configData.test_server_name
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickCreateLoadBalancerBtn()
        load_balancer_page.actions.typeBalancerName(testData.balancerName)
        load_balancer_page.actions.typeBalancerDescription(testData.balancerDescription)
        load_balancer_page.actions.clickBalancerTypeInnerBtn()
        load_balancer_page.actions.clickLocalNetworkSelector()
        load_balancer_page.actions.clickLocalNetworkOption('Test_Local_Ip')
        load_balancer_page.actions.clickBalancerSelectIpNagruz()
        load_balancer_page.actions.clickBalancerIpOption('192.168.1.4')
        load_balancer_page.actions.clickBalancerProtocolUDPBtn()
        load_balancer_page.actions.clickBalancerPortAddBtn()
        load_balancer_page.actions.typeBalancerPort(testData.balancerPort)
        load_balancer_page.actions.typeBackendPort(testData.backendPort)
        load_balancer_page.actions.clickBalancerPortConfBtn()
        load_balancer_page.actions.clickBackendAddBtn()
        load_balancer_page.actions.checkBalancerBackOption(testData.serverName)
        load_balancer_page.actions.clickbalancerBackendConfBtn()
        load_balancer_page.actions.clickBalancerCreateConfBtn()
        load_balancer_page.actions.isVisibleBalancerNameErrorLbl("Балансировщик с таким именем уже существует")
    })
    it('[PD-445] Create - LB with empty name (unsuccessful))', () => {
        const testData = {
            balancerName: 'Internal-LB-UDP',
            balancerDescription: 'Test Inner Balancer UDP',
            balancerPort: '80',
            backendPort: '80',
            serverName: configData.test_server_name
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickCreateLoadBalancerBtn()
        load_balancer_page.actions.typeBalancerDescription(testData.balancerDescription)
        load_balancer_page.actions.clickBalancerTypeInnerBtn()
        load_balancer_page.actions.clickLocalNetworkSelector()
        load_balancer_page.actions.clickLocalNetworkOption('Test_Local_Ip')
        load_balancer_page.actions.clickBalancerSelectIpNagruz()
        load_balancer_page.actions.clickBalancerIpOption('192.168.1.4')
        load_balancer_page.actions.clickBalancerProtocolUDPBtn()
        load_balancer_page.actions.clickBalancerPortAddBtn()
        load_balancer_page.actions.typeBalancerPort(testData.balancerPort)
        load_balancer_page.actions.typeBackendPort(testData.backendPort)
        load_balancer_page.actions.clickBalancerPortConfBtn()
        load_balancer_page.actions.clickBackendAddBtn()
        load_balancer_page.actions.checkBalancerBackOption(testData.serverName)
        load_balancer_page.actions.clickbalancerBackendConfBtn()
        load_balancer_page.actions.clickBalancerCreateConfBtn()
        load_balancer_page.actions.isVisibleBalancerNameErrorLbl("Обязательное поле")
    })
    it('[PD-822] Create - LB with symbols (unsuccessful))', () => {
        const testData = {
            balancerName: ".,/;[]()'-=",
            balancerDescription: 'Test Inner Balancer UDP',
            balancerPort: '80',
            backendPort: '80',
            serverName: configData.test_server_name
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickCreateLoadBalancerBtn()
        load_balancer_page.actions.typeBalancerName(testData.balancerName)
        load_balancer_page.actions.typeBalancerDescription(testData.balancerDescription)
        load_balancer_page.actions.clickBalancerTypeInnerBtn()
        load_balancer_page.actions.clickLocalNetworkSelector()
        load_balancer_page.actions.clickLocalNetworkOption('Test_Local_Ip')
        load_balancer_page.actions.clickBalancerSelectIpNagruz()
        load_balancer_page.actions.clickBalancerIpOption('192.168.1.4')
        load_balancer_page.actions.clickBalancerProtocolUDPBtn()
        load_balancer_page.actions.clickBalancerPortAddBtn()
        load_balancer_page.actions.typeBalancerPort(testData.balancerPort)
        load_balancer_page.actions.typeBackendPort(testData.backendPort)
        load_balancer_page.actions.clickBalancerPortConfBtn()
        load_balancer_page.actions.clickBackendAddBtn()
        load_balancer_page.actions.checkBalancerBackOption(testData.serverName)
        load_balancer_page.actions.clickbalancerBackendConfBtn()
        load_balancer_page.actions.clickBalancerCreateConfBtn()
        load_balancer_page.actions.isVisibleBalancerNameErrorLbl("Недопустимые символы")
    })
    it('[PD-137] Create - LB without connecting to backend group (unsuccessful)', () => {
        const testData = {
            balancerName: 'TestInnerBalancerUDP',
            balancerDescription: 'Test Inner Balancer UDP',
            balancerPort: '80',
            backendPort: '80',
            serverName: configData.test_server_name
        }

        cy.login(configData.base_url, configData.login, configData.password)
        /*sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        localNetworks_page.actions.clickLocalNetworkTxt()
        localNetworks_page.actions.isVisibleNetworkDeleteBtn()
        cy.wait(3000)
        localNetworks_page.actions.clickDeleteNetworkBtn()
        localNetworks_page.actions.clickConfirmCheckbox()
        localNetworks_page.actions.clickNetworkDeleteConfirmBtn()
        cy.wait(3000)
        localNetworks_page.actions.networkSuccessDeleted()
        cy.reload()
        localNetworks_page.actions.isNotVisibleNetworkEditeBtn()
        cy.wait(3000)
        serverAction_page.actions.clickServerActionsBtn()
        cy.wait(2000)
        serverAction_page.actions.clickStopServerBtn()
        try {
            serverAction_page.actions.isServerStoppedStatus()
        } catch {
            cy.wait(30000)
            serverAction_page.actions.isServerStoppedStatus()
        } */

        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickCreateLoadBalancerBtn()
        load_balancer_page.actions.typeBalancerName(testData.balancerName)
        load_balancer_page.actions.typeBalancerDescription(testData.balancerDescription)
        load_balancer_page.actions.clickBalancerTypeInnerBtn()
        load_balancer_page.actions.clickLocalNetworkSelector()
        load_balancer_page.actions.clickLocalNetworkOption('Test_Local_Ip')
        load_balancer_page.actions.clickBalancerSelectIpNagruz()
        load_balancer_page.actions.clickBalancerIpOption('192.168.1.4')
        load_balancer_page.actions.clickBalancerProtocolUDPBtn()
        load_balancer_page.actions.clickBalancerPortAddBtn()
        load_balancer_page.actions.typeBalancerPort(testData.balancerPort)
        load_balancer_page.actions.typeBackendPort(testData.backendPort)
        load_balancer_page.actions.clickBalancerPortConfBtn()
        load_balancer_page.actions.isDisabledBalancerCreateConfBtn()
    })
    it('[PD-447] Create - LB with port number > 65536 (unsuccessful)', () => {
        const testData = {
            balancerName: 'TestInnerBalancerUDP',
            balancerDescription: 'Test Inner Balancer UDP',
            balancerPort: '65536',
            backendPort: '65536',
            serverName: configData.test_server_name
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickCreateLoadBalancerBtn()
        load_balancer_page.actions.typeBalancerName(testData.balancerName)
        load_balancer_page.actions.typeBalancerDescription(testData.balancerDescription)
        load_balancer_page.actions.clickBalancerTypeInnerBtn()
        load_balancer_page.actions.clickLocalNetworkSelector()
        load_balancer_page.actions.clickLocalNetworkOption('Test_Local_Ip')
        load_balancer_page.actions.clickBalancerSelectIpNagruz()
        load_balancer_page.actions.clickBalancerIpOption('192.168.1.4')
        load_balancer_page.actions.clickBalancerProtocolUDPBtn()
        load_balancer_page.actions.clickBalancerPortAddBtn()
        load_balancer_page.actions.typeBalancerPort(testData.balancerPort)
        load_balancer_page.actions.typeBackendPort(testData.backendPort)
        load_balancer_page.actions.clickBalancerPortConfBtn()
        load_balancer_page.actions.isVisibleLoadBalancerPortErrorLbl("Значение порта должно быть в диапазоне от 0 до 65536")
        load_balancer_page.actions.isVisibleBackendGroupPortLbl("Значение порта должно быть в диапазоне от 0 до 65536")
    })
    it('[PD-448] Create - LB with empty ports (unsuccessful)', () => {
        const testData = {
            balancerName: 'TestInnerBalancerUDP',
            balancerDescription: 'Test Inner Balancer UDP',
            serverName: configData.test_server_name
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickCreateLoadBalancerBtn()
        load_balancer_page.actions.typeBalancerName(testData.balancerName)
        load_balancer_page.actions.typeBalancerDescription(testData.balancerDescription)
        load_balancer_page.actions.clickBalancerTypeInnerBtn()
        load_balancer_page.actions.clickLocalNetworkSelector()
        load_balancer_page.actions.clickLocalNetworkOption('Test_Local_Ip')
        load_balancer_page.actions.clickBalancerSelectIpNagruz()
        load_balancer_page.actions.clickBalancerIpOption('192.168.1.4')
        load_balancer_page.actions.clickBalancerProtocolUDPBtn()
        load_balancer_page.actions.clickBalancerPortAddBtn()
        load_balancer_page.actions.clickBalancerPortConfBtn()
        load_balancer_page.actions.isVisibleLoadBalancerPortErrorLbl("Обязательное поле")
        load_balancer_page.actions.isVisibleBackendGroupPortLbl("Обязательное поле")
    })
    it('[PD-823] Create - LB with another set of ports that are in use already (unsuccessful)', () => {
        const testData = {
            balancerName: 'TestInnerBalancerUDP',
            balancerDescription: 'Test Inner Balancer UDP',
            serverName: configData.test_server_name,
            balancerPort: '80',
            backendPort: '80',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickCreateLoadBalancerBtn()
        load_balancer_page.actions.typeBalancerName(testData.balancerName)
        load_balancer_page.actions.typeBalancerDescription(testData.balancerDescription)
        load_balancer_page.actions.clickBalancerTypeInnerBtn()
        load_balancer_page.actions.clickLocalNetworkSelector()
        load_balancer_page.actions.clickLocalNetworkOption('Test_Local_Ip')
        load_balancer_page.actions.clickBalancerSelectIpNagruz()
        load_balancer_page.actions.clickBalancerIpOption('192.168.1.4')
        load_balancer_page.actions.clickBalancerProtocolUDPBtn()
        load_balancer_page.actions.clickBalancerPortAddBtn()
        load_balancer_page.actions.typeBalancerPort(testData.balancerPort)
        load_balancer_page.actions.typeBackendPort(testData.backendPort)
        load_balancer_page.actions.clickBalancerPortConfBtn()
        load_balancer_page.actions.clickBalancerPortAddBtn()
        load_balancer_page.actions.typeBalancerPort(testData.balancerPort)
        load_balancer_page.actions.typeBackendPort(testData.backendPort)
        load_balancer_page.actions.clickBalancerPortConfBtn()
        load_balancer_page.actions.isVisibleLoadBalancerPortErrorLbl("Указанный порт занят")
    })
    it('[PD-449, PD-450] Create - LB with valid ports - editing ports', () => {     // 2 test cases in 1 autotest
        const testData = {
            balancerName: 'TestInnerBalancerUDP',
            balancerDescription: 'Test Inner Balancer UDP',
            serverName: configData.test_server_name,
            balancerPort1: '80',
            backendPort1: '80',
            balancerPort2: '81',
            backendPort2: '81',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickCreateLoadBalancerBtn()
        load_balancer_page.actions.typeBalancerName(testData.balancerName)
        load_balancer_page.actions.typeBalancerDescription(testData.balancerDescription)
        load_balancer_page.actions.clickBalancerTypeInnerBtn()
        load_balancer_page.actions.clickLocalNetworkSelector()
        load_balancer_page.actions.clickLocalNetworkOption('Test_Local_Ip')
        load_balancer_page.actions.clickBalancerSelectIpNagruz()
        load_balancer_page.actions.clickBalancerIpOption('192.168.1.4')
        load_balancer_page.actions.clickBalancerProtocolUDPBtn()
        load_balancer_page.actions.clickBalancerPortAddBtn()
        load_balancer_page.actions.typeBalancerPort(testData.balancerPort1)
        load_balancer_page.actions.typeBackendPort(testData.backendPort1)
        load_balancer_page.actions.clickBalancerPortConfBtn()
        load_balancer_page.actions.isVisiblePortNumberUnderThisValue(testData.balancerPort1)
        load_balancer_page.actions.isVisiblePortNumberUnderThisValue(testData.backendPort1)
        load_balancer_page.actions.clickEditBtnPerPortRowName()
        load_balancer_page.actions.typeBalancerPort(testData.balancerPort2)
        load_balancer_page.actions.typeBackendPort(testData.backendPort2)
        load_balancer_page.actions.clickBalancerPortConfBtn()
        load_balancer_page.actions.isVisiblePortNumberUnderThisValue(testData.balancerPort2)
        load_balancer_page.actions.isVisiblePortNumberUnderThisValue(testData.backendPort2)
        load_balancer_page.actions.clickDeleteBtnPerPortRowName()
        load_balancer_page.actions.clickConfirmDeletePortBtn()                                         // Create - LB with valid ports - deleting ports
        load_balancer_page.actions.isNotVisiblePortNumberUnderThisValue(testData.balancerPort2)
        load_balancer_page.actions.isNotVisiblePortNumberUnderThisValue(testData.backendPort2)
    })
    it('[PD-453] Create - LB with backend group - deleting server', () => {
        const testData = {
            balancerName: 'External-LB-TCP',
            balancerDescription: 'Test External LB TCP',
            balancerPort: '80',
            backendPort: '80',
            serverName: configData.test_server_name
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickCreateLoadBalancerBtn()
        load_balancer_page.actions.typeBalancerName(testData.balancerName)
        load_balancer_page.actions.typeBalancerDescription(testData.balancerDescription)
        load_balancer_page.actions.clickBalancerTypeOuterBtn()
        load_balancer_page.actions.clickLocalNetworkSelector()
        load_balancer_page.actions.clickLocalNetworkOption('Test_Local_Ip')
        load_balancer_page.actions.clickBalancerProtocolTCPBtn()
        load_balancer_page.actions.clickBalancerPortAddBtn()
        load_balancer_page.actions.typeBalancerPort(testData.balancerPort)
        load_balancer_page.actions.typeBackendPort(testData.backendPort)
        load_balancer_page.actions.clickBalancerPortConfBtn()
        load_balancer_page.actions.clickBackendAddBtn()
        load_balancer_page.actions.checkBalancerBackOption(testData.serverName)
        load_balancer_page.actions.clickbalancerBackendConfBtn()
        load_balancer_page.actions.isVisiblePortNumberUnderThisValue(testData.serverName)  // here it refers to the Backend Row, just re-used the existing method
        load_balancer_page.actions.clickDeleteBtnPerBackendRowName()
        load_balancer_page.actions.clickConfirmDeleteBackendBtn()
        load_balancer_page.actions.isNotVisiblePortNumberUnderThisValue(testData.serverName)
    })
    it('[PD-444] Create - Cancel button while adding', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickCreateLoadBalancerBtn()
        load_balancer_page.actions.clickCancelBtnInAddPage()
        load_balancer_page.actions.isVisibleCreateBtn()
    })
    it('[PD-829] Edit - Cancel button', () => {
        const balancerName = 'External-LB-TCP';
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickEditLoadBalancerBtnPerRowName(balancerName)
        load_balancer_page.actions.clickCancelBtnInEditPage()
        load_balancer_page.actions.isVisibleCreateBtn()
    })
    it('[PD-825] Edit - editing LB Name and Description with invalid data (unsuccessful)', () => {
        const testData = {
            balancerName: "External-LB-TCP",
            invalidLbName: ".,/;[]()'-="
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickEditLoadBalancerBtnPerRowName(testData.balancerName)
        load_balancer_page.actions.editBalancerName(testData.invalidLbName)
        load_balancer_page.actions.clickConfirmBtnInEditPage()
        load_balancer_page.actions.isVisibleBalancerNameErrorLblInEditPage("Недопустимые символы")
    })
    it('[PD-824] Edit - editing LB Name and Description with valid data', () => {
        const testData = {
            balancerName: "External-LB-TCP",
            balancerEditedName: "External-LB-TCP-edited",
            balancerEditedDesc: "edited"
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.clickEditLoadBalancerBtnPerRowName(testData.balancerName)
        load_balancer_page.actions.editBalancerName(testData.balancerEditedName)
        load_balancer_page.actions.editBalancerDescription(testData.balancerEditedDesc)
        load_balancer_page.actions.clickConfirmBtnInEditPage()
        load_balancer_page.actions.isVisibleCreatedBalancer(testData.balancerName)
    })
    it('[PD-826, PD-827] Edit - editing existing ports', () => {     // 2 test cases in 1 autotest
        const testData = {
            balancerName: 'External-LB-TCP-edited',
            balancerPort1: '90',
            backendPort1: '90',
            balancerPort2: '91',
            backendPort2: '91',
        }
        cy.login(configData.base_url, configData.login, configData.password)               //// 2 test cases in 1 autotest
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.waitForLoadBalancerReadyStatus(testData.balancerName)
        load_balancer_page.actions.clickEditLoadBalancerBtnPerRowName(testData.balancerName)
        load_balancer_page.actions.clickEditBtnPerPortRowName()                                     // Edit - editing existing ports
        load_balancer_page.actions.typeBalancerPort(testData.balancerPort1)
        load_balancer_page.actions.typeBackendPort(testData.backendPort1)
        load_balancer_page.actions.clickBalancerPortConfBtn()
        load_balancer_page.actions.isVisiblePortNumberUnderThisValue(testData.balancerPort1)
        load_balancer_page.actions.isVisiblePortNumberUnderThisValue(testData.backendPort1)
        load_balancer_page.actions.clickBalancerPortAddBtn()                                       // Edit - adding ports
        load_balancer_page.actions.typeBalancerPort(testData.balancerPort2)
        load_balancer_page.actions.typeBackendPort(testData.balancerPort2)
        load_balancer_page.actions.clickBalancerPortConfBtn()
        load_balancer_page.actions.isVisiblePortNumberUnderThisValue(testData.balancerPort2)
        load_balancer_page.actions.isVisiblePortNumberUnderThisValue(testData.backendPort2)
        load_balancer_page.actions.clickConfirmBtnInEditPage()
        load_balancer_page.actions.isVisibleCreatedBalancer(testData.balancerName)
    })
    it('[PD-830] Delete - deleting External LB with TCP', () => {
        const balancerName = 'External-LB-TCP-edited';
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.waitForLoadBalancerReadyStatus(balancerName)
        load_balancer_page.actions.clickDeleteLoadBalancerBtnPerRowName(balancerName)
        load_balancer_page.actions.clickDeleteBalancerConfirmBtn()
        cy.wait(5000)
        load_balancer_page.actions.isNotVisibleDeletedBalancerPerRowName(balancerName)
    })
    it('[PD-831] Delete - deleting External LB with UDP', () => {
        const balancerName = 'External-LB-UDP';
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.waitForLoadBalancerReadyStatus(balancerName)
        load_balancer_page.actions.clickDeleteLoadBalancerBtnPerRowName(balancerName)
        load_balancer_page.actions.clickDeleteBalancerConfirmBtn()
        cy.wait(5000)
        load_balancer_page.actions.isNotVisibleDeletedBalancerPerRowName(balancerName)
    })
    it('[PD-832] Delete - deleting Internal LB with TCP', () => {
        const balancerName = 'Internal-LB-TCP';
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.waitForLoadBalancerReadyStatus(balancerName)
        load_balancer_page.actions.clickDeleteLoadBalancerBtnPerRowName(balancerName)
        load_balancer_page.actions.clickDeleteBalancerConfirmBtn()
        cy.wait(5000)
        load_balancer_page.actions.isNotVisibleDeletedBalancerPerRowName(balancerName)
    })
    it('[PD-833] Delete - deleting Internal LB with UDP', () => {
        const balancerName = 'Internal-LB-UDP';
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickLoadBalanceIcon()
        load_balancer_page.actions.waitForLoadBalancerReadyStatus(balancerName)
        load_balancer_page.actions.clickDeleteLoadBalancerBtnPerRowName(balancerName)
        load_balancer_page.actions.clickDeleteBalancerConfirmBtn()
        cy.wait(5000)
        load_balancer_page.actions.isVisibleTermsOfServiceLink()
        load_balancer_page.actions.isVisiblePriceListLink()
    })
})