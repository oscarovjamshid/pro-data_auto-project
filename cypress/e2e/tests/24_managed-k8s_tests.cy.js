cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import localNetworks2_page from "../pages/localNetworks2_page";
import publicNetworks_page from "../pages/publicNetworks_page";
import managedKubernetes_page from "../pages/managed-k8s_page";

describe('24.Managed Kubernetes Tests', () => {
    let configData;
    const downloadsFolder = Cypress.config('downloadsFolder');
    const privateKeyFile = 'basic-priv_rsa.ppk';
    const publicKeyFile = 'basic-priv_rsa.pub';
    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
        });
        cy.task('cleanDownloadsFolder');
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('GET', `${configData.base_url}panel-main/api/panel/vm/resourceMetaData`).as('kubernetesresourcedata');
        cy.intercept('GET', `${configData.base_url}panel-main/api/kubernetes/getClusters`).as('kubernetesGetClasters');
        cy.intercept('POST', `${configData.base_url}panel-main/api/kubernetes/createCluster`).as('kubernetesCreateClusterFail');

    })
    it('[PD-589] User Agreement link validation', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickOnUserAgreementLink()
        cy.wait(1000);
        cy.go('back');
        cy.wait(2000)
        managedKubernetes_page.actions.isVisibleCreateClusterBtn()
    })
    it('[PD-590] Price List link validation', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickOnPriceListLink()
        cy.wait(1000);
        cy.go('back');
        managedKubernetes_page.actions.isVisibleCreateClusterBtn()
    })
    it('[PD-591] Terms Of Service link validation', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickOnTermsOfServiceLink()
        cy.wait(1000);
        cy.go('back');
        managedKubernetes_page.actions.isVisibleCreateClusterBtn()
    })
    it('[PD-133] Create cluster: empty name', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp("   ")
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.isVisibleInValidKubernetesTxt('Название не соответствует правилу')
    })
    it('[PD-134] Create cluster: Cyrillic letters', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp("ровыпаоыврраыв")
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.isVisibleInValidKubernetesTxt('Название не соответствует правилу')
    })
    it('[PD-140] Create cluster: capital letters', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp("THISISTEST")
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.isVisibleInValidKubernetesTxt('Название не соответствует правилу')
    })
    it('[PD-128,784,787, 791, 792] Create cluster: with Basic-Private type', () => {                       //  5 test cases in 1 autotest
        const clusterName = "basic-priv";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp(clusterName)
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLeastVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0/16")
        managedKubernetes_page.actions.clickKuberLocalNetworkList()                       // 784 - Create cluster: with existing local network
        managedKubernetes_page.actions.selectKuberLocalNetworkInList()
        managedKubernetes_page.actions.enterKubernetesKlasterInp('192.168.1.16')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode("fortesting")        // 787 - Create cluster: without autoscaling
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.kubernetesMetaData()
        managedKubernetes_page.actions.clickCreateKlasterBtn()
        cy.wait(20000)
        managedKubernetes_page.actions.kubernetesGetClusters()
        managedKubernetes_page.actions.clickDownloadPrivateKeyBtn();                // 791 - Downloading Private Key file after cluster is created (validating contents)
        cy.waitUntil(() => cy.task('checkFileDownloaded', privateKeyFile), {
            timeout: 15000,
            interval: 1000,
        });
        managedKubernetes_page.actions.clickDownloadPublicKeyBtn();                // 792 - Downloading Public Key file after cluster is created (validating contents)
        cy.waitUntil(() => cy.task('checkFileDownloaded', publicKeyFile), {
            timeout: 15000,
            interval: 1000,
        });
        managedKubernetes_page.actions.clickCloseBtnInModal()
        cy.wait(5000)
        managedKubernetes_page.actions.isVisibleCreatedKuberCluster(clusterName)
    })
    it('[PD-130, PD-787] Create cluster: with Basic-Public type (v.1.29.6)', () => {         // 2 test cases in 1 autotest
        const clusterName = "basic-pub";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp(clusterName)
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.clickPublicClusterSwitchLabel()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0/16")
        managedKubernetes_page.actions.clickCreateNewLocalNetworkBtn()               // 785 - Create cluster: with a new local network (successful)   
        localNetworks2_page.actions.isVisibleLocalNetworkInp()
        localNetworks2_page.actions.enterLocalNetworkNameFn('KuberLocalNet')
        localNetworks2_page.actions.enterLocalAddressData('192.168.1.0')
        publicNetworks_page.actions.clickAddNetworkModalBtn2()
        managedKubernetes_page.actions.clickKuberLocalNetworkList()
        managedKubernetes_page.actions.clickLocalNetworkOptionByNameInLocalNetworkList('KuberLocalNet')
        managedKubernetes_page.actions.enterKubernetesKlasterInp('192.168.1.16')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode("fortesting")
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.kubernetesMetaData()
        managedKubernetes_page.actions.clickCreateKlasterBtn()
        cy.wait(5000)
        managedKubernetes_page.actions.clickCloseBtnInModal()
        managedKubernetes_page.actions.kubernetesGetClusters()
        cy.wait(1000)
        managedKubernetes_page.actions.isVisibleCreatedKuberCluster(clusterName)
    })
    it('[PD-819] Create cluster with creating an existing local network - validation should work', () => {         // exceptional
        const clusterName = "basic-pub";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp(clusterName)
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.clickPublicClusterSwitchLabel()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0/16")
        managedKubernetes_page.actions.clickCreateNewLocalNetworkBtn()               // 785 - Create cluster: with a new local network (successful)   
        localNetworks2_page.actions.isVisibleLocalNetworkInp()
        localNetworks2_page.actions.enterLocalNetworkNameFn('KuberLocalNet')
        localNetworks2_page.actions.enterLocalAddressData('192.168.1.0')
        publicNetworks_page.actions.clickAddNetworkModalBtn2()
    })
    it('[PD-129, PD-782] Create cluster: with HA-Public type (v.1.30.5)', () => {                    // 2 test cases in 1 autotest
        const clusterName = "ha-pub";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp("ha-pub")
        managedKubernetes_page.actions.clickHaControlGroupSwitchLabel()
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectMiddleVersionFromListFn()
        managedKubernetes_page.actions.clickUploadYourPublicKeyRadioBtn()               // 782 - Creating cluster: with 'Upload your public SSH key'
        managedKubernetes_page.actions.attachSshFileForPublicKeyFilepicker()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.clickPublicClusterSwitchLabel()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0/16")
        managedKubernetes_page.actions.clickKuberLocalNetworkList()
        managedKubernetes_page.actions.selectKuberLocalNetworkInList()
        managedKubernetes_page.actions.enterKubernetesKlasterInp('192.168.1.64')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode("fortestingd")
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.kubernetesMetaData()
        managedKubernetes_page.actions.clickCreateKlasterBtn()
        cy.wait(2000)
        managedKubernetes_page.actions.kubernetesGetClusters()
        managedKubernetes_page.actions.isVisibleCreatedKuberCluster(clusterName)
    })
    it('[PD-131, PD-745] Create cluster: with HA-Private type + with autoscaling (v.1.31.4)', () => {                    // 2 test cases in 1 autotest
        const clusterName = "ha-priv";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp(clusterName)
        managedKubernetes_page.actions.clickHaControlGroupSwitchLabel()
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0/16")
        managedKubernetes_page.actions.clickKuberLocalNetworkList()
        managedKubernetes_page.actions.selectKuberLocalNetworkInList()
        managedKubernetes_page.actions.enterKubernetesKlasterInp('192.168.1.64')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode("fortesting")
        managedKubernetes_page.actions.clickAutoscalingCheckbox()                           // 745 - Create cluster: with autoscaling
        managedKubernetes_page.actions.enterWorkerNodeMinSize(2)
        managedKubernetes_page.actions.enterWorkerNodeMaxSize(3)
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.kubernetesMetaData()
        managedKubernetes_page.actions.clickCreateKlasterBtn()
        managedKubernetes_page.actions.clickCloseBtnInModal()
        managedKubernetes_page.actions.kubernetesGetClusters()
        cy.wait(5000)
        managedKubernetes_page.actions.isVisibleCreatedKuberCluster(clusterName)
    })
    it('[PD-132] Create cluster: with Worker node pool name - empty (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp("testerforauto")
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0/16")
        managedKubernetes_page.actions.clickKuberLocalNetworkList()
        managedKubernetes_page.actions.selectKuberLocalNetworkInList()
        managedKubernetes_page.actions.enterKubernetesKlasterInp('192.168.1.64')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode("        ")
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.isVisibleInValidKubernetesTxtVunker('Название не соответствует правилу')
    })
    it('[PD-146] Create cluster: with Worker node pool name - space (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp("testerforauto")
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0/16")
        managedKubernetes_page.actions.clickKuberLocalNetworkList()
        managedKubernetes_page.actions.selectKuberLocalNetworkInList()
        managedKubernetes_page.actions.enterKubernetesKlasterInp('192.168.1.64')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode("орвв ары ва рыв ырао")
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.isVisibleInValidKubernetesTxtVunker('Название не соответствует правилу')
    })
    it('[PD-141] Create cluster: with invalid cluster subnet address', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp("testerforauto")
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0/16")
        managedKubernetes_page.actions.clickKuberLocalNetworkList()
        managedKubernetes_page.actions.selectKuberLocalNetworkInList()
        managedKubernetes_page.actions.enterKubernetesKlasterInp('192.168.1.1')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.isVisibleinValidKuberIp()
    })
    it('[PD-783, PD-786] Create cluster: with invalid Pod subnet address', () => {    // 2 test cases in 1 autotest
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp("testerforauto")
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0")
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.isVisibleInvalidPodSubnetAddressTxt('Неверное значение')          // 786 - Create cluster: with a new invalid local network (unsuccessful) 
        managedKubernetes_page.actions.isVisibleInvalidLocalNetworkTxt('Обязательное поле')
    })
    it('[PD-142] Create cluster: with CPU for worker node - negative number (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp("testerforauto")
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0/16")
        managedKubernetes_page.actions.clickKuberLocalNetworkList()
        managedKubernetes_page.actions.selectKuberLocalNetworkInList()
        managedKubernetes_page.actions.enterKubernetesKlasterInp('192.168.1.64')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode("fortesting")
        managedKubernetes_page.actions.enterKubernetesCpuData('-57843584373893')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        cy.wait(2000)
        managedKubernetes_page.actions.kubernetesMetaData()
    })
    it('[PD-143] Create cluster: with CPU for worker node - out of limit (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp("testerforauto")
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0/16")
        managedKubernetes_page.actions.clickKuberLocalNetworkList()
        managedKubernetes_page.actions.selectKuberLocalNetworkInList()
        managedKubernetes_page.actions.enterKubernetesKlasterInp('192.168.1.64')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode("fortesting")
        managedKubernetes_page.actions.enterKubernetesCpuData('74357843584373893')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.kubernetesMetaData()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
    })
    it('[PD-144] Create cluster: with RAM for worker node - negative number (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp("testerforauto")
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0/16")
        managedKubernetes_page.actions.clickKuberLocalNetworkList()
        managedKubernetes_page.actions.selectKuberLocalNetworkInList()
        managedKubernetes_page.actions.enterKubernetesKlasterInp('192.168.1.64')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode("fortesting")
        managedKubernetes_page.actions.enterKubernetesRamData('-743578435847373893')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.kubernetesMetaData()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
    })
    it('[PD-145] Create cluster: with RAM for worker node - out of limit (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp("testerforauto")
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0/16")
        managedKubernetes_page.actions.clickKuberLocalNetworkList()
        managedKubernetes_page.actions.selectKuberLocalNetworkInList()
        managedKubernetes_page.actions.enterKubernetesKlasterInp('192.168.1.64')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode("fortesting")
        managedKubernetes_page.actions.enterKubernetesRamData('743578435847373893')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.kubernetesMetaData()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
    })
    it('[PD-147] Create cluster: with Disk for worker node - negative number (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp("testerforauto")
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0/16")
        managedKubernetes_page.actions.clickKuberLocalNetworkList()
        managedKubernetes_page.actions.selectKuberLocalNetworkInList()
        managedKubernetes_page.actions.enterKubernetesKlasterInp('192.168.1.64')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode("fortesting")
        managedKubernetes_page.actions.enterKubernetesDiskData('-743578435847373893')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.kubernetesMetaData()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
    })
    it('[PD-148] Create cluster: with Disk for worker node - out of limit (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp("testerforauto")
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0/16")
        managedKubernetes_page.actions.clickKuberLocalNetworkList()
        managedKubernetes_page.actions.selectKuberLocalNetworkInList()
        managedKubernetes_page.actions.enterKubernetesKlasterInp('192.168.1.64')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode("fortesting")
        managedKubernetes_page.actions.enterKubernetesDiskData('743578435847373893')
        managedKubernetes_page.actions.isVisibleInValidDisk()
    })
    it('[PD-788] Create cluster: with autoscaling - min equals to max (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp("test")
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0/16")
        managedKubernetes_page.actions.clickKuberLocalNetworkList()
        managedKubernetes_page.actions.selectKuberLocalNetworkInList()
        managedKubernetes_page.actions.enterKubernetesKlasterInp('192.168.1.32')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode("fortesting")
        managedKubernetes_page.actions.clickAutoscalingCheckbox()
        managedKubernetes_page.actions.enterWorkerNodeMinSize(2)
        managedKubernetes_page.actions.enterWorkerNodeMaxSize(2)
        managedKubernetes_page.actions.isVisibleInvalidWorkerNodeSizeText('Максимальное количество воркер-нод должно быть больше минимального')
    })
    it('[PD-788] Create cluster: with autoscaling - min greater than max (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp("test")
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0/16")
        managedKubernetes_page.actions.clickKuberLocalNetworkList()
        managedKubernetes_page.actions.selectKuberLocalNetworkInList()
        managedKubernetes_page.actions.enterKubernetesKlasterInp('192.168.1.32')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode("fortesting")
        managedKubernetes_page.actions.clickAutoscalingCheckbox()
        managedKubernetes_page.actions.enterWorkerNodeMinSize(3)
        managedKubernetes_page.actions.enterWorkerNodeMaxSize(2)
        managedKubernetes_page.actions.isVisibleInvalidWorkerNodeSizeText('Максимальное количество воркер-нод должно быть больше минимального')
    })
    it('[PD-788] Create cluster: with autoscaling - invalid values (unsuccessful)', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp("test")
        managedKubernetes_page.actions.selectVersionKubernetesKlasster()
        managedKubernetes_page.actions.selectLatestVersionFromListFn()
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterPodovServerNumber("192.168.0.0/16")
        managedKubernetes_page.actions.clickKuberLocalNetworkList()
        managedKubernetes_page.actions.selectKuberLocalNetworkInList()
        managedKubernetes_page.actions.enterKubernetesKlasterInp('192.168.1.32')
        managedKubernetes_page.actions.clickNextPageContinueBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode("fortesting")
        managedKubernetes_page.actions.clickAutoscalingCheckbox()
        managedKubernetes_page.actions.enterWorkerNodeMinSize(0)
        managedKubernetes_page.actions.enterWorkerNodeMaxSize(0)
        managedKubernetes_page.actions.isVisibleInvalidWorkerNodeSizeText('Неверное значение')
        managedKubernetes_page.actions.enterWorkerNodeMinSize(-1)
        managedKubernetes_page.actions.enterWorkerNodeMaxSize(-2)
        managedKubernetes_page.actions.isVisibleInvalidWorkerNodeSizeText('Неверное значение')
    })
    it('[PD-592] Cancel button while adding a cluster', () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickCreateClusterBtn()
        managedKubernetes_page.actions.clickCancelBtnInAddPage()
        cy.wait(1000)
        managedKubernetes_page.actions.isVisibleCreateClusterBtn()
    })
    it.only('[PD-793] Configuration: Update Kubernetes Version to valid version', () => {
        const clusterName = "basic-priv";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.waitForClusterReady(clusterName)
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.isVisibleClusterStatus('В работе')
        managedKubernetes_page.actions.clickUpdateKuberVersionBtn()
        managedKubernetes_page.actions.clickUpdateKuberVersionDropdownList()
        cy.wait(1000)
        managedKubernetes_page.actions.selectMediumKuberVersion()            // updating from v.29 to v.30
        managedKubernetes_page.actions.clickSubmitBtnInUpdateKuberVersionList()
        managedKubernetes_page.actions.isVisibleClusterStatus('Конфигурируется')
        managedKubernetes_page.actions.clickCancelBtnInAddPage() // this is back btn here
        managedKubernetes_page.actions.waitForClusterReady(clusterName)
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        managedKubernetes_page.actions.isVisibleClusterKuberTextInConfigurationTab('Версия:', 'v1.30.5')
    })
    it.only('[PD-794] Configuration: Update Kubernetes Version to invalid version (from higher to lower)', () => {
        const clusterName = "basic-priv";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.waitForClusterReady(clusterName)
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.isVisibleClusterStatus('В работе')
        managedKubernetes_page.actions.clickUpdateKuberVersionBtn()
        managedKubernetes_page.actions.clickUpdateKuberVersionDropdownList()
        cy.wait(1000)
        managedKubernetes_page.actions.isDisabledKuberVersionOptionInList()
    })
    it.only('[PD-795] Configuration: Change control group from lower to higher config', () => {
        const clusterName = "basic-priv";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.waitForClusterReady(clusterName)
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.isVisibleClusterStatus('В работе')
        managedKubernetes_page.actions.clickChangeControlGroupBtn()
        managedKubernetes_page.actions.clickChangeControlGroupDropdownList()
        cy.wait(1000)
        managedKubernetes_page.actions.selectFirstOptionInChangeControlGroupList()            // updating from 2CPU to 8CPU config
        managedKubernetes_page.actions.clickSubmitBtnInChangeControlGroupPopUp()
        cy.wait(2000)
        managedKubernetes_page.actions.clickCloseBtnInPopUpAppearsAfterChangedControlGroup()
        managedKubernetes_page.actions.waitForClusterReady(clusterName)
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.isVisibleClusterKuberTextInConfigurationTab('Группа управления:', 'Базовая, 8 CPU, 16 Гб RAM, 50 Гб SSD')
    })
    it.only('[PD-796] Configuration: Change control group from higher to lower config', () => {
        const clusterName = "basic-priv";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.waitForClusterReady(clusterName)
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.isVisibleClusterStatus('В работе')
        managedKubernetes_page.actions.clickChangeControlGroupBtn()
        managedKubernetes_page.actions.clickChangeControlGroupDropdownList()
        cy.wait(1000)
        managedKubernetes_page.actions.selectFirstOptionInChangeControlGroupList()            // updating from 8CPU to 2CPU config
        managedKubernetes_page.actions.clickSubmitBtnInChangeControlGroupPopUp()
        cy.wait(2000)
        managedKubernetes_page.actions.clickCloseBtnInPopUpAppearsAfterChangedControlGroup()
        managedKubernetes_page.actions.waitForClusterReady(clusterName)
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.isVisibleClusterKuberTextInConfigurationTab('Группа управления:', 'Базовая, 2 CPU, 4 Гб RAM, 20 Гб SSD')
    })
    it.only('[PD-797] Connection: Downloading v1.29.6 cluster config.yaml file (validating contents)', () => {
        const clusterName = "basic-pub";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.waitForClusterReady(clusterName)
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.isVisibleClusterStatus('В работе')
        managedKubernetes_page.actions.clickConnectionTab()
        managedKubernetes_page.actions.clickDownloadConfigYamlBtn()

        cy.wait(2000);                                                             // Wait till yaml file is downloaded
        const downloadsFolder = Cypress.config('downloadsFolder');

        cy.task('getLatestFile', downloadsFolder).then((latestFile) => {           // Get the latest downloaded YAML file
            cy.log(`Found latest downloaded file: ${latestFile}`);
            cy.readFile(latestFile, { timeout: 10000 }).then((content) => {        // Read and validate contents
                expect(content).to.include('apiVersion');
                expect(content).to.include('clusters');
                expect(content).to.include('contexts');
                expect(content).to.include('users');
                expect(content.trim().length).to.be.greaterThan(0);               // Ensure that file is not empty
            });
        });
    })
    it.only('[PD-817] Connection: Downloading v1.30.5 cluster config.yaml file (validating contents)', () => {
        const clusterName = "ha-pub";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.waitForClusterReady(clusterName)
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.isVisibleClusterStatus('В работе')
        managedKubernetes_page.actions.clickConnectionTab()
        managedKubernetes_page.actions.clickDownloadConfigYamlBtn()

        cy.wait(2000);                                                             // Wait till yaml file is downloaded
        const downloadsFolder = Cypress.config('downloadsFolder');

        cy.task('getLatestFile', downloadsFolder).then((latestFile) => {           // Get the latest downloaded YAML file
            cy.log(`Found latest downloaded file: ${latestFile}`);
            cy.readFile(latestFile, { timeout: 10000 }).then((content) => {        // Read and validate contents
                expect(content).to.include('apiVersion');
                expect(content).to.include('clusters');
                expect(content).to.include('contexts');
                expect(content).to.include('users');
                expect(content.trim().length).to.be.greaterThan(0);               // Ensure that file is not empty
            });
        });
    })
    it.only('[PD-818] Connection: Downloading v1.31.4 cluster config.yaml file (validating contents)', () => {
        const clusterName = "ha-priv";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.waitForClusterReady(clusterName)
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.isVisibleClusterStatus('В работе')
        managedKubernetes_page.actions.clickConnectionTab()
        managedKubernetes_page.actions.clickDownloadConfigYamlBtn()

        cy.wait(2000);                                                             // Wait till yaml file is downloaded
        const downloadsFolder = Cypress.config('downloadsFolder');

        cy.task('getLatestFile', downloadsFolder).then((latestFile) => {           // Get the latest downloaded YAML file
            cy.log(`Found latest downloaded file: ${latestFile}`);
            cy.readFile(latestFile, { timeout: 10000 }).then((content) => {        // Read and validate contents
                expect(content).to.include('apiVersion');
                expect(content).to.include('clusters');
                expect(content).to.include('contexts');
                expect(content).to.include('users');
                expect(content.trim().length).to.be.greaterThan(0);               // Ensure that file is not empty
            });
        });
    })
    it.only('[PD-798] Connection: Copy export code', () => {
        const clusterName = "basic-priv";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.waitForClusterReady(clusterName)
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.isVisibleClusterStatus('В работе')
        managedKubernetes_page.actions.clickConnectionTab()
        managedKubernetes_page.actions.clickDownloadConfigYamlBtn()
    })
    it.only('[PD-813] Delete cluster: Basic-Public type', () => {
        const clusterName = "basic-pub";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.clickDeleteClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp(clusterName)
        managedKubernetes_page.actions.clickDeleteClusterSubmitBtn()
        managedKubernetes_page.actions.isNotVisibleCreatedKuberCluster(clusterName)
    })
    it.only('[PD-814] Delete cluster: HA-Private type', () => {
        const clusterName = "ha-priv";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.clickDeleteClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp(clusterName)
        managedKubernetes_page.actions.clickDeleteClusterSubmitBtn()
        managedKubernetes_page.actions.isNotVisibleCreatedKuberCluster(clusterName)
    })
    it.only('[PD-815] Delete cluster: HA-Public type', () => {
        const clusterName = "ha-pub";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.clickDeleteClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp(clusterName)
        managedKubernetes_page.actions.clickDeleteClusterSubmitBtn()
        managedKubernetes_page.actions.isNotVisibleCreatedKuberCluster(clusterName)
    })
    it.only('[PD-799] Worker Node Pool: Create New: creating new pool with autoscaling', () => {
        const clusterName = "basic-priv";
        const defaultPoolName = "fortesting";
        const newPoolName = "auto";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.clickWorkerNodePoolTab(defaultPoolName)
        managedKubernetes_page.actions.clickAddPoolBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode(newPoolName)
        managedKubernetes_page.actions.clickAutoscalingCheckbox()
        managedKubernetes_page.actions.clickCreatePoolBtn()
        cy.wait(2000)
        managedKubernetes_page.actions.waitForWorkerNodePoolReady(newPoolName)
        managedKubernetes_page.actions.isVisibleCreatedKuberCluster(newPoolName)  // here it refers to worker node pool row - (Автомасштабируемый)
    })
    it.only('[PD-800] Worker Node Pool: Create New: creating new pool without autoscaling', () => {
        const clusterName = "basic-priv";
        const defaultPoolName = "fortesting";
        const newPoolName = "no-auto";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.clickWorkerNodePoolTab(defaultPoolName)
        managedKubernetes_page.actions.clickAddPoolBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode(newPoolName)
        managedKubernetes_page.actions.clickCreatePoolBtn()
        cy.wait(2000)
        managedKubernetes_page.actions.waitForWorkerNodePoolReady(newPoolName)
        managedKubernetes_page.actions.isVisibleCreatedKuberCluster(newPoolName)  // here it refers to worker node pool row
    })
    it.only('[PD-801] Worker Node Pool: Create New: leaving all fields empty (unsuccessful)', () => {
        const clusterName = "basic-priv";
        const defaultPoolName = "fortesting";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.clickWorkerNodePoolTab(defaultPoolName)
        managedKubernetes_page.actions.clickAddPoolBtn()
        managedKubernetes_page.actions.clickCreatePoolBtn()
        managedKubernetes_page.actions.isVisibleInvalidWorkerNodePoolText("Обязательное поле")  // here it refers to worker node pool row
    })
    it.only('[PD-802] Worker Node Pool: Create New: negative numbers to configs (unsuccessful)', () => {
        const clusterName = "basic-priv";
        const defaultPoolName = "fortesting";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.clickWorkerNodePoolTab(defaultPoolName)
        managedKubernetes_page.actions.clickAddPoolBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode(defaultPoolName)
        managedKubernetes_page.actions.enterWorkerNodeRamData('-743578435847373893')
        managedKubernetes_page.actions.enterWorkerNodeCpuData('-57843584373893')
        managedKubernetes_page.actions.enterWorkerNodeDiskData('-743578435847373893')
        managedKubernetes_page.actions.clickCreatePoolBtn()
    })
    it.only('[PD-803] Worker Node Pool: Create New: out of limit numbers to configs (unsuccessful)', () => {
        const clusterName = "basic-priv";
        const defaultPoolName = "fortesting";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.clickWorkerNodePoolTab(defaultPoolName)
        managedKubernetes_page.actions.clickAddPoolBtn()
        managedKubernetes_page.actions.enterKubernetesVunkerCode(defaultPoolName)
        managedKubernetes_page.actions.enterWorkerNodeRamData('743578435847373893')
        managedKubernetes_page.actions.enterWorkerNodeCpuData('74357843584373893')
        managedKubernetes_page.actions.enterWorkerNodeDiskData('743578435847373893')
        managedKubernetes_page.actions.clickCreatePoolBtn()
    })
    it.only('[PD-804] Worker Node Pool: Deleting pool (if there is extra pool)', () => {
        const clusterName = "basic-priv";
        const newPoolName1 = "auto";
        const newPoolName2 = "no-auto";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.clickWorkerNodePoolTab(newPoolName1)
        cy.wait(2000)
        managedKubernetes_page.actions.clickClusterRowPerName(newPoolName1)        // here it refers to the pool row
        managedKubernetes_page.actions.clickDeletePoolBtn()
        managedKubernetes_page.actions.enterTextToDeletePoolField(newPoolName1)
        managedKubernetes_page.actions.clickDeletePoolSubmitBtn()
        managedKubernetes_page.actions.isNotVisibleCreatedKuberClusterWorkerNode(newPoolName1)
        managedKubernetes_page.actions.clickClusterRowPerName(newPoolName2)          // here it refers to the pool row
        managedKubernetes_page.actions.clickDeletePoolBtn()
        managedKubernetes_page.actions.enterTextToDeletePoolField(newPoolName2)
        managedKubernetes_page.actions.clickDeletePoolSubmitBtn()
        managedKubernetes_page.actions.isNotVisibleCreatedKuberClusterWorkerNode(newPoolName2)
    })
    it.only('[PD-806] Worker Node Pool: Configure Worker Node Pool Size: enable autoscaling - invalid values (unsuccessful)', () => {
        const clusterName = "basic-priv";
        const defaultPoolName = "fortesting";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.clickWorkerNodePoolTab(defaultPoolName)
        cy.wait(2000)
        managedKubernetes_page.actions.clickClusterRowPerName(defaultPoolName)       // here it refers to the pool row
        managedKubernetes_page.actions.clickConfigureWorkerNodePoolSizeBtn()
        cy.wait(1000)
        managedKubernetes_page.actions.enterWorkerNodeMinSize(0)
        managedKubernetes_page.actions.isVisibleInvalidWorkerNodeSizeText('Неверное значение')
        managedKubernetes_page.actions.enterWorkerNodeMinSize(-1)
        managedKubernetes_page.actions.isVisibleInvalidWorkerNodeSizeText('Неверное значение')
    })
    it.only('[PD-805] Worker Node Pool: Configure Worker Node Pool Size: enable autoscaling', () => {
        const clusterName = "basic-priv";
        const defaultPoolName = "fortesting";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.clickWorkerNodePoolTab(defaultPoolName)
        cy.wait(2000)
        managedKubernetes_page.actions.clickClusterRowPerName(defaultPoolName)       // here it refers to the pool row
        managedKubernetes_page.actions.clickConfigureWorkerNodePoolSizeBtn()
        managedKubernetes_page.actions.clickAutoscalingCheckbox()
        managedKubernetes_page.actions.clickCreatePoolBtn()
        cy.wait(2000)
        managedKubernetes_page.actions.waitForWorkerNodePoolReady(defaultPoolName)
        managedKubernetes_page.actions.isVisibleCreatedKuberCluster(defaultPoolName + " (Автомасштабируемый)")  // here it refers to worker node pool row - 
    })
    it.only('[PD-807] Worker Node Pool: Configure Worker Node Pool Size: disable autoscaling', () => {
        const clusterName = "basic-priv";
        const defaultPoolName = "fortesting";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.clickWorkerNodePoolTab(defaultPoolName)
        cy.wait(2000)
        managedKubernetes_page.actions.clickClusterRowPerName(defaultPoolName)       // here it refers to the pool row
        managedKubernetes_page.actions.clickConfigureWorkerNodePoolSizeBtn()
        managedKubernetes_page.actions.clickAutoscalingCheckbox()
        managedKubernetes_page.actions.clickCreatePoolBtn()
        cy.wait(2000)
        managedKubernetes_page.actions.waitForWorkerNodePoolReady(defaultPoolName)
        managedKubernetes_page.actions.isVisibleCreatedKuberCluster(defaultPoolName)  // here it refers to worker node pool row 
        managedKubernetes_page.actions.clickClusterRowPerName(defaultPoolName)       // here it refers to the pool row
        cy.wait(2000)
        managedKubernetes_page.actions.clickConfigureWorkerNodePoolSizeBtn()
        managedKubernetes_page.actions.IsAutoScalingNotChecked()
    })
    it.only('[PD-808] Worker Node Pool: Configure Worker Node Pool Size: disable autoscaling - invalid values (unsuccessful)', () => {
        const clusterName = "basic-priv";
        const defaultPoolName = "fortesting";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.clickWorkerNodePoolTab(defaultPoolName)
        cy.wait(2000)
        managedKubernetes_page.actions.clickClusterRowPerName(defaultPoolName)       // here it refers to the pool row
        managedKubernetes_page.actions.clickConfigureWorkerNodePoolSizeBtn()
        managedKubernetes_page.actions.clickAutoscalingCheckbox()
        managedKubernetes_page.actions.enterConfigurePoolSizeNodeMin(0)
        managedKubernetes_page.actions.enterConfigurePoolSizeNodeMax(0)
        managedKubernetes_page.actions.isVisibleConfigureWorkerNodePoolSizeBtn()
        managedKubernetes_page.actions.enterConfigurePoolSizeNodeMin(-1)
        managedKubernetes_page.actions.enterConfigurePoolSizeNodeMax(-1)
        managedKubernetes_page.actions.isVisibleConfigureWorkerNodeMinFieldErrorTxt('Максимальное количество воркер-нод должно быть больше минимального')
        managedKubernetes_page.actions.isVisibleConfigureWorkerNodeMaxFieldErrorTxt('Максимальное количество воркер-нод должно быть больше минимального')
    })
    it.only('[PD-809] Virtual Servers: Worker Node: Configuration tab (assertion)', () => {
        const workerNodeName = "basic-priv";
        const configFields = ['ОС', 'vCpu', 'RAM', 'Диск']
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(workerNodeName)
        cy.wait(1000)
        managedKubernetes_page.actions.isVisibleConfigurationTabMainData(configFields)
    })
    it.only('[PD-810] Virtual Servers: Worker Node: Local Network tab (assertion)', () => {
        const workerNodeName = "basic-priv";
        const configFields = ['Локальная сеть', 'IP воркер-ноды', 'MAC-адрес']
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(workerNodeName)
        cy.wait(1000)
        managedKubernetes_page.actions.clickLocalNetworkTab()
        managedKubernetes_page.actions.isVisibleConfigurationTabMainData(configFields)
    })
    it.only('[PD-811] Virtual Servers: Worker Node: Reboot', () => {
        const workerNodeName = "basic-priv";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(workerNodeName)
        cy.wait(1000)
        managedKubernetes_page.actions.isVisibleRebootBtn()
        managedKubernetes_page.actions.clickRebootBtn()
        managedKubernetes_page.actions.waitForWorkerNodeReady()
    })
    it.only('[PD-812] Virtual Servers: Worker Node: Console', () => {
        const workerNodeName = "basic-priv";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(workerNodeName)
        cy.wait(1000)
        managedKubernetes_page.actions.isVisibleConsoleBtn()
    })
    it.only('[PD-809] Delete cluster: Basic-Private type', () => {
        const clusterName = "basic-priv";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickManagedKubernetesIcon()
        managedKubernetes_page.actions.clickClusterRowPerName(clusterName)
        cy.wait(1000)
        managedKubernetes_page.actions.clickDeleteClusterBtn()
        managedKubernetes_page.actions.enterKlassterNameInp(clusterName)
        managedKubernetes_page.actions.clickDeleteClusterSubmitBtn()
        managedKubernetes_page.actions.isVisibleUserAgreementLink()
    })
    it.only('[PD-816] Delete cluster: Virtual Servers: assertion for worker nodes (should not exist)', () => {
        const text = "Воркер-нода";
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickServersIcon()
        managedKubernetes_page.actions.isNotVisibleCreatedKuberClusterWorkerNode(text)
    })
    after(() => {
        cy.task('deleteFile', privateKeyFile);
        cy.task('deleteFile', publicKeyFile);
    });
})