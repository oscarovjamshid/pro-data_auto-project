class SideBar {
    elements = {
        servers_icon: () => cy.get('[qa-element="nav_link_servers"]'),
        networks_icon: () => cy.get('[qa-element="nav_link_networks"]'),
        load_balance_icon: () => cy.get('[qa-element="nav_link_loadbalancers"]'),
        disks_icon: () => cy.get('[qa-element="nav_link_disks"]'),
        securityGroups_icon: () => cy.get('[qa-element="nav_link_security-groups"]'),
        customOS_icon: () => cy.get('[qa-element="nav_link_templates"]'),
        object_storage_icon: () => cy.get('[qa-element="nav_link_storage"]'),
        managed_kubernetes_icon: () => cy.get('[qa-element="nav_link_clusters"]'),
        userManagement_icon: () => cy.get('[qa-element="nav_link_users"]'),
        manageUser_icon: () => cy.get('[qa-element="nav_link-account-users"]'),
        settingsIcon: () => cy.get('[qa-element="account-settings"]'),
        logOutBtn: () => cy.get('[qa-element="sign-out"]'),
        confLogoutBtn: () => cy.get('[qa-element="logout-submit"]').contains('Да'),
        consuption_icon: () => cy.get('[qa-element="sidemenu-nav-account-settings-sublink-account-reports"]'),
        backup_icon: () => cy.get('[qa-element="nav_link_backups"]'),
        action_history_icon: () => cy.get('[qa-element="sidemenu-nav-account-settings-sublink-account-log"]'),
        account_history: () => cy.get('[qa-element="sidemenu-nav-account-settings"]'),

        region_icon: () => cy.get('[qa-element="region-selector"]'),
        user_icon: () => cy.get('[qa-element="user-menu-toggle"]'),
        confirmLogoutBtn: () => cy.get('[qa-element="confirm-logout"]')

    }
    actions = {
        clickServersIcon: () => {
            this.elements.servers_icon().click()
        },
        clickNetworksIcon: () => {
            this.elements.networks_icon().click()
        },
        clickLoadBalanceIcon: () => {
            this.elements.load_balance_icon().click()
        },
        clickSecurityGroupsIcon: () => {
            this.elements.securityGroups_icon().click()
        },
        clickDisksIcon: () => {
            this.elements.disks_icon().click()
        },
        clickCustomOS_icon: () => {
            this.elements.customOS_icon().click()
        },
        clickObjectStorageIcon: () => {
            this.elements.object_storage_icon().click()
        },
        clickManagedKubernetesIcon: () => {
            this.elements.managed_kubernetes_icon().click()
        },
        clickUserManagement: () => {
            this.elements.userManagement_icon().click()
        },
        clickManageUser: () => {
            this.elements.manageUser_icon().click()
        },
        clickUserIcon: () => {
            this.elements.user_icon().click()
        },
        clickSettingsIcon: () => {
            this.elements.settingsIcon().click()
        },
        clickLogOutBtn: () => {
            this.elements.user_icon().click()
            this.elements.logOutBtn().click()
        },
        clickConfLogoutBtn: () => {
            this.elements.confirmLogoutBtn().click()
        },
        clickConsuptionIcon: () => {
            this.elements.consuption_icon().click()
        },
        clickBackupIcon: () => {
            this.elements.backup_icon().click()
        },
        clickAction_history_icon: () => {
            this.elements.action_history_icon().click()
        },
        clickAccount_history: () => {
            this.elements.account_history().click()
        },
        selectRegionByName: (name) => {                 // selecting region like UZ3, UZ5, UZ6
            this.elements.region_icon().contains(name).click()
            cy.wait(15000)
        },
    }
}





module.exports = new SideBar()