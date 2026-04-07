class ServerActions {
    elements = {
        serverActionsBtn: () => cy.get('[qa-element="vm-action"]'), //vm-action
        serverStatusLbl: () => cy.get('[qa-element="vm-status"]'), //vm-status-badge

        serverStartBtn: () => cy.get('[qa-element="vm-action-0"]').contains('Запуск'), //vm-action-0
        serverTurnOffBtn: () => cy.get('[qa-element="vm-action-5"]').contains('Выключить'), //vm-action-5
        serverStopBtn: () => cy.get('[qa-element="vm-action-6"]').contains('Остановить'), //vm-action-6
        serverRestartBtn: () => cy.get('[qa-element="vm-action-1"]').contains('Перезагрузить'),//vm-action-1
        serverPauseBtn: () => cy.get('[qa-element="vm-action-2"]').contains('Пауза'), //vm-action-2
        serverResumeBtn: () => cy.get('[qa-element="vm-action-4"]').contains('Возобновить'), //vm-action-4
        serverHibernationBtn: () => cy.get('[qa-element="vm-action-3"]').contains('Гибернация'), //vm-action-3

        serverRunningStatus: () => cy.get('[qa-element="vm-status"]').contains('В работе'),
        serverRestartingStatus: () => cy.get('[qa-element="vm-status"]').contains('Перезагружается'),
        serverTurningOffStatus: () => cy.get('[qa-element="vm-status"]').contains('Выключается'),
        serverPausedStatus: () => cy.get('[qa-element="vm-status"]').contains('На паузе'),
        serverHibernatedStatus: () => cy.get('[qa-element="vm-status"]').contains('В гибернации'),
        serverStoppedStatus: () => cy.get('[qa-element="vm-status"]').contains('Остановлен'),
    }
    actions = {
        clickServerActionsBtn: () => {
            this.elements.serverActionsBtn().click()
        },

        clickStartServerBtn: () => {
            this.elements.serverStartBtn().click()
        },
        clickStopServerBtn: () => {
            this.elements.serverStopBtn().click()
        },
        clickServerTurnOffBtn: () => {
            this.elements.serverTurnOffBtn().click()
        },
        clickServerRestartBtn: () => {
            this.elements.serverRestartBtn().click()
        },
        clickServerPauseBtn: () => {
            this.elements.serverPauseBtn().click()
        },
        clickServerResumeBtn: () => {
            this.elements.serverResumeBtn().click()
        },
        clickServerHibernationBtn: () => {
            this.elements.serverHibernationBtn().click()
        },

        isRunningServer: () => {
            this.elements.serverRunningStatus().should('be.visible')
        },
        isRestartingServer: () => {
            this.elements.serverRestartingStatus().should('be.visible')
        },
        isTurningOffServer: () => {
            this.elements.serverTurningOffStatus().should('be.visible')
        },
        isServerPausedStatus: () => {
            this.elements.serverPausedStatus().should('be.visible')
        },
        isServerHibernatedStatus: () => {
            this.elements.serverHibernatedStatus().should('be.visible')
        },
        isServerStoppedStatus: () => {
            this.elements.serverStoppedStatus().should('be.visible')
        },

        checkStatus: (maxIterations, status) => {
            cy.log('Итерация: ' + maxIterations);
            if (maxIterations <= 0) {
                expect(true, 'Превышено максимальное количество итераций').to.equal(false);
                return;
            }

            this.elements.serverStatusLbl().invoke('text').then((text1) => {
                if (text1.includes(status)) {
                    cy.log('success');
                } else {
                    cy.wait(5000);
                    this.actions.checkStatus(maxIterations - 1, status);
                }
            });
        },
    }
}





module.exports = new ServerActions()