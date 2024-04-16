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

// Don't update. Uses an online page as URL
const fs = require('fs');
const data = fs.readFileSync('./test/activity.json');
const jsonData = JSON.parse(data);
let url = jsonData.url;

module.exports.activity = function(){
    describe(`landing page test`, function(){
        let driver;
        this.timeout(30000);

        // add headless selenium setup
        const options = new firefox.Options();
        options.headless();
        options.setPreference('browser.download.manager.showWhenStarting', false);
        options.setPreference('browser.download.manager.useWindow', false);

        before(async function() {
            const options = new firefox.Options().headless();
            driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
        });

        beforeEach(function() {
            totalTests++;
        });

        afterEach(function(){
            if(this.currentTest.state === "passed"){
                passedTests++;
            }
        })

        // add test cases
        it('Page body background-color is "rgb(255, 240, 245)"', async function() {
            await driver.get(url);
            const body = await driver.findElement(By.css('body'));
            const bgColor = await body.getCssValue('background-color');
            expect(bgColor).to.equal('rgb(255, 240, 245)');
        });

        it('Page main display is "flex"', async function() {
            await driver.get(url);
            const main = await driver.findElement(By.css('main'));
            const display = await main.getCssValue('display');
            expect(display).to.equal('flex');
        });

        it('Page main justify-content is "center"', async function() {
            await driver.get(url);
            const main = await driver.findElement(By.css('main'));
            const justifyContent = await main.getCssValue('justify-content');
            expect(justifyContent).to.equal('center');
        });

        it('Page main align-items is "center"', async function() {
            await driver.get(url);
            const main = await driver.findElement(By.css('main'));
            const alignItems = await main.getCssValue('align-items');
            expect(alignItems).to.equal('center');
        });

        it('Page universal font is "Roboto"', async function() {
            await driver.get(url);
            const body = await driver.findElement(By.css('body'));
            const fontFamily = await body.getCssValue('font-family');
            expect(fontFamily).to.include('Roboto');
        });

        it('Page h1 font is "Kalnia"', async function() {
            await driver.get(url);
            const h1 = await driver.findElement(By.css('h1'));
            const fontFamily = await h1.getCssValue('font-family');
            expect(fontFamily).to.include('Kalnia');
        });

        it('Page h3 font is "Kalnia"', async function() {
            await driver.get(url);
            const h3 = await driver.findElement(By.css('h3'));
            const fontFamily = await h3.getCssValue('font-family');
            expect(fontFamily).to.include('Kalnia');
        });

        it('Page image element height is at least 500px', async function() {
            await driver.get(url);
            const image = await driver.findElement(By.css('img'));
            const height = await image.getCssValue('height').then(parsePixels);
            expect(height).to.be.at.least(500);
        });

        it('Page image element width is at least 300px', async function() {
            await driver.get(url);
            const image = await driver.findElement(By.css('img'));
            const width = await image.getCssValue('width').then(parsePixels);
            expect(width).to.be.at.least(300);
        });

        it('Page section element width is at least 400px', async function() {
            await driver.get(url);
            const section = await driver.findElement(By.css('section'));
            const sectionWidth = await section.getCssValue('width').then(parsePixels);
            expect(sectionWidth).to.be.at.least(400);
        });

        // add setup for score display
        after(async function() {
            await driver.quit();
            console.log('====================');
            console.log(`Test Results: ${passedTests}/${totalTests}`);
            console.log(`Percentage: ${parseInt((passedTests / totalTests * 100).toFixed(2))}%`);
            console.log('====================');
        });
        
    })
}