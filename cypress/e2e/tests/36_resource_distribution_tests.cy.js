cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import sidebar from "../pages/sidebar";
import resource_distribution_page from "../pages/resource_distribution_page";
import localNetworks2_page from "../pages/local-networks2_page";
import publicNetworks_page from "../pages/public-networks2_page";
import disks_page from "../pages/disks_page";

describe('36.Resource Distribution Tests', () => {
    let configData;
    let mainProject;                                    // { name, owner } - there can be several projects with the same name
    let targetProject;                                  // { name, owner } - project right under main project in dropdown list, found in the test
    const testData = {
        networkName: 'for-distribution-test',
        networkAddress: '192.168.77.0',
        networkGateway: '192.168.77.1',
        diskName: 'for-distribution',
        diskSize: '10',
    }
    const resourceTypes = [
        { id: 'PD-618', name: 'Server', label: 'Сервер', apiType: 'VM' },
        { id: 'PD-619', name: 'Disk', label: 'Диск', apiType: 'DISK' },
        { id: 'PD-620', name: 'Template', label: 'Образ', apiType: 'IMAGE' },
        { id: 'PD-621', name: 'Local Network', label: 'Локальная сеть', apiType: 'LOCAL_NETWORK' },
        { id: 'PD-622', name: 'Public IP', label: 'Публичный IP', apiType: 'PUBLIC_NETWORK' },
        { id: 'PD-623', name: 'Kubernetes clusters', label: 'Kubernetes кластеры', apiType: 'KUBERNETES' },
        { id: 'PD-624', name: 'Load Balancer', label: 'Балансировщик нагрузки', apiType: 'LOAD_BALANCER' },
        { id: 'PD-625', name: 'Security Group', label: 'Группа безопасности', apiType: 'FIREWALL_GROUP' },
        { id: 'PD-1199', name: 'Object Storage', label: 'Объектное хранилище', apiType: 'OBJECT_STORAGE' },
        { id: 'PD-1200', name: 'Server Template', label: 'Шаблон сервера', apiType: 'VM_TEMPLATE' },
        { id: 'PD-1201', name: 'Router', label: 'Роутер', apiType: 'ROUTER' },
    ]
    const allApiTypes = [...resourceTypes.map((type) => type.apiType), 'MANAGED_DB']     // MANAGED_DB comes in "All" list, but has no filter option

    const loginToMainProject = () => {                  // panel remembers last selected project - start every test from main one
        cy.login(configData.base_url, configData.login, configData.password)
        resource_distribution_page.actions.selectSidebarProject(mainProject)
    }
    const createLocalNetwork = () => {
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        localNetworks2_page.actions.clickAddNewLocalNetworksBtn()
        localNetworks2_page.actions.isVisibleLocalNetworkInp()
        localNetworks2_page.actions.enterLocalNetworkNameFn(testData.networkName)
        localNetworks2_page.actions.enterLocalAddressData(testData.networkAddress)
        localNetworks2_page.actions.enterLocalNetworkShlyuz(testData.networkGateway)
        publicNetworks_page.actions.clickAddNetworkModalBtn2()
        localNetworks2_page.actions.LocalIpSuccessAddedNew2()
        localNetworks2_page.elements.LocalNetworksNameTxt(testData.networkName).should('be.visible')
    }
    const createHddDisk = () => {
        cy.intercept('GET', '**/panel-main/api/panel/disk/list*').as('diskList')
        sidebar.actions.clickDisksIcon()
        cy.wait('@diskList')
        cy.contains('button', 'Создать').should('be.visible')
        cy.get('body').then(($body) => {
            if ($body.find('[qa-element="disk-create-show"]').length) {
                disks_page.actions.clickCreateDiskBtn()
                return
            }
            disks_page.actions.clickCreateDiskEmptyListBtn()      // empty disk list has another create button
        })
        disks_page.actions.fillNewDiskNameTxt(testData.diskName)
        disks_page.actions.clickNewDiskTypeHDDBtn()
        disks_page.actions.fillNewDiskSizeTxt(testData.diskSize)
        disks_page.actions.clickNewDiskCreateConfBtn()
        disks_page.actions.isVisibleCreatedDisk(testData.diskName)
    }
    const exactName = (name) => new RegExp(`^\\s*${Cypress._.escapeRegExp(name)}\\s*$`)
    const checkLocalNetworkInCurrentProject = () => {
        sidebar.actions.clickServersIcon()
        sidebar.actions.clickNetworksIcon()
        cy.contains('tbody tr td', exactName(testData.networkName), { timeout: 30000 }).should('be.visible')    // list is re-loaded after project change
    }
    const checkDiskInCurrentProject = () => {
        sidebar.actions.clickDisksIcon()
        cy.contains('tbody tr td', exactName(testData.diskName), { timeout: 30000 }).should('be.visible')
    }
    const deleteLocalNetworkInCurrentProject = () => {
        localNetworks2_page.actions.clickLocalDeleteIpFn(testData.networkName)
        localNetworks2_page.actions.clickNetworkDeleteConfirmBtn()
        cy.wait('@deleteNetwork').its('response.statusCode').should('be.oneOf', [200, 204])
        cy.contains('tbody tr td', exactName(testData.networkName), { timeout: 30000 }).should('not.exist')
    }
    const deleteDiskInCurrentProject = () => {
        disks_page.actions.clickDeleteDiskBtn(testData.diskName)
        disks_page.actions.clickDeleteDiskServerConfBtn()
        cy.contains('tbody tr td', exactName(testData.diskName), { timeout: 30000 }).should('not.exist')
    }
    const deleteTestResources = () => {                 // finds test network/disk in all projects via distribution API and deletes them (leftovers of failed runs)
        const leftovers = []                            // [{ project, types: ['LOCAL_NETWORK', 'DISK'] }]
        const collectLeftovers = (project, data) => {
            const types = data.content
                .filter((item) => (item.name === testData.networkName && item.type === 'LOCAL_NETWORK') || (item.name === testData.diskName && item.type === 'DISK'))
                .map((item) => item.type)
            if (types.length) leftovers.push({ project, types })
        }
        const isMainProject = (project) => project.name === mainProject.name && project.owner === mainProject.owner
        cy.visit(configData.base_url)
        resource_distribution_page.actions.selectSidebarProject(mainProject)
        resource_distribution_page.actions.openDistributionPage()
        resource_distribution_page.actions.checkResourcesResponse()
        resource_distribution_page.actions.selectPageSize(50)                    // all resources of project on one page
        resource_distribution_page.actions.checkResourcesResponse().then((data) => collectLeftovers(mainProject, data))
        resource_distribution_page.actions.getProjects().each((project) => {
            if (isMainProject(project)) return
            resource_distribution_page.actions.selectProject(project)
            resource_distribution_page.actions.checkResourcesResponse().then((data) => collectLeftovers(project, data))
        })
        cy.then(() => {
            leftovers.forEach(({ project, types }) => {
                cy.visit(configData.base_url)
                resource_distribution_page.actions.selectSidebarProject(project)
                if (types.includes('LOCAL_NETWORK')) {
                    checkLocalNetworkInCurrentProject()
                    deleteLocalNetworkInCurrentProject()
                }
                if (types.includes('DISK')) {
                    checkDiskInCurrentProject()
                    deleteDiskInCurrentProject()
                }
            })
            cy.visit(configData.base_url)
            resource_distribution_page.actions.selectSidebarProject(mainProject)
        })
    }

    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data;
            mainProject = { name: data.main_project_name, owner: data.main_project_owner }
        });
    })
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', `${configData.base_url}panel-main/api/v1/auth/sign-in`).as('signInRequest');
        cy.intercept('GET', '**/panel-main/api/v1/projects/*/resources?*').as('resourcesList');
        cy.intercept('PATCH', '**/panel-main/api/v1/projects/*/move-resources').as('moveResources');     // single and multiple move
        cy.intercept('PATCH', '**/panel-main/api/v1/projects/resources/*/manage-net-visibility').as('changeVisibility');
        cy.intercept('GET', '**/panel-main/api/v1/projects/resources/*/net-visibility*').as('netVisibility');
        cy.intercept('POST', '**/panel-main/api/panel/createLocalNet').as('localIpAddNew');
        cy.intercept('POST', '**/panel-main/api/panel/deleteNet/*').as('deleteNetwork');
    })
    afterEach(function () {                             // if test which creates resources failed - delete what is left
        if (this.currentTest.state !== 'failed') return
        if (!['PD-626', 'PD-628', 'PD-631'].some((id) => this.currentTest.title.includes(id))) return
        deleteTestResources()
    })

    it('[PD-616] Resource Distribution - Project dropdown-list (successful)', () => {
        loginToMainProject()
        resource_distribution_page.actions.openDistributionPage()
        resource_distribution_page.actions.checkResourcesResponse()
        resource_distribution_page.actions.checkProjectDropdownListText(mainProject)
        resource_distribution_page.actions.getProjectUnderMainProject(mainProject).then((projectName) => {
            resource_distribution_page.actions.selectProject(projectName)
            resource_distribution_page.actions.checkResourcesResponse().then((data) => {
                data.content.forEach((resource) => {
                    expect(resource.projectName).to.eq(projectName.name)
                })
            })
            resource_distribution_page.actions.checkProjectDropdownListText(projectName)
            resource_distribution_page.actions.checkAllRowsProject(projectName.name)
        })
    })

    it('[PD-617] Resource Distribution - Resources list - Filter by All (successful)', () => {
        loginToMainProject()
        resource_distribution_page.actions.openDistributionPage()
        resource_distribution_page.actions.checkResourcesResponse()
        resource_distribution_page.actions.selectResourceType(resourceTypes[0].label)
        resource_distribution_page.actions.checkResourcesResponse(resourceTypes[0].apiType)
        resource_distribution_page.actions.selectResourceType('Все')
        resource_distribution_page.actions.checkResourcesResponse().then((data) => {
            data.content.forEach((resource) => {
                expect(resource.type, `type of ${resource.name}`).to.be.oneOf(allApiTypes)
            })
            resource_distribution_page.actions.checkRowsCount(data.content.length)
        })
    })

    resourceTypes.forEach((type) => {
        it(`[${type.id}] Resource Distribution - Resources list - Filter by ${type.name} (successful)`, () => {
            loginToMainProject()
            resource_distribution_page.actions.openDistributionPage()
            resource_distribution_page.actions.checkResourcesResponse()
            resource_distribution_page.actions.selectResourceType(type.label)
            resource_distribution_page.actions.checkResourcesResponse(type.apiType).then((data) => {
                if (data.content.length === 0) return       // no resources of this type in project - API check is enough
                resource_distribution_page.actions.isVisibleResourceRowByName(data.content[0].name)
                resource_distribution_page.actions.checkAllRowsResourceType(type.label)
            })
            resource_distribution_page.actions.checkResourceTypeDropdownListText(type.label)
        })
    })

    it('[PD-626] Resource Distribution - Change project - single resource (successful)', () => {
        const resourceType = resourceTypes.find((type) => type.name === 'Local Network')
        loginToMainProject()
        createLocalNetwork()
        // move local network to project under main project
        resource_distribution_page.actions.openDistributionPage()
        resource_distribution_page.actions.checkResourcesResponse()
        resource_distribution_page.actions.selectResourceType(resourceType.label)
        resource_distribution_page.actions.checkResourcesResponse(resourceType.apiType).then((data) => {
            resource_distribution_page.actions.checkResourceInResponse(data, testData.networkName, resourceType.apiType)
        })
        resource_distribution_page.actions.getProjectUnderMainProject(mainProject).then((projectName) => {
            targetProject = projectName
            resource_distribution_page.actions.clickChangeProjectIconRowByName(testData.networkName)
            resource_distribution_page.actions.isDisabledChangeProjectSubmitBtn()
            resource_distribution_page.actions.selectChangeProjectModalProject(targetProject)
            resource_distribution_page.actions.clickChangeProjectSubmitBtn()
            cy.wait('@moveResources').its('response.statusCode').should('eq', 204)
            resource_distribution_page.actions.isNotVisibleResourceRowByName(testData.networkName)
            // local network is in target project - check and delete it there
            cy.visit(configData.base_url)
            resource_distribution_page.actions.selectSidebarProject(targetProject)
            checkLocalNetworkInCurrentProject()
            deleteLocalNetworkInCurrentProject()
        })
    })

    it('[PD-627] Resource Distribution - Change Project - X icon (successful)', () => {
        loginToMainProject()
        resource_distribution_page.actions.openDistributionPage()
        resource_distribution_page.actions.checkResourcesResponse().then((data) => {
            const resourceName = data.content[0].name                 // any resource - nothing is moved
            resource_distribution_page.actions.clickChangeProjectIconRowByName(resourceName)
            resource_distribution_page.actions.clickModalCloseBtn()
            resource_distribution_page.actions.isNotVisibleModal()
            resource_distribution_page.actions.isVisibleResourceRowByName(resourceName)
        })
    })

    it('[PD-628, PD-629] Resource Distribution - Resource visibility (for local network) - adding projects and X icon (successful)', () => {
        const resourceType = resourceTypes.find((type) => type.name === 'Local Network')
        loginToMainProject()
        createLocalNetwork()
        resource_distribution_page.actions.openDistributionPage()
        resource_distribution_page.actions.checkResourcesResponse()
        resource_distribution_page.actions.selectResourceType(resourceType.label)
        resource_distribution_page.actions.checkResourcesResponse(resourceType.apiType).then((data) => {
            resource_distribution_page.actions.checkResourceInResponse(data, testData.networkName, resourceType.apiType)
        })
        resource_distribution_page.actions.getProjectUnderMainProject(mainProject).then((projectName) => {
            targetProject = projectName
            // [PD-629]
            resource_distribution_page.actions.clickResourceVisibilityIconRowByName(testData.networkName)
            resource_distribution_page.actions.clickModalCloseBtn()
            resource_distribution_page.actions.isNotVisibleModal()
            // [PD-628] make local network visible to target project
            resource_distribution_page.actions.clickResourceVisibilityIconRowByName(testData.networkName)
            resource_distribution_page.actions.clickResourceVisibilityDropdownList()
            resource_distribution_page.actions.isNotCheckedResourceVisibilityProject(targetProject)
            resource_distribution_page.actions.clickResourceVisibilityProjectOption(targetProject)
            resource_distribution_page.actions.isCheckedResourceVisibilityProject(targetProject)
            resource_distribution_page.actions.clickResourceVisibilityDropdownList()          // close list
            resource_distribution_page.actions.clickResourceVisibilitySaveBtn()
            cy.wait('@changeVisibility').its('response.statusCode').should('be.oneOf', [200, 204])
            resource_distribution_page.actions.checkResourcesResponse(resourceType.apiType)   // list is re-loaded after save
            resource_distribution_page.actions.isNotVisibleModal()
            // local network is visible in target project
            cy.visit(configData.base_url)
            resource_distribution_page.actions.selectSidebarProject(targetProject)
            checkLocalNetworkInCurrentProject()
            // back to main project and delete local network
            resource_distribution_page.actions.selectSidebarProject(mainProject)
            checkLocalNetworkInCurrentProject()
            deleteLocalNetworkInCurrentProject()
        })
    })

    it('[PD-631] Resource Distribution - Move multiple resources to another project (successful)', () => {
        const resourceNames = [testData.networkName, testData.diskName]
        loginToMainProject()
        createLocalNetwork()
        createHddDisk()
        // move local network and disk to project under main project
        resource_distribution_page.actions.openDistributionPage()
        resource_distribution_page.actions.checkResourcesResponse()
        resource_distribution_page.actions.selectPageSize(50)                    // new resources can be on 2nd page
        resource_distribution_page.actions.checkResourcesResponse().then((data) => {
            resource_distribution_page.actions.checkResourceInResponse(data, testData.networkName, 'LOCAL_NETWORK')
            resource_distribution_page.actions.checkResourceInResponse(data, testData.diskName, 'DISK')
        })
        resource_distribution_page.actions.getProjectUnderMainProject(mainProject).then((projectName) => {
            targetProject = projectName
            resourceNames.forEach((name) => resource_distribution_page.actions.clickCheckboxRowByName(name))
            resource_distribution_page.actions.selectTargetProject(targetProject)
            resource_distribution_page.actions.clickMoveBtn()
            resource_distribution_page.actions.checkConfirmMoveTxt(targetProject.name)
            resource_distribution_page.actions.clickConfirmMoveBtn()
            cy.wait('@moveResources').its('response.statusCode').should('eq', 204)
            resourceNames.forEach((name) => resource_distribution_page.actions.isNotVisibleResourceRowByName(name))
            // local network and disk are in target project - check and delete them there
            cy.visit(configData.base_url)
            resource_distribution_page.actions.selectSidebarProject(targetProject)
            checkLocalNetworkInCurrentProject()
            deleteLocalNetworkInCurrentProject()
            checkDiskInCurrentProject()
            deleteDiskInCurrentProject()
        })
    })

    it('[PD-632] Resource Distribution - Move Confirmation popup - Cancel button (successful)', () => {
        let resourceNames                                   // any 2 resources - move is cancelled
        loginToMainProject()
        resource_distribution_page.actions.openDistributionPage()
        resource_distribution_page.actions.checkResourcesResponse().then((data) => {
            resourceNames = data.content.slice(0, 2).map((item) => item.name)
        })
        resource_distribution_page.actions.getProjectUnderMainProject(mainProject).then((projectName) => {
            resourceNames.forEach((name) => resource_distribution_page.actions.clickCheckboxRowByName(name))
            resource_distribution_page.actions.selectTargetProject(projectName)
            resource_distribution_page.actions.clickMoveBtn()
            resource_distribution_page.actions.checkConfirmMoveTxt(projectName.name)
        })
        resource_distribution_page.actions.clickCancelMoveBtn()
        cy.get('@moveResources.all').should('have.length', 0)
        cy.then(() => {
            resourceNames.forEach((name) => {
                resource_distribution_page.actions.isVisibleResourceRowByName(name)
                resource_distribution_page.elements.resourceRowByName(name).should('contain.text', mainProject.name)
            })
        })
    })

    it('[PD-633] Resource Distribution - Pagination - forward and back (successful)', () => {
        loginToMainProject()
        resource_distribution_page.actions.openDistributionPage()
        resource_distribution_page.actions.checkResourcesResponse().then((firstPage) => {
            resource_distribution_page.actions.isVisiblePagination()
            resource_distribution_page.actions.checkActivePage(1)
            resource_distribution_page.actions.checkRowsCount(firstPage.content.length)
            if (firstPage.totalElements <= 10) {
                cy.log('10 or less resources in project - only one page, navigation is not checked')
                resource_distribution_page.elements.paginationPageBtn(2).should('not.exist')
                return
            }
            resource_distribution_page.actions.clickPaginationPageBtn(2)
            resource_distribution_page.actions.checkResourcesResponse().then((secondPage) => {
                expect(secondPage.number).to.eq(1)
                resource_distribution_page.actions.checkActivePage(2)
                resource_distribution_page.actions.isVisibleResourceRowByName(secondPage.content[0].name)
                resource_distribution_page.actions.isNotVisibleResourceRowByName(firstPage.content[0].name)
            })
            resource_distribution_page.actions.clickPaginationPageBtn(1)
            resource_distribution_page.actions.checkResourcesResponse().then((data) => {
                expect(data.number).to.eq(0)
                resource_distribution_page.actions.checkActivePage(1)
                resource_distribution_page.actions.isVisibleResourceRowByName(firstPage.content[0].name)
            })
        })
    })
})
