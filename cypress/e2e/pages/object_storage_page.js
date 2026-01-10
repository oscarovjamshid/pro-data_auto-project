class ObjectStorage {
    elements = {
        objectStoragePageTitle: () => cy.get('[qa-element="storage"]'),
        userAgreementLink: () => cy.get('.text-start li:nth-child(1) a'),
        priceListLink: () => cy.get('.text-start li:nth-child(2) a'),
        termsOfServiceLink: () => cy.get('.text-start li:nth-child(3) a'),
        awsCliLink: () => cy.get('.text-start li:nth-child(4) a'),
        addNewBucketBtn: () => cy.get('[qa-element="bucket-create-show"]'),
        bucketNameInputField: () => cy.get('[qa-element="bucket-key-mask"]'),
        createButtonInNewBucketModal: () => cy.get('[qa-element="bucket-create"]'),
        privateOption: () => cy.get('[qa-element="access-private"]'),       
        publicReadOption: () => cy.get('[qa-element="access-public-read"]'),   
        publicFullAccessOption: () => cy.get('[qa-element="access-public-write"]'),       
        blockOption: () => cy.get('[qa-element="object-locking"]'),
        blockOptionInSettingsPage: () => cy.get('#objectLocking'),
        versioningOption: () => cy.get('[qa-element="versioning"]'),
        closeButtonInAnyModal: () => cy.get('.btn-close'),
        closeButtonInShareModal: () => cy.get('.modal-header .btn-close'),
        invalidErrorMsgForBucketName: () => cy.get('[qa-element="create-bucket-key-mask-error"]'),
        objectStorageMaxLimitNumber: () => cy.get('[qa-element="s3-limit"]'),
        objectStorageIconPerName: (name) => cy.get('tbody').contains('tr', name).find('[qa-element="to-bucket-name"]'), 
        objectStorageAccessTypeText: () => cy.get('#root > div > div.main-layout__main > main > div > div.d-flex.align-items-center.justify-content-end.mb-1.text-gray > span.font-body-s.me-2'),       
        objectStorageNameInBucketOverviewPage: () => cy.get('#root > div > div:nth-of-type(1) > main > div > div:nth-of-type(3) > span'),
        objectStorageBucketBackButton: () => cy.get('[qa-element="to-storage"]'),   
        objectStorageRowPerName: (name) => cy.get('tbody').contains('tr', name), 
        objectStorageRowBucketOverviewButtonPerName: (name) => cy.get('tbody tr').contains('td', name).parent('tr').find('[qa-element="to-bucket"]'),
        
        bucketOverviewPageAddFilesBtnInUploadSection: () => cy.get('[qa-element="add-files"]'),        
        bucketOverviewPageAddFilesInputFieldInUploadArea: () => cy.get('#root > div > div:nth-of-type(1) > main > div > div:nth-of-type(5) > input'),
        bucketOverviewPageUploadBtnModalFileInputField: () => cy.get('body > div.fade.modal.show > div > div > div.modal-body > div.file-selector.mb-3 > input[type="file"]'),
        bucketOverviewPageUploadFileModalUploadBtn: () => cy.get('[qa-element="object-upload-submit"]'),
        uploadedFilePerName: (file) => cy.get('tbody').contains('tr', file), 
        uploadedFileXButtonPerName: (file) => cy.get('tbody tr').contains('td', file).parent('[qa-element="object-upload-close"]'),
        uploadFileModalPublicRightsCheckbox: () => cy.get('[qa-element="is-public"]'),
        fileUploadedGreenMsgPopUp: () => cy.get('.fade.toast.bg-success.show'),
        uploadedFileCheckboxPerName: (name) => cy.get('tbody tr').contains('td', name).parent('tr').find('td:nth-child(1) div input'),

        bucketOverviewPageSearchField: () => cy.get('[qa-element="search-input"]'),
        bucketOverviewPageReloadListBtn: () => cy.get('[qa-element="refresh-list"]'),
        bucketOverviewPageMoveAllBtn: () => cy.get('[qa-element="move-objects-show"]'), 
        moveToBucketModalFirstRowCheckbox: () => cy.get('[qa-element="select-bucket-0"]'),       
        moveToBucketModalConfirmBtn: () => cy.get('[qa-element="move-objects-submit"]'), 
        bucketOverviewPageDeleteSelectedBtn: () => cy.get('[qa-element="delete-files-show"]'),
        bucketOverviewPageDeleteModalDeleteBtn: () => cy.get('[qa-element="delete-files-submit"]'),
        bucketOverviewPageDeleteModalCancelBtn: () => cy.get('[qa-element="delete-files-cancel"]'),       
        bucketOverviewPageUploadBtn: () => cy.get('[qa-element="upload"]'),    
        bucketOverviewCopyBtnPerRowName: (file) => cy.get('tbody tr').contains('td', file).parent('tr').find('[qa-element="object-url-copy"]'),
        bucketOverviewDeleteBtnPerRowName: (file) => cy.get('tbody tr').contains('td', file).parent('tr').find('[qa-element="delete-object-show"]'),     
        bucketOverviewDeleteBtnPerRowNameConfirmDeleteModalDeleteBtn: () => cy.get('[qa-element="delete-object-submit"]'),         
        bucketOverviewDeleteBtnPerRowNameConfirmDeleteModalCancelBtn: () => cy.get('[qa-element="delete-object-cancel"]'),  
        bucketOverviewShowMoreBtn : () => cy.get('[qa-element="fetch-objects"]'), 
        bucketOverviewViewObjectBtnPerRowName: (object) => cy.get('tbody tr').contains('td', object).parent('tr').find('[qa-element="to-storage-see"]'),
        
        viewObjectUrlField: () => cy.get('[qa-element="get-object-url"]'), 
        viewObjectCopyBtn: () => cy.get('[qa-element="key-copy"]'),
        viewObjectDownloadBtn: () => cy.get('[qa-element="download-file"]'),
        viewObjectShareBtn: () => cy.get('[qa-element="share-show"]'),        
        viewObjectDeleteBtn: () => cy.get('[qa-element="delete-file-show"]'),        
        viewObjectConfirmDeleteBtn: () => cy.get('[qa-element="delete-file-submit"]'), 
        viewObjectShareFileModalDaysField: () => cy.get('[qa-element="days-mask"]'),
        viewObjectShareFileModalHoursField: () => cy.get('[qa-element="hours"]'),
        viewObjectShareFileModalMinutesField: () => cy.get('[qa-element="minutes-mask"]'),
        viewObjectShareFileModalGenerateBtn: () => cy.get('[qa-element="object-share-generate"]'),
        viewObjectShareFileModalGeneratedUrlLinkField: () => cy.get('[qa-element="url"]'),
        viewObjectShareFileModalCopyBtn: () => cy.get('[qa-element="object-share-copy"]'),   
        
        viewObjectVersionsTab: () => cy.get('[qa-element="tab-1"]'),
        viewObjectVersionsTabRowPerName: (name) => cy.get('tbody td').contains(name),
        viewObjectVersionsTabDownloadBtnInV1Row: () => cy.get('[qa-element="download-1"]'),        
        viewObjectVersionsTabShareBtnInV1Row: () => cy.get('[qa-element="share-1"]'),        
        viewObjectVersionsTabDeleteBtnInV1Row: () => cy.get('[qa-element="delete-version-1-show"]'),
        viewObjectVersionsTabConfirmDeleteBtn: () => cy.get('[qa-element="delete-version-submit"]'),

        settingsObjectRetentionCheckbox: () => cy.get('#retention'),
        settingsObjectRetentionPeriodInputField: () => cy.get('[qa-element="retention-mask"]'),         
        settingsObjectRetentionPeriodDropdownList: () => cy.get('[qa-element="retention-type-open"]'),         
        settingsObjectRetentionPeriodDropdownListYearOption: () => cy.get('[qa-element="retention-type-1"] div'),         
        settingsObjectRetentionPeriodDropdownListDayOption: () => cy.get('[qa-element="retention-type-0"] div'),          
        settingsObjectRetentionPeriodDropdownFieldInvalidMsg: () => cy.get('#root .bucket-settings-form .fade.mb-3.show small'),  
        settingsPageBucketOverviewBtn: () => cy.get('[qa-element="to-bucket-overview"]'),   

        objectStorageRowSettingsButtonPerName: (name) => cy.get('tbody tr').contains('td', name).parent('tr').find('[qa-element="to-bucket-settings"]'),
        objectStorageRowDeleteButtonPerName: (name) => cy.get('tbody tr').contains('td', name).parent('tr').find('[qa-element="bucket-delete"]'),
        bucketDeleteInputField: () => cy.get('[qa-element="bucket-key"]'),
        bucketDeleteBtn: () => cy.get('[qa-element="bucket-delete-submit"]'),           
        bucketCancelBtn: () => cy.get('[qa-element="bucket-delete-cancel"]'),         
    }
    actions = {
        // Object Storage Home page
        isVisibleObjectStoragePage: () => {
            this.elements.objectStoragePageTitle().should('be.visible')
        },
        clickOnUserAgreementLink: () => {
            this.elements.userAgreementLink().should('be.visible')
            this.elements.userAgreementLink().invoke('removeAttr', 'target').click()
        },
        clickOnPriceListLink: () => {
            this.elements.priceListLink().should('be.visible')
            this.elements.priceListLink().invoke('removeAttr', 'target').click()
        },
        clickOnTermsOfServiceLink: () => {
            this.elements.termsOfServiceLink().should('be.visible')
            this.elements.termsOfServiceLink().invoke('removeAttr', 'target').click()
        },
        clickOnAwsCliInstallationGuideLink: () => {
            this.elements.awsCliLink().should('be.visible')
            this.elements.awsCliLink().invoke('removeAttr', 'target').click()
        },
        clickAddNewBucketBtn: () => {
            this.elements.addNewBucketBtn().click()
        },
        clickCloseBtnInModal: () => {
            this.elements.closeButtonInAnyModal().click()
        },
        enterTextToBucketNameInputField: (text) => {
            this.elements.bucketNameInputField().clear().type(text)
        },
        checkInvalidBucketNameErrorLbl: (text) => {
            this.elements.invalidErrorMsgForBucketName().should('be.visible')
            this.elements.invalidErrorMsgForBucketName().contains(text)
        },
        clickPrivateOptionInAddBucketModal: () => {
            this.elements.privateOption().click()
        },
        isCheckedPrivateOptionRadioButton: () => {
            this.elements.privateOption().should('be.checked')
        },
        clickPublicReadOptionInAddBucketModal: () => {
            this.elements.publicReadOption().click()
        },
        isCheckedPublicReadOptionRadioButton: () => {
            this.elements.publicReadOption().should('be.checked')
        },
        clickPublicFullAccessOptionInAddBucketModal: () => {
            this.elements.publicFullAccessOption().click()
        },
        isCheckedPublicFullAccessOptionRadioButton: () => {
            this.elements.publicFullAccessOption().should('be.checked')
        },
        clickVersioningOptionInAddBucketModal: () => {
            this.elements.versioningOption().click()
        },
        isCheckedVersioningOptionRadioButton: () => {
            this.elements.versioningOption().should('be.checked')
        },
        isNotCheckedVersioningOptionRadioButton: () => {
            this.elements.versioningOption().should('not.be.checked')
        },
        clickBlockOptionInAddBucketModal: () => {
            this.elements.blockOption().click()
        },
        clickCreateBtnInAddModal: () => {
            this.elements.createButtonInNewBucketModal().click()
        },
        bucketSuccessAddedNew: () => {
            cy.wait('@dnsServerAddressAddNew', { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
            });
        },
        isVisibleAddBucketBtn: () => {
            this.elements.addNewBucketBtn().should('be.visible')
        },
        isVisibleCreatedBucket: (name) => {
            cy.wait(3000)
            this.elements.objectStorageRowPerName(name).should('be.visible')
        },
        clickObjectStorageBucketIconBtnPerName: (name) => {
            this.elements.objectStorageIconPerName(name).click()
        },
        clickObjectStorageBucketOverviewBtnPerName: (name) => {
            this.elements.objectStorageRowBucketOverviewButtonPerName(name).click()
        },
        clickObjectStorageBucketSettingsBtnPerName: (name) => {
            this.elements.objectStorageRowSettingsButtonPerName(name).click()
        },
        clickObjectStorageBucketDeleteBtnPerName: (name) => {
            this.elements.objectStorageRowDeleteButtonPerName(name).click()
        },
        enterTextToDeleteBucketInputField: (text) => {
            this.elements.bucketDeleteInputField().clear().type(text)
        },
        clickDeleteBtnInConfirmDeleteModal: () => {
            this.elements.bucketDeleteBtn().click()
        },
        clickCancelBtnInConfirmDeleteModal: () => {
            this.elements.bucketCancelBtn().click()
        },
        IsNotAvailableDeletedBucket: (name) => {
            this.elements.objectStorageRowPerName(name).should('not.exist')
        },
        IsAvailableUrlLink: () => {
            this.elements.userAgreementLink().should('exist')
        },
        // Bucket Overview Page
        clickBucketBackButton: () => {
            this.elements.objectStorageBucketBackButton().click()
        },
        isEnabledPrivateOption: () => {
            this.elements.privateOption().should('be.enabled')
        },
        isEnabledPublicReadOption: () => {
            this.elements.publicReadOption().should('be.enabled')
        },
        isEnabledPublicFullAccessOption: () => {
            this.elements.publicFullAccessOption().should('be.enabled')
        },
        isCheckedVersioningOption: () => {
            this.elements.versioningOption().should('be.checked')
        },
        isCheckedBlockOption: () => {
            this.elements.blockOptionInSettingsPage().should('be.checked').and('be.disabled')
        },
        AccessTypeEqualsTo: (type) => {
            this.elements.objectStorageAccessTypeText().invoke('text').should('eq', type);
        },
        BucketNameInOverviewPageEqualsTo: (name) => {
            this.elements.objectStorageNameInBucketOverviewPage().should('contain', name);
        },
        IsAvailableAddFilesBtn: () => {
            this.elements.bucketOverviewPageAddFilesBtnInUploadSection().should('exist')
        },
        clickAddFilesBtn: () => {
            this.elements.bucketOverviewPageAddFilesBtnInUploadSection().click()
        },
        attachFileToAddFilesInputField: (filename) => {
            this.elements.bucketOverviewPageAddFilesInputFieldInUploadArea().attachFile(filename, { force: true }); 
        },
        //Upload File Modal
        clickonUploadButtonInUploadFileModal: () => {
            this.elements.bucketOverviewPageUploadFileModalUploadBtn().click()
        },
        attachFileToAddFilesInputField2: (filename) => {
            this.elements.bucketOverviewPageUploadBtnModalFileInputField().attachFile(filename, { force: true }); 
        },
        enterTextToBucketSearchField: (text) => {
            this.elements.bucketOverviewPageSearchField().clear().type(text)
            this.elements.bucketOverviewPageSearchField().type('{enter}')
        },
        IsAvailableUploadedFile: (file) => {
            this.elements.uploadedFilePerName(file).should('exist')
        },
        IsNotAvailableUploadedFile: (file) => {
            this.elements.uploadedFilePerName(file).should('not.exist')
        },
        clickOnXButtonForUploadedFile: (file) => {
            this.elements.uploadedFileXButtonPerName(file).click()  
        },
        clickOnPublicRightsCheckbox: () => {
            this.elements.uploadFileModalPublicRightsCheckbox().click()
        },
        //Bucket Overview Page with uploaded file(s)
        IsVisibleFileUploadedGreenMsg: () => {
            this.elements.fileUploadedGreenMsgPopUp().should('be.visible')
        },
        clickOnShowMoreBtn: () => {
            this.elements.bucketOverviewShowMoreBtn().click()
        },
        clickOnCheckboxOfUploadedFileRowPerName: (name) => {
            this.elements.uploadedFileCheckboxPerName(name).check()
        },
        clickOnReloadListBtn: () => {
            this.elements.bucketOverviewPageReloadListBtn().click()
        },
        clickOnUploadBtnInBucketOverviewPage: () => {
            this.elements.bucketOverviewPageUploadBtn().click()
        },
        clickOnMoveSelectedButton: () => {
            this.elements.bucketOverviewPageMoveAllBtn().click()
        },
        clickOnCopyBtnOnFileRowPerName: (file) => {
            this.elements.bucketOverviewCopyBtnPerRowName(file).click()
        },
        clickOnViewObjectBtnOnFileRowPerName: (object) => {
            this.elements.bucketOverviewViewObjectBtnPerRowName(object).click()
        },
        clickOnDeleteBtnOnFileRowPerName: (file) => {
            this.elements.bucketOverviewDeleteBtnPerRowName(file).click()
        },
        //Delete file modal per row name 
        clickOnDeleteBtnInDeleteFileModalPerName: () => {
            this.elements.bucketOverviewDeleteBtnPerRowNameConfirmDeleteModalDeleteBtn().click()
        },
        clickOnCancelBtnInDeleteFileModalPerName: () => {
            this.elements.bucketOverviewDeleteBtnPerRowNameConfirmDeleteModalCancelBtn().click()
        },
        // Move files to another bucket modal
        clickOnFirstRowCheckboxInMoveToModalPerBucketName: (bucket) => {
            this.elements.moveToBucketModalFirstRowCheckbox(bucket).check()
        },
        clickOnConfirmBtnInMoveToModal: () => {
            this.elements.moveToBucketModalConfirmBtn().click()
        },
        //Delete file modal with Delete Selected btn
        clickOnDeleteSelectedBtn: () => {
            this.elements.bucketOverviewPageDeleteSelectedBtn().click()
        },
        clickOnDeleteBtnInConfirmDeleteModal: () => {
            this.elements.bucketOverviewPageDeleteModalDeleteBtn().click()
        },
        clickOnCancelBtnInConfirmDeleteModal: () => {
            this.elements.bucketOverviewPageDeleteModalCancelBtn().click()
        },
        // View Object page
        IsCheckedPublicAccessRightsCheckbox: () => {
            this.elements.uploadFileModalPublicRightsCheckbox().should('be.checked')
        },
        IsAvailableObjectUrlSectionInViewObject: () => {
            this.elements.viewObjectUrlField().should('exist')
        },
        IsNotCheckedPublicAccessRightsCheckbox: () => {
            this.elements.uploadFileModalPublicRightsCheckbox().should('not.be.checked')
        },
        IsNotAvailableObjectUrlSectionInViewObject: () => {
            this.elements.viewObjectUrlField().should('not.exist')
        },
        visitObjectUrlLinkAndValidate: () => {
            this.elements.viewObjectUrlField().invoke('val').then((url) => {
                cy.request(url).its('status').should('eq', 200);
        })},
        clickOnViewObjectCopyBtn: () => {
            this.elements.viewObjectCopyBtn().click()
        },
        clickOnViewObjectDownloadBtn: () => {
            this.elements.viewObjectDownloadBtn().click()
            cy.request(url).its('status').should('eq', 200);
        },
        clickDownloadBtnAndValidateStatus: () => {
            this.elements.viewObjectDownloadBtn().click()
            cy.window().then((win) => {
                    const downloadUrl = win.location.href;
                        cy.request(downloadUrl).its('status').should('eq', 200);
        })},
        clickOnViewObjectShareBtn: () => {
            this.elements.viewObjectShareBtn().click()
        }, 
        enterTextToShareModalDaysField: (number) => {
            this.elements.viewObjectShareFileModalDaysField().clear().type(number)
        },
        enterTextToShareModalHoursField: (number) => {
            this.elements.viewObjectShareFileModalHoursField().clear().type(number)
        },
        enterTextToShareModalMinutesField: (number) => {
            this.elements.viewObjectShareFileModalMinutesField().clear().type(number)
        },
        clickOnViewObjectShareModalGenerateBtn: () => {
            this.elements.viewObjectShareFileModalGenerateBtn().click()
        }, 
        clickOnViewObjectShareModalCopyBtn: () => {
            this.elements.viewObjectShareFileModalCopyBtn().click()
        }, 
        visitShareModalGeneratedUrlLinkAndValidate: () => {
            this.elements.viewObjectShareFileModalGeneratedUrlLinkField().invoke('val').then((url) => {
                cy.request(url).its('status').should('eq', 200);
        })},
        clickOnViewObjectDeleteBtn: () => {
            this.elements.viewObjectDeleteBtn().click()
        },
        clickOnViewObjectConfirmDeleteBtn: () => {
            this.elements.viewObjectConfirmDeleteBtn().click()
        },
        // View Object - Versioning tab
        clickOnVersioningTab: (name) =>{
            this.elements.viewObjectVersionsTab().click()
            this.elements.viewObjectVersionsTabRowPerName(name).should('exist')
        },
        clickOnViewObjectVersionsTabV1RowDownloadBtn: () =>{
            this.elements.viewObjectVersionsTabDownloadBtnInV1Row().should('exist')
            this.elements.viewObjectVersionsTabDownloadBtnInV1Row().click()
            cy.window().then((win) => {
                    const downloadUrl = win.location.href;
                        cy.request(downloadUrl).its('status').should('eq', 200);
        })},
        clickOnViewObjectVersionsTabV1RowShareBtn: () =>{
            this.elements.viewObjectVersionsTabShareBtnInV1Row().click()
        },
        clickOnViewObjectVersionsTabShareModalCloseBtn: () =>{
            this.elements.closeButtonInShareModal().click()
        },
        clickOnViewObjectVersionsTabV1RowDeleteBtn: () =>{
            this.elements.viewObjectVersionsTabDeleteBtnInV1Row().click()
            this.elements.viewObjectVersionsTabConfirmDeleteBtn().click()
        },
        IsNotAvailableVersionsTabInViewObject: () => {
            this.elements.viewObjectVersionsTab().should('not.exist')
        },

        //Settings - Object Retention
        clickObjectRetentionCheckbox: () => {
            this.elements.settingsObjectRetentionCheckbox().click()
        },
        IsCheckedObjectRetentionCheckbox: () => {
            this.elements.settingsObjectRetentionCheckbox().should('be.checked')
            this.elements.settingsObjectRetentionPeriodInputField().should('exist')
        },
        IsNotCheckedObjectRetentionCheckbox: () => {
            this.elements.settingsObjectRetentionCheckbox().should('not.be.checked')            
            this.elements.settingsObjectRetentionPeriodInputField().should('not.exist')
        },
        enterNumberToObjectRetentionField: (number) => {
            this.elements.settingsObjectRetentionPeriodInputField().clear({ force: true }).type(number)
        },
        clearObjectRetentionField: () => {
            this.elements.settingsObjectRetentionPeriodInputField().clear({ force: true })
            cy.wait(3000)
        },
        valueInObjectRetentionFieldEqualsTo: (value) => {
            this.elements.settingsObjectRetentionPeriodInputField().should('have.value', value)
        },
        valueInObjectRetentionDropdownListEqualsTo: (value) => {
            this.elements.settingsObjectRetentionPeriodDropdownList().should('contain.text', value)
        },
        selectYearInRetentionDropdownList: () => {            
            this.elements.settingsObjectRetentionPeriodDropdownList().click()
            cy.wait(1000)
            this.elements.settingsObjectRetentionPeriodDropdownListYearOption().click({ force: true })
        },
        selectDayInRetentionDropdownList: () => {            
            this.elements.settingsObjectRetentionPeriodDropdownList().click()
            this.elements.settingsObjectRetentionPeriodDropdownListDayOption().click({ force: true })           
        },
        invalidMessageInObjectRetentionFieldEqualsTo: (text) => {
            this.elements.settingsObjectRetentionPeriodDropdownFieldInvalidMsg().should('contain', text)
        },
        clickOnSettingsPageBucketOverviewBtn: () => {            
            this.elements.settingsPageBucketOverviewBtn().click()
        },
    }
}

module.exports = new ObjectStorage()