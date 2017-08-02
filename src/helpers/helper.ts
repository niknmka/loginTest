import { browser, by, element, ExpectedConditions as EC } from 'protractor'
import {Context} from "../tests/context"


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
}