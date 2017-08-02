/**
 * Created by nmk on 13.07.17.
 */
import { browser, by, element, ExpectedConditions as EC } from 'protractor'
import { expect } from 'chai'
import {} from 'mocha'
import {dataset} from "../dataset"

describe('Registration test', function () {

    it('should open login page', async function () {
        await browser.driver.manage().window().setSize(320, 668)
        await browser.get('http://localhost:8100/')
    })

    it('should open registration screen', async function () {
        let createAccButton = element(by.xpath(".//*[text()[normalize-space() = 'Create an Account']]"))
        await browser.wait(EC.visibilityOf(createAccButton))
        await createAccButton.click()
    })

    it('should fill forms', async function () {
        await element.all(by.name('first_name')).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].sendKeys(dataset.registration.firstname)
        })
        await element.all(by.name('last_name')).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].sendKeys(dataset.registration.lastname)
        })
        await element.all(by.name('email')).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].sendKeys(dataset.registration.email)
        })
        await element.all(by.name('password')).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].sendKeys(dataset.registration.password)
        })
        await element.all(by.name('cpassword')).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].sendKeys(dataset.registration.password)
        })
    })
    it('should register user', async function (){
            let registrationButton = await element(by.className('button button-full button-dark'))
            await browser.actions().mouseMove(registrationButton).perform()
            await browser.wait(EC.visibilityOf(registrationButton))
            await registrationButton.click()
            let skipButton = await element(by.css('[ng-click="ctrl.skip()"]'))
            await browser.wait(EC.visibilityOf(skipButton)).then(skipButton.click())
            expect(await element(by.className('tabs-icon-top')).isDisplayed()).to.be.true
    })
})
