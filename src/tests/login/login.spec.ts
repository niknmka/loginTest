import { browser, by, element, ExpectedConditions as EC } from 'protractor'
import { } from 'mocha'
import { dataset } from "../dataset"
import { expect } from 'chai'
import { Context } from "../context"

describe('Login test', function () {
    let context = new Context()
    for (let i = 0; i < 400; i++) {
        describe(`login attempts: ${i+1}`, function () {

            after(async function () {
                await browser.restart()
            });

            it('should open login page', function () {
                //await browser.waitForAngularEnabled(false)
                context.helper.setWindowSize()
                context.helper.openHomePage()

            })
            it('should fill form', async function () {
                await element(by.model('ctrl.model.email')).sendKeys(dataset.login.username)
                await element(by.model('ctrl.model.password')).sendKeys(dataset.login.password)
            })
            it('should login', async function () {
                await element(by.css('[ng-click="ctrl.submit(true)"]')).click()
                await browser.wait(EC.visibilityOf(element(by.name('tab-rogue-home'))))
                expect(await element(by.name('tab-rogue-home')).isDisplayed()).to.be.true
            })
        })
    }
})