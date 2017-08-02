import { browser, by, element, protractor, ElementFinder } from 'protractor';
import {} from 'chai';
import {} from 'mocha';
import {dataset} from "./dataset"

async function scrollAndClick(object) {
    await browser.actions().mouseMove(object).perform();
    await object.click();
}

async function scroll(object) {
    await browser.actions().mouseMove(object).perform();
}
let EC = protractor.ExpectedConditions;
let waitForVisibility = async function (selector) {
    return browser.wait(EC.visibilityOf(element(by.css(selector))));
}


describe('Authentification and checkout test', function() {



  it('should login user', async function() {
      await browser.get('http://localhost:8100/');

      //login user
      await element(by.model('ctrl.model.email')).sendKeys(dataset.login.username);
      await element(by.model('ctrl.model.password')).sendKeys(dataset.login.password);
      await element(by.className('button button-block button-red button-main')).click();
  });

    it('should open debug menu and open product', async function () {

        //adding product using debug menu
        let profileIcon = element(by.className('icon rogue-user'));
        await browser.wait(EC.visibilityOf(profileIcon));
        await profileIcon.click();
        await scrollAndClick(element(by.css('[ng-click="ctrl.debug()"]')));
        await element(by.className('ng-pristine ng-untouched ng-valid ng-empty')).sendKeys('89589');
        await element(by.className('button icon-left ion-paper-airplane')).click();
        await browser.wait(EC.visibilityOf(element(by.className('button button-buy ng-binding'))));
    });

    it ('should add product to cart', async function() {
        //buy configurable product. select size, quantity
        await element(by.className('button button-buy ng-binding')).click();
        await element(by.xpath(".//*[text()[normalize-space() = 'M']]")).click();
        //await browser.wait(EC.visibilityOf(element(by.className('ion-plus qty-button qty-button-plus'))));
        for (let i = 0; i < 5; i++) {
            await element(by.className('ion-plus qty-button qty-button-plus')).click();
        }
        for (let i = 0; i < 5; i++) {
            await element(by.className('ion-minus qty-button qty-button-minus')).click();
        }
        await element(by.css('[ng-click="cartCtrl.purchase(ctrl.addToCart)"]')).click();
        //if already have filled shipping and billing
        /*let checkoutButton = element(by.className('button button-block ng-binding button-balanced'));
        await browser.wait(EC.visibilityOf(checkoutButton));
        checkoutButton.click();*/
    });

    it ('should fill out shipping page', async function () {

        let shippingEditButton = element(by.className('item-shipping'));
        await shippingEditButton.click();

        await element.all(by.name('first_name')).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].clear().sendKeys(dataset.shipping.firstname);
        });
        await element.all(by.name('last_name')).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].clear().sendKeys(dataset.shipping.lastname);
        });
        await element.all(by.name('street[0]')).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].clear().sendKeys(dataset.shipping.street);
        });
        await element.all(by.name('city')).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].clear().sendKeys(dataset.shipping.city);
        });
        await element(by.model('ctrl.model.region_id')).click();
        let stateSelector = element(by.css('[label="OH"]'));
        await browser.wait(EC.visibilityOf(stateSelector));
        await stateSelector.click();
        await element.all(by.name('postcode')).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].clear().sendKeys(dataset.shipping.postcode);
        });
        let phoneLabel = by.name('telephone');
        await scroll(element(phoneLabel));
        await element.all(phoneLabel).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].clear().sendKeys(dataset.shipping.telephone);
        });

        let shippingMethodButton = element(by.css('[value="freeshipping_freeshipping"]'));
        await scroll(shippingMethodButton);
        await browser.wait(EC.visibilityOf(shippingMethodButton));
        await shippingMethodButton.click();
        await scroll(element(by.className('button button-block button-red')));
        await element(by.className('button button-block button-red')).click();
    });

    it('should fill out payment page', async function () {

        //clicking on the cart icon if already have product on it
        /*const cartIcon: ElementFinder = element.all(by.css('[nav-bar="active"] .rogue-cart')).last();
        await browser.wait(async (): Promise<boolean> => (await cartIcon.element(by.css('span.ng-binding')).getText()).length > 0);
        cartIcon.click();*/

        //clicking on payment section and filling fields
        let paymentEditButton = element(by.className('item-payment'));
        await scroll(paymentEditButton);
        //if (element(by.xpath(".//*[text() = 'Add Payment Information']")).isDisplayed()) {
        if (await element(by.className("item-payment item-saved-cc require-saved-data not-valid")).isDisplayed()) {
            await browser.wait(EC.visibilityOf(paymentEditButton));
            await paymentEditButton.click();

            await element.all(by.name('payment[cc_number]')).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].sendKeys(dataset.billing.cc_number);
            });
            await element.all(by.name('payment[expiration]')).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].clear().sendKeys(dataset.billing.cc_expiration);
            });
            await element.all(by.name('payment[cc_cid]')).filter(ele => ele.isDisplayed()).then(function (filteredElem) {
            filteredElem[0].clear().sendKeys(dataset.billing.cc_cvv);
            });

            await element(by.className('item item-checkbox ng-empty ng-valid')).click();
            await element(by.css('[name="same_as_shipping"][value="true"]')).click();
            await browser.wait(EC.visibilityOf(element(by.css('[ng-click="ctrl.submit()"]'))));
            await element(by.css('[ng-click="ctrl.submit()"]')).click();
            let checkoutButton = element(by.className('button button-block ng-binding button-balanced'));
            await browser.wait(EC.visibilityOf(checkoutButton));
            await checkoutButton.click();
            await browser.sleep(10000);
            }
            else if (await element(by.xpath(".//*[text() = 'CVV']")).isDisplayed()) {
                await scroll(element(by.name("payment[cc_cid]")));
                await element(by.name("payment[cc_cid]")).click();
                await element(by.name("payment[cc_cid]")).sendKeys('123');
                let checkoutButton = element(by.className('button button-block ng-binding button-balanced'));
                await browser.wait(EC.visibilityOf(checkoutButton));
                await checkoutButton.click();
            }
            else {
                let checkoutButton = element(by.className('button button-block ng-binding button-balanced'));
                await browser.wait(EC.visibilityOf(checkoutButton));
                await checkoutButton.click();
            }
        });

});
