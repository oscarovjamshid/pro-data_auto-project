class ServerActions {
    elements = {
        serverActionsBtn: () => cy.get('[qa-element="vm-action"]'), //vm-action
        serverStatusLbl: () => cy.get('[qa-element="vm-status"]'), //vm-status-badge

        serverStartBtn: () => cy.get('[qa-element="vm-action-0"]:visible').contains('Запуск'), //vm-action-0
        serverTurnOffBtn: () => cy.get('[qa-element="vm-action-5"]:visible').contains('Выключить'), //vm-action-5
        serverStopBtn: () => cy.get('[qa-element="vm-action-6"]:visible').contains('Остановить'), //vm-action-6
        serverRestartBtn: () => cy.get('[qa-element="vm-action-1"]:visible').contains('Перезагрузить'),//vm-action-1
        serverPauseBtn: () => cy.get('[qa-element="vm-action-2"]:visible').contains('Пауза'), //vm-action-2
        serverResumeBtn: () => cy.get('[qa-element="vm-action-4"]:visible').contains('Возобновить'), //vm-action-4
        serverHibernationBtn: () => cy.get('[qa-element="vm-action-3"]:visible').contains('Гибернация'), //vm-action-3

        serverRunningStatus: () => cy.get('[qa-element="vm-status"]').contains('В работе'),
        serverRestartingStatus: () => cy.get('[qa-element="vm-status"]').contains('Перезагружается'),
        serverTurningOffStatus: () => cy.get('[qa-element="vm-status"]').contains('Выключается'),
        serverPausedStatus: () => cy.get('[qa-element="vm-status"]').contains('На паузе'),
        serverHibernatedStatus: () => cy.get('[qa-element="vm-status"]').contains('В гибернации'),
        serverStoppedStatus: () => cy.get('[qa-element="vm-status"]').contains('Остановлен'),
    }
    actions = {
        clickServerActionsBtn: () => {
            this.elements.serverActionsBtn().should('be.visible').click()
        },

        clickStartServerBtn: () => {
            this.elements.serverStartBtn().should('be.visible').click()
        },
        clickStopServerBtn: () => {
            this.elements.serverStopBtn().should('be.visible').click()
        },
        clickServerTurnOffBtn: () => {
            this.elements.serverTurnOffBtn().should('be.visible').click()
        },
        clickServerRestartBtn: () => {
            this.elements.serverRestartBtn().should('be.visible').click()
        },
        clickServerPauseBtn: () => {
            this.elements.serverPauseBtn().should('be.visible').click()
        },
        clickServerResumeBtn: () => {
            this.elements.serverResumeBtn().should('be.visible').click()
        },
        clickServerHibernationBtn: () => {
            this.elements.serverHibernationBtn().should('be.visible').click()
        },
        getServerStatusText: () => {
            return this.elements.serverStatusLbl().invoke('text')
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