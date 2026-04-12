cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import server_page from "../pages/server_page";
import sidebar from "../pages/sidebar";
import backupSchedule_page from "../pages/backup-schedule_page";
import serverlist_page from "../pages/server-list_page";

describe('12.Servers - Schedule Backup tab', () => {
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
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/${configData.test_server_id}/nets/3351/edit`).as('networkIpEditSuccess');
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/${configData.test_server_id}/linkPublicNet`).as('publicIpSuccessAdd');
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/${configData.test_server_id}/linkPublicNet`).as('publicIpInValidAdd');
        cy.intercept('POST', `${configData.base_url}panel-main/api/panel/vm/${configData.test_server_id}/backupScheduled`).as('backupScheduleAdd');
    })
    it('PD-81 Add scheduled backup (Hourly)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        backupSchedule_page.actions.clickBackupScheduleTab()
        backupSchedule_page.actions.isVisibleAddScheduleBtn()
        backupSchedule_page.actions.clickAddscheduleBtn()
        backupSchedule_page.actions.enterBackupScheduleNameTxt("Test-hourly-backup")
        backupSchedule_page.actions.clickBackupScheduleDataInp()
        backupSchedule_page.actions.clickBackupHourlyScheduleTime()
        backupSchedule_page.actions.clickBackupscheduleVerificationBtn()
        backupSchedule_page.actions.clickBackupscheduleDeleteBtn()
        backupSchedule_page.actions.clickBackupScheduleDeleteVerificationBtn()
        backupSchedule_page.actions.isNotVisibleBackupScheduleDeleteBtn()
    })
    it('PD-82 Add scheduled backup (Daily)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        backupSchedule_page.actions.clickBackupScheduleTab()
        backupSchedule_page.actions.isVisibleAddScheduleBtn()
        backupSchedule_page.actions.clickAddscheduleBtn()
        backupSchedule_page.actions.enterBackupScheduleNameTxt("Test-daily-backup")
        backupSchedule_page.actions.clickBackupScheduleDataInp()
        backupSchedule_page.actions.clickBackupScheduleDaily()
        backupSchedule_page.actions.clickBackupscheduleVerificationBtn()
        backupSchedule_page.actions.clickBackupscheduleDeleteBtn()
        backupSchedule_page.actions.clickBackupScheduleDeleteVerificationBtn()
        backupSchedule_page.actions.isNotVisibleBackupScheduleDeleteBtn()
    })
    it('PD-83 Add scheduled backup (Weekly)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        backupSchedule_page.actions.clickBackupScheduleTab()
        backupSchedule_page.actions.isVisibleAddScheduleBtn()
        backupSchedule_page.actions.clickAddscheduleBtn()
        backupSchedule_page.actions.enterBackupScheduleNameTxt("Test-weekly-backup")
        backupSchedule_page.actions.clickBackupScheduleDataInp()
        backupSchedule_page.actions.clickBackupScheduleWeekly()
        backupSchedule_page.actions.clickBackupscheduleVerificationBtn()
        backupSchedule_page.actions.clickBackupscheduleDeleteBtn()
        backupSchedule_page.actions.clickBackupScheduleDeleteVerificationBtn()
        backupSchedule_page.actions.isNotVisibleBackupScheduleDeleteBtn()
    })
    it('PD-84 Add scheduled backup (Monthly)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        backupSchedule_page.actions.clickBackupScheduleTab()
        backupSchedule_page.actions.isVisibleAddScheduleBtn()
        backupSchedule_page.actions.clickAddscheduleBtn()
        backupSchedule_page.actions.enterBackupScheduleNameTxt("Test-monthly-backup")
        backupSchedule_page.actions.clickBackupScheduleDataInp()
        backupSchedule_page.actions.clickBackupScheduleMonthly()
        backupSchedule_page.actions.clickBackupscheduleVerificationBtn()
        backupSchedule_page.actions.clickBackupscheduleDeleteBtn()
        backupSchedule_page.actions.clickBackupScheduleDeleteVerificationBtn()
        backupSchedule_page.actions.isNotVisibleBackupScheduleDeleteBtn()
    })
    it('PD-85 Add scheduled backup (Yearly)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        backupSchedule_page.actions.clickBackupScheduleTab()
        backupSchedule_page.actions.isVisibleAddScheduleBtn()
        backupSchedule_page.actions.clickAddscheduleBtn()
        backupSchedule_page.actions.enterBackupScheduleNameTxt("Test-yearly-backup")
        backupSchedule_page.actions.clickBackupScheduleDataInp()
        backupSchedule_page.actions.clickBackupScheduleYearly()
        backupSchedule_page.actions.clickBackupscheduleVerificationBtn()
        backupSchedule_page.actions.clickLastMonthCalendarArrowBtn()
        backupSchedule_page.actions.clickBackupscheduleDeleteBtn()
        backupSchedule_page.actions.clickBackupScheduleDeleteVerificationBtn()
        backupSchedule_page.actions.isNotVisibleBackupScheduleDeleteBtn()
    })
    it('PD-86 Add scheduled backup (Without name)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        backupSchedule_page.actions.clickBackupScheduleTab()
        backupSchedule_page.actions.isVisibleAddScheduleBtn()
        backupSchedule_page.actions.clickAddscheduleBtn()
        backupSchedule_page.actions.IsNotClickDisabledBtn()
    })
    it('PD-87 Add scheduled backup (With duplicate name)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        serverlist_page.actions.searchServer(configData.test_server_name)
        serverlist_page.actions.isVisibleSearchTxtServer(configData.test_server_name)
        serverlist_page.actions.clickServerCard(configData.test_server_name)
        serverlist_page.actions.isVisibleServerDetail(configData.test_server_name)
        backupSchedule_page.actions.clickBackupScheduleTab()
        backupSchedule_page.actions.isVisibleAddScheduleBtn()
        backupSchedule_page.actions.clickAddscheduleBtn()
        backupSchedule_page.actions.enterBackupScheduleNameTxt("TestBackup")
        backupSchedule_page.actions.clickBackupScheduleDataInp() //clicking Recurring dropdown-list
        backupSchedule_page.actions.clickBackupHourlyScheduleTime()
        backupSchedule_page.actions.clickBackupscheduleVerificationBtn()
        backupSchedule_page.actions.isVisibleAddScheduleBtn()
        backupSchedule_page.actions.clickAddscheduleBtn()
        backupSchedule_page.actions.enterBackupScheduleNameTxt("TestBackup")
        backupSchedule_page.actions.clickBackupScheduleDataInp()
        backupSchedule_page.actions.clickBackupHourlyScheduleTime()
        backupSchedule_page.actions.clickBackupscheduleVerificationBtn()
        // backupSchedule_page.actions.isVisibleScheduleErrorText() qa-element is needed for error message
        // backupSchedule_page.actions.clickModalBurgerClosedBtn() qa-element is needed for close button or Cancel btn either is ok
        // backupSchedule_page.actions.clickBackupscheduleDeleteBtn()
        // backupSchedule_page.actions.isNotVisibleBackupScheduleDeleteBtn()
    })
})
