import { browser, by, element, ExpectedConditions as EC, ElementArrayFinder, ElementFinder } from 'protractor'
const chai = require('chai')
chai.use(require('chai-smoothie'))

export class Helper {

    async openHomePage() {
        await browser.get('http://localhost:8100/')
    }

    async setWindowSize() {
        let iPhone5 = [320, 668]
        let iPhone6 = [375, 767]
        let iPhone6plus = [414, 836]
        let nexus6p = [412, 832];
        await browser.driver.manage().window().setSize(iPhone5[0], iPhone5[1])
    }

    async scroll(object) {
        await browser.actions().mouseMove(object).perform()
    }

    async scrollAndClick(object) {
        await browser.actions().mouseMove(object).perform()
        await object.click()
    }

    async waitForVisibility (selector) {
        return await browser.wait(EC.visibilityOf(element(by.css(selector))));
    }

    async elementInReach(el: ElementFinder) {
        try {
            await browser.wait(EC.presenceOf(el), 10000)
        } catch (e) {
            await chai.expect(el, 'The element is not present on the page').to.be.present
        }

        try {
            await browser.wait(EC.visibilityOf(el), 10000)
        } catch (e) {
            await chai.expect(el, 'The element is not displayed on the page').to.be.displayed
        }
    }

    getVisibleElement(els: ElementArrayFinder) {
        return els.filter (ele => ele.isDisplayed()).first()
    }

    async fillInput(els: ElementArrayFinder | ElementFinder, data: string) {
        let el
        if (els.filter) {
            el = this.getVisibleElement(<ElementArrayFinder>els)
        } else {
            el = els
        }
        await this.elementInReach(el)
        await el.clear()
        await el.sendKeys(data)
    }

}