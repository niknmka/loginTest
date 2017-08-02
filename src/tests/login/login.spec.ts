import { browser, by, element, ExpectedConditions as EC } from 'protractor'
import { } from 'mocha'
import { expect } from 'chai'
import { Context } from "../context"

describe('Login test', function () {
    let context = new Context()

    for (let i = 0; i < 400; i++) {
        describe(`login attempts: ${i+1}`, function () {

            after(async function () {
                await browser.restart()
            });

            it('should open login page', async function () {
                //await browser.waitForAngularEnabled(false)
                await context.helper.setWindowSize()
                await context.helper.openHomePage()

            })
            it('should fill form', async function () {
                await context.loginPage.fillingLoginFields()
            })
            it('should login', async function () {
                await context.loginPage.logIn()

            })
        })
    }
})