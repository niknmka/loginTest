/**
 * Created by nmk on 17.07.17.
 */
import { browser, by, element, protractor, ElementFinder, ExpectedConditions as EC } from 'protractor'
import {} from 'chai'
import {} from 'mocha'
import {dataset} from "./dataset"



async function scrollAndClick(object) {
    await browser.actions().mouseMove(object).perform()
    await object.click()
}
async function scroll(object) {
    await browser.actions().mouseMove(object).perform()
}

describe('payment test', function() {

    it('should open login page', async function () {
        await browser.driver.manage().window().setSize(320, 668)
        await browser.get('http://localhost:8100/')
    })

    it('should login user', async function() {
        //login user
        await element(by.model('ctrl.model.email')).sendKeys(dataset.login.username)
        await element(by.model('ctrl.model.password')).sendKeys(dataset.login.password)
        await element(by.className('button button-block button-red button-main')).click()
    });


    it('should fill out payment page', async function () {

        //clicking on the cart icon
        const cartIcon: ElementFinder = element.all(by.css('[nav-bar="active"] .rogue-cart')).last()
        await browser.wait(async (): Promise<boolean> => (await cartIcon.element(by.css('span.ng-binding')).getText()).length > 0)
        await cartIcon.click()

        //clicking on payment section and filling fields
        let paymentEditButton = element(by.className('item-payment'))
        await browser.wait(EC.visibilityOf(paymentEditButton))
        await paymentEditButton.click()

        await element.all(by.name('payment[cc_number]')).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].sendKeys(dataset.billing.cc_number)
        })
        await element.all(by.name('payment[expiration]')).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].clear().sendKeys(dataset.billing.cc_expiration)
        })
        await element.all(by.name('payment[cc_cid]')).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].clear().sendKeys(dataset.billing.cc_cvv)
        })

        await element(by.className('item item-checkbox ng-empty ng-valid')).click()
        await element(by.css('[name="same_as_shipping"][value="true"]')).click()

        await browser.wait(EC.visibilityOf(element(by.css('[ng-click="ctrl.submit()"]'))))
        await element(by.css('[ng-click="ctrl.submit()"]')).click()
        let checkoutButton = element(by.className('button button-block ng-binding button-balanced'))
        await browser.wait(EC.visibilityOf(checkoutButton))
        await checkoutButton.click()
        browser.sleep(10000)
    })
})
