cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import disks_page from "../pages/disks_page";
import server_page from "../pages/server_page";
import serverlist_page from "../pages/server-list_page";
import serverAction_page from "../pages/server-action_page"

describe('19.Disks Tests', () => {
    let configData;
    function turnToNumb(str) { return parseFloat(str.replace(/\s/g, '')) }
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
    })
    it('[PD-149] Создать диск (SSD)', () => {
        const testData = {
            diskName: 'TestFastDisk',
            diskSize: '10'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickDisksIcon()
        disks_page.actions.clickCreateDiskBtn()
        disks_page.actions.fillNewDiskNameTxt(testData.diskName)
        disks_page.actions.clickNewDiskTypeSSDBtn()
        disks_page.actions.fillNewDiskSizeTxt(testData.diskSize)
        disks_page.actions.clickNewDiskCreateConfBtn()
        disks_page.actions.isVisibleCreatedDisk(testData.diskName)
    })
    it('[PD-150] Создать диск (HDD)', () => {
        const testData = {
            diskName: 'TestStandartDisk',
            diskSize: '10'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickDisksIcon()
        disks_page.actions.clickCreateDiskBtn()
        disks_page.actions.fillNewDiskNameTxt(testData.diskName)
        disks_page.actions.clickNewDiskTypeHDDBtn()
        disks_page.actions.fillNewDiskSizeTxt(testData.diskSize)
        disks_page.actions.clickNewDiskCreateConfBtn()
        disks_page.actions.isVisibleCreatedDisk(testData.diskName)
    })
    it('[PD-151] Создать диск пустое называние', () => {
        const testData = {
            diskName: '',
            diskSize: '10'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickDisksIcon()
        disks_page.actions.clickCreateDiskBtn()
        disks_page.actions.clickNewDiskTypeHDDBtn()
        disks_page.actions.fillNewDiskSizeTxt(testData.diskSize)
        disks_page.actions.clickNewDiskCreateConfBtn()
        disks_page.actions.isVisibleNewDiskNameErrorLbl('Обязательное поле')
    })
    it('[PD-152] Создать диск неправильное называние', () => {
        const testData = {
            diskName: 'Test Disk Name',
            diskSize: '10'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickDisksIcon()
        disks_page.actions.clickCreateDiskBtn()
        disks_page.actions.fillNewDiskNameTxt(testData.diskName)
        disks_page.actions.clickNewDiskTypeHDDBtn()
        disks_page.actions.fillNewDiskSizeTxt(testData.diskSize)
        disks_page.actions.clickNewDiskCreateConfBtn()
        disks_page.actions.isVisibleNewDiskNameErrorLbl('Неверное название, только латинские буквы, цифры и символ "-".')
    })
    it('[PD-153] Изменить тип диска с SSD на HDD', () => {
        const testData = {
            diskName: 'TestFastDisk'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickDisksIcon()
        cy.wait(3000)
        disks_page.elements.standartDiskLimitsLbl().invoke('text').then((text1) => {
            const number1 = turnToNumb(text1);
            disks_page.actions.clickChangeDiskTypeBtn(testData.diskName)
            disks_page.actions.clickEditDiskTypeHDDBtn()
            disks_page.actions.clickChangeDiskTypeConfBtn()
            cy.wait(3000)
            cy.reload();
            disks_page.actions.isVisibleCreatedDisk(testData.diskName)
            cy.wait(5000)
            disks_page.elements.standartDiskLimitsLbl().invoke('text').then((text2) => {
                const number2 = turnToNumb(text2);
                expect(number1 - 10).to.equal(number2);
            })
        });
    })
    it('[PD-154] Изменить тип диска с HDD на SSD', () => {
        const testData = {
            diskName: 'TestStandartDisk'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickDisksIcon()
        cy.wait(3000)
        disks_page.elements.fastDiskLimitsLbl().invoke('text').then((text1) => {
            const number1 = turnToNumb(text1);
            disks_page.actions.clickChangeDiskTypeBtn(testData.diskName)
            disks_page.actions.clickEditDiskTypeSSDBtn()
            disks_page.actions.clickChangeDiskTypeConfBtn()
            cy.wait(3000)
            cy.reload();
            disks_page.actions.isVisibleCreatedDisk(testData.diskName)
            cy.wait(5000)
            disks_page.elements.fastDiskLimitsLbl().invoke('text').then((text2) => {
                const number2 = turnToNumb(text2);
                expect(number1 - 10).to.equal(number2);
            })
        });
    })
    /*it('[PD-155] Изменить тип диска с HDD на SSD (не хватает лимитов на SSD)', () => {
        const testData = {
            diskName: 'TestStandartDisk2',
            diskSize: '500'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickDisksIcon()
        cy.wait(5000)
        disks_page.actions.clickCreateDiskBtn()
        disks_page.actions.fillNewDiskNameTxt(testData.diskName)
        disks_page.actions.clickNewDiskTypeHDDBtn()
        disks_page.actions.fillNewDiskSizeTxt(testData.diskSize)
        disks_page.actions.clickNewDiskCreateConfBtn()
        cy.wait(10000)
        disks_page.actions.isVisibleCreatedDisk(testData.diskName)
        cy.wait(3000)
        disks_page.actions.clickChangeDiskTypeBtn(testData.diskName)
        disks_page.actions.clickEditDiskTypeSSDBtn()
        cy.wait(2000)
        disks_page.actions.isVisibleDiskChangeTypeErrorLbl("Смена типа данного диска не возможна через панель управления. Обратитесь в техподдержку!")
    })
    it('[PD-156] Изменить тип диска с SSD на HDD (не хватает лимитов на HDD)', () => {
        const testData = {
            diskName: 'TestFastDisk2',
            diskSize: '470'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickDisksIcon()
        disks_page.actions.clickCreateDiskBtn()
        disks_page.actions.fillNewDiskNameTxt(testData.diskName)
        disks_page.actions.clickNewDiskTypeSSDBtn()
        disks_page.actions.fillNewDiskSizeTxt(testData.diskSize)
        disks_page.actions.clickNewDiskCreateConfBtn()
        cy.wait(10000)
        disks_page.actions.isVisibleCreatedDisk(testData.diskName)
        cy.wait(3000)
        disks_page.actions.clickChangeDiskTypeBtn(testData.diskName)
        disks_page.actions.clickEditDiskTypeHDDBtn()
        cy.wait(2000)
        disks_page.actions.isVisibleDiskChangeTypeErrorLbl("Смена типа данного диска не возможна через панель управления. Обратитесь в техподдержку!")
    })
    it('[PD-157] Привязать диск к остановленному серверу', () => {
        const testData = {
            diskName: 'TestStandartDisk2',
            serverName: configData.test_server_name,
            serverId: configData.test_server_id
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickDisksIcon()
        disks_page.actions.clickLinkDiskBtn(testData.diskName)
        disks_page.actions.clickLinkDiskServerSelectorBtn()
        disks_page.actions.clickLinkDiskServerOption(testData.serverName)
        disks_page.actions.clickLinkDiskServerConfBtn()
        disks_page.actions.isLinkedServer(testData.diskName, testData.serverId)
    })
    it('[PD-158] Привязать диск к работающему серверу', () => {
        const testData = {
            diskName: 'TestFastDisk2',
            serverName: configData.test_server_name,
            serverId: configData.test_server_id
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickStartServerBtn()
        try {
            serverAction_page.actions.isRunningServer()
        } catch {
            cy.wait(30000)
            serverAction_page.actions.isRunningServer()
        }
        sidebar.actions.clickDisksIcon()
        disks_page.actions.clickLinkDiskBtn(testData.diskName)
        disks_page.actions.clickLinkDiskServerSelectorBtn()
        disks_page.actions.isDisabledLinkDiskServerOption(testData.serverName)
    })
    it('[PD-160] Отвязать диск когда сервер в работе', () => {
        const testData = {
            diskName: 'TestStandartDisk2'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickDisksIcon()
        disks_page.actions.isDisabledLinkDiskBtn(testData.diskName)
    })
    it('[PD-159] Отвязать диск когда сервер остановлен', () => {
        const testData = {
            diskName: 'TestStandartDisk2'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickStopServerBtn()
        try {
            serverAction_page.actions.isServerStoppedStatus()
        } catch {
            cy.wait(30000)
            serverAction_page.actions.isServerStoppedStatus()
        }
        sidebar.actions.clickDisksIcon()
        disks_page.actions.clickLinkDiskBtn(testData.diskName)
        disks_page.actions.clickUnlinkDiskServerConfBtn()
    })
    it('[PD-161] Удалить привязанный диск', () => {
        const testData = {
            diskName: 'TestStandartDisk2',
            serverName: configData.test_server_name,
            serverId: configData.test_server_id

        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickDisksIcon()
        disks_page.actions.clickLinkDiskBtn(testData.diskName)
        disks_page.actions.clickLinkDiskServerSelectorBtn()
        disks_page.actions.clickLinkDiskServerOption(testData.serverName)
        disks_page.actions.clickLinkDiskServerConfBtn()
        disks_page.actions.isLinkedServer(testData.diskName, testData.serverId)
        disks_page.actions.isDisabledDeleteDiskBtn(testData.diskName)
    })
    it('[PD-162] Удалить не привязанный диск', () => {
        const testData = {
            diskName1: 'TestStandartDisk2',
            diskName2: 'TestFastDisk2',
            diskName3: 'TestStandartDisk',
            diskName4: 'TestFastDisk',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickDisksIcon()
        //* unlink disk
        disks_page.actions.clickLinkDiskBtn(testData.diskName1)
        disks_page.actions.clickUnlinkDiskServerConfBtn()
        cy.wait(1000)
        disks_page.actions.clickDeleteDiskBtn(testData.diskName1)
        disks_page.actions.clickDeleteDiskServerConfBtn(testData.diskName1)
        cy.wait(1000)   
        disks_page.actions.clickDeleteDiskBtn(testData.diskName2)
        disks_page.actions.clickDeleteDiskServerConfBtn(testData.diskName2)
        cy.wait(1000)
        disks_page.actions.clickDeleteDiskBtn(testData.diskName3)
        disks_page.actions.clickDeleteDiskServerConfBtn(testData.diskName3)
        cy.wait(1000)
        disks_page.actions.clickDeleteDiskBtn(testData.diskName4)
        disks_page.actions.clickDeleteDiskServerConfBtn(testData.diskName4)

        cy.wait(3000)
        disks_page.actions.isNotVisibleDisk(testData.diskName1)
        disks_page.actions.isNotVisibleDisk(testData.diskName2)
        disks_page.actions.isNotVisibleDisk(testData.diskName3)
        disks_page.actions.isNotVisibleDisk(testData.diskName4)
    }) */
})