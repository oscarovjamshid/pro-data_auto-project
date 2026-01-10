cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
const { faker } = require('@faker-js/faker');
import server_page from "../pages/server_page";
import sidebar from "../pages/sidebar";
import serverlist_page from "../pages/server-list_page";
import serverDisksPage from "../pages/server-disks-page";
import serverAction_page from "../pages/server-action_page";

describe('6.Servers - Disks tab Part1', () => {
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
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/disk/${configData.test_server_id}/linkDisk/${configData.test_disk_id}`).as('linkDisk');
    })
    it("Добавить диск", () => {
        const diskName = "Test-Created-Disk"
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAddNewServerDiskBtn()
        serverDisksPage.actions.writeNewDiskNameTxt(diskName)
        serverDisksPage.actions.clickDiskTypeHDDBtn()
        serverDisksPage.actions.writeNewDiskSizeTxt(500)
        serverDisksPage.actions.clickConfirmNewDiskBtn()
        //serverDisksPage.actions.checkCreateDiskAPI(diskName)
        serverDisksPage.actions.isVisibleCreatedDisk(diskName)
    })
    it("Добавить диск (неправильное называние)", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAddNewServerDiskBtn()
        serverDisksPage.actions.writeNewDiskNameTxt("3124№21!")
        serverDisksPage.actions.clickDiskTypeHDDBtn()
        serverDisksPage.actions.writeNewDiskSizeTxt(15)
    })
    it("Добавить диск (пустое называние)", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAddNewServerDiskBtn()
        serverDisksPage.actions.clickDiskTypeHDDBtn()
        serverDisksPage.actions.writeNewDiskSizeTxt(15)
        serverDisksPage.actions.clickConfirmNewDiskBtn()
        serverDisksPage.actions.checkNewDiskNameErrorLbl("Обязательное поле")
    })
    it("Добавить диск (Размер превышает лимит)", () => {
        const diskName = faker.lorem.word() + Math.round(Math.random() * 10000)
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAddNewServerDiskBtn()
        serverDisksPage.actions.writeNewDiskNameTxt(diskName)
        serverDisksPage.actions.clickDiskTypeHDDBtn()
        serverDisksPage.actions.writeNewDiskSizeTxt(15000000)
        serverDisksPage.actions.clickConfirmNewDiskBtn()
        serverDisksPage.actions.checkNewDiskSizeErrorLbl("Для расширения ограничения обратитесь в техническую поддержку Pro-Data")
    })
    it("Добавить диск (Размер негативное число)", () => {
        const diskName = faker.lorem.word() + Math.round(Math.random() * 10000)
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        cy.wait(1000)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAddNewServerDiskBtn()
        serverDisksPage.actions.writeNewDiskNameTxt(diskName)
        serverDisksPage.actions.clickDiskTypeHDDBtn()
        serverDisksPage.actions.writeNewDiskSizeTxt(-100)
    })
    it("Добавить диск (Размер математические символы)", () => {
        const diskName = faker.lorem.word() + Math.round(Math.random() * 10000)
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAddNewServerDiskBtn()
        serverDisksPage.actions.writeNewDiskNameTxt(diskName)
        serverDisksPage.actions.clickDiskTypeHDDBtn()
        serverDisksPage.actions.writeNewDiskSizeTxt("+")
        serverDisksPage.actions.clickConfirmNewDiskBtn()
        serverDisksPage.actions.checkNewDiskSizeErrorLbl("Вне пределов допустимого лимита")
    })
    it("Удалить диск (когда сервер не остановлен)", () => {
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
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.isDeleteBtnDisabled()
    })
    it("Добавить диск когда сервер не остановлен", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.checkAddNewDiskServerBtnIsDisabled()
    })
    it("Привязать Диск (для этого должен быть в наличии свободный глобальный диск)", () => {
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
        serverDisksPage.actions.clickConnectNewServerDiskBtn()
        cy.wait(1000)
        serverDisksPage.actions.clickConnectDiskSelector()
        serverDisksPage.actions.selectConnectDiskOption()
        serverDisksPage.actions.clickConnectDiskModalBtn()
        cy.wait(2000)
        //serverDisksPage.actions.checkLinkDiskAPI()
        serverDisksPage.actions.isVisibleCreatedDisk(configData.test_disk)
    })
    it("Привязать диск когда сервер не остановлен", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverAction_page.actions.clickServerActionsBtn()
        serverAction_page.actions.clickStartServerBtn()
        try {
            serverAction_page.actions.isRunningServer()
        } catch {
            cy.wait(30000)
            serverAction_page.actions.isRunningServer()
        }
    })
    it("Отвязать диск когда сервер не остановлен", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverAction_page.actions.isRunningServer()
        serverDisksPage.actions.isDiskDisconnectBtnDisabled()
    })
    it("Отвязать диск и убедиться, что он появился в разделе глобальных дисков", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverAction_page.actions.isRunningServer()
        serverAction_page.actions.clickServerActionsBtn()
        cy.wait(2000)
        serverAction_page.actions.clickStopServerBtn()
        cy.wait(2000)
        try {
            serverAction_page.actions.isServerStoppedStatus()
        } catch {
            cy.wait(35000)
            serverAction_page.actions.isServerStoppedStatus()
        }
        serverDisksPage.actions.clickDiskDisconnectBtn()
        serverDisksPage.actions.clickDisconnectDiskModalBtn()
    })
    it("[PD-702] Adding up to 10 HDD disks to VM", () => { //Test Cases 702 - 736 - 710
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()

        serverDisksPage.actions.getDiskCount().then((currentCount) => {
            const disksToAdd = 10 - currentCount;

            if (disksToAdd > 0) {
                for (let i = 1; i <= disksToAdd; i++) {
                    const diskNumber = currentCount + i;
                    serverDisksPage.actions.clickAddNewServerDiskBtn();
                    serverDisksPage.actions.writeNewDiskNameTxt(`HDD-${diskNumber}`);
                    serverDisksPage.actions.clickConfirmNewDiskBtn();
                }
            }
            cy.wait(2000);
            serverDisksPage.actions.isAddNewDiskBtnDisabled();      // After reaching 10, verify Add button is disabled
        });
    })
    it("[PD-711] Renaming any HHD disk out of 10 (invalid data - unsuccessful)", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAnyDiskChangeNameBtn("HDD-5")
        serverDisksPage.actions.clearTextInRenameDiskNameModal("")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkRenamedDiskNameContainsErrorLbl("Обязательное поле")
        serverDisksPage.actions.editDiskNameTxt("1234")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkRenamedDiskNameContainsErrorLbl("Неверное название")
        serverDisksPage.actions.editDiskNameTxt("!?/@,.#")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkRenamedDiskNameContainsErrorLbl("Неверное название")
        serverDisksPage.actions.editDiskNameTxt("ab")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkRenamedDiskNameContainsErrorLbl("Минимум 3 символа")
        serverDisksPage.actions.editDiskNameTxt("//йцйуф")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkRenamedDiskNameContainsErrorLbl("Неверное название")
    })
    it("[PD-705] Renaming any HDD disk out of 10 (successful)", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAnyDiskChangeNameBtn("HDD-5")
        serverDisksPage.actions.editDiskNameTxt("HDD-55")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkDiskUnderThisNameExists("HDD-55")
    })
    it("[PD-714] Changing any HHD disk out of 10 to SSD type", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAnyDiskChangeTypeBtn("HDD-55")
        serverDisksPage.actions.clickChangeDiskTypeSSDBtn()
        serverDisksPage.actions.clickChangeDiskTypeConfBtn()
        cy.wait(3000)
    })
    it("[PD-728] Marking any HDD disk out of 10 as a Boot Disk", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAnyDiskMarkAsBootBtn("HDD-6")
        serverDisksPage.actions.clickDiskmakeUploadConfirmBtn()
        cy.wait(2000)
        serverDisksPage.actions.IsMarkAsBootBtnOfDiskIsEnabled("Загрузочный диск")
        serverDisksPage.actions.IsMarkAsBootBtnOfDiskIsDisabled("HDD-6")
        serverDisksPage.actions.clickAnyDiskMarkAsBootBtn("Загрузочный диск")
        serverDisksPage.actions.clickDiskmakeUploadConfirmBtn()
        cy.wait(2000)
        serverDisksPage.actions.IsMarkAsBootBtnOfDiskIsDisabled("Загрузочный диск")
        serverDisksPage.actions.IsMarkAsBootBtnOfDiskIsEnabled("HDD-6")
    })
    it("[PD-731] Detach any HDD disk out of 10", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAnyDiskDetachBtn("HDD-6")
        serverDisksPage.actions.clickDisconnectDiskModalBtn()
        cy.wait(3000)
        serverDisksPage.actions.checkNvmeDiskNotExists("HDD-6")
        sidebar.actions.clickDisksIcon()
        serverDisksPage.actions.checkDiskUnderThisNameExists("HDD-6")
    })
    it("[PD-734] Attach any HDD disk to VM up to 10", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickConnectNewServerDiskBtn()
        serverDisksPage.actions.clickConnectDiskSelector()
        serverDisksPage.actions.selectAnyDiskInAttachDiskList("HDD-6")
        serverDisksPage.actions.clickConnectDiskModalBtn()
        cy.wait(2000)
        serverDisksPage.actions.checkDiskUnderThisNameExists("HDD-6")
    })
    it('[PD-708] Deleting any HDD disk out of 10 or all of them', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()

        const deleteHDDisks = () => {
            serverDisksPage.elements.diskListItems().then(($disks) => {   //  Re-query for disk items and filter for those containing 'HDD'
                const $hddDisks = $disks.filter((index, el) => Cypress.$(el).text().includes('HDD'));
                if ($hddDisks.length > 0) {
                    cy.wrap($hddDisks.first()).find('[qa-element="delete-disk-show"]').click();
                    serverDisksPage.actions.clickConfDeleteBtn();
                    cy.wait(1000);         // Wait for the UI to update and then call the function again, otherwise stale exception may happen
                    deleteHDDisks();
                }
            });
        };
        deleteHDDisks(); // Start the recursive deletion process
        serverDisksPage.elements.diskListItems().should('not.contain.text', 'HDD');   // Final check: make sure no HDD disks remain
    })
    it("[PD-703] Adding up to 10 SSD disks to VM", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()

        serverDisksPage.actions.getDiskCount().then((currentCount) => {
            const disksToAdd = 10 - currentCount;

            if (disksToAdd > 0) {
                for (let i = 1; i <= disksToAdd; i++) {
                    const diskNumber = currentCount + i;
                    serverDisksPage.actions.clickAddNewServerDiskBtn();
                    serverDisksPage.actions.clickChangeDiskTypeSSDBtnInAddDiskModal();
                    serverDisksPage.actions.writeNewDiskNameTxt(`SSD-${diskNumber}`);
                    serverDisksPage.actions.clickConfirmNewDiskBtn();
                }
            }
            cy.wait(2000);
            serverDisksPage.actions.isAddNewDiskBtnDisabled();      // After reaching 10, verify Add button is disabled
        });
    })
    it("[PD-712] Renaming any SSD disk out of 10 (invalid data - unsuccessful)", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAnyDiskChangeNameBtn("SSD-5")
        serverDisksPage.actions.clearTextInRenameDiskNameModal("")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkRenamedDiskNameContainsErrorLbl("Обязательное поле")
        serverDisksPage.actions.editDiskNameTxt("1234")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkRenamedDiskNameContainsErrorLbl("Неверное название")
        serverDisksPage.actions.editDiskNameTxt("!?/@,.#")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkRenamedDiskNameContainsErrorLbl("Неверное название")
        serverDisksPage.actions.editDiskNameTxt("ab")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkRenamedDiskNameContainsErrorLbl("Минимум 3 символа")
        serverDisksPage.actions.editDiskNameTxt("//йцйуф")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkRenamedDiskNameContainsErrorLbl("Неверное название")
    })
    it("[PD-706] Renaming any SSD disk out of 10 (successful)", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAnyDiskChangeNameBtn("SSD-5")
        serverDisksPage.actions.editDiskNameTxt("SSD-55")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkDiskUnderThisNameExists("SSD-55")
    })
    it("[PD-715] Changing any SSD disk out of 10 to HDD type", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAnyDiskChangeTypeBtn("SSD-55")
        serverDisksPage.actions.clickChangeDiskTypeHDDBtn()
        serverDisksPage.actions.clickChangeDiskTypeConfBtn()
        cy.wait(3000)
    })
    it("[PD-729] Marking any SSD disk out of 10 as a Boot Disk", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAnyDiskMarkAsBootBtn("SSD-6")
        serverDisksPage.actions.clickDiskmakeUploadConfirmBtn()
        cy.wait(2000)
        serverDisksPage.actions.IsMarkAsBootBtnOfDiskIsEnabled("Загрузочный диск")
        serverDisksPage.actions.IsMarkAsBootBtnOfDiskIsDisabled("SSD-6")
        serverDisksPage.actions.clickAnyDiskMarkAsBootBtn("Загрузочный диск")
        serverDisksPage.actions.clickDiskmakeUploadConfirmBtn()
        cy.wait(2000)
        serverDisksPage.actions.IsMarkAsBootBtnOfDiskIsDisabled("Загрузочный диск")
        serverDisksPage.actions.IsMarkAsBootBtnOfDiskIsEnabled("SSD-6")
    })
    it("[PD-732] Detach any SSD disk out of 10", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAnyDiskDetachBtn("SSD-6")
        serverDisksPage.actions.clickDisconnectDiskModalBtn()
        cy.wait(3000)
        serverDisksPage.actions.checkNvmeDiskNotExists("SSD-6")
        sidebar.actions.clickDisksIcon()
        serverDisksPage.actions.checkDiskUnderThisNameExists("SSD-6")
    })
    it("[PD-735] Attach any SSD disk to VM up to 10", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickConnectNewServerDiskBtn()
        serverDisksPage.actions.clickConnectDiskSelector()
        serverDisksPage.actions.selectAnyDiskInAttachDiskList("SSD-6")
        serverDisksPage.actions.clickConnectDiskModalBtn()
        cy.wait(2000)
        serverDisksPage.actions.checkDiskUnderThisNameExists("SSD-6")
    })
    it('[PD-709] Deleting any SSD disk out of 10 or all of them', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()

        const deleteSSDDisks = () => {
            serverDisksPage.elements.diskListItems().then(($disks) => {   //  Re-query for disk items and filter for those containing 'SSD'
                const $ssdDisks = $disks.filter((index, el) => Cypress.$(el).text().includes('SSD'));
                if ($ssdDisks.length > 0) {
                    cy.wrap($ssdDisks.first()).find('[qa-element="delete-disk-show"]').click();
                    serverDisksPage.actions.clickConfDeleteBtn();
                    cy.wait(1000);         // Wait for the UI to update and then call the function again, otherwise stale exception may happen
                    deleteSSDDisks();
                }
            });
        };
        deleteSSDDisks(); // Start the recursive deletion process
        serverDisksPage.elements.diskListItems().should('not.contain.text', 'SSD');   // Final check: make sure no SSD disks remain
    })
    it("[PD-704] Adding up to 10 NVME disks to VM", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()

        serverDisksPage.actions.getDiskCount().then((currentCount) => {
            const disksToAdd = 10 - currentCount;

            if (disksToAdd > 0) {
                for (let i = 1; i <= disksToAdd; i++) {
                    const diskNumber = currentCount + i;
                    serverDisksPage.actions.clickAddNewServerDiskBtn();
                    serverDisksPage.actions.clickDiskTypeNVMEBtn();
                    serverDisksPage.actions.writeNewDiskNameTxt(`NVME-${diskNumber}`);
                    serverDisksPage.actions.clickConfirmNewDiskBtn();
                }
            }
            cy.wait(2000);
            serverDisksPage.actions.isAddNewDiskBtnDisabled();      // After reaching 10, verify Add button is disabled
        });
    })
    it("[PD-713] Renaming any NVME disk out of 10 (invalid data - unsuccessful)", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAnyDiskChangeNameBtn("NVME-5")
        serverDisksPage.actions.clearTextInRenameDiskNameModal("")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkRenamedDiskNameContainsErrorLbl("Обязательное поле")
        serverDisksPage.actions.editDiskNameTxt("1234")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkRenamedDiskNameContainsErrorLbl("Неверное название")
        serverDisksPage.actions.editDiskNameTxt("!?/@,.#")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkRenamedDiskNameContainsErrorLbl("Неверное название")
        serverDisksPage.actions.editDiskNameTxt("ab")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkRenamedDiskNameContainsErrorLbl("Минимум 3 символа")
        serverDisksPage.actions.editDiskNameTxt("//йцйуф")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkRenamedDiskNameContainsErrorLbl("Неверное название")
    })
    it("[PD-707] Renaming any NVME disk out of 10 (successful)", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAnyDiskChangeNameBtn("NVME-5")
        serverDisksPage.actions.editDiskNameTxt("NVME-55")
        serverDisksPage.actions.clickConfirmBtnInRenameModal()
        serverDisksPage.actions.checkDiskUnderThisNameExists("NVME-55")
    })
    it("[PD-730] Marking any NVME disk out of 10 as a Boot Disk", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAnyDiskMarkAsBootBtn("NVME-6")
        serverDisksPage.actions.clickDiskmakeUploadConfirmBtn()
        cy.wait(2000)
        serverDisksPage.actions.IsMarkAsBootBtnOfDiskIsEnabled("Загрузочный диск")
        serverDisksPage.actions.IsMarkAsBootBtnOfDiskIsDisabled("NVME-6")
        serverDisksPage.actions.clickAnyDiskMarkAsBootBtn("Загрузочный диск")
        serverDisksPage.actions.clickDiskmakeUploadConfirmBtn()
        cy.wait(2000)
        serverDisksPage.actions.IsMarkAsBootBtnOfDiskIsDisabled("Загрузочный диск")
        serverDisksPage.actions.IsMarkAsBootBtnOfDiskIsEnabled("NVME-6")
    })
    it("[PD-733] Detach any NVME disk out of 10", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickAnyDiskDetachBtn("NVME-6")
        serverDisksPage.actions.clickDisconnectDiskModalBtn()
        cy.wait(3000)
        serverDisksPage.actions.checkNvmeDiskNotExists("NVME-6")
        sidebar.actions.clickDisksIcon()
        serverDisksPage.actions.checkDiskUnderThisNameExists("NVME-6")
    })
    it("[PD-736] Attach any NVME disk to VM up to 10", () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()
        serverDisksPage.actions.clickConnectNewServerDiskBtn()
        serverDisksPage.actions.clickConnectDiskSelector()
        serverDisksPage.actions.selectAnyDiskInAttachDiskList("NVME-6")
        serverDisksPage.actions.clickConnectDiskModalBtn()
        cy.wait(2000)
        serverDisksPage.actions.checkDiskUnderThisNameExists("NVME-6")
    })
    it('[PD-710] Deleting any NVME disk out of 10 or all of them', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        serverDisksPage.actions.clickServerDisksTab()

        const deleteNVMEDisks = () => {
            serverDisksPage.elements.diskListItems().then(($disks) => {   //  Re-query for disk items and filter for those containing 'NVME'
                const $nvmeDisks = $disks.filter((index, el) => Cypress.$(el).text().includes('NVME'));
                if ($nvmeDisks.length > 0) {
                    cy.wrap($nvmeDisks.first()).find('[qa-element="delete-disk-show"]').click();
                    serverDisksPage.actions.clickConfDeleteBtn();
                    cy.wait(1000);         // Wait for the UI to update and then call the function again, otherwise stale exception may happen
                    deleteNVMEDisks();
                }
            });
        };
        deleteNVMEDisks(); // Start the recursive deletion process
        serverDisksPage.elements.diskListItems().should('not.contain.text', 'NVME');   // Final check: make sure no NVME disks remain
    })
})


