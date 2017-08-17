import { ExpectedConditions as EC, browser, element, by} from 'protractor'
import { dataset } from "../tests/dataset"
import { expect } from 'chai'
import { Context} from "../tests/context"


    export class RegistrationPage {
    constructor(protected _context: Context) {
    }

    async openRegistrationPage() {
        let createAccButton = await element(by.xpath(".//*[text()[normalize-space() = 'Create an Account']]"))
        await browser.wait(EC.visibilityOf(createAccButton))
        await createAccButton.click()
        await browser.wait(EC.visibilityOf(element(by.css('[state="tab.rogue-user-registration"]'))))
    }


    async fillRegistrationPage() {
        /*function selectorByName(data: string) {
            return element.all(by.name(data))
        }*/
        const firstName = element.all(by.name('first_name'))
        const lastName = element.all(by.name('last_name'))
        const email = element.all(by.name('email'))
        const password = element.all(by.name('password'))
        const cpassword = element.all(by.name('cpassword'))

        await this._context.helper.fillInput(firstName, dataset.registration.firstname)
        await this._context.helper.fillInput(lastName, dataset.registration.lastname)
        await this._context.helper.fillInput(email, dataset.registration.email)
        await this._context.helper.fillInput(password, dataset.registration.password)
        await this._context.helper.fillInput(cpassword, dataset.registration.password)
    }

    async clickRegisterButton() {
        let registrationButton = await element(by.className('button button-full button-dark'))
        await this._context.helper.scroll(registrationButton)
        // await browser.actions().mouseMove(registrationButton).perform()
        await browser.wait(EC.visibilityOf(registrationButton)).then(registrationButton.click())
        let skipButton = await element(by.css('[ng-click="ctrl.skip()"]'))
        await browser.wait(EC.visibilityOf(skipButton)).then(skipButton.click())
        expect(await element(by.className('tabs-icon-top')).isDisplayed()).to.be.true
    }
}