class BackupSchedule {
    elements = {
        backupSchedule_navigatePageTxt: () => cy.get('[qa-element="tab-5"]'),
        backupSchedule_AddScheduleBtn: () => cy.get('[qa-element="add-schedule"]'),
        backupSchedule_dataLbl: () => cy.get('[qa-element="cron-period-open"]'),
        backupSchedule_timeLbl: () => cy.get('[qa-element="cron-period-0"]'),
        backupSchedule_verificationBtn: () => cy.get('[qa-element="backup-create"]'),
        backupSchedule_deleteBtn: () => cy.get('[qa-element="delete-schedule-show"]').first(),
        backupSchedule_deleteVerificationBtn: () => cy.get('[qa-element="delete-schedule-submit"]'),
        backupSchedule_dayLbl: () => cy.get('[qa-element="cron-period-1"]'),
        backupSchedule_weekLbl: () => cy.get('[qa-element="cron-period-2"]'),
        backupSchedule_monthLbl: () => cy.get('[qa-element="cron-period-3"]'),
        backupSchedule_inValidMessage: () => cy.get('[qa-element="schedule-name-error"]').first(),
        backupSchedule_modalBurgerBtn: () => cy.get('.btn-close'),
        backupSchedule_yearLbl: () => cy.get('[qa-element="cron-period-4"]'),
        backupSchedule_enterNameBackup: () => cy.get('[qa-element="backup-schedule-name"]'),
        backupSchedule_clickMonthDataLbl: () => cy.get('[qa-element="day-of-month-option-open"]'),
        backupSchedule_lastSelectMonthLbl: () => cy.get('[qa-element="day-of-month-option-0"]'),
        backupSchedule_clickYearDataLbl: () => cy.get('[qa-element="month-option-open"]'),
        backupSchedule_SelectMonthDataLbl: () => cy.get('[qa-element="month-option-4"]'),
        scheduleErrorTxt: () => cy.get('[qa-element="schedule-name-error"]'),

    }
    actions = {
        clickBackupScheduleTxt: () => {
            this.elements.backupSchedule_navigatePageTxt().click()
        },
        isVisibleAddScheduleBtn: () => {
            this.elements.backupSchedule_AddScheduleBtn().should("be.visible")
        },
        clickAddscheduleBtn: () => {
            this.elements.backupSchedule_AddScheduleBtn().click()
        },
        clickBackupScheduleDataInp: () => {
            this.elements.backupSchedule_dataLbl().click()
        },
        clickBackupScheduleTime: () => {
            this.elements.backupSchedule_timeLbl().click()
        },
        clickBackupscheduleVerificationBtn: () => {
            this.elements.backupSchedule_verificationBtn().click()
        },
        backupkscheduleSuccessAdd: () => {
            cy.wait('@backupScheduleAdd', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
            });
        },
        clickBackupscheduleDeleteBtn: () => {
            this.elements.backupSchedule_deleteBtn().click()
        },
        clickBackupScheduleDeleteVerificationBtn: () => {
            this.elements.backupSchedule_deleteVerificationBtn().click()
        },
        isNotVisibleBackupScheduleDeleteBtn: () => {
            this.elements.backupSchedule_verificationBtn().should("not.exist")
        },
        clickBackupScheduleDay: () => {
            this.elements.backupSchedule_dayLbl().click()
        },
        clickBackupScheduleWeek: () => {
            this.elements.backupSchedule_weekLbl().click()
        },
        clickBackupScheduleMonth: () => {
            this.elements.backupSchedule_monthLbl().click()
        },
        clickBackupScheduleYear: () => {
            this.elements.backupSchedule_yearLbl().click()
        },
        IsNotClickDisabledBtn: () => {
            this.elements.backupSchedule_verificationBtn().should('be.disabled')
        },
        IsVisibleInValidScheduleMessagetxt: () => {
            this.elements.backupSchedule_inValidMessage().should("be.visible")
        },
        clickModalBurgerClosedBtn: () => {
            this.elements.backupSchedule_modalBurgerBtn().click()
        },
        enterBackupScheduleNameTxt: (text) => {
            this.elements.backupSchedule_enterNameBackup().clear().type(text)
        },
        clickYearSelectLastLbl: () => {
            this.elements.backupSchedule_clickMonthDataLbl().click()
        },
        clickLastMonthData: () => {
            this.elements.backupSchedule_lastSelectMonthLbl().click()
        },
        clickLastYearDataLbl: () => {
            this.elements.backupSchedule_clickYearDataLbl().click()
        },
        clickSelectLastMonthDataLbl: () => {
            this.elements.backupSchedule_SelectMonthDataLbl().click()
        },
        isVisibleScheduleErrorText: () => {
            this.elements.scheduleErrorTxt().should('be.visible')
        }
    }
}
module.exports = new BackupSchedule()