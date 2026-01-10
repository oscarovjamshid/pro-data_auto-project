class FactorAuthentication {
    elements = {
       TwoFactor: () => cy.get('[qa-element="sidemenu-nav-account-settings-sublink-account-two-fa"]'),
       createFactorBtn: () => cy.get('[qa-element="two-fa-active"]'),
       passwordCheckBtn: () => cy.get('[qa-element="password-check-submit"]'),
       qrOtpInp: () => cy.get('[ qa-element="otp-mask"]'),
       lastActivateBtn: () => cy.get('[qa-element="app-connect-submit"]'),
       inValidMessage: () => cy.get('[qa-element="two-fa-otp-error"]'),
       qrCodeTwoFactor: () => cy.get('[class="two-fa-activation__qr-code"]'),
      
       
    }
    actions = {
        clickTwoFactorTxt: () => {
            this.elements.TwoFactor().click()
        },
        clickCreateFactorBtn: () => {
            this.elements.createFactorBtn().click()
        },
        clickCheckPasswordBtn: () => {
            this.elements.passwordCheckBtn().click()
        },
        enterQrOtpInp: (text) => {
            this.elements.qrOtpInp().type(text)
        },
        clickLastActivateBtn: () => {
            this.elements.lastActivateBtn().click()
        },
        isVisibleMessageOtp: () => {
            this.elements.inValidMessage().should('be.visible')
        },
        isVisibleQrCodeFactor: () => {
            this.elements.qrCodeTwoFactor().should('be.visible')
        }
        
    }
}





module.exports = new FactorAuthentication()