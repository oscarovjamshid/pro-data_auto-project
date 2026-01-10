class SideBar {
    elements = {
        servers_icon: () => cy.get('[qa-element="sidemenu-nav-services-sublink-services-servers"]'), //sidemenu-nav-services-sublink-services-servers
        networks_icon: () => cy.get('[qa-element="sidemenu-nav-services-sublink-services-networks"]'), //sidemenu-nav-services-sublink-services-networks
        load_balance_icon: () => cy.get('[qa-element="sidemenu-nav-services-sublink-services-loadbalancers"]'), //sidemenu-nav-services-sublink-services-loadbalancers
        disks_icon: () => cy.get('[qa-element="sidemenu-nav-services-sublink-services-disks"]'), //sidemenu-nav-services-sublink-services-disks 
        securityGroups_icon: () => cy.get('[qa-element="sidemenu-nav-services-sublink-services-security-groups"]'),
        customOS_icon: () => cy.get('[qa-element="sidemenu-nav-services-sublink-services-templates"]'), //sidemenu-nav-services-sublink-services-templates
        object_storage_icon: () => cy.get('[qa-element="sidemenu-nav-services-sublink-services-storage"]'), //sidemenu-nav-services-sublink-services-templates
        managed_kubernetes_icon: () => cy.get('[qa-element="sidemenu-nav-services-sublink-services-clusters"]'), //sidemenu-nav-services-sublink-services-clusters
        userCredentials_icon: () => cy.get('[qa-element="sidemenu-nav-account-settings"]'), //user-card-toggle
        manageUser_icon: () => cy.get('[qa-element="sidemenu-nav-account-settings-sublink-account-users"]'), //sidemenu-nav-account-settings-sublink-account-users
        userProfileIcon: () => cy.get('[qa-element="user-card-toggle"]'),
        profileLogoutIcon: () => cy.get('[qa-element="logout-show"]').contains('Выйти'), //logout-show
        confLogoutBtn: () => cy.get('[qa-element="logout-submit"]').contains('Да'), //logout-submit
        consuption_icon: () => cy.get('[qa-element="sidemenu-nav-account-settings-sublink-account-reports"]'), //sidemenu-nav-account-settings-sublink-account-reports
        backup_icon: () => cy.get('[qa-element="sidemenu-nav-services-sublink-services-backups"]'), //sidemenu-nav-services-sublink-services-backups
        action_history_icon: () => cy.get('[qa-element="sidemenu-nav-account-settings-sublink-account-log"]'),
        account_history: () => cy.get('[qa-element="sidemenu-nav-account-settings"]'),
        
        region_icon: () => cy.get('[qa-element="region-selector"]')

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
        clickUserCredentials: () => {
            this.elements.userCredentials_icon().click()
        },
        clickManageUser: () => {
            this.elements.manageUser_icon().click()
        },
        clickUserProfileIcon: () => {
            this.elements.userProfileIcon().click()
        },
        clickProfileLogoutIcon: () => {
            this.elements.profileLogoutIcon().click()
        },
        clickConfLogoutBtn: () => {
            this.elements.confLogoutBtn().click()
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