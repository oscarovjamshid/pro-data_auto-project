class BackUpSingle {
    elements = {
        servers_icon: () => cy.get('a[href="/cabinet/servers"]'),
        server_titleLbl: (id, title) => cy.get(`tbody > :nth-child(${id + 1}) > :nth-child(1)`).contains('td', title),
        isVisibleBackupTxt: () => cy.contains('td', 'TesterUchun').last(),
        isVisibleBackupTxt2: () => cy.contains('span', 'Test-Server').last(),
        backup2DeleteBackupBtn: () => cy.get('[qa-element="delete-0-show"]'),
        backup2RestoreBtn: () => cy.get('[qa-element="restore-0-show"]'),
        backup2RestoreConfirmBtn: () => cy.get('[qa-element="restore-submit"]'),
        backup2DeleteConfirmBtn: () => cy.get('[qa-element="delete-submit"]')
    }

    actions = {
        checkServerList2: () => {
            cy.wait('@backupListRequest').then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body).to.have.property('data');
                expect(interception.response.body.data).to.have.property('backups');
                const serverList = interception.response.body.data.backups
                for(let i = 0; i < serverList.length; i++){
                    this.elements.server_titleLbl(i, serverList[i].vmName)
                    this.elements.server_idLbl(i, serverList[i].id)
                }
            });
        },
        isVisibleShowTxt: () => {
            this.elements.isVisibleBackupTxt().should('be.visible')
        },
        isVisibleShowTxt2: () => {
            this.elements.isVisibleBackupTxt2().should('be.visible')
        },
        clickDeleteBackup2Btn: () => {
            this.elements.backup2DeleteBackupBtn().click()
        },
        clickRestoreBackup2Btn: () => {
            this.elements.backup2RestoreBtn().click()
        },
        clickRestoreConfirmBtnFn: () => {
            this.elements.backup2RestoreConfirmBtn().click()
        },
        clickDeleteBackup2ConfirmBtn: () => {
            this.elements.backup2DeleteConfirmBtn().click()
        }
    }
}

module.exports = new BackUpSingle();
