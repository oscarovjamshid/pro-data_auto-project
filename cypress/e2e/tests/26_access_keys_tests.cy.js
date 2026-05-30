cy.on('uncaught:exception', () => false)

import sidebar from "../pages/sidebar"
import access_history_page from "../pages/access_history_page"

describe('26.Access Keys Tests', () => {
    let configData

    const keyName = (prefix = 'ak') => `${prefix}_${Date.now()}_${Cypress._.random(1000, 9999)}`

    const openAccessKeysPage = () => {
        cy.login(configData.base_url, configData.login, configData.password)
        sidebar.actions.clickUserIcon()
        sidebar.actions.clickSettingsIcon()
        sidebar.actions.clickAccessKeysIcon()
        access_history_page.actions.isVisibleAccessKeysHeader()
        access_history_page.actions.isVisibleCreateKeyBtn()
    }

    const openCreateModal = () => {
        access_history_page.actions.clickCreateKeyBtn()
        access_history_page.actions.isVisibleCreateModal()
    }
    const openCreateModalWhenNoRecords = () => {
        access_history_page.actions.clickCreateKeyBtnWhenNoRecords()
        access_history_page.actions.isVisibleCreateModal()
    }

    const fillRequiredCreateFields = ({ name, owner, expiration, scope = 'read-only' }) => {
        access_history_page.actions.typeKeyName(name)

        if (owner) {
            access_history_page.actions.selectOwner(owner)
        } else {
            access_history_page.actions.selectFirstOwner()
        }

        access_history_page.actions.selectExpiration(expiration || '30 days')

        if (scope === 'custom') {
            access_history_page.actions.chooseCustomScope()
        } else if (scope === 'full') {
            access_history_page.actions.chooseFullScope()
        } else {
            access_history_page.actions.chooseReadOnlyScope()
        }
    }

    const createKey = ({
        name,
        description,
        owner,
        expiration,
        scope = 'read-only',
        customPermissions,
        waitForCreate = true,
    }) => {
        openCreateModal()
        fillRequiredCreateFields({ name, owner, expiration, scope })

        if (description) {
            access_history_page.actions.typeDescription(description)
        }

        if (scope === 'custom' && Array.isArray(customPermissions)) {
            customPermissions.forEach((item) => {
                access_history_page.actions.setCustomScopePermission(item.service, item.column)
            })
        }

        access_history_page.actions.clickGenerateKeyBtn()

        if (waitForCreate) {
            cy.wait('@accessKeyCreate', { timeout: 15000 }).its('response.statusCode').should('be.oneOf', [200, 201])
        }
    }

    before(() => {
        cy.fixture('examples').then((data) => {
            configData = data
        })
    })

    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('POST', '**/panel-main/api/v1/auth/sign-in').as('signInRequest')
        cy.intercept('POST', '**/panel-main/iam/api/v1/access-keys').as('accessKeyCreate')
        cy.intercept('PATCH', '**/panel-main/iam/api/v1/access-keys/**').as('accessKeyEdit')
        cy.intercept('DELETE', '**/panel-main/iam/api/v1/access-keys/**').as('accessKeyDelete')
    })

    // it('PD-249 Create Access Key', () => {
    //     const name = keyName('pd249')

    //     openAccessKeysPage()
    //     createKey({ name })
    //     access_history_page.actions.isVisibleKeyRowByName(name)
    // })

    // it('PD-250 Delete Access Key', () => {
    //     const name = keyName('pd250')

    //     openAccessKeysPage()
    //     createKey({ name })
    //     access_history_page.actions.isVisibleKeyRowByName(name)

    //     access_history_page.actions.clickDeleteAccessKeyByName(name)
    //     access_history_page.actions.isVisibleDeleteModal()
    //     access_history_page.actions.clickDeleteAccessKeyVerified()
    //     cy.wait('@accessKeyDelete', { timeout: 15000 }).its('response.statusCode').should('be.oneOf', [200, 204])
    //     access_history_page.actions.isNotVisibleKeyRowByName(name)
    // })

    it.skip('PD-594 Copy icon', () => {
        // Requires stable qa-element for copy icon in post-create state/modal.
    })

    it.skip('PD-595 X icon', () => {
        // Requires stable qa-element for copy/value modal close icon in post-create state.
    })

    it('PD-834 Create key: with Latin letters', () => {
        const name = keyName('latin').replace(/\d|_/g, '')

        openAccessKeysPage()
        openCreateModalWhenNoRecords()
        createKey({ name })
        access_history_page.actions.isVisibleKeyRowByName(name)
    })

    it('PD-835 Create key: with numbers', () => {
        const name = `${Date.now()}${Cypress._.random(100, 999)}`

        openCreateModalWhenNoRecords()
        createKey({ name })
        access_history_page.actions.isVisibleKeyRowByName(name)
    })

    it('PD-836 Create key: with hyphen, underscore, full stop', () => {
        const name = `qa-key_${Date.now()}.1`

        openCreateModalWhenNoRecords()
        createKey({ name })
        access_history_page.actions.isVisibleKeyRowByName(name)
    })

    it('PD-837 Create key: with Description', () => {
        const name = keyName('desc')

        openAccessKeysPage()
        createKey({ name, description: 'created by cypress automated test' })
        access_history_page.actions.isVisibleKeyRowByName(name)
    })

    it('PD-838 Create key: empty (unsuccessful)', () => {
        openAccessKeysPage()
        openCreateModal()
        access_history_page.actions.clickGenerateKeyBtn()
        access_history_page.actions.isVisibleRequiredFieldErrors()
    })

    it('PD-839 Create key: Cyrillic letters (unsuccessful)', () => {
        const name = `тест_${Date.now()}`

        openAccessKeysPage()
        openCreateModal()
        access_history_page.actions.typeKeyName(name)
        access_history_page.actions.clickGenerateKeyBtn()
        access_history_page.actions.isVisibleRequiredFieldErrors()
    })

    it('PD-840 Create key: existing key name (unsuccessful)', () => {
        const name = keyName('duplicate')

        openAccessKeysPage()
        createKey({ name })
        access_history_page.actions.isVisibleKeyRowByName(name)

        createKey({ name, waitForCreate: false })
        access_history_page.actions.isVisibleDuplicatedNameError()
    })

    it('PD-841 Create key: for 30 days', () => {
        const name = keyName('30d')

        openAccessKeysPage()
        createKey({ name, expiration: '30 days' })
        access_history_page.actions.isVisibleKeyRowByName(name)
    })

    it('PD-842 Create key: for 90 days', () => {
        const name = keyName('90d')

        openAccessKeysPage()
        createKey({ name, expiration: '90 days' })
        access_history_page.actions.isVisibleKeyRowByName(name)
    })

    it('PD-843 Create key: for 1 year', () => {
        const name = keyName('1y')

        openAccessKeysPage()
        createKey({ name, expiration: '1 years' })
        access_history_page.actions.isVisibleKeyRowByName(name)
    })

    it('PD-844 Create key: for Never', () => {
        const name = keyName('never')

        openAccessKeysPage()
        createKey({ name, expiration: 'Never' })
        access_history_page.actions.isVisibleKeyRowByName(name)
    })

    it('PD-845 Create key: with Read-Only access scope', () => {
        const name = keyName('ro')

        openAccessKeysPage()
        createKey({ name, scope: 'read-only' })
        access_history_page.actions.isVisibleKeyRowByName(name)
    })

    it('PD-846 Create key: with Full access scope', () => {
        const name = keyName('full')

        openAccessKeysPage()
        createKey({ name, scope: 'full' })
        access_history_page.actions.isVisibleKeyRowByName(name)
    })

    it('PD-847 Create key: with Custom access scope: all', () => {
        const name = keyName('custom-all')

        openAccessKeysPage()
        createKey({
            name,
            scope: 'custom',
            customPermissions: [
                { service: 'DASHBOARD', column: 'READ & WRITE' },
                { service: 'VIRTUAL_SERVERS', column: 'READ & WRITE' },
                { service: 'LOAD_BALANCERS', column: 'READ & WRITE' },
            ],
        })
        access_history_page.actions.isVisibleKeyRowByName(name)
    })

    it('PD-848 Create key: with Custom access scope: k8s read and write', () => {
        const name = keyName('custom-k8s')

        openAccessKeysPage()
        createKey({
            name,
            scope: 'custom',
            customPermissions: [
                { service: 'MANAGED_KUBERNETES', column: 'READ & WRITE' },
            ],
        })
        access_history_page.actions.isVisibleKeyRowByName(name)
    })

    it('PD-849 Create key: with Custom access scope: s3 read and write', () => {
        const name = keyName('custom-s3')

        openAccessKeysPage()
        createKey({
            name,
            scope: 'custom',
            customPermissions: [
                { service: 'OBJECT_STORAGE', column: 'READ & WRITE' },
            ],
        })
        access_history_page.actions.isVisibleKeyRowByName(name)
    })

    it('PD-850 Create key: with Custom access scope: none (unsuccessful)', () => {
        const name = keyName('custom-none')

        openAccessKeysPage()
        createKey({ name, scope: 'custom', waitForCreate: false })
        access_history_page.actions.isVisibleCreateModal()
        access_history_page.actions.isNotVisibleKeyRowByName(name)
    })

    it('PD-851 Create key: Cancel button', () => {
        openAccessKeysPage()
        openCreateModal()
        access_history_page.actions.clickCancelBtnInModal()
        access_history_page.actions.isNotVisibleModal()
    })

    it('PD-852 Edit key: with valid values', () => {
        const oldName = keyName('edit-old')
        const newName = keyName('edit-new')

        openAccessKeysPage()
        createKey({ name: oldName })
        access_history_page.actions.isVisibleKeyRowByName(oldName)

        access_history_page.actions.clickEditAccessKeyByName(oldName)
        access_history_page.actions.isVisibleEditModal()
        access_history_page.actions.typeKeyName(newName)
        access_history_page.actions.isEnabledSaveBtnInEditModal()
        access_history_page.actions.clickSaveBtnInEditModal()
        cy.wait('@accessKeyEdit', { timeout: 15000 }).its('response.statusCode').should('be.oneOf', [200, 204])

        access_history_page.actions.isVisibleKeyRowByName(newName)
    })

    it('PD-853 Edit key: with invalid values (unsuccessful)', () => {
        const name = keyName('edit-invalid')

        openAccessKeysPage()
        createKey({ name })
        access_history_page.actions.clickEditAccessKeyByName(name)
        access_history_page.actions.isVisibleEditModal()
        access_history_page.actions.typeKeyName('')
        access_history_page.actions.isDisabledSaveBtnInEditModal()
    })

    it('PD-854 Delete key: deleting any key', () => {
        const name = keyName('delete-any')

        openAccessKeysPage()
        createKey({ name })
        access_history_page.actions.clickDeleteAccessKeyByName(name)
        access_history_page.actions.isVisibleDeleteModal()
        access_history_page.actions.clickDeleteAccessKeyVerified()
        cy.wait('@accessKeyDelete', { timeout: 15000 }).its('response.statusCode').should('be.oneOf', [200, 204])
        access_history_page.actions.isNotVisibleKeyRowByName(name)
    })

    it('PD-855 Access scope: permissions link: service + action validation', () => {
        const name = keyName('perm-link')

        openAccessKeysPage()
        createKey({
            name,
            scope: 'custom',
            customPermissions: [{ service: 'DASHBOARD', column: 'READ & WRITE' }],
        })

        access_history_page.actions.clickPermissionLinkByName(name)
        access_history_page.actions.isVisiblePermissionDetails()
    })

    it.skip('PD-856 Create key: as root user', () => {
        // Needs dedicated root user credentials in fixture and isolated test account.
    })

    it.skip('PD-857 Create key: as child user', () => {
        // Needs dedicated child user credentials in fixture and isolated test account.
    })

    it('PD-858 New Access Key pop-up: dropdown-list', () => {
        openAccessKeysPage()
        openCreateModal()
        access_history_page.actions.isVisibleOwnerDropdownOptions()
        access_history_page.actions.isVisibleExpirationDropdownOptions()
    })

    it.skip('PD-859 New Access Key pop-up: Copy icons', () => {
        // Requires stable selectors for copy controls and expected clipboard content.
    })
})
