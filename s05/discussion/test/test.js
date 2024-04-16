const { Builder, By } = require('selenium-webdriver');

const firefox = require('selenium-webdriver/firefox');

const chai = require('chai');

const {expect} = chai;

const path = require("path");

let totalTests = 0;
let passedTests = 0;

function parsePixels(value) {
    return parseFloat(value.replace('px', ''));
}

describe(`Contact page test`, function(){

    let driver;

    this.timeout(30000);

    const options = new firefox.Options();

    options.headless();

    options.setPreference('browser.download.manager.showWhenStarting', false);
    options.setPreference('browser.download.manager.useWindow', false);


    const filePath = path.join(__dirname, '..','src','index.html');
    const url = `file://${filePath}`;


    before(async function() {
      driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build()
    });

    beforeEach(function() {
        totalTests++;
    });


    afterEach(function(){

        if(this.currentTest.state === "passed"){
            passedTests++;
        }

    })

    it('Page has 1 navbar brand', async function(){
        await driver.get(url);

        const navbarBrand = await driver.findElements(By.css('.navbar-brand'));

        expect(navbarBrand.length).to.equal(1);
    })

    it('Page navbar brand test is Shazada', async function(){
        await driver.get(url);

        const navbarBrand = await driver.findElement(By.css('.navbar-brand'));

        const brandText = await navbarBrand.getText();

        expect(brandText).to.equal("Shazada");
    })

    it('Page navbar should have at least 3 amchor tags', async function(){
        await driver.get(url);

        const navlinks = await driver.findElements(By.css('.navbar a'));

        expect(navlinks.length).to.at.least(3);
    })

    it('Page navbar tags has at least Home, Products, and Contact', async function(){
        await driver.get(url);

        const navlinksText = [];

        const navlinks = await driver.findElements(By.css('.navbar a'));

        for(let i = 0; i < navlinks.length; i++){
            const link = navlinks[i];

            const text = await link.getText();

            navlinksText.push(text);
        }

        let expectedTexts = ["Home", "Products", "Contact"];

        expectedTexts.forEach((expectedText) => {
            expect(navlinksText, `None of the actual nav links text match the expected text: ${expectedText}`).to.include(expectedText);
        })
    })

    it('Page navbar bg color is rgb(13, 110, 253)', async function(){
        await driver.get(url);

        const navbar = await driver.findElement(By.css('.navbar'));

        const bgColor = await navbar.getCssValue("background-color");

        expect(bgColor).to.equal("rgb(13, 110, 253)");
    })

    it('Page contains a heading with text "Contacts"', async function(){
        await driver.get(url);

        const heading = await driver.findElement(By.xpath('//*[contains(text(), "Contact Us")]'));

        expect(heading, "no element has a text as contact us").to.exist;
    })

    it('Page check if element with Contact text is an h1 h2 or h3', async function(){
        await driver.get(url);

        const heading = await driver.findElement(By.xpath('//*[contains(text(), "Contact Us")]'));

        const tagName = await heading.getTagName();

        const headingTags = ['h1', 'h2', 'h3'];

        let isHeading = headingTags.some((headingTag) => {
            return headingTag === tagName;
        })

        expect(isHeading, "Element with text Contact Us is not an h1, h2 or h3").to.be.true;
    })

    it('Page has link to gitlab', async function(){
        await driver.get(url);

        const link = await driver.findElement(By.xpath('//a[contains(@href, "gitlab")]'));

        expect(link, "no anchor tag has link to gitlab").to.exist;
    })

    // Mini-activity: create a test case to check if there are links to github, linkedin and facebook

    it('Page has link to github', async function(){
        await driver.get(url);

        const githubLink = await driver.findElement(By.xpath('//a[contains(@href, "github")]'));

        expect(githubLink, "no anchor tag has link to github").to.exist;
    })

    it('Page has link to linkedin', async function(){
        await driver.get(url);

        const linkedinLink = await driver.findElement(By.xpath('//a[contains(@href, "linkedin")]'));

        expect(linkedinLink, "no anchor tag has link to linkedin").to.exist;
    })

    it('Page has link to facebook', async function(){
        await driver.get(url);

        const facebookLink = await driver.findElement(By.xpath('//a[contains(@href, "facebook")]'));

        expect(facebookLink, "no anchor tag has link to facebook").to.exist;
    })

    it('Page uses Google Fonts', async function() {

        await driver.get(url);

        const link = await driver.findElement(By.xpath('//link[contains(@href, "fonts.googleapis")]'));

        expect(link, "no link element uses Google Fonts").to.exist;

    });

    it('Page has a contact form', async function() {
        await driver.get(url);

        const contactForms = await driver.findElements(By.css('form'));
        
        expect(contactForms.length).to.be.at.least(1, 'No contact form found on the page.');
    });

    it('Page has a contact form text input', async function() {
        await driver.get(url);

        const textInput = await driver.findElements(By.xpath('//input[contains(@type, "text")]'));

        expect(textInput.length).to.be.at.least(1, 'No contact form text input type found on the page.');
    });

    it('Page has a contact form textarea', async function() {
        await driver.get(url);

        const contactForms = await driver.findElements(By.css('textarea'));

        expect(contactForms.length).to.be.at.least(1, 'No contact form found on the page.');
    });

    it('Page has a contact form email input', async function() {
        await driver.get(url);

        const emailInput = await driver.findElements(By.xpath('//input[contains(@type, "email")]'));

        expect(emailInput.length).to.be.at.least(1, 'No contact form text input type found on the page.');
    });

    after(async function () {
    
        await driver.quit();

        console.log("====================");
        console.log(`Test Results: ${passedTests}/${totalTests}`)
        console.log(`Percentage: ${parseInt((passedTests/totalTests*100).toFixed(2))}%`);
        console.log("====================");

    });

})