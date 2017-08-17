/**
 * Created by nmk on 13.07.17.
 */
import { browser, by, element, ExpectedConditions as EC } from 'protractor'
import { expect } from 'chai'
import {} from 'mocha'
import { Context } from "../context"


describe('Registration test', function () {
    let context = new Context()
    it('should open login page', async function () {
        await context.helper.setWindowSize()
        await context.helper.openHomePage()
    })

    it('should open registration screen', async function () {
        await context.registrationPage.openRegistrationPage()
    })

    it('should fill registration forms', async function () {
        await context.registrationPage.fillRegistrationPage()
        /*await element.all(by.name('first_name')).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].sendKeys(dataset.registration.firstname)
        })*/
    })

    it('should register user', async function (){
            await context.registrationPage.clickRegisterButton()
    })
})
