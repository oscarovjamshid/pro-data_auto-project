class Backup {
    elements = {
        backup_navigatePageTxt: () => cy.get('[qa-element="tab-3"]'),
        backup_createNewBackupBtn: () => cy.get('[qa-element="create-backup"]'),
        backup_enterBackupInp: () => cy.get('[qa-element="backup-name"]'),
        backup_createVerifiedBtn: () => cy.get('[qa-element="create-backup-submit"]'),
        backup_progressCard: () => cy.get('.progress-bar-custom'), //qa-element is needed
        backup_deleteBtn: () => cy.get('[qa-element="backup-delete-show"]'),
        backup_successStatusTxt: (text) => (timeout = 180000) => cy.contains('tr', text, { timeout }),
        backup_vostanovitBtn: () => cy.get('[qa-element="show-backup-restore"]'),        
        backup_restoreBtn: () => cy.get('[qa-element="restore-show"]'),
        backup_reStoreConfirmBtn: () => cy.get('[qa-element="restore-submit"]'),
        backup_StoppedServerBtn: () => cy.get('[qa-element="vm-action-6"]'),
        backup_RunningServerBtn: () => cy.get('[qa-element="vm-action-0"]'),
        backup_DeleteConfirmBtn: () => cy.get('[qa-element="backup-delete-0-submit"]'),
        backup_DeleteSucBtn: () => cy.get('[qa-element="backup-delete-submit"]'),
        backup_RestoreAsVMBtn: () => cy.get('[qa-element="newVm"]'),
        backup_statusInVmGrid: (text) => cy.get('.vm-table').contains('tr', text).find('[qa-element="vm-status"]'),
    }
    actions = {
        clickBackupTab: () => {
            this.elements.backup_navigatePageTxt().click()
        },
        isVisibleCreateNewBackupBtn: () => {
            this.elements.backup_createNewBackupBtn().should('be.visible')
        },
        clickCreateBackup: () => {
            this.elements.backup_createNewBackupBtn().click()
        },
        enterBackupNameInp: (text) => {
            this.elements.backup_enterBackupInp().clear().type(text)
        },
        clickVerifiedBackupCreateBtn: () => {
            this.elements.backup_createVerifiedBtn().click()
        },
        waitForBackupSuccess: (text, timeout = 180000) => {
            this.elements.backup_successStatusTxt(text)(timeout).should('be.visible')
        },
        isVisibleProgressBar: () => {
            this.elements.backup_progressCard().should('be.visible')
        },
        isDisabledCreateBtn: () => {
            this.elements.backup_createVerifiedBtn().should('be.disabled')
        },
        isNotVisibleProgressBar: () => {
            this.elements.backup_progressCard().should('not.be.visible')
        },
        clickDeleteBackupBtn: () => {
            this.elements.backup_deleteBtn().click()
        },
        isVisibleBackupDeleteBtn: () => {
            this.elements.backup_deleteBtn().should('be.visible')
        },
        isNotVisibleBackupDeleteBtn: () => {
            this.elements.backup_deleteBtn().should('not.exist');
        },
        isVisibleSuccessAddbackup: () => {
            this.elements.backup_deleteBtn().should('be.visible');
        },
        clickBackupRestoreBtn: () => {
            this.elements.backup_vostanovitBtn().click()
        },
        clickBackupRestoreBtn: () => {
            this.elements.backup_restoreBtn().click()
        },
        clickBackupRestoreConfirmBtn: () => {
            this.elements.backup_reStoreConfirmBtn().click()
        },
        clickServerStoppedBtn: () => {
            this.elements.backup_StoppedServerBtn().click()
        },
        clickServerRunningBtn: () => {
            this.elements.backup_RunningServerBtn().click()
        },
        clickDeleteBackupConfirmBtn: () => {
            this.elements.backup_DeleteConfirmBtn().click()
        },
        clickDeleteBackupSuccessBtn1: () => {
            this.elements.backup_DeleteSucBtn().click()
        },
        clickRestoreAsVMBtn: () => {
            this.elements.backup_RestoreAsVMBtn().click()
        },
        isVisibleStatusInVmGrid: (text) => {
            this.elements.backup_statusInVmGrid(text).should('be.visible')
        }
        // backupkSuccessDeleteTxt: () => {
        //     cy.wait('@successDeleteBackup', { timeout: 10000 }).then((interception) => {
        //         expect(interception.response.statusCode).to.eq(200);
        //     });
        // },
    }
}
module.exports = new Backup()