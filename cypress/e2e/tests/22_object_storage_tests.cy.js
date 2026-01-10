cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import sidebar from "../pages/sidebar";
import object_storage_page from "../pages/object_storage_page";

describe('22.Object Storage Tests', () => {
    let configData;
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('GET', `${configData.base_url}panel-main/storage/api/v1/buckets?maxBuckets=8`).as('objectStorageAddNew');
    })
    it('PD-527 User Agreement link validation', () => { // Test Cases 459-467
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.clickOnUserAgreementLink()
        cy.wait(1000);
        cy.go('back');
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.isVisibleAddBucketBtn()
    })
    it('PD-528 Price List link validation', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.clickOnPriceListLink()
        cy.wait(1000);
        cy.go('back');
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.isVisibleAddBucketBtn()
    })
    it('PD-529 Terms Of Service link validation', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.clickOnTermsOfServiceLink()
        cy.wait(1000);
        cy.go('back');
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.isVisibleAddBucketBtn()
    })
    it('PD-530 AWS CLI Installation Guide link validation ', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.clickOnAwsCliInstallationGuideLink()
        cy.wait(1000);
        cy.go('back');
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.isVisibleAddBucketBtn()
    })
    it('PD-531, PD-538, PD-543 Creating bucket with valid name for any mode (successful)', () => {
        const testData = {
            bucketName: 'private-bucket',
            accessType: 'Приватный'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickAddNewBucketBtn()
        object_storage_page.actions.enterTextToBucketNameInputField(testData.bucketName)
        object_storage_page.actions.clickCreateBtnInAddModal()
        object_storage_page.actions.isVisibleCreatedBucket(testData.bucketName)
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_page.actions.BucketNameInOverviewPageEqualsTo(testData.bucketName)
        object_storage_page.actions.AccessTypeEqualsTo(testData.accessType)
        object_storage_page.actions.clickBucketBackButton()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        object_storage_page.actions.isEnabledPrivateOption()
    })
    it('PD-532 Creating bucket with uppercase letter name (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickAddNewBucketBtn()
        object_storage_page.actions.enterTextToBucketNameInputField('TEST')
        object_storage_page.actions.clickCreateBtnInAddModal()
        object_storage_page.actions.checkInvalidBucketNameErrorLbl('Название не соответствует правилу')
    })
    it('PD-533 Creating bucket with Cyrilic name (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickAddNewBucketBtn()
        object_storage_page.actions.enterTextToBucketNameInputField('объектном-хранилище')
        object_storage_page.actions.clickCreateBtnInAddModal()
        object_storage_page.actions.checkInvalidBucketNameErrorLbl('Название не соответствует правилу')
    })
    it('PD-534 Creating bucket with less than min length name (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickAddNewBucketBtn()
        object_storage_page.actions.enterTextToBucketNameInputField('ab')
        object_storage_page.actions.clickCreateBtnInAddModal()
        object_storage_page.actions.checkInvalidBucketNameErrorLbl('Неверное значение')
    })
    it('PD-535 Creating bucket with empty name (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickAddNewBucketBtn()
        object_storage_page.actions.clickCreateBtnInAddModal()
        object_storage_page.actions.checkInvalidBucketNameErrorLbl('Обязательное поле')
    })
    it('PD-536 Creating bucket with existing bucket name (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickAddNewBucketBtn()
        object_storage_page.actions.enterTextToBucketNameInputField('private-bucket')
        object_storage_page.actions.clickCreateBtnInAddModal()
        object_storage_page.actions.checkInvalidBucketNameErrorLbl('Бакет с таким названием уже существует.')
    })
    it('PD-537 Creating bucket with math symbols/space name (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickAddNewBucketBtn()
        object_storage_page.actions.enterTextToBucketNameInputField('123#$%^&* *()_+')
        object_storage_page.actions.clickCreateBtnInAddModal()
        object_storage_page.actions.checkInvalidBucketNameErrorLbl('Название не соответствует правилу')
    })
    it('PD-539 Creating bucket for Public-read mode', () => {
        const testData = {
            bucketName: 'public-read-bucket',
            accessType: 'Публичный - чтение'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickAddNewBucketBtn()
        object_storage_page.actions.enterTextToBucketNameInputField(testData.bucketName)
        object_storage_page.actions.clickPublicReadOptionInAddBucketModal()
        object_storage_page.actions.clickCreateBtnInAddModal()
        object_storage_page.actions.isVisibleCreatedBucket(testData.bucketName)
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName)
        object_storage_page.actions.BucketNameInOverviewPageEqualsTo(testData.bucketName)
        cy.wait(1000)
        object_storage_page.actions.AccessTypeEqualsTo(testData.accessType)
        object_storage_page.actions.BucketNameInOverviewPageEqualsTo(testData.bucketName)
        object_storage_page.actions.clickBucketBackButton()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        object_storage_page.actions.isEnabledPublicReadOption()
    })
    it('PD-544 Bucket overview - Uploading file with Add files', () => {
        const testData = {
            bucketName: 'private-bucket',
            filename: 'txt file.txt'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_page.actions.clickAddFilesBtn()
        object_storage_page.actions.attachFileToAddFilesInputField('/files/' + testData.filename)
        object_storage_page.actions.IsAvailableUploadedFile(testData.filename)
        object_storage_page.actions.clickonUploadButtonInUploadFileModal()
        cy.wait(2000)
        object_storage_page.actions.IsVisibleFileUploadedGreenMsg()
        object_storage_page.actions.IsAvailableUploadedFile(testData.filename)
    })
    it('PD-545 Bucket overview - Uploading multiple files with Add files', () => {
        const testData =
        {
            bucketName: 'private-bucket',
            filesToUpload: ['csv file.csv', 'excel file.xlsx', 'jpeg file.jpg', 'pdf file.pdf', 'png file.png', 'word file.docx', 'zip file.zip']
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_page.actions.clickOnUploadBtnInBucketOverviewPage()
        object_storage_page.actions.clickAddFilesBtn()
        object_storage_page.actions.attachFileToAddFilesInputField2(testData.filesToUpload.map(f => `files/${f}`))
        object_storage_page.actions.clickonUploadButtonInUploadFileModal()
        cy.wait(15000)
        testData.filesToUpload.forEach(fileName => {
            object_storage_page.actions.IsAvailableUploadedFile(fileName)
        })
    })
    it('PD-553 Bucket overview - Move selected object to another bucket', () => {
        const testData = {
            bucketName1: 'private-bucket',
            bucketName2: 'public-read-bucket',
            filename: 'txt file.txt'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName1)
        object_storage_page.actions.enterTextToBucketSearchField(testData.filename)
        object_storage_page.actions.clickOnCheckboxOfUploadedFileRowPerName(testData.filename)
        object_storage_page.actions.clickOnMoveSelectedButton()
        object_storage_page.actions.clickOnFirstRowCheckboxInMoveToModalPerBucketName()
        object_storage_page.actions.clickOnConfirmBtnInMoveToModal()
        cy.wait(2000)
        object_storage_page.actions.clickBucketBackButton()
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName2)
        object_storage_page.actions.IsAvailableUploadedFile(testData.filename)
    })
    it('PD-554 Bucket overview - Move selected multiple objects to another bucket', () => {
        const testData = {
            bucketName1: 'private-bucket',
            bucketName2: 'public-read-bucket',
            filesToUpload: ['csv file.csv', 'excel file.xlsx', 'jpeg file.jpg', 'pdf file.pdf', 'png file.png', 'word file.docx', 'zip file.zip']
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName1)
        object_storage_page.actions.clickOnMoveSelectedButton()
        object_storage_page.actions.clickOnFirstRowCheckboxInMoveToModalPerBucketName()
        object_storage_page.actions.clickOnConfirmBtnInMoveToModal()
        cy.wait(2000)
        object_storage_page.actions.IsAvailableAddFilesBtn()
        object_storage_page.actions.clickBucketBackButton()
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName2)
        //object_storage_page.actions.clickOnShowMoreBtn()
        //cy.wait(3000)     
        testData.filesToUpload.forEach(fileName => {
            object_storage_page.actions.IsAvailableUploadedFile(fileName)
        })
    })
    it('PD-555, PD-552 Bucket overview - Delete selected object (s)', () => {
        const testData = {
            bucketName2: 'public-read-bucket',
            filesToUpload: ['txt file.txt', 'csv file.csv', 'excel file.xlsx', 'jpeg file.jpg', 'pdf file.pdf', 'png file.png', 'word file.docx', 'zip file.zip']
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName2)
        testData.filesToUpload.forEach(fileName => {
            object_storage_page.actions.clickOnCheckboxOfUploadedFileRowPerName(fileName)
        })
        object_storage_page.actions.clickOnDeleteSelectedBtn()
        object_storage_page.actions.clickOnDeleteBtnInConfirmDeleteModal()
        cy.wait(2000)
        object_storage_page.actions.clickOnReloadListBtn()
        object_storage_page.actions.IsAvailableAddFilesBtn()
    })
    it('PD-548 Bucket overview - Uploading file(s) with Public access rights', () => {
        const testData = {
            bucketName: 'private-bucket',
            filename: 'txt file.txt'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_page.actions.clickAddFilesBtn()
        object_storage_page.actions.attachFileToAddFilesInputField('/files/' + testData.filename)
        object_storage_page.actions.IsAvailableUploadedFile(testData.filename)
        object_storage_page.actions.clickOnPublicRightsCheckbox()
        object_storage_page.actions.clickonUploadButtonInUploadFileModal()
        cy.wait(2000)
        object_storage_page.actions.IsVisibleFileUploadedGreenMsg()
        object_storage_page.actions.IsAvailableUploadedFile(testData.filename)
        object_storage_page.actions.clickOnViewObjectBtnOnFileRowPerName(testData.filename)
        object_storage_page.actions.IsCheckedPublicAccessRightsCheckbox()
        object_storage_page.actions.IsAvailableObjectUrlSectionInViewObject()
        object_storage_page.actions.clickOnViewObjectCopyBtn()
        object_storage_page.actions.visitObjectUrlLinkAndValidate()
    })
    it('PD-550-551-556-557 Bucket overview - Search, Copy, Delete object', () => { // 4 test cases in 1 autotest
        const testData = {
            bucketName1: 'private-bucket',
            filename: 'txt file.txt',
            invalidFilename: 'invalid'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName1)
        object_storage_page.actions.enterTextToBucketSearchField(testData.invalidFilename) // searching for invalid object
        object_storage_page.actions.IsAvailableAddFilesBtn()
        object_storage_page.actions.enterTextToBucketSearchField(testData.filename) // searching for valid object
        object_storage_page.actions.clickOnCopyBtnOnFileRowPerName(testData.filename) // copying object url
        object_storage_page.actions.clickOnDeleteBtnOnFileRowPerName(testData.filename) // deleting object
        object_storage_page.actions.clickOnDeleteBtnInDeleteFileModalPerName()
        cy.wait(1000)
        object_storage_page.actions.IsAvailableAddFilesBtn(testData.filename)
    })
    it('PD-558 View object - Download', () => {
        const testData = {
            bucketName: 'private-bucket',
            filename: 'txt file.txt'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_page.actions.clickAddFilesBtn()
        object_storage_page.actions.attachFileToAddFilesInputField('/files/' + testData.filename)
        object_storage_page.actions.IsAvailableUploadedFile(testData.filename)
        object_storage_page.actions.clickonUploadButtonInUploadFileModal()
        cy.wait(2000)
        object_storage_page.actions.IsVisibleFileUploadedGreenMsg()
        object_storage_page.actions.IsAvailableUploadedFile(testData.filename)
        object_storage_page.actions.clickOnViewObjectBtnOnFileRowPerName(testData.filename)
        object_storage_page.actions.clickDownloadBtnAndValidateStatus()
        cy.wait(2000)
    })
    it('PD-559-560-561 View Object - Share button, changing Expire time', () => { // 3 test cases in 1 autotest
        const testData = {
            bucketName: 'private-bucket',
            filename: 'txt file.txt'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_page.actions.clickOnViewObjectBtnOnFileRowPerName(testData.filename)
        object_storage_page.actions.clickOnViewObjectShareBtn()
        object_storage_page.actions.clickCloseBtnInModal()       // Share Modal X icon clicking  
        object_storage_page.actions.clickOnViewObjectShareBtn()
        object_storage_page.actions.enterTextToShareModalDaysField('2')   // Share Modal link expiration time changing
        object_storage_page.actions.enterTextToShareModalHoursField('5')
        object_storage_page.actions.enterTextToShareModalMinutesField('30')
        object_storage_page.actions.clickOnViewObjectShareModalGenerateBtn()
        object_storage_page.actions.clickOnViewObjectShareModalCopyBtn()   // Share Modal Copy button clicking
        object_storage_page.actions.visitShareModalGeneratedUrlLinkAndValidate()
        cy.wait(2000)
    })
    it('PD-562-563-564 View Object - Enable, Disable Public rights, Delete in View Object', () => { // 3 test cases in 1 autotest
        const testData = {
            bucketName: 'private-bucket',
            filename: 'txt file.txt'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_page.actions.clickOnViewObjectBtnOnFileRowPerName(testData.filename)
        object_storage_page.actions.clickOnPublicRightsCheckbox()       //  enabling public access rights 
        object_storage_page.actions.IsCheckedPublicAccessRightsCheckbox()
        object_storage_page.actions.clickOnPublicRightsCheckbox()        // disabling public access rights
        object_storage_page.actions.IsNotCheckedPublicAccessRightsCheckbox()
        object_storage_page.actions.clickOnViewObjectDeleteBtn()
        object_storage_page.actions.clickOnViewObjectConfirmDeleteBtn()   // deleting object in View Object page
        object_storage_page.actions.IsAvailableAddFilesBtn()
        cy.wait(2000)
    })
    it('PD-565-566-567-568-569 Settings page - changing bucket types', () => { // 5 test cases in 1 autotest
        const testData = {
            bucketName: 'private-bucket',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_page.actions.clickPublicReadOptionInAddBucketModal() //  changing to Public-read mode
        object_storage_page.actions.isCheckedPublicReadOptionRadioButton()
        object_storage_page.actions.clickPublicFullAccessOptionInAddBucketModal()   // changing to Public-full-access mode    
        object_storage_page.actions.isCheckedPublicFullAccessOptionRadioButton()
        object_storage_page.actions.clickVersioningOptionInAddBucketModal()    // enabling Versioning mode
        object_storage_page.actions.isCheckedVersioningOptionRadioButton()
        object_storage_page.actions.clickVersioningOptionInAddBucketModal()    //disabling Versioning mode
        object_storage_page.actions.isNotCheckedVersioningOptionRadioButton()
        object_storage_page.actions.clickPrivateOptionInAddBucketModal() // changing to Private mode
        object_storage_page.actions.clickBucketBackButton()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        object_storage_page.actions.isCheckedPrivateOptionRadioButton()
    })
    it('PD-540 Creating bucket for Public-full access mode', () => {
        const testData = {
            bucketName: 'public-ful-access-bucket',
            accessType: 'Публичный - полный доступ'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickAddNewBucketBtn()
        object_storage_page.actions.enterTextToBucketNameInputField(testData.bucketName)
        object_storage_page.actions.clickPublicFullAccessOptionInAddBucketModal()
        object_storage_page.actions.clickCreateBtnInAddModal()
        object_storage_page.actions.isVisibleCreatedBucket(testData.bucketName)
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_page.actions.BucketNameInOverviewPageEqualsTo(testData.bucketName)
        object_storage_page.actions.AccessTypeEqualsTo(testData.accessType)
        object_storage_page.actions.clickBucketBackButton()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        object_storage_page.actions.isEnabledPublicFullAccessOption()
    })
    it('PD-541 Creating bucket for Versioning access mode', () => {
        const testData = {
            bucketName: 'versioning-bucket',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickAddNewBucketBtn()
        object_storage_page.actions.enterTextToBucketNameInputField(testData.bucketName)
        object_storage_page.actions.clickVersioningOptionInAddBucketModal()
        object_storage_page.actions.clickCreateBtnInAddModal()
        object_storage_page.actions.isVisibleCreatedBucket(testData.bucketName)
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_page.actions.BucketNameInOverviewPageEqualsTo(testData.bucketName)
        object_storage_page.actions.clickBucketBackButton()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        object_storage_page.actions.isCheckedVersioningOption()
    })
    it('PD-542 Creating bucket for Block access mode', () => {
        const testData = {
            bucketName: 'block-bucket',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickAddNewBucketBtn()
        object_storage_page.actions.enterTextToBucketNameInputField(testData.bucketName)
        object_storage_page.actions.clickBlockOptionInAddBucketModal()
        object_storage_page.actions.clickCreateBtnInAddModal()
        object_storage_page.actions.isVisibleCreatedBucket(testData.bucketName)
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_page.actions.BucketNameInOverviewPageEqualsTo(testData.bucketName)
        object_storage_page.actions.clickBucketBackButton()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        object_storage_page.actions.isCheckedBlockOption()
    })
    it('PD-752 Creating bucket for Block + Versioning combined modes', () => {
        const testData = {
            bucketName: 'version-block-mix-buck',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickAddNewBucketBtn()
        object_storage_page.actions.enterTextToBucketNameInputField(testData.bucketName)
        object_storage_page.actions.clickVersioningOptionInAddBucketModal()
        object_storage_page.actions.clickBlockOptionInAddBucketModal()
        object_storage_page.actions.clickCreateBtnInAddModal()
        object_storage_page.actions.isVisibleCreatedBucket(testData.bucketName)
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_page.actions.BucketNameInOverviewPageEqualsTo(testData.bucketName)
        object_storage_page.actions.clickBucketBackButton()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        object_storage_page.actions.isCheckedVersioningOption()
        object_storage_page.actions.isCheckedBlockOption()
    })
    it('PD-570-574, 773 Settings page - Object Retention tests', () => { // 6 test cases in 1 autotest
        const testData = {
            bucketName: 'version-block-mix-buck',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_page.actions.clickObjectRetentionCheckbox() //  enabling Object retention
        object_storage_page.actions.IsCheckedObjectRetentionCheckbox()
        object_storage_page.actions.enterNumberToObjectRetentionField('5')
        object_storage_page.actions.selectYearInRetentionDropdownList()    // Object retention with years
        object_storage_page.actions.clickBucketBackButton()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        object_storage_page.actions.valueInObjectRetentionFieldEqualsTo('5')
        object_storage_page.actions.valueInObjectRetentionDropdownListEqualsTo('лет')
        object_storage_page.actions.enterNumberToObjectRetentionField('6')
        object_storage_page.actions.selectDayInRetentionDropdownList()    // Object retention with days
        object_storage_page.actions.clickBucketBackButton()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        object_storage_page.actions.valueInObjectRetentionFieldEqualsTo('6')
        object_storage_page.actions.valueInObjectRetentionDropdownListEqualsTo('дней')
        object_storage_page.actions.clearObjectRetentionField()
        object_storage_page.actions.invalidMessageInObjectRetentionFieldEqualsTo('Обязательное поле') // Object retention field is empty
        object_storage_page.actions.clickObjectRetentionCheckbox() //  disabling Object retention
        object_storage_page.actions.IsNotCheckedObjectRetentionCheckbox()
        object_storage_page.actions.clickOnSettingsPageBucketOverviewBtn()  //  Bucket Overview button
        object_storage_page.actions.IsAvailableAddFilesBtn()
    })
    it('PD-769-772 Versions tab - Versioning tests', () => {
        const testData = {
            bucketName: 'version-block-mix-buck',
            filename: 'txt file.txt'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketIconBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_page.actions.clickAddFilesBtn()
        object_storage_page.actions.attachFileToAddFilesInputField('/files/' + testData.filename)
        object_storage_page.actions.IsAvailableUploadedFile(testData.filename)
        object_storage_page.actions.clickonUploadButtonInUploadFileModal()
        cy.wait(2000)
        object_storage_page.actions.IsVisibleFileUploadedGreenMsg()
        object_storage_page.actions.IsAvailableUploadedFile(testData.filename)
        object_storage_page.actions.clickOnUploadBtnInBucketOverviewPage()
        object_storage_page.actions.clickAddFilesBtn()
        object_storage_page.actions.attachFileToAddFilesInputField2('/files/' + testData.filename)
        object_storage_page.actions.clickonUploadButtonInUploadFileModal()
        object_storage_page.actions.clickOnViewObjectBtnOnFileRowPerName(testData.filename)
        object_storage_page.actions.clickOnVersioningTab('V1')  // Versions tab display
        object_storage_page.actions.clickOnViewObjectVersionsTabV1RowDownloadBtn()  // Versions tab - Download btn
        object_storage_page.actions.clickOnViewObjectVersionsTabV1RowShareBtn() // Versions tab - Share btn
        object_storage_page.actions.clickOnViewObjectVersionsTabShareModalCloseBtn()
        object_storage_page.actions.clickOnViewObjectVersionsTabV1RowDeleteBtn()  // Versions tab - Delete btn
        cy.wait(2000)
        object_storage_page.actions.IsNotAvailableVersionsTabInViewObject()
    })
    it('PD-747 Delete Public-read bucket', () => {
        const testData = {
            bucketName: 'public-read-bucket',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketDeleteBtnPerName(testData.bucketName)
        object_storage_page.actions.enterTextToDeleteBucketInputField(testData.bucketName)
        object_storage_page.actions.clickDeleteBtnInConfirmDeleteModal()
        cy.wait(1000)
        object_storage_page.actions.IsNotAvailableDeletedBucket(testData.bucketName)
    })
    it('PD-748 Delete Public-full-access bucket', () => {
        const testData = {
            bucketName: 'public-ful-access-bucket',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketDeleteBtnPerName(testData.bucketName)
        object_storage_page.actions.enterTextToDeleteBucketInputField(testData.bucketName)
        object_storage_page.actions.clickDeleteBtnInConfirmDeleteModal()
        cy.wait(1000)
        object_storage_page.actions.IsNotAvailableDeletedBucket(testData.bucketName)
    })
    it('PD-749 Delete Versioning bucket', () => {
        const testData = {
            bucketName: 'versioning-bucket',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketDeleteBtnPerName(testData.bucketName)
        object_storage_page.actions.enterTextToDeleteBucketInputField(testData.bucketName)
        object_storage_page.actions.clickDeleteBtnInConfirmDeleteModal()
        cy.wait(1000)
        object_storage_page.actions.IsNotAvailableDeletedBucket(testData.bucketName)
    })
    it('PD-750 Delete Block bucket', () => {
        const testData = {
            bucketName: 'block-bucket',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketDeleteBtnPerName(testData.bucketName)
        object_storage_page.actions.enterTextToDeleteBucketInputField(testData.bucketName)
        object_storage_page.actions.clickDeleteBtnInConfirmDeleteModal()
        cy.wait(1000)
        object_storage_page.actions.IsNotAvailableDeletedBucket(testData.bucketName)
    })
    it('PD-751, 774 Delete Versioning and Block combined bucket', () => {
        const testData = {
            bucketName: 'version-block-mix-buck',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketDeleteBtnPerName(testData.bucketName) // Delete bucket that contains objects inside
        object_storage_page.actions.enterTextToDeleteBucketInputField(testData.bucketName)
        object_storage_page.actions.clickDeleteBtnInConfirmDeleteModal()
        cy.wait(10000)
        object_storage_page.actions.clickObjectStorageBucketDeleteBtnPerName(testData.bucketName) // Delete empty bucket itself
        object_storage_page.actions.enterTextToDeleteBucketInputField(testData.bucketName)
        object_storage_page.actions.clickDeleteBtnInConfirmDeleteModal()
        cy.wait(1000)
        object_storage_page.actions.IsNotAvailableDeletedBucket(testData.bucketName)
    })
    it('PD-588 Delete Private bucket', () => {
        const testData = {
            bucketName: 'private-bucket',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketDeleteBtnPerName(testData.bucketName)
        object_storage_page.actions.enterTextToDeleteBucketInputField(testData.bucketName)
        object_storage_page.actions.clickDeleteBtnInConfirmDeleteModal()
        cy.wait(1000)
        object_storage_page.actions.IsAvailableUrlLink()
    })
})