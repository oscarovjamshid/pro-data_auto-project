class ManagedKubernetes {
    elements = {
        userAgreementLink: () => cy.contains('a', 'Пользовательское соглашение'),   // qa-element is needed here
        priceListLink: () => cy.contains('a', 'Прейскурант'),   // qa-element is needed here
        termsOfServiceLink: () => cy.contains('a', 'Условия использования услуги'),   // qa-element is needed here
        createClusterBtnWhenNoRecords: () => cy.contains('a', 'Создать кластер'),  // qa-element is needed here
        createClusterBtn: () => cy.get('[qa-element="to-new-cluster"]'),
        enterNameToCluster: () => cy.get('[qa-element="cluster-name"]'),
        selectVersionKuber: () => cy.get('[qa-element="kuber-version-toggle"]'),
        selectKuberVersionByNumber: (versionNumber) => cy.get(`li[data-value*="${versionNumber}"] button`),
        continueNextpageBtn: () => cy.get('[qa-element="create-cluster-continue"]'),
        kubernetes_isVisibleInValidTxt: (text) => cy.get('[qa-element="cluster-name-error"]').contains(text),
        kubernetes_podovInp: () => cy.get('[qa-element="pod-subnet-mask"]').last(),
        podSubnetAddressInvalidTxt: (text) => cy.get('[qa-element="pod-subnet-mask-error"]').contains(text),
        selectKubernetesLocalNetList: () => cy.get('[qa-element="local-net-id-toggle"]'),
        selectKubernetesLocalNetOption: () => cy.get('[qa-element="local-net-id-0"]').last(),
        createNewNetworkBtn: () => cy.get('[qa-element="show-network-create"]'),
        selectLocalNetByName: (name) => cy.contains(name),
        localNetworkInvalidTxt: (text) => cy.get('[qa-element="local-net-id-error"]'),
        kubernetesEnterklasterInp: () => cy.get('[qa-element="network-address-mask"]'),
        kubernetesVunkerInp: () => cy.get('[qa-element="node-pool-name"]'),
        kubernetesCreateKlasterBtn: () => cy.get('[qa-element="create-cluster"]').contains('Создать кластер'),
        haControlGroupSwitchLabel: () => cy.get('[qa-element="failsafe-group"]'),
        kubernetesCpuInp: () => cy.get('[qa-element="worker-cpu-range-input"]'),
        kubernetesRamInp: () => cy.get('[qa-element="worker-ram-range-input"]'),
        kubernetesDiskInp: () => cy.get('[qa-element="worker-disk-size-range-input"]'),
        kubernetes_isVisibleInValidTxtVunker: (text) => cy.get('[qa-element="node-pool-name-error"]').contains(text),
        kubernetes_isVisibleInValidDiskTxt: () => cy.get('[class^="FormHint_hint"]'),
        privateClusterSwitchLabel: () => cy.get('[qa-element="private-cluster"]'),
        publicClusterSwitchLabel: () => cy.get('[qa-element="public-cluster"]'),
        uploadYourPublicKeySshRadioBtn: () => cy.get('[qa-element="upload-ssh"]'),
        uploadYourPublicKeySshInputField: () => cy.get('[qa-element="upload-file"]'),
        autoscalingCheckbox: () => cy.get('[qa-element="auto-scale-switch"]'),
        autoscalingWorkerNodeMinField: () => cy.get('[qa-element="worker-replicas-range-input"]').eq(0),
        autoscalingWorkerNodeMaxField: () => cy.get('[qa-element="worker-replicas-range-input"]').eq(1),
        downloadPrivateKeyBtn: () => cy.get('[qa-element="ssh-private-key"]'),
        downloadPublicKeyBtn: () => cy.get('[qa-element="ssh-public-key"]'),
        closeButtonInAnyModal: () => cy.get('[class^="Modal_Header_closeButton"]'),
        managedKubernetesRowPerName: (name) => cy.get('tbody').contains('tr', name),
        cancelBtnInAddClusterPage: () => cy.get('[qa-element="to-cluster-list"]'),
        clusterStatusPerRowName: (name) => cy.contains('tr', name).find('[qa-element="cluster-status"]'),
        clusterStatus: () => cy.get('[qa-element="cluster-status"]'),
        actionBtnInCluster: () => cy.contains('button', "Действия"), // qa-element is needed here
        updateKuberVersionBtn: () => cy.contains("Обновить версию Kubernetes"), // qa-element is needed here
        updateKuberVersionDropdownList: () => cy.get('[qa-element="update-kuber-version-toggle"]'),
        clusterVersionSubmitBtnInUpdateList: () => cy.get('[qa-element="cluster-version-submit"]'),
        clusterKuberVersionInConfigurationTab: () => cy.get('.fw-medium'),
        clusterChangeControlGroupBtn: () => cy.get('[qa-element="show-update-master-config"]'),
        clusterChangeControlGroupDropdownList: () => cy.get('[qa-element="master-node-config-id-toggle"]'),
        changeControlGroupSubmitBtn: () => cy.get('[qa-element="update-master-config-submit"]'),
        changeControlGroupListFirstOption: () => cy.get('[qa-element="master-node-config-id-0"]'),
        closeButtonInPopUpAfterChangedControlGroup: () => cy.get('[class^="Modal_Header_closeButton"]'),
        connectionTab: () => cy.get('[qa-element="undefined-1"]'),
        workerNodePoolsTab: () => cy.get('[qa-element="undefined-2"]'),
        downloadConfigYamlBtnInConfigurationTab: () => cy.get('[qa-element="download-yaml"]'),
        copyYamlIconInConfigurationTab: () => cy.get('[qa-element="copy-yaml"]'),
        createNewWorkerNodePoolBtn: () => cy.get('[qa-element="show-add-node-pool"]'),
        createNewPoolBtnInAddNewPoolPopUp: () => cy.get('[qa-element="add-node-pool"]'),
        configureWorkerNodePoolSizeBtn: () => cy.get('[qa-element="configure-pool-show"]'),
        deletePoolBtn: () => cy.get('[qa-element="show-delete-pool"]'),
        deleteClusterBtn: () => cy.contains('span', 'Удалить'), // qa-element is needed here
        deleteClusterSubmitBtn: () => cy.get('[qa-element="cluster-delete-submit"]'),
        workerNodePoolStatusPerRowNameInWorkerNodePoolsTab: (name) => cy.contains('tr', name).find('[qa-element="worker-node-status"]'),
        workerNodePool_isVisibleInValidTxtVunker: () => cy.get('[qa-element="create-pool-name-error"]'),
        deletePoolInputField: () => cy.get('[qa-element="pool-name"]'),
        deletePoolSubmitBtn: () => cy.get('[qa-element="delete-pool-submit"]'),
        workerNodeCpuInp: () => cy.get('[qa-element="create-pool-worker-cpu-range-input"]'),
        workerNodeRamInp: () => cy.get('[qa-element="create-pool-worker-ram-range-input"]'),
        workerNodeDiskInp: () => cy.get('[qa-element="create-pool-worker-disk-size-range-input"]'),
        configureWorkerNodePoolSizeNodeField: () => cy.get('[qa-element="fixed-size-range-input"]'),
        configureWorkerNodePoolSizeMinNodeField: () => cy.get('[qa-element="worker-replicas-min-range-input"]'),
        configureWorkerNodePoolSizeMaxNodeField: () => cy.get('[qa-element="worker-replicas-max-range-input"]'),
        configureWorkerNodePoolSizeMaxNodeFieldError: () => cy.get('[qa-element="worker-replicas-max-range-error"]'),
        configureWorkerNodePoolSizeMinNodeFieldError: () => cy.get('[qa-element="worker-replicas-min-range-error"]'),
        rebootBtn: () => cy.get('[qa-element="node-reboot"]'),
        consoleBtn: () => cy.get('[qa-element="node-pools-console"]'),
        workerNodeStatus: () => cy.get('[class^="mr-auto Badge"]'),
        clusterKuberConfigTextInConfigurationTab: (label) => cy.contains('td', label).next('td'),

        // new selectors for cpu and ram, disk by buttons instead of typing fields
        minWorkerNodeDecreaseBtn: () => cy.get('[qa-element="worker-replicas-range-decrease"]').eq(0),
        minWorkerNodeIncreaseBtn: () => cy.get('[qa-element="worker-replicas-range-increase"]').eq(0),
        minWorkerNodeValue: () => cy.get('[qa-element="worker-replicas-range"]').eq(0),
        maxWorkerNodeDecreaseBtn: () => cy.get('[qa-element="worker-replicas-range-decrease"]').eq(1),
        maxWorkerNodeIncreaseBtn: () => cy.get('[qa-element="worker-replicas-range-increase"]').eq(1),
        maxWorkerNodeValue: () => cy.get('[qa-element="worker-replicas-range"]').eq(1),
        workerNodeCpuIncreaseBtn: () => cy.get('[qa-element="worker-cpu-range-increase"]'),
        workerNodeCpuDecreaseBtn: () => cy.get('[qa-element="worker-cpu-range-decrease"]'),
        workerNodeRamIncreaseBtn: () => cy.get('[qa-element="worker-ram-range-increase"]'),
        workerNodeRamDecreaseBtn: () => cy.get('[qa-element="worker-ram-range-decrease"]'),
        workerNodeDiskIncreaseBtn: () => cy.get('[qa-element="worker-disk-size-range-increase"]'),
        workerNodeDiskDecreaseBtn: () => cy.get('[qa-element="worker-disk-size-range-decrease"]'),
        workerNodeCpuValue: () => cy.get('[qa-element="worker-cpu-range"]'),
        workerNodeRamValue: () => cy.get('[qa-element="worker-ram-range"]'),
        workerNodeDiskValue: () => cy.get('[qa-element="worker-disk-size-range"]'),
        poolCpuValue: () => cy.get('[qa-element="create-pool-worker-cpu-range"]'),
        poolRamValue: () => cy.get('[qa-element="create-pool-worker-ram-range"]'),
        poolDiskValue: () => cy.get('[qa-element="create-pool-worker-disk-size-range"]'),
        poolCpuIncreaseBtn: () => cy.get('[qa-element="create-pool-worker-cpu-range-increase"]'),
        poolCpuDecreaseBtn: () => cy.get('[qa-element="create-pool-worker-cpu-range-decrease"]'),
        poolRamIncreaseBtn: () => cy.get('[qa-element="create-pool-worker-ram-range-increase"]'),
        poolRamDecreaseBtn: () => cy.get('[qa-element="create-pool-worker-ram-range-decrease"]'),
        poolDiskIncreaseBtn: () => cy.get('[qa-element="create-pool-worker-disk-size-range-increase"]'),
        poolDiskDecreaseBtn: () => cy.get('[qa-element="create-pool-worker-disk-size-range-decrease"]'),
    }
    actions = {
        clickOnUserAgreementLink: () => {
            this.elements.userAgreementLink().should('be.visible')
            this.elements.userAgreementLink().invoke('removeAttr', 'target').click()
        },
        isVisibleUserAgreementLink: () => {
            this.elements.userAgreementLink().should('be.visible')
        },
        clickOnPriceListLink: () => {
            this.elements.priceListLink().should('be.visible')
            this.elements.priceListLink().invoke('removeAttr', 'target').click()
        },
        clickOnTermsOfServiceLink: () => {
            this.elements.termsOfServiceLink().should('be.visible')
            this.elements.termsOfServiceLink().invoke('removeAttr', 'target').click()
        },
        clickCreateClusterBtn: () => {
            this.elements.createClusterBtn().click({ force: true });
        },
        clickCreateClusterBtnWhenNoRecords: () => {
            this.elements.createClusterBtnWhenNoRecords().click()
        },
        isVisibleCreateClusterBtnWhenNoRecords: () => {
            this.elements.createClusterBtnWhenNoRecords().should('be.visible')
        },
        isVisibleCreateClusterBtn: () => {
            this.elements.createClusterBtn().should('be.visible')
        },
        enterKlassterNameInp: (text) => {
            this.elements.enterNameToCluster().clear().type(text)
        },
        selectVersionKubernetesKlasster: () => {
            this.elements.selectVersionKuber().click()
        },
        selectKuberVersionByNumber: (number) => {  // select version by number
            this.elements.selectKuberVersionByNumber(number).click()
        },
        clickNextPageContinueBtn: () => {
            this.elements.continueNextpageBtn().click()
        },
        isDisabledNextPageContinueBtn: () => {
            this.elements.continueNextpageBtn().should('be.disabled')
        },
        isVisibleInValidKubernetesTxt: (text) => {
            this.elements.kubernetes_isVisibleInValidTxt(text).should('be.visible')
        },
        isVisibleInvalidPodSubnetAddressTxt: (text) => {
            this.elements.podSubnetAddressInvalidTxt(text).should('be.visible')
        },
        isVisibleInvalidLocalNetworkTxt: (text) => {
            this.elements.localNetworkInvalidTxt().contains(text).should('be.visible')
        },
        isVisibleInValidKubernetesTxtVunker: (text) => {
            this.elements.kubernetes_isVisibleInValidTxtVunker(text).should('be.visible')
        },
        isVisibleInValidDisk: () => {
            this.elements.kubernetes_isVisibleInValidDiskTxt().should('be.visible')
        },
        isVisibleInvalidWorkerNodeSizeText: (text) => {
            this.elements.kubernetes_isVisibleInValidDiskTxt().contains(text).should('be.visible')
        },
        enterPodovServerNumber: (text) => {
            this.elements.kubernetes_podovInp().clear().type(text)
        },
        clickKuberLocalNetworkList: () => {
            this.elements.selectKubernetesLocalNetList().click()
        },
        selectKuberLocalNetworkInList: () => {
            this.elements.selectKubernetesLocalNetOption().click()
        },
        clickCreateNewLocalNetworkBtn: () => {
            this.elements.createNewNetworkBtn().click()
        },
        clickLocalNetworkOptionByNameInLocalNetworkList: (name) => {
            this.elements.selectLocalNetByName(name).click()
        },
        enterKubernetesKlasterInp: (text) => {
            this.elements.kubernetesEnterklasterInp().clear().type(text)
        },
        isVisibleinValidKuberIp: () => {
            this.elements.kubernetesEnterklasterInp().should('be.visible')
        },
        enterKubernetesVunkerCode: (text) => {
            this.elements.kubernetesVunkerInp().clear().type(text)
        },
        kubernetesMetaData: () => {
            cy.wait('@kubernetesresourcedata', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
            });
        },
        clickCreateKlasterBtn: () => {
            this.elements.kubernetesCreateKlasterBtn().click()
        },
        kubernetesGetClusters: () => {
            cy.wait('@kubernetesGetClasters', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
            });
        },
        clickHaControlGroupSwitchLabel: () => {
            this.elements.haControlGroupSwitchLabel().click()
        },
        enterKubernetesCpuData: (text) => {
            this.elements.kubernetesCpuInp().clear().type(text)
        },
        kubernetesGetClustersFail: () => {
            cy.wait('@kubernetesCreateClusterFail', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(400);
            });
        },
        enterKubernetesRamData: (text) => {
            this.elements.kubernetesRamInp().clear().type(text)
        },
        enterKubernetesDiskData: (text) => {
            this.elements.kubernetesDiskInp().clear().type(text)
        },
        clickPrivateClusterSwitchLabel: () => {
            this.elements.privateClusterSwitchLabel().click()
        },
        clickPublicClusterSwitchLabel: () => {
            this.elements.publicClusterSwitchLabel().click()
        },
        clickUploadYourPublicKeyRadioBtn: () => {
            this.elements.uploadYourPublicKeySshRadioBtn().click()
        },
        clickUploadYourPublicSshKeyInputField: () => {
            this.elements.uploadYourPublicKeySshInputField().click()
        },
        attachSshFileForPublicKeyFilepicker: () => {
            this.elements.uploadYourPublicKeySshInputField().attachFile('sshpublickey.ppk', { force: true });
        },
        clickAutoscalingCheckbox: () => {
            this.elements.autoscalingCheckbox().click()
            this.elements.autoscalingCheckbox().should('be.checked')
        },
        enterWorkerNodeMinSize: (number) => {
            this.elements.autoscalingWorkerNodeMinField().clear().type(number)
        },
        enterWorkerNodeMaxSize: (number) => {
            this.elements.autoscalingWorkerNodeMaxField().clear().type(number)
        },
        isVisibleCreatedKuberCluster: (name) => {
            this.elements.managedKubernetesRowPerName(name).should('be.visible')
        },
        isNotVisibleCreatedKuberCluster: (name) => {
            this.elements.managedKubernetesRowPerName(name).should('not.exist')
        },
        isNotVisibleCreatedKuberClusterWorkerNode: (name) => {
            this.elements.managedKubernetesRowPerName(name).should('not.exist')
        },
        clickClusterRowPerName: (name) => {
            this.elements.managedKubernetesRowPerName(name).click()
        },
        clickDownloadPrivateKeyBtn: () => {
            this.elements.downloadPrivateKeyBtn().click()
        },
        clickDownloadPublicKeyBtn: () => {
            this.elements.downloadPublicKeyBtn().click()
        },
        clickCloseBtnInModal: () => {
            this.elements.closeButtonInAnyModal().click({ multiple: true })
        },
        clickCancelBtnInAddPage: () => {
            this.elements.cancelBtnInAddClusterPage().click()
        },
        waitForClusterReady: (name) => {                         // Used to wait any cluster till it becomes in Running status
            cy.log(`Waiting for cluster "${name}" to become В работе...`)
            cy.wrap(null).then(() => {
                const checkStatus = () => {
                    this.elements.clusterStatusPerRowName(name).invoke('text').then((text) => {
                        const status = text.trim()
                        cy.log(`Current status: ${status}`)
                        if (status !== 'В работе') {
                            cy.wait(5000).then(checkStatus)                  // re-checks in every 5 seconds
                        } else {
                            cy.log(`Cluster "${name}" is В работе`)
                        }
                    })
                }
                checkStatus()
            })
        },
        isVisibleClusterStatus: (text) => {
            this.elements.clusterStatus().contains(text).should('be.visible')
        },
        clickActionBtnInCluster: () => {
            this.elements.actionBtnInCluster().click()
        },
        // Update Kuber Version Section
        clickUpdateKuberVersionBtn: () => {
            this.elements.updateKuberVersionBtn().click()
        },
        clickUpdateKuberVersionDropdownList: () => {
            this.elements.updateKuberVersionDropdownList().click()
        },
        selectMediumKuberVersion: () => {
            this.elements.selectMiddleVersion().click()
        },
        clickSubmitBtnInUpdateKuberVersionList: () => {
            this.elements.clusterVersionSubmitBtnInUpdateList().click()
        },
        isVisibleClusterKuberTextInConfigurationTab: (label, text) => {
            this.elements.clusterKuberConfigTextInConfigurationTab(label)
                .should('contain.text', text)
                .and('be.visible')
        },
        isDisabledKuberVersionOptionInList: (version) => {
            this.elements.selectKuberVersionByNumber(version).should('be.disabled')
        },
        // Change Control Group section
        clickChangeControlGroupBtn: () => {
            this.elements.clusterChangeControlGroupBtn().click()
        },
        clickChangeControlGroupDropdownList: () => {
            this.elements.clusterChangeControlGroupDropdownList().click()
        },
        selectFirstOptionInChangeControlGroupList: () => {
            this.elements.changeControlGroupListFirstOption().click()
        },
        clickSubmitBtnInChangeControlGroupPopUp: () => {
            this.elements.changeControlGroupSubmitBtn().click()
        },
        clickCloseBtnInPopUpAppearsAfterChangedControlGroup: () => {
            this.elements.closeButtonInPopUpAfterChangedControlGroup().click()
        },
        clickDeleteClusterBtn: () => {
            this.elements.deleteClusterBtn().click()
        },
        clickDeleteClusterSubmitBtn: () => {
            this.elements.deleteClusterSubmitBtn().click()
        },
        //Connection tab
        clickConnectionTab: () => {
            this.elements.connectionTab().click()
            this.elements.downloadConfigYamlBtnInConfigurationTab().should('be.visible')
        },
        clickDownloadConfigYamlBtn: () => {
            this.elements.downloadConfigYamlBtnInConfigurationTab().should('be.visible')
            this.elements.downloadConfigYamlBtnInConfigurationTab().click()
        },
        // Worker Node Pool tab
        clickWorkerNodePoolTab: (text) => {
            this.elements.workerNodePoolsTab().click()
            this.elements.managedKubernetesRowPerName(text).should('be.visible')
        },
        openWorkerNodePoolTabWhenReady: (clusterName, poolName, timeoutMs = 180000, refreshIntervalMs = 10000) => {
            cy.log(`Waiting for worker-node-pool configuration on "${clusterName}" to finish...`)
            const startedAt = Date.now()
            const workerNodePoolsTabSelector = '[qa-element="undefined-2"]'
            const workerNodePoolTooltipText = 'Идёт конфигурация пула воркер-нод'

            const tryOpen = () => {
                if (Date.now() - startedAt > timeoutMs) {
                    throw new Error(`Timed out waiting for worker-node-pool configuration to finish for cluster "${clusterName}"`)
                }

                cy.reload()
                this.elements.managedKubernetesRowPerName(clusterName)
                    .scrollIntoView()
                    .trigger('mouseenter', { force: true })
                    .trigger('mousemove', { force: true })

                cy.get('body').then(($body) => {
                    const tooltipVisible = $body.text().includes(workerNodePoolTooltipText)

                    if (tooltipVisible) {
                        cy.wait(refreshIntervalMs).then(tryOpen)
                        return
                    }

                    this.elements.managedKubernetesRowPerName(clusterName).click()

                    cy.get('body').then(($detailsBody) => {
                        const tabVisible = $detailsBody.find(workerNodePoolsTabSelector).length > 0

                        if (!tabVisible) {
                            cy.wait(refreshIntervalMs).then(tryOpen)
                            return
                        }

                        cy.get(workerNodePoolsTabSelector).should('be.visible').click()
                        this.elements.managedKubernetesRowPerName(poolName).should('be.visible')
                    })
                })
            }

            tryOpen()
        },
        clickAddPoolBtn: () => {
            this.elements.createNewWorkerNodePoolBtn().click()
        },
        clickCreatePoolBtn: () => {
            this.elements.createNewPoolBtnInAddNewPoolPopUp().click()
        },
        waitForWorkerNodePoolReady: (name) => {                         // Used to wait any cluster till it becomes in Running status
            cy.log(`Waiting for cluster "${name}" to become В работе...`)
            cy.wrap(null).then(() => {
                const checkStatus = () => {
                    this.elements.workerNodePoolStatusPerRowNameInWorkerNodePoolsTab(name).invoke('text').then((text) => {
                        const status = text.trim()
                        cy.log(`Current status: ${status}`)
                        if (status !== 'В работе') {
                            cy.wait(5000).then(checkStatus)                  // re-checks in every 5 seconds
                        } else {
                            cy.log(`Cluster "${name}" is В работе`)
                        }
                    })
                }
                checkStatus()
            })
        },
        isVisibleInvalidWorkerNodePoolText: (text) => {
            this.elements.workerNodePool_isVisibleInValidTxtVunker().contains(text).should('be.visible')
        },
        clickDeletePoolBtn: () => {
            this.elements.deletePoolBtn().click()
        },
        enterTextToDeletePoolField: (text) => {
            this.elements.deletePoolInputField().type(text)
        },
        clickDeletePoolSubmitBtn: () => {
            this.elements.deletePoolSubmitBtn().click()
        },
        enterWorkerNodeCpuData: (text) => {
            this.elements.workerNodeCpuInp().clear().type(text)
        },
        enterWorkerNodeRamData: (text) => {
            this.elements.workerNodeRamInp().clear().type(text)
        },
        enterWorkerNodeDiskData: (text) => {
            this.elements.workerNodeDiskInp().clear().type(text)
        },
        clickConfigureWorkerNodePoolSizeBtn: () => {
            this.elements.configureWorkerNodePoolSizeBtn().click()
        },
        isVisibleConfigureWorkerNodePoolSizeBtn: () => {
            this.elements.configureWorkerNodePoolSizeBtn().should('be.visible')
        },
        IsAutoScalingNotChecked: () => {
            this.elements.autoscalingCheckbox().should('not.be.checked')
        },
        enterValueToTheConfigureNodePoolSizeNodeField: (text) => {
            this.elements.configureWorkerNodePoolSizeNodeField().clear().type(text)
        },
        enterConfigurePoolSizeNodeMin: (number) => {
            this.elements.configureWorkerNodePoolSizeMinNodeField().clear().type(number)
        },
        enterConfigurePoolSizeNodeMax: (number) => {
            this.elements.configureWorkerNodePoolSizeMaxNodeField().clear().type(number)
        },
        isVisibleConfigureWorkerNodeMaxFieldErrorTxt: () => {
            this.elements.configureWorkerNodePoolSizeMaxNodeFieldError().should('be.visible')
        },
        isVisibleConfigureWorkerNodeMinFieldErrorTxt: () => {
            this.elements.configureWorkerNodePoolSizeMinNodeFieldError().should('be.visible')
        },
        isVisibleRebootBtn: () => {
            this.elements.rebootBtn().should('be.visible')
        },
        clickRebootBtn: () => {
            this.elements.rebootBtn().click()
        },
        isVisibleConsoleBtn: () => {
            this.elements.consoleBtn().should('be.visible')
        },
        isVisibleConfigurationTabMainData: (data) => {
            data.forEach(field => {
                cy.contains(field).should('be.visible')
            })
        },
        clickLocalNetworkTab: () => {
            this.elements.connectionTab().click()
        },
        waitForWorkerNodeReady: (name) => {                         // Used to wait any cluster till it becomes in Running status
            cy.log(`Waiting for worker node "${name}" to become В работе...`)
            cy.wrap(null).then(() => {
                const checkStatus = () => {
                    this.elements.workerNodeStatus().invoke('text').then((text) => {
                        const status = text.trim()
                        cy.log(`Current status: ${status}`)
                        if (status !== 'В работе') {
                            cy.wait(5000).then(checkStatus)                  // re-checks in every 5 seconds
                        } else {
                            cy.log(`Cluster "${name}" is В работе`)
                        }
                    })
                }
                checkStatus()
            })
        },
        // new methods for cpu and ram inserting by buttons instead of typing
        setWorkerNodeMin: (target) => {
            this.elements.minWorkerNodeValue().then(($el) => {
                const min = Number($el.attr('min')) || 1
                const max = Number($el.attr('max')) || 13
                const current = Number($el.val())
                const desired = Math.min(max, Math.max(min, Number(target)))
                const diff = desired - current
                const button = diff > 0 ? this.elements.minWorkerNodeIncreaseBtn() : this.elements.minWorkerNodeDecreaseBtn()
                Cypress._.times(Math.abs(diff), () => button.click())
            })
        },
        setWorkerNodeMax: (target) => {
            this.elements.maxWorkerNodeValue().then(($el) => {
                const min = Number($el.attr('min')) || 1
                const max = Number($el.attr('max')) || 13
                const current = Number($el.val())
                const desired = Math.min(max, Math.max(min, Number(target)))
                const diff = desired - current
                const button = diff > 0 ? this.elements.maxWorkerNodeIncreaseBtn() : this.elements.maxWorkerNodeDecreaseBtn()
                Cypress._.times(Math.abs(diff), () => button.click())
            })
        },
        setWorkerNodeCpu: (target) => {
            this.elements.workerNodeCpuValue().then(($el) => {
                const min = Number($el.attr('min')) || 1
                const max = Number($el.attr('max')) || 20
                const current = Number($el.val())
                const desired = Math.min(max, Math.max(min, Number(target)))
                const diff = desired - current
                const button = diff > 0 ? this.elements.workerNodeCpuIncreaseBtn() : this.elements.workerNodeCpuDecreaseBtn()
                Cypress._.times(Math.abs(diff), () => button.click())
            })
        },
        setWorkerNodeRam: (target) => {
            this.elements.workerNodeRamValue().then(($el) => {
                const min = Number($el.attr('min')) || 1
                const max = Number($el.attr('max')) || 20
                const current = Number($el.val())
                const desired = Math.min(max, Math.max(min, Number(target)))
                const diff = desired - current
                const button = diff > 0 ? this.elements.workerNodeRamIncreaseBtn() : this.elements.workerNodeRamDecreaseBtn()
                Cypress._.times(Math.abs(diff), () => button.click())
            })
        },
        setWorkerNodeDisk: (target) => {
            this.elements.workerNodeDiskValue().then(($el) => {
                const max = Number($el.attr('max')) || 300
                const current = Number($el.val())
                const desired = Math.min(max, Number(target))
                const diff = desired - current
                if (diff > 0) {
                    let clicks = 0
                    const clickIncrease = () => {
                        if (clicks >= Math.abs(diff)) return
                        this.elements.workerNodeDiskIncreaseBtn().then(($btn) => {
                            if ($btn.is(':disabled')) return
                            cy.wrap($btn).click({ force: true })
                            clicks++
                            clickIncrease()
                        })
                    }
                    clickIncrease()
                } else if (diff < 0) {
                    Cypress._.times(Math.abs(diff), () => this.elements.workerNodeDiskDecreaseBtn().click({ force: true }))
                }
            })
        },
        setPoolCpu: (target) => {
            this.elements.poolCpuValue().then(($el) => {
                const min = Number($el.attr('min')) || 1
                const max = Number($el.attr('max')) || 20
                const current = Number($el.val())
                const desired = Math.min(max, Math.max(min, Number(target)))
                const diff = desired - current
                const button = diff > 0 ? this.elements.poolCpuIncreaseBtn() : this.elements.poolCpuDecreaseBtn()
                Cypress._.times(Math.abs(diff), () => button.click())
            })
        },
        setPoolRam: (target) => {
            this.elements.poolRamValue().then(($el) => {
                const min = Number($el.attr('min')) || 1
                const max = Number($el.attr('max')) || 20
                const current = Number($el.val())
                const desired = Math.min(max, Math.max(min, Number(target)))
                const diff = desired - current
                const button = diff > 0 ? this.elements.poolRamIncreaseBtn() : this.elements.poolRamDecreaseBtn()
                Cypress._.times(Math.abs(diff), () => button.click())
            })
        },
        setPoolDisk: (target) => {
            this.elements.poolDiskValue().then(($el) => {
                const max = Number($el.attr('max')) || 300
                const current = Number($el.val())
                const desired = Math.min(max, Number(target))
                const diff = desired - current
                if (diff > 0) {
                    let clicks = 0
                    const clickIncrease = () => {
                        if (clicks >= Math.abs(diff)) return
                        this.elements.poolDiskIncreaseBtn().then(($btn) => {
                            if ($btn.is(':disabled')) return
                            cy.wrap($btn).click({ force: true })
                            clicks++
                            clickIncrease()
                        })
                    }
                    clickIncrease()
                } else if (diff < 0) {
                    Cypress._.times(Math.abs(diff), () => this.elements.poolDiskDecreaseBtn().click({ force: true }))
                }
            })
        },
        isWorkerNodeCpuIncreaseBtnDisabled: () => {
            this.elements.workerNodeCpuIncreaseBtn().should('be.disabled')
        },
        isWorkerNodeRamIncreaseBtnDisabled: () => {
            this.elements.workerNodeRamIncreaseBtn().should('be.disabled')
        },
        isWorkerNodeDiskIncreaseBtnDisabled: () => {
            this.elements.workerNodeDiskIncreaseBtn().should('be.disabled')
        },
        isPoolCpuIncreaseBtnDisabled: () => {
            this.elements.poolCpuIncreaseBtn().should('be.disabled')
        },
        isPoolRamIncreaseBtnDisabled: () => {
            this.elements.poolRamIncreaseBtn().should('be.disabled')
        },
        isPoolDiskIncreaseBtnDisabled: () => {
            this.elements.poolDiskIncreaseBtn().should('be.disabled')
        },
        isWorkerNodeCpuDecreaseBtnDisabled: () => {
            this.elements.workerNodeCpuDecreaseBtn().should('be.disabled')
        },
        isWorkerNodeRamDecreaseBtnDisabled: () => {
            this.elements.workerNodeRamDecreaseBtn().should('be.disabled')
        },
        isWorkerNodeDiskDecreaseBtnDisabled: () => {
            this.elements.workerNodeDiskDecreaseBtn().should('be.disabled')
        },
        isPoolCpuDecreaseBtnDisabled: () => {
            this.elements.poolCpuDecreaseBtn().should('be.disabled')
        },
        isPoolRamDecreaseBtnDisabled: () => {
            this.elements.poolRamDecreaseBtn().should('be.disabled')
        },
        isPoolDiskDecreaseBtnDisabled: () => {
            this.elements.poolDiskDecreaseBtn().should('be.disabled')
        },
        isWorkerNodeDecreaseBtnDisabled: () => {
            this.elements.minWorkerNodeDecreaseBtn().should('be.disabled')
        },
        clickWorkedNodeIncreaseBtn: () => {
            this.elements.minWorkerNodeIncreaseBtn().click()
        },
    }
}





module.exports = new ManagedKubernetes()