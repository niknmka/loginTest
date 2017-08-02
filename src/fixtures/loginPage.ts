import { ExpectedConditions as EC, browser, element, by} from 'protractor'
import { dataset } from "../tests/dataset"
import { expect } from 'chai'

export class LoginPage {
    async fillingLoginFields() {
        await element(by.model('ctrl.model.email')).sendKeys(dataset.login.username)
        await element(by.model('ctrl.model.password')).sendKeys(dataset.login.password)
    }
    async logIn() {
        await element(by.css('[ng-click="ctrl.submit(true)"]')).click()
        await browser.wait(EC.visibilityOf(element(by.name('tab-rogue-home'))))
        expect(await element(by.name('tab-rogue-home')).isDisplayed()).to.be.true
    }
}