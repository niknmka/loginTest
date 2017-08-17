import { ExpectedConditions as EC, browser, element, by} from 'protractor'
import { dataset } from "../tests/dataset"
import { expect } from 'chai'
import { Context} from "../tests/context"
export class LoginPage {

    constructor(protected _context: Context) {
    }

    async fillingLoginFields() {
        let continueButton = await element(by.css('[ng-click="ctrl.submit()"]'))
        await this._context.helper.fillInput(element(by.model('ctrl.model.email')), dataset.login.username)
        await browser.wait(EC.visibilityOf(continueButton)).then(await continueButton.click())
        await this._context.helper.fillInput(element(by.model('ctrl.model.password')), dataset.login.password)
    }

    async logIn() {
        let continueButton2 = await element(by.css('[ng-click="ctrl.submit(true)"]'))
        await browser.wait(EC.visibilityOf(continueButton2)).then(await continueButton2.click())
        await browser.wait(EC.visibilityOf(element(by.name('tab-rogue-home'))))
        expect(await element(by.name('tab-rogue-home')).isDisplayed()).to.be.true
    }
}