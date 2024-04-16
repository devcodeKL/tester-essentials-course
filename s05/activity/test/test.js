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

/* Don't update. Uses an online page as URL for testing */
const fs = require('fs');
const data = fs.readFileSync('./test/activity.json');
const jsonData = JSON.parse(data);
let url = jsonData.url;

module.exports.activity = function(){
    describe(`Portfolio page test`, function(){

        let driver;

        this.timeout(30000);

        const options = new firefox.Options();

        options.headless();

        options.setPreference('browser.download.manager.showWhenStarting', false);
        options.setPreference('browser.download.manager.useWindow', false);


        before(async function() {
            let options = new firefox.Options();
            options.headless();
            driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
        });

        beforeEach(function() {
            totalTests++;
        });

        afterEach(async function() {
            if (this.currentTest.state === "passed") {
                passedTests++;
            }
        });

        /*  add test cases here */

        it('Page has a navbar', async function() {
            await driver.get(url);
            
            const navbar = await driver.findElements(By.css('nav'));
            
            expect(navbar).to.exist;
        });

        it('Page navbar color is rgb(255, 193, 7)', async function() {
            await driver.get(url);
            
            const navbar = await driver.findElement(By.css('nav'));
            
            const color = await navbar.getCssValue('background-color');
            
            expect(color).to.equal('rgb(255, 193, 7)');
        });

        it('Page uses Google Fonts', async function() {
            await driver.get(url);
            
            const link = await driver.findElement(By.xpath("//link[contains(@href, 'fonts.googleapis')]"));
            
            expect(link, "no link element uses Google Fonts").to.exist;
        });

        it('Page body font is not Times New Roman', async function() {
            await driver.get(url);
            
            const body = await driver.findElement(By.css('body'));
            
            const fontFamily = await body.getCssValue('font-family');
            
            expect(fontFamily).to.not.equal('Times New Roman');
        });

        it('Page heading fonts is Montserrat', async function() {
            await driver.get(url);
            
            const heading = await driver.findElement(By.css('h1'));
            
            const fontFamily = await heading.getCssValue('font-family')
            
            expect(fontFamily).to.include('Montserrat');
        });

        it('Page has an element with client name', async function() {
            await driver.get(url);
            
            const clientNameElement = await driver.findElements(By.xpath("//*[contains(text(), 'Jeff Bezos')]"));
            
            expect(clientNameElement.length).to.be.at.least(1, 'No element with client name "Jeff Bezos" found on the page.');
        });

        it('Page element with client name is h1 or h2', async function() {
            await driver.get(url);
            
            const element = await driver.findElement(By.xpath('//*[contains(text(), "Jeff Bezos")]'));
            
            const tagName = await element.getTagName();
            
            const headingTags = ['h1', 'h2'];
            
            let isHeading = headingTags.some((headingTag) => {
                return headingTag === tagName;
            });
            
            expect(isHeading, 'Element with the client\'s name, "Jeff Bezos" is not an h1 or h2').to.be.true;
        });

        it('Page has an element with text "Web Developer"', async function() {
            await driver.get(url);
           
            const webDeveloperElements = await driver.findElements(By.xpath("//*[contains(text(), 'Web Developer')]"));
            
            expect(webDeveloperElements.length).to.be.at.least(1, 'No element with text "Web Developer".');
        });

        it('Page element with text "Web Developer" is a h3 or h4', async function() {
            await driver.get(url);
            
            const webDeveloperElement = await driver.findElement(By.xpath('//*[contains(text(), "Web Developer")]'));
            
            const tagName = await webDeveloperElement.getTagName();
            
            const headingTags = ['h3', 'h4'];
            
            let isHeading = headingTags.some((headingTag) => {
                return headingTag === tagName;
            });
            
            expect(isHeading, 'Element with the text "Web Developer" is an h3 or h4').to.be.true;
        });

        it('Page has link to gitlab', async function() {
            await driver.get(url);
            
            const link = await driver.findElement(By.xpath('//a[contains(@href, "gitlab")]'));
            
            expect(link, "no anchor tag has link to gitlab").to.exist;
        });

        it('Page has link to github', async function() {
            await driver.get(url);
            
            const link = await driver.findElement(By.xpath("//a[contains(@href, 'github')]"));
            
            expect(link, "no anchor tag has link to github").to.exist;
        });

        it('Page has link to linkedin', async function() {
            await driver.get(url);
            
            const link = await driver.findElement(By.xpath('//a[contains(@href, "linkedin")]'));
            
            expect(link, "no anchor tag has link to linkedin").to.exist;
        });

        it('Page has link to facebook', async function() {
            await driver.get(url);
            
            const link = await driver.findElement(By.xpath('//a[contains(@href, "facebook")]'));
            
            expect(link, "no anchor tag has link to facebook").to.exist;
        });

        it('Page has a contact form', async function() {
            await driver.get(url);
            
            const contactForms = await driver.findElements(By.css('form'));
            
            expect(contactForms.length).to.be.at.least(1, 'No contact form found on the page.');
        });

        it('Page has a text input', async function() {
            await driver.get(url);
            
            const textInput = await driver.findElements(By.xpath('//input[contains(@type, "text")]'));
            
            expect(textInput.length).to.be.at.least(1, 'No text input type found on the page.');
        });

        it('Page has a email input', async function() {
            await driver.get(url);
            
            const emailInput = await driver.findElements(By.xpath('//input[contains(@type, "email")]'));
            
            expect(emailInput.length).to.be.at.least(1, 'No email input type found on the page.');
        });

        it('Page has a textarea', async function() {
            await driver.get(url);
            
            const textarea = await driver.findElements(By.css('textarea'));
            
            expect(textarea.length).to.be.at.least(1, 'No textarea found on the page.');
        });

        after(async function () {
    
            await driver.quit();
    
            console.log("====================");
            console.log(`Test Results: ${passedTests}/${totalTests}`)
            console.log(`Percentage: ${parseInt((passedTests/totalTests*100).toFixed(2))}%`);
            console.log("====================");
    
        });
    })
}