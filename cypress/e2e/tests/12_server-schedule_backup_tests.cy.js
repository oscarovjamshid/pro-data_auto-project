cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import server_page from "../pages/server_page";
import sidebar from "../pages/sidebar";
import localNetworks_page from "../pages/localNetworks_page";
import backup_page from "../pages/backup_page";
import backupSchedule_page from "../pages/backup-schedule_page";

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
    it('PD-81 Добавить расписание (С Час)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        backupSchedule_page.actions.clickBackupScheduleTxt()
        backupSchedule_page.actions.isVisibleAddScheduleBtn()
        backupSchedule_page.actions.clickAddscheduleBtn()
        backupSchedule_page.actions.enterBackupScheduleNameTxt("TestBackupTime")
        backupSchedule_page.actions.clickBackupScheduleDataInp()
        backupSchedule_page.actions.clickBackupScheduleTime()
        backupSchedule_page.actions.clickBackupscheduleVerificationBtn()
        //backupSchedule_page.actions.backupkscheduleSuccessAdd()
        cy.reload()
        cy.wait(10000)
        cy.reload()
        backupSchedule_page.actions.clickBackupscheduleDeleteBtn()
        backupSchedule_page.actions.clickBackupScheduleDeleteVerificationBtn()
        backupSchedule_page.actions.isNotVisibleBackupScheduleDeleteBtn()

    })
    it('PD-82 Добавить расписание (С День)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        backupSchedule_page.actions.clickBackupScheduleTxt()
        backupSchedule_page.actions.isVisibleAddScheduleBtn()
        backupSchedule_page.actions.clickAddscheduleBtn()
        backupSchedule_page.actions.enterBackupScheduleNameTxt("TestBackupD")
        backupSchedule_page.actions.clickBackupScheduleDataInp()
        backupSchedule_page.actions.clickBackupScheduleDay()
        backupSchedule_page.actions.clickBackupscheduleVerificationBtn()
        //backupSchedule_page.actions.backupkscheduleSuccessAdd()
        cy.reload()
        cy.wait(10000)
        cy.reload()
        backupSchedule_page.actions.clickBackupscheduleDeleteBtn()
        backupSchedule_page.actions.clickBackupScheduleDeleteVerificationBtn()
        backupSchedule_page.actions.isNotVisibleBackupScheduleDeleteBtn()

    })
    it('PD-83 Добавить расписание (С Неделя)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        backupSchedule_page.actions.clickBackupScheduleTxt()
        backupSchedule_page.actions.isVisibleAddScheduleBtn()
        backupSchedule_page.actions.clickAddscheduleBtn()
        backupSchedule_page.actions.enterBackupScheduleNameTxt("TestBackupN")
        backupSchedule_page.actions.clickBackupScheduleDataInp()
        backupSchedule_page.actions.clickBackupScheduleWeek()
        backupSchedule_page.actions.clickBackupscheduleVerificationBtn()
        //backupSchedule_page.actions.backupkscheduleSuccessAdd()
        cy.reload()
        cy.wait(10000)
        cy.reload()
        backupSchedule_page.actions.clickBackupscheduleDeleteBtn()
        backupSchedule_page.actions.clickBackupScheduleDeleteVerificationBtn()
        backupSchedule_page.actions.isNotVisibleBackupScheduleDeleteBtn()

    })
    it('PD-84 Добавить расписание (С Месяц)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        backupSchedule_page.actions.clickBackupScheduleTxt()
        backupSchedule_page.actions.isVisibleAddScheduleBtn()
        backupSchedule_page.actions.clickAddscheduleBtn()
        backupSchedule_page.actions.enterBackupScheduleNameTxt("TestBackupTime")
        backupSchedule_page.actions.clickBackupScheduleDataInp()
        backupSchedule_page.actions.clickBackupScheduleMonth()
        backupSchedule_page.actions.clickBackupscheduleVerificationBtn()
        //backupSchedule_page.actions.backupkscheduleSuccessAdd()
        cy.reload()
        cy.wait(10000)
        cy.reload()
        backupSchedule_page.actions.clickBackupscheduleDeleteBtn()
        backupSchedule_page.actions.clickBackupScheduleDeleteVerificationBtn()
        backupSchedule_page.actions.isNotVisibleBackupScheduleDeleteBtn()

    })
    it('PD-85 Добавить расписание (С Год)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        backupSchedule_page.actions.clickBackupScheduleTxt()
        backupSchedule_page.actions.isVisibleAddScheduleBtn()
        backupSchedule_page.actions.clickAddscheduleBtn()
        backupSchedule_page.actions.enterBackupScheduleNameTxt("TestBackupLastYear")
        backupSchedule_page.actions.clickBackupScheduleDataInp()
        backupSchedule_page.actions.clickBackupScheduleYear()
        backupSchedule_page.actions.clickYearSelectLastLbl()
        backupSchedule_page.actions.clickLastMonthData()
        backupSchedule_page.actions.clickLastYearDataLbl()
        backupSchedule_page.actions.clickLastYearDataLbl()
        backupSchedule_page.actions.clickBackupscheduleVerificationBtn()
        //backupSchedule_page.actions.backupkscheduleSuccessAdd()
        cy.reload()
        cy.wait(10000)
        cy.reload()
        backupSchedule_page.actions.clickBackupscheduleDeleteBtn()
        backupSchedule_page.actions.clickBackupScheduleDeleteVerificationBtn()
        backupSchedule_page.actions.isNotVisibleBackupScheduleDeleteBtn()

    })
    it('PD-86 Добавить расписание (С Без названия)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        backupSchedule_page.actions.clickBackupScheduleTxt()
        backupSchedule_page.actions.isVisibleAddScheduleBtn()
        backupSchedule_page.actions.clickAddscheduleBtn()
        backupSchedule_page.actions.IsNotClickDisabledBtn()

    })
    it('PD-87 Добавить ежедневное расписание с одинаковым временем выполнения', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        server_page.actions.checkServerPageLbl()
        localNetworks_page.actions.checkServerStatusStopped3()
        backupSchedule_page.actions.clickBackupScheduleTxt()
        backupSchedule_page.actions.isVisibleAddScheduleBtn()
        backupSchedule_page.actions.clickAddscheduleBtn()
        backupSchedule_page.actions.enterBackupScheduleNameTxt("TestBackup")
        backupSchedule_page.actions.clickBackupScheduleDataInp() //clicking Recurring dropdown-list
        backupSchedule_page.actions.clickBackupScheduleTime() // selecting Hour option
        backupSchedule_page.actions.clickBackupscheduleVerificationBtn()
        //backupSchedule_page.actions.backupkscheduleSuccessAdd()
        cy.wait(2000)
        backupSchedule_page.actions.isVisibleAddScheduleBtn()
        backupSchedule_page.actions.clickAddscheduleBtn()
        backupSchedule_page.actions.enterBackupScheduleNameTxt("TestBackup")
        backupSchedule_page.actions.clickBackupScheduleDataInp()
        backupSchedule_page.actions.clickBackupScheduleTime()
        backupSchedule_page.actions.clickBackupscheduleVerificationBtn()
        backupSchedule_page.actions.isVisibleScheduleErrorText()
        backupSchedule_page.actions.clickModalBurgerClosedBtn()
        backupSchedule_page.actions.clickBackupscheduleDeleteBtn()
        backupSchedule_page.actions.clickBackupScheduleDeleteVerificationBtn()
        cy.reload()
        cy.wait(2000)
        backupSchedule_page.actions.isNotVisibleBackupScheduleDeleteBtn()
    })
})
