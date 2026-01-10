cy.on('uncaught:exception', (err, runnable) => {
    return false;
});

import { test } from "mocha";
import login_page from "../pages/login_page";
import forgot_password_page from "../pages/forgot_password_page";

describe('34.Forgot Password Tests', () => {
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
    it('[PD-304-306-768] Forgot Password - negative test cases (unsuccessful)', () => { // 4 negative test cases in 1 autotest
        const testData =
        {
            invalidEmail: 'passworduser.mailinator.com',
            letters: 'Abcdefghijk',
            numbers: '123456789',
            symbols: '!@#$%^&*()',
            cyrilic: 'Йцукенгшщз',
            notExistingLogin: 'bigtester@gmail.com'
        }
        cy.visit(configData.base_url)
        login_page.actions.isVisibleLoginTxt()
        login_page.actions.clickeditLanguage()
        login_page.actions.clickRusLanguage()
        cy.wait(3000)
        forgot_password_page.actions.clickForgotPasswordBtn()
        forgot_password_page.actions.enterEmailToForgotPwdField(testData.invalidEmail) // [PD-304]
        forgot_password_page.actions.clickSendBtn()
        forgot_password_page.actions.checkInvalidErrorLblForForgotPwdField('Неверное значение')
        forgot_password_page.actions.clearOnlyForgotPwdField() // [PD-305]
        forgot_password_page.actions.clickSendBtn()
        forgot_password_page.actions.checkInvalidErrorLblForForgotPwdField('Обязательное поле')
        forgot_password_page.actions.enterEmailToForgotPwdField(testData.letters) // [PD-306]
        forgot_password_page.actions.clickSendBtn()
        forgot_password_page.actions.checkInvalidErrorLblForForgotPwdField('Неверное значение')
        forgot_password_page.actions.enterEmailToForgotPwdField(testData.numbers) // [PD-306]
        forgot_password_page.actions.clickSendBtn()
        forgot_password_page.actions.checkInvalidErrorLblForForgotPwdField('Неверное значение')
        forgot_password_page.actions.enterEmailToForgotPwdField(testData.symbols) // [PD-306]
        forgot_password_page.actions.clickSendBtn()
        forgot_password_page.actions.checkInvalidErrorLblForForgotPwdField('Неверное значение')
        forgot_password_page.actions.enterEmailToForgotPwdField(testData.cyrilic)   // [PD-306]
        forgot_password_page.actions.clickSendBtn()
        forgot_password_page.actions.checkInvalidErrorLblForForgotPwdField('Неверное значение')
        forgot_password_page.actions.enterEmailToForgotPwdField(testData.notExistingLogin)  // [PD-768]
        forgot_password_page.actions.clickSendBtn()
        forgot_password_page.actions.checkInvalidErrorLblForForgotPwdField('Логин не найден')
    })
    it('[PD-307] Forgot Password - clicking X icon', () => {
        cy.visit(configData.base_url)
        login_page.actions.isVisibleLoginTxt()
        login_page.actions.clickeditLanguage()
        login_page.actions.clickRusLanguage()
        cy.wait(3000)
        forgot_password_page.actions.clickForgotPasswordBtn()
        forgot_password_page.actions.clickCloseBtnInPasswordResetModal()
        cy.wait(1000)
        forgot_password_page.actions.IsNotVisibleResetPwdEmailField()
    })
    it('[PD-303] Forgot Password - password reset email sent (successful)', () => {
        cy.origin('https://www.mailinator.com', () => {
            Cypress.on('uncaught:exception', (err, runnable) => {  // inside the cy.origin() method from failing the test
                return false
            })
        });
        const testData =
        {
            mailAddress: 'passworduser@mailinator.com',
        }
        cy.visit(configData.base_url)
        login_page.actions.isVisibleLoginTxt()
        login_page.actions.clickeditLanguage()
        login_page.actions.clickRusLanguage()
        cy.wait(3000)
        forgot_password_page.actions.clickForgotPasswordBtn()
        forgot_password_page.actions.enterEmailToForgotPwdField(testData.mailAddress)
        forgot_password_page.actions.clickSendBtn()
        cy.wait(2000)
        forgot_password_page.actions.isVisiblePasswordResetModal()
        forgot_password_page.actions.clickOkBtnInPasswordResetModal()
        forgot_password_page.actions.getPasswordResetUrl(testData.mailAddress).then((resetUrl) => {
            cy.log(`Visiting reset URL: ${resetUrl}`)
            cy.wait(2000)
            cy.visit(resetUrl)
            cy.wait(3000)
        })
    })
    it('[PD-766] Forgot Password - resending forgot pwd email within 10 minutes (unsuccessful)', () => {
        const testData =
        {
            mailAddress: 'passworduser@mailinator.com',
        }
        cy.visit(configData.base_url)
        login_page.actions.isVisibleLoginTxt()
        login_page.actions.clickeditLanguage()
        login_page.actions.clickRusLanguage()
        cy.wait(3000)
        forgot_password_page.actions.clickForgotPasswordBtn()
        forgot_password_page.actions.enterEmailToForgotPwdField(testData.mailAddress)
        forgot_password_page.actions.clickSendBtn()
        cy.wait(2000)
        forgot_password_page.actions.checkInvalidErrorLblForForgotPwdField('Вы недавно запрашивали сброс пароля. Пожалуйста, подождите 10 минут перед повторной попыткой')
    })
    it('[PD-754-763] Reset Password - invalid attempts to reset pwd (unsuccessful)', () => { // 9 negative test cases in 1 autotest
        cy.origin('https://www.mailinator.com', () => {
            Cypress.on('uncaught:exception', (err, runnable) => {  // inside the cy.origin() method from failing the test
                return false
            })
        });
        const testData =
        {
            mailAddress: 'passworduser@mailinator.com',
            newPassword: '123.Qa.321',
            letters: 'Abcdefghijk',
            numbers: '123456789',
            symbols: '!@#$%^&*()',
            cyrilic: 'Йцукенгшщз'
        }
        cy.visit(configData.base_url)
        login_page.actions.isVisibleLoginTxt()
        login_page.actions.clickeditLanguage()
        login_page.actions.clickRusLanguage()
        forgot_password_page.actions.getPasswordResetUrl(testData.mailAddress).then((resetUrl) => {
            cy.log(`Visiting reset URL: ${resetUrl}`)
            cy.wait(2000)
            cy.visit(resetUrl)
            cy.wait(2000)
            forgot_password_page.actions.enterPwdToResetPwdPageConfirmPasswordField(testData.newPassword) // [PD-754]
            forgot_password_page.actions.clickResetPwdSaveBtn()
            forgot_password_page.actions.checkInvalidErrorLblForResetPageNewPwdField('Обязательное поле')
            forgot_password_page.actions.clearResetPwdPageNewPasswordField() // [PD-755]
            forgot_password_page.actions.clearResetPwdPageConfirmPasswordField()
            forgot_password_page.actions.clickResetPwdSaveBtn()
            forgot_password_page.actions.checkInvalidErrorLblForResetPageConfirmPwdField('Обязательное поле')
            forgot_password_page.actions.checkInvalidErrorLblForResetPageConfirmPwdField('Обязательное поле')
            forgot_password_page.actions.enterPwdToResetPwdPageNewPasswordField('123') // [PD-756]
            forgot_password_page.actions.clickResetPwdSaveBtn()
            forgot_password_page.actions.checkInvalidErrorLblForResetPageNewPwdField('Слабый пароль')
            forgot_password_page.actions.enterPwdToResetPwdPageConfirmPasswordField('123') // [PD-757]
            forgot_password_page.actions.clickResetPwdSaveBtn()
            forgot_password_page.actions.checkInvalidErrorLblForResetPageNewPwdField('Слабый пароль')
            forgot_password_page.actions.enterPwdToResetPwdPageNewPasswordField(testData.letters) // [PD-758]
            forgot_password_page.actions.enterPwdToResetPwdPageConfirmPasswordField(testData.letters)
            forgot_password_page.actions.clickResetPwdSaveBtn()
            forgot_password_page.actions.checkInvalidErrorLblForResetPageNewPwdField('Слабый пароль')
            forgot_password_page.actions.enterPwdToResetPwdPageNewPasswordField(testData.numbers) // [PD-759]
            forgot_password_page.actions.enterPwdToResetPwdPageConfirmPasswordField(testData.numbers)
            forgot_password_page.actions.clickResetPwdSaveBtn()
            forgot_password_page.actions.checkInvalidErrorLblForResetPageNewPwdField('Слабый пароль')
            forgot_password_page.actions.enterPwdToResetPwdPageNewPasswordField(testData.symbols) // [PD-760]
            forgot_password_page.actions.enterPwdToResetPwdPageConfirmPasswordField(testData.symbols)
            forgot_password_page.actions.clickResetPwdSaveBtn()
            forgot_password_page.actions.checkInvalidErrorLblForResetPageNewPwdField('Слабый пароль')
            forgot_password_page.actions.enterPwdToResetPwdPageNewPasswordField(testData.cyrilic) // [PD-763]
            forgot_password_page.actions.enterPwdToResetPwdPageConfirmPasswordField(testData.cyrilic)
            forgot_password_page.actions.clickResetPwdSaveBtn()
            forgot_password_page.actions.checkInvalidErrorLblForResetPageNewPwdField('Слабый пароль')
            forgot_password_page.actions.enterPwdToResetPwdPageNewPasswordField(testData.newPassword) // [PD-761]
            forgot_password_page.actions.enterPwdToResetPwdPageConfirmPasswordField(testData.letters)
            forgot_password_page.actions.clickResetPwdSaveBtn()
            forgot_password_page.actions.checkInvalidErrorLblForResetPageConfirmPwdField('Пароли должны совпадать')
        })
    })
    it('[PD-764] Reset Password - Back To Main button', () => {
        cy.origin('https://www.mailinator.com', () => {
            Cypress.on('uncaught:exception', (err, runnable) => {  // inside the cy.origin() method from failing the test
                return false
            })
        });
        const testData =
        {
            mailAddress: 'passworduser@mailinator.com',
        }
        cy.visit(configData.base_url)
        forgot_password_page.actions.getPasswordResetUrl(testData.mailAddress).then((resetUrl) => {
            cy.log(`Visiting reset URL: ${resetUrl}`)
            cy.wait(2000)
            cy.visit(resetUrl)
            cy.wait(3000)
            forgot_password_page.actions.clickResetPwdBackToMainBtn()
            login_page.actions.isVisibleLoginBtn()
        })
    })
    it('[PD-753] Reset Password - resetting new pwd and login with new pwd (successful)', () => {
        cy.origin('https://www.mailinator.com', () => {
            Cypress.on('uncaught:exception', (err, runnable) => {  // inside the cy.origin() method from failing the test
                return false
            })
        });
        const testData =
        {
            mailAddress: 'passworduser@mailinator.com',
            newPassword: '123.Qa.321'
        }
        cy.visit(configData.base_url)
        login_page.actions.isVisibleLoginTxt()
        login_page.actions.clickeditLanguage()
        login_page.actions.clickRusLanguage()
        forgot_password_page.actions.getPasswordResetUrl(testData.mailAddress).then((resetUrl) => {
            cy.log(`Visiting reset URL: ${resetUrl}`)
            cy.wait(2000)
            cy.visit(resetUrl)
            cy.wait(2000)
            forgot_password_page.actions.enterPwdToResetPwdPageNewPasswordField(testData.newPassword)
            forgot_password_page.actions.enterPwdToResetPwdPageConfirmPasswordField(testData.newPassword)
            forgot_password_page.actions.clickResetPwdSaveBtn()
            cy.wait(5000)
            forgot_password_page.actions.clickResetPwdBackToMainBtn()
            login_page.actions.enterLogin(testData.mailAddress)
            login_page.actions.enterPassword(testData.newPassword)
            login_page.actions.isVisibleLoginBtn()
            login_page.actions.clickLoginBtn()
            login_page.actions.isLogined()
        })
    })
    it('[PD-767] Reset Password - Your Password was reset email verification (successful)', () => {
        cy.origin('https://www.mailinator.com', () => {
            Cypress.on('uncaught:exception', (err, runnable) => {  // inside the cy.origin() method from failing the test
                return false
            })
        });
        const testData =
        {
            mailAddress: 'passworduser@mailinator.com',
        }
        cy.visit(configData.base_url)
        login_page.actions.isVisibleLoginTxt()
        login_page.actions.clickeditLanguage()
        login_page.actions.clickRusLanguage()
        forgot_password_page.actions.getSuccessfulPwdResetText(testData.mailAddress)
        cy.wait(2000)
    })
    it('[PD-765] Reset Password - expired link (unsuccessful)', () => {
        cy.origin('https://www.mailinator.com', () => {
            Cypress.on('uncaught:exception', (err, runnable) => {  // inside the cy.origin() method from failing the test
                return false
            })
        });
        const testData =
        {
            mailAddress: 'passworduser@mailinator.com',
            newPassword: '123.Qa.321'
        }
        cy.visit(configData.base_url)
        login_page.actions.isVisibleLoginTxt()
        login_page.actions.clickeditLanguage()
        login_page.actions.clickRusLanguage()
        forgot_password_page.actions.getExpiredLinkText(testData.mailAddress).then((resetUrl) => {
            cy.log(`Visiting reset URL: ${resetUrl}`)
            cy.wait(2000)
            cy.visit(resetUrl)
            cy.wait(2000)
            forgot_password_page.actions.enterPwdToResetPwdPageNewPasswordField(testData.newPassword)
            forgot_password_page.actions.enterPwdToResetPwdPageConfirmPasswordField(testData.newPassword)
            forgot_password_page.actions.clickResetPwdSaveBtn()
            forgot_password_page.actions.checkInvalidErrorLblForResetPageConfirmPwdField('Ссылка не найдена или устарела')
            cy.wait(2000)
        })
    })
})