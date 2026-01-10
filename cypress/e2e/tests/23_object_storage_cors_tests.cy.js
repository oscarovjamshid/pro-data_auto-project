cy.on('uncaught:exception', (err, runnable) => {
    return false;
});
import sidebar from "../pages/sidebar";
import object_storage_page from "../pages/object_storage_page";
import object_storage_cors_page from "../pages/object_storage_cors_page";

describe('23.Object Storage CORS Rules Tests', () => {
    let configData;
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
    })
    it('PD-575 Settings - Adding CORS rules with GET method', () => {
        const testData =
        {
            bucketName: 'cors-rules-bucket', allowedOriginName: 'test origin', allowedHeadersName: 'test header', exposeHeadersName: 'test expose',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickAddNewBucketBtn()
        object_storage_page.actions.enterTextToBucketNameInputField(testData.bucketName)
        object_storage_page.actions.clickCreateBtnInAddModal()
        object_storage_page.actions.isVisibleCreatedBucket(testData.bucketName)
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_cors_page.actions.clickOnAddCorsRulesBtn()
        object_storage_cors_page.actions.enterTextToAllowedOriginsInputField(testData.allowedOriginName)
        object_storage_cors_page.actions.checkGetCheckbox()
        object_storage_cors_page.actions.enterTextToAllowedHeadersInputField(testData.allowedHeadersName)
        object_storage_cors_page.actions.enterTextToExposeHeadersInputField(testData.exposeHeadersName)
        object_storage_cors_page.actions.clickOnSaveCorsRulesBtnInAddModal()
        object_storage_cors_page.actions.isVisibleCreatedCorsRule('GET')
    })
    it('PD-576 Settings - Adding CORS rules with POST method', () => {
        const testData =
        {
            bucketName: 'cors-rules-bucket', allowedOriginName: 'test origin', allowedHeadersName: 'test header', exposeHeadersName: 'test expose',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_cors_page.actions.clickOnAddCorsRulesBtn()
        object_storage_cors_page.actions.enterTextToAllowedOriginsInputField(testData.allowedOriginName)
        object_storage_cors_page.actions.checkPostCheckbox()
        object_storage_cors_page.actions.enterTextToAllowedHeadersInputField(testData.allowedHeadersName)
        object_storage_cors_page.actions.enterTextToExposeHeadersInputField(testData.exposeHeadersName)
        object_storage_cors_page.actions.clickOnSaveCorsRulesBtnInAddModal()
        object_storage_cors_page.actions.isVisibleCreatedCorsRule('POST')
    })
    it('PD-577 Settings - Adding CORS rules with PUT method', () => {
        const testData =
        {
            bucketName: 'cors-rules-bucket', allowedOriginName: 'test origin', allowedHeadersName: 'test header', exposeHeadersName: 'test expose',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_cors_page.actions.clickOnAddCorsRulesBtn()
        object_storage_cors_page.actions.enterTextToAllowedOriginsInputField(testData.allowedOriginName)
        object_storage_cors_page.actions.checkPutCheckbox()
        object_storage_cors_page.actions.enterTextToAllowedHeadersInputField(testData.allowedHeadersName)
        object_storage_cors_page.actions.enterTextToExposeHeadersInputField(testData.exposeHeadersName)
        object_storage_cors_page.actions.clickOnSaveCorsRulesBtnInAddModal()
        object_storage_cors_page.actions.isVisibleCreatedCorsRule('PUT')
    })
    it('PD-578 Settings - Adding CORS rules with DELETE method', () => {
        const testData =
        {
            bucketName: 'cors-rules-bucket', allowedOriginName: 'test origin', allowedHeadersName: 'test header', exposeHeadersName: 'test expose',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_cors_page.actions.clickOnAddCorsRulesBtn()
        object_storage_cors_page.actions.enterTextToAllowedOriginsInputField(testData.allowedOriginName)
        object_storage_cors_page.actions.checkDeleteCheckbox()
        object_storage_cors_page.actions.enterTextToAllowedHeadersInputField(testData.allowedHeadersName)
        object_storage_cors_page.actions.enterTextToExposeHeadersInputField(testData.exposeHeadersName)
        object_storage_cors_page.actions.clickOnSaveCorsRulesBtnInAddModal()
        object_storage_cors_page.actions.isVisibleCreatedCorsRule('DELETE')
    })
    it('PD-579 Settings - Adding CORS rules with HEAD method', () => {
        const testData =
        {
            bucketName: 'cors-rules-bucket', allowedOriginName: 'test origin', allowedHeadersName: 'test header', exposeHeadersName: 'test expose',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_cors_page.actions.clickOnAddCorsRulesBtn()
        object_storage_cors_page.actions.enterTextToAllowedOriginsInputField(testData.allowedOriginName)
        object_storage_cors_page.actions.checkHeadCheckbox()
        object_storage_cors_page.actions.enterTextToAllowedHeadersInputField(testData.allowedHeadersName)
        object_storage_cors_page.actions.enterTextToExposeHeadersInputField(testData.exposeHeadersName)
        object_storage_cors_page.actions.clickOnSaveCorsRulesBtnInAddModal()
        object_storage_cors_page.actions.isVisibleCreatedCorsRule('HEAD')
    })
    it('PD-580 Settings - Adding CORS rules with multiple Allowed Origins', () => {
        const testData =
        {
            bucketName: 'cors-rules-bucket', allowedOriginName: 'test origin', allowedOriginName2: 'test origin-2', allowedHeadersName: 'test header', exposeHeadersName: 'test expose',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_cors_page.actions.clickOnAddCorsRulesBtn()
        object_storage_cors_page.actions.enterTextToAllowedOriginsInputField(testData.allowedOriginName)
        object_storage_cors_page.actions.clickAddBtnUnderAllowedOriginsField()
        object_storage_cors_page.actions.enterTextToSecondAllowedOriginsInputField(testData.allowedOriginName2)
        object_storage_cors_page.actions.checkGetCheckbox()
        object_storage_cors_page.actions.enterTextToAllowedHeadersInputField(testData.allowedHeadersName)
        object_storage_cors_page.actions.enterTextToExposeHeadersInputField(testData.exposeHeadersName)
        object_storage_cors_page.actions.clickOnSaveCorsRulesBtnInAddModal()
        object_storage_cors_page.actions.isVisibleCreatedCorsRule(testData.allowedOriginName2)
    })
    it('PD-581 Settings - Adding CORS rules with multiple Allowed Methods', () => {
        const testData =
        {
            bucketName: 'cors-rules-bucket', allowedOriginName: 'test origin', allowedHeadersName: 'test header', exposeHeadersName: 'test expose', allowedMethods: 'GET, PUT, DELETE, HEAD, POST'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_cors_page.actions.clickOnAddCorsRulesBtn()
        object_storage_cors_page.actions.enterTextToAllowedOriginsInputField(testData.allowedOriginName)
        object_storage_cors_page.actions.checkGetCheckbox()
        object_storage_cors_page.actions.checkPostCheckbox()
        object_storage_cors_page.actions.checkPutCheckbox()
        object_storage_cors_page.actions.checkDeleteCheckbox()
        object_storage_cors_page.actions.checkHeadCheckbox()
        object_storage_cors_page.actions.enterTextToAllowedHeadersInputField(testData.allowedHeadersName)
        object_storage_cors_page.actions.enterTextToExposeHeadersInputField(testData.exposeHeadersName)
        object_storage_cors_page.actions.clickOnSaveCorsRulesBtnInAddModal()
        object_storage_cors_page.actions.isVisibleCreatedCorsRule(testData.allowedMethods)
    })
    it('PD-582 Settings - Adding CORS rules with multiple Allowed Headers', () => {
        const testData =
        {
            bucketName: 'cors-rules-bucket', allowedOriginName: 'test origin', allowedHeadersName: 'test header', allowedHeadersName2: 'test header-2', exposeHeadersName: 'test expose',
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_cors_page.actions.clickOnAddCorsRulesBtn()
        object_storage_cors_page.actions.enterTextToAllowedOriginsInputField(testData.allowedOriginName)
        object_storage_cors_page.actions.checkGetCheckbox()
        object_storage_cors_page.actions.enterTextToAllowedHeadersInputField(testData.allowedHeadersName)
        object_storage_cors_page.actions.clickAddBtnUnderAllowedHeadersField()
        object_storage_cors_page.actions.enterTextToSecondAllowedHeadersInputField(testData.allowedHeadersName2)
        object_storage_cors_page.actions.enterTextToExposeHeadersInputField(testData.exposeHeadersName)
        object_storage_cors_page.actions.clickOnSaveCorsRulesBtnInAddModal()
        object_storage_cors_page.actions.isVisibleCreatedCorsRule(testData.allowedHeadersName2)
    })
    it('PD-583 Settings - Adding CORS rules with multiple Expose Headers', () => {
        const testData =
        {
            bucketName: 'cors-rules-bucket', allowedOriginName: 'test origin', allowedHeadersName: 'test header', exposeHeadersName: 'test expose', exposeHeadersName2: 'test expose-2'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_cors_page.actions.clickOnAddCorsRulesBtn()
        object_storage_cors_page.actions.enterTextToAllowedOriginsInputField(testData.allowedOriginName)
        object_storage_cors_page.actions.checkGetCheckbox()
        object_storage_cors_page.actions.enterTextToAllowedHeadersInputField(testData.allowedHeadersName)
        object_storage_cors_page.actions.enterTextToExposeHeadersInputField(testData.exposeHeadersName)
        object_storage_cors_page.actions.clickAddBtnUnderExposeHeadersField()
        object_storage_cors_page.actions.enterTextToSecondExposeHeadersInputField(testData.exposeHeadersName2)
        object_storage_cors_page.actions.clickOnSaveCorsRulesBtnInAddModal()
        object_storage_cors_page.actions.isVisibleCreatedCorsRule(testData.exposeHeadersName2)
    })
    it('PD-584 Settings - Adding CORS rules with Max age seconds', () => {
        const testData =
        {
            bucketName: 'cors-rules-bucket', allowedOriginName: 'test origin', allowedHeadersName: 'test header', exposeHeadersName: 'test expose', maxAgeSeconds: '5'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_cors_page.actions.clickOnAddCorsRulesBtn()
        object_storage_cors_page.actions.enterTextToAllowedOriginsInputField(testData.allowedOriginName)
        object_storage_cors_page.actions.checkGetCheckbox()
        object_storage_cors_page.actions.enterTextToAllowedHeadersInputField(testData.allowedHeadersName)
        object_storage_cors_page.actions.enterTextToExposeHeadersInputField(testData.exposeHeadersName)
        object_storage_cors_page.actions.enterTextToMaxAgeSecondsField(testData.maxAgeSeconds)
        object_storage_cors_page.actions.clickOnSaveCorsRulesBtnInAddModal()
        object_storage_cors_page.actions.isVisibleCreatedCorsRule(testData.maxAgeSeconds)
    })
    /*it('PD-585 Settings - Adding CORS rules with empty values', () => {             will uncomment ones I got qa-element selectors for invalid msgs  
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()        
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)       
        cy.wait(1000)
        object_storage_cors_page.actions.clickOnAddCorsRulesBtn()
        object_storage_cors_page.actions.clickOnSaveCorsRulesBtnInAddModal()
        object_storage_cors_page.actions.checkInvalidMsgForAllowedOriginsField('Обязательное поле')        
        object_storage_cors_page.actions.checkInvalidMsgForAllowedHeadersField('Обязательное поле')
        object_storage_cors_page.actions.checkInvalidMsgForExposeHeadersField('Обязательное поле')
    })*/
    it('PD-779-781 Settings - Adding - remove Allowed Origins/Headers/Expose btn', () => {  // 3 test cases in 1 autotest
        const testData =
        {
            bucketName: 'cors-rules-bucket'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_cors_page.actions.clickOnAddCorsRulesBtn()
        object_storage_cors_page.actions.clickAddBtnUnderAllowedOriginsField()
        object_storage_cors_page.actions.clickRemoveBtnInAllowedOriginsField()
        object_storage_cors_page.actions.clickAddBtnUnderAllowedHeadersField()
        object_storage_cors_page.actions.clickRemoveBtnInAllowedHeadersField()
        object_storage_cors_page.actions.clickAddBtnUnderExposeHeadersField()
        object_storage_cors_page.actions.clickRemoveBtnInExposeHeadersField()
    })
    it('PD-586-587 Settings - Adding CORS rules - X icon, Cancel button', () => {        // 2 test cases in 1 autotest                  
        const testData =
        {
            bucketName: 'cors-rules-bucket'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_cors_page.actions.clickOnAddCorsRulesBtn()    // X icon in Add modal
        object_storage_page.actions.clickCloseBtnInModal()
        object_storage_cors_page.actions.clickOnAddCorsRulesBtn()    // Cancel button in Add modal
        object_storage_cors_page.actions.clickOnCancelCorsRulesBtnInAddModal()
    })
    it('PD-775 Settings - Editing CORS rules - with valid data', () => {
        const testData =
        {
            bucketName: 'cors-rules-bucket', allowedOriginName: 'edited-test origin', allowedHeadersName: 'edited-test header', exposeHeadersName: 'edited-test expose', maxAgeSeconds: '6'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_cors_page.actions.clickCorsRuleEditBtnPerRowName('5')
        object_storage_cors_page.actions.enterTextToAllowedOriginsInputField(testData.allowedOriginName)
        object_storage_cors_page.actions.enterTextToAllowedHeadersInputField(testData.allowedHeadersName)
        object_storage_cors_page.actions.enterTextToExposeHeadersInputField(testData.exposeHeadersName)
        object_storage_cors_page.actions.enterTextToMaxAgeSecondsField(testData.maxAgeSeconds)
        object_storage_cors_page.actions.clickOnSaveCorsRulesBtnInAddModal()
        object_storage_cors_page.actions.isVisibleCreatedCorsRule('edited')
    })
    /*it('PD-776 Settings - Editing CORS rules - with invalid data', () => {        will uncomment ones I got qa-element selectors for invalid msgs  
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()        
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)       
        cy.wait(1000)
        object_storage_cors_page.actions.clickCorsRuleEditBtnPerRowName('6')
        object_storage_cors_page.actions.clearAllowedOriginsField()
        object_storage_cors_page.actions.clearAllowedHeadersField()
        object_storage_cors_page.actions.clearExposeHeadersField()
        object_storage_cors_page.actions.clickOnSaveCorsRulesBtnInAddModal()
        object_storage_cors_page.actions.checkInvalidMsgForAllowedOriginsField('Обязательное поле')        
        object_storage_cors_page.actions.checkInvalidMsgForAllowedHeadersField('Обязательное поле')
        object_storage_cors_page.actions.checkInvalidMsgForExposeHeadersField('Обязательное поле') 
    }) */
    it('PD-777-778 Settings - Deleting CORS rules, Cancel button in Delete modal', () => {  // 2 test cases in 1 autotest
        const testData =
        {
            bucketName: 'cors-rules-bucket'
        }
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickObjectStorageIcon()
        object_storage_page.actions.isVisibleObjectStoragePage()
        object_storage_page.actions.clickObjectStorageBucketSettingsBtnPerName(testData.bucketName)
        cy.wait(1000)
        object_storage_cors_page.actions.clickCorsRuleDeleteBtnPerRowName('6')
        object_storage_cors_page.actions.clickOnCancelBtnInDeleteModal()            // Cancel button in Delete modal
        object_storage_cors_page.actions.clickCorsRuleDeleteBtnPerRowName('6')
        object_storage_cors_page.actions.clickOnConfirmDeleteBtnInDeleteModal()    // Deleting CORS rules
        object_storage_cors_page.actions.isNotVisibleDeletedCorsRule('6')
        object_storage_page.actions.clickBucketBackButton()
        object_storage_page.actions.clickObjectStorageBucketDeleteBtnPerName(testData.bucketName)
        object_storage_page.actions.enterTextToDeleteBucketInputField(testData.bucketName)
        object_storage_page.actions.clickDeleteBtnInConfirmDeleteModal()
        cy.wait(1000)
        object_storage_page.actions.IsNotAvailableDeletedBucket(testData.bucketName)
    })
})