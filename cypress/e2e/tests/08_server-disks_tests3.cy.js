cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import server_page from "../pages/server_page";
import sidebar from "../pages/sidebar";
import serverlist_page from "../pages/server-list_page";
import serverDisksPage from "../pages/server-disks-page";
import serverAction_page from "../pages/server-action_page";

describe('8.Servers - Disks tab Part3', () => {
    let configData;
    function turnToNumb(str) { return parseFloat(str.replace(/\s/g, '')) }
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/${configData.test_server_id}/disks/add?need_reboot=false`).as('createNewDisk');
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/resourceMetaData`).as('resourcePrices');
    })
    it("[PD-61] Пометить второй диск как загрузочный. (первый должен стать не загрузочным)", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickDiskMakeUploadBtn()
        serverDisksPage.actions.clickDiskmakeUploadConfirmBtn()
        //* test here ends, bellow code for returning disks to old format
        cy.wait(3000)
        serverDisksPage.actions.clickRemakeUploadBtn()
        serverDisksPage.actions.clickDiskmakeUploadConfirmBtn()
    })
    it("[PD-54] Изменить тип диска с проверкой после этого новых значений лимитов", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        cy.wait(5000)
        serverDisksPage.elements.standartDiskLimits().invoke('text').then((text1) => {
            const number1 = turnToNumb(text1); //480
            serverDisksPage.actions.clickDiskChangeTypeBtn()
            serverDisksPage.actions.clickChangeDiskTypeSSDBtn()
            cy.wait(1000)
            serverDisksPage.actions.clickChangeDiskTypeConfBtn()
            cy.wait(2000)
            cy.reload();
            serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
            cy.wait(3000)
            serverDisksPage.elements.standartDiskLimits().invoke('text').then((text2) => { //980
                const number2 = turnToNumb(text2);
                expect(number1 + 500).to.equal(number2);
            })
            serverDisksPage.actions.clickDiskChangeTypeBtn()
            serverDisksPage.actions.clickChangeDiskTypeHDDBtn()
            cy.wait(3000)
            serverDisksPage.actions.clickChangeDiskTypeConfBtn()
            cy.wait(3000)
        });
    })
    it("[PD-127] Изменить тип диска", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.elements.standartDiskLimits().invoke('text').then((text1) => {
            const number1 = turnToNumb(text1);
            serverDisksPage.actions.clickDiskChangeTypeBtn()
            serverDisksPage.actions.clickChangeDiskTypeSSDBtn()
            serverDisksPage.actions.clickChangeDiskTypeConfBtn()
            cy.wait(3000)
            cy.reload();
            serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
            cy.wait(5000)
            serverDisksPage.elements.standartDiskLimits().invoke('text').then((text2) => {
                const number2 = turnToNumb(text2);
                expect(number1 + 500).to.equal(number2);
            })
            serverDisksPage.actions.clickDiskChangeTypeBtn()
            serverDisksPage.actions.clickChangeDiskTypeHDDBtn()
            cy.wait(3000)
            serverDisksPage.actions.clickChangeDiskTypeConfBtn()
            cy.wait(3000)
        });
    })
    it("Увеличить размер диска (в список дисков)", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.elements.standartDiskLimits().invoke('text').then((text1) => {
            const number1 = turnToNumb(text1);//480
            serverDisksPage.actions.clickDiskSizeUpBtn()
            serverDisksPage.actions.writeDiskSizeUpModalTxt(number1 + 500) //980
            cy.wait(3000)
            serverDisksPage.actions.clickDiskSizeUpModalBtn()
            cy.wait(3000)
            cy.reload(); //0
            cy.wait(2000)
            serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
            cy.wait(8000)
            serverDisksPage.elements.standartDiskLimits().invoke('text').then((text2) => { 
                const number2 = turnToNumb(text2); //0
                expect(number2 + 480).to.equal(number1);
            })
        });
    })
    it("Увеличить размер диска (Размер превышает лимит)", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.elements.standartDiskLimits().invoke('text').then((text1) => {
            const number1 = turnToNumb(text1);
            serverDisksPage.actions.clickDiskSizeUpBtn()
            serverDisksPage.actions.writeDiskSizeUpModalTxt(number1 + 100)
            serverDisksPage.actions.clickDiskSizeUpModalBtn()
        });
    })
    it("Увеличить размер диска (Размер негативное число)", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickDiskSizeUpBtn()
        serverDisksPage.actions.writeDiskSizeUpModalTxt(-100)
        serverDisksPage.actions.isDisabledDiskSizeUpModalBtn()
    })
    it("Увеличить размер диска (Размер математические символи)", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickDiskSizeUpBtn()
        serverDisksPage.actions.writeDiskSizeUpModalTxt("+")
        serverDisksPage.actions.clickDiskSizeUpModalBtn()
    })
    it("[PD-121] Изменить тип диска с HDD на SSD когда на SSD не хватает лимитов", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickDiskChangeTypeBtn()
        serverDisksPage.actions.clickChangeDiskTypeSSDBtn()
        serverDisksPage.actions.isVisiblenoLimitsOfDiskLbl()
    })
    it("[PD-122] Изменить тип диска с SSD на HDD когда на HDD не хватает лимитов", () => {
        const diskName = "Test-Created-Disk2"
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverAction_page.actions.clickServerActionsBtn()
        cy.wait(2000)
        serverAction_page.actions.clickStopServerBtn()
        cy.wait(2000)
        try {
            serverAction_page.actions.isServerStoppedStatus()
        } catch {
            cy.wait(30000)
            serverAction_page.actions.isServerStoppedStatus()
        }
        serverDisksPage.actions.clickServerDisksTab()

        serverDisksPage.actions.clickAddNewServerDiskBtn()
        serverDisksPage.actions.writeNewDiskNameTxt(diskName)
        serverDisksPage.actions.clickChangeDiskTypeSSDBtnInAddDiskModal()
        serverDisksPage.actions.writeNewDiskSizeTxt(500)
        serverDisksPage.actions.clickConfirmNewDiskBtn()
        serverDisksPage.actions.checkCreateDiskAPI(diskName)
        serverDisksPage.actions.isVisibleCreatedDisk(diskName)

        serverDisksPage.actions.clickDiskChangeTypeBtn2ndRow()
        serverDisksPage.actions.clickChangeDiskTypeHDDBtn()
        serverDisksPage.actions.isVisiblenoLimitsOfDiskLbl()
        serverDisksPage.actions.clickModalCloseBtn()
        serverDisksPage.actions.clickDeleteDiskBtn2()
        serverDisksPage.actions.clickConfDeleteBtn()
    })
    it("Удалить диск", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickDeleteDiskBtn()
        serverDisksPage.actions.clickConfDeleteBtn()
    })
})