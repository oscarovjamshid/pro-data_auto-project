class ManagedKubernetes {
    elements = {
        userAgreementLink: () => cy.get('.text-start li:nth-child(1) a'),
        priceListLink: () => cy.get('.text-start li:nth-child(2) a'),
        termsOfServiceLink: () => cy.get('.text-start li:nth-child(3) a'),
        createClusterBtn: () => cy.get('[qa-element="to-new-cluster"]'),
        enterNameToCluster: () => cy.get('[qa-element="cluster-name"]'),
        selectVersionKuber: () => cy.get('[qa-element="kuber-version-open"]'),
        selectLatestVersion: () => cy.get('[qa-element="kuber-version-0"]'), // v.31.4
        selectMiddleVersion: () => cy.get('[qa-element="kuber-version-0"]'), // v.30.5
        updateToMediumVersion: () => cy.get('[qa-element="update-kuber-version-1"]'),
        selectLeastVersion: () => cy.get('[qa-element="kuber-version-2"]'), // // v.29.6
        continueNextpageBtn: () => cy.get('[qa-element="create-cluster-continue"]'),
        kubernetes_isVisibleInValidTxt: (text) => cy.get('[qa-element="cluster-name-error"]').contains(text),
        kubernetes_podovInp: () => cy.get('[qa-element="pod-subnet-mask"]').last(),
        podSubnetAddressInvalidTxt: (text) => cy.get('[qa-element="pod-subnet-mask-error"]').contains(text),
        selectKubernetesLocalNetList: () => cy.get('[qa-element="local-net-id-open"]'),
        selectKubernetesLocalNetOption: () => cy.get('[qa-element="local-net-id-0"]').last(),
        createNewNetworkBtn: () => cy.get('[qa-element="show-network-create"]'),
        selectLocalNetByName: (name) => cy.get('#input-dropdown > div > ul > a').contains(name),
        localNetworkInvalidTxt: (text) => cy.get('[qa-element="local-net-id-error"]'),
        kubernetesEnterklasterInp: () => cy.get('[qa-element="network-address-mask"]'),
        kubernetesVunkerInp: () => cy.get('[qa-element="node-pool-name"]'),
        kubernetesCreateKlasterBtn: () => cy.get('[qa-element="create-cluster"]').contains('Создать кластер'),
        haControlGroupSwitchLabel: () => cy.get('[qa-element="base-failsafe-1"]'),
        kubernetesCpuInp: () => cy.get('[qa-element="worker-cpu-range-input"]'),
        kubernetesRamInp: () => cy.get('[qa-element="worker-ram-range-input"]'),
        kubernetesDiskInp: () => cy.get('[qa-element="worker-disk-size-range-input"]'),
        kubernetes_isVisibleInValidTxtVunker: (text) => cy.get('[qa-element="node-pool-name-error"]').contains(text),
        kubernetes_isVisibleInValidDiskTxt: () => cy.get('[qa-element="worker-replicas-range-error"]'),
        privateClusterSwitchLabel: () => cy.get('[qa-element="private-public-0"]'),
        publicClusterSwitchLabel: () => cy.get('[qa-element="private-public-1"]'),
        uploadYourPublicKeySshRadioBtn: () => cy.get('[qa-element="upload-ssh"]'),
        uploadYourPublicKeySshInputField: () => cy.get('[qa-element="public-key"]'),
        autoscalingCheckbox: () => cy.get('[qa-element="auto-scale-switch"]'),
        autoscalingWorkerNodeMinField: () => cy.get('[qa-element="worker-replicas-range-input"]').eq(0),
        autoscalingWorkerNodeMaxField: () => cy.get('[qa-element="worker-replicas-range-input"]').eq(1),
        downloadPrivateKeyBtn: () => cy.get('[qa-element="ssh-private-key"]'),
        downloadPublicKeyBtn: () => cy.get('[qa-element="ssh-public-key"]'),
        closeButtonInAnyModal: () => cy.get('.btn-close'),
        managedKubernetesRowPerName: (name) => cy.get('tbody').contains('tr', name),
        cancelBtnInAddClusterPage: () => cy.get('[qa-element="to-cluster-list"]'),
        clusterStatusPerRowName: (name) => cy.contains('tr', name).find('[qa-element="cluster-status"]'),
        clusterStatus: () => cy.get('[qa-element="cluster-status"]'),
        updateKuberVersionBtn: () => cy.get('[qa-element="show-kuber-version"]'),
        updateKuberVersionDropdownList: () => cy.get('[qa-element="update-kuber-version-open"]'),
        clusterVersionSubmitBtnInUpdateList: () => cy.get('[qa-element="cluster-version-submit"]'),
        clusterKuberVersionInConfigurationTab: () => cy.get('.fw-medium'),
        clusterChangeControlGroupBtn: () => cy.get('[qa-element="show-update-master-config"]'),
        clusterChangeControlGroupDropdownList: () => cy.get('[qa-element="master-node-config-id-open"]'),
        changeControlGroupSubmitBtn: () => cy.get('[qa-element="update-master-config-submit"]'),
        changeControlGroupListFirstOption: () => cy.get('[qa-element="master-node-config-id-0"]'),
        closeButtonInPopUpAfterChangedControlGroup: () => cy.get('button.btn-close.btn-close-white'),
        connectionTab: () => cy.get('[qa-element="tab-1"]'),
        workerNodePoolsTab: () => cy.get('[qa-element="tab-2"]'),
        downloadConfigYamlBtnInConfigurationTab: () => cy.get('[qa-element="download-yaml"]'),
        copyYamlIconInConfigurationTab: () => cy.get('[qa-element="copy-yaml"]'),
        createNewWorkerNodePoolBtn: () => cy.get('[qa-element="show-add-node-pool"]'),
        createNewPoolBtnInAddNewPoolPopUp: () => cy.get('[qa-element="add-node-pool"]'),
        configureWorkerNodePoolSizeBtn: () => cy.get('[qa-element="configure-pool-show"]'),
        deletePoolBtn: () => cy.get('[qa-element="show-delete-pool"]'),
        deleteClusterBtn: () => cy.get('[qa-element="show-cluster-delete"]'),
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
        workerNodeStatus: () => cy.get('[qa-element="vm-status"]')
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
        isVisibleCreateClusterBtn: () => {
            this.elements.createClusterBtn().should('be.visible')
        },
        enterKlassterNameInp: (text) => {
            this.elements.enterNameToCluster().clear().type(text)
        },
        selectVersionKubernetesKlasster: () => {
            this.elements.selectVersionKuber().click()
        },
        selectLatestVersionFromListFn: () => {
            this.elements.selectLatestVersion().click()
        },
        selectLeastVersionFromListFn: () => {
            this.elements.selectLeastVersion().click()
        },
        selectMiddleVersionFromListFn: () => {
            this.elements.selectMiddleVersion().click()
        },
        clickNextPageContinueBtn: () => {
            this.elements.continueNextpageBtn().click()
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
        // Update Kuber Version Section
        clickUpdateKuberVersionBtn: () => {
            this.elements.updateKuberVersionBtn().click()
        },
        clickUpdateKuberVersionDropdownList: () => {
            this.elements.updateKuberVersionDropdownList().click()
        },
        selectMediumKuberVersion: () => {
            this.elements.updateToMediumVersion().click()
        },
        clickSubmitBtnInUpdateKuberVersionList: () => {
            this.elements.clusterVersionSubmitBtnInUpdateList().click()
        },
        isVisibleClusterKuberTextInConfigurationTab: (label, text) => {
            cy.contains('span.fw-medium', label).next('span').should('contain.text', text).and('be.visible')
        },
        isDisabledKuberVersionOptionInList: () => {
            this.elements.updateToMediumVersion().should('have.class', 'disabled')
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
    }
}





module.exports = new ManagedKubernetes()