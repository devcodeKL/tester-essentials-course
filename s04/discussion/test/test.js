// Import Selenium Builder
const { Builder, By } = require('selenium-webdriver');

// firefox allows us to set our simulated browser as firefox
const firefox = require('selenium-webdriver/firefox')

// The path module in Node.js provides utilities for working with file and directory paths.
const path = require('path');

// Test performance custom indicators
let totalTests = 0;
let passedTests = 0;

const chai = require('chai');

const {expect} = chai;

describe(`profile page test`, function(){

	// Stores the selenium-webdriver
	let driver;

	// this.timeout() is used to define the timeout for each test case
	this.timeout(30000);

	// Headless Selenium
	const options = new firefox.Options();

	// headless() method sets the browser to run in headless mode.
	options.headless();
	// preventing the download manager window from showing when a download starts.
	options.setPreference('browser.download.manager.showWhenStarting', false);
	// indicates that the download manager should not use a separate window
	options.setPreference('browser.download.manager.useWindow', false);

	const filePath = path.join(__dirname,'..','src', 'index.html');
	const url = `file://${filePath}`;

	// before() is typically used to run setup tasks or code before executing a suite of tests or a specific test case.
	// When used with the async function, it allows asynchronous operations to be performed before the tests begin.
	before(async function(){

		// driver = await new Builder().forBrowser('firefox').build()
		driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build()
	})

	// beforeEach() in Mocha runs a function before each test case
	beforeEach(function(){
		// increment the totalTests variable for each test case
		totalTests++;
	})

	// used to define code that runs after each individual test case.
	afterEach(function(){
		if(this.currentTest.state === "passed"){
			passedTests++;
		}
	})

	function parsePixels(value){
		return parseFloat(value.replace('px', ''))
	}

	it('Page has h1 elements', async function(){

		await driver.get(url);

		const h1Collection = await driver.findElements(By.css('h1'))

		expect(h1Collection.length).to.be.at.least(1);
	})

	it('Page first h1 element font-size at least 32px', async function(){
		await driver.get(url);

		const h1Collection = await driver.findElements(By.css('h1'));

		const fontSize = await h1Collection[0].getCssValue('font-size').then(parsePixels);

		expect(fontSize).to.be.at.least(30);
	})

	it('Page h1 margin-top is at least 30px', async function(){
		await driver.get(url);

		const h1Collection = await driver.findElements(By.css('h1'));

		const marginTop = await h1Collection[0].getCssValue('margin-top').then(parsePixels);

		expect(marginTop).to.be.at.least(30);
	})

	// Mini-activity: create another test to check if the h1 has enough margin-bottom

	it('Page h1 margin-bottom is at least 30px', async function(){
		await driver.get(url);

		const h1Collection = await driver.findElements(By.css('h1'));

		const marginBottom = await h1Collection[0].getCssValue('margin-bottom').then(parsePixels);

		expect(marginBottom).to.be.at.least(30);
	})

	it('Page h1 font-family is not equal to Times New Roman', async function(){
		await driver.get(url);

		const h1Collection = await driver.findElements(By.css('h1'));

		const fontFamily = await h1Collection[0].getCssValue('font-family');

		expect(fontFamily).to.not.equal("Times New Roman");
	})

	it('Page body font-family is Gill Sans', async function(){
		await driver.get(url)

		const body = await driver.findElement(By.css('body'));

		const fontFamily = await body.getCssValue('font-family')

		expect(fontFamily).to.include("Gill Sans");
	})

	it('Page image is at least 200 height', async function(){
		await driver.get(url)

		const image = await driver.findElement(By.css('img'));

		const height = await image.getCssValue('height').then(parsePixels);

		expect(height).to.be.at.least(200);
	})

	it('Page image is at least 200 width', async function(){
		await driver.get(url)

		const image = await driver.findElement(By.css('img'));

		const width = await image.getCssValue('width').then(parsePixels);

		expect(width).to.be.at.least(200);
	})
	// mini-activity: check if the main element centers the texts
	it('Page main content is center text-aligned', async function(){
		await driver.get(url)

		const main = await driver.findElement(By.css('main'));

		const textAlign = await main.getCssValue('text-align')

		expect(textAlign).to.be.at.equal("center");
	})

	it('Page section elements have at least 20px margin-bottom', async function(){
		await driver.get(url)

		const section = await driver.findElement(By.css('section'));

		const marginBottom = await section.getCssValue('margin-bottom').then(parsePixels);

		expect(marginBottom).to.be.at.least(20);
	})

	it('Page h2 have at least 10px margin-bottom', async function(){
		await driver.get(url)

		const h2 = await driver.findElement(By.css('h2'));

		const marginBottom = await h2.getCssValue('margin-bottom').then(parsePixels);

		expect(marginBottom).to.be.at.least(10);
	})

	it('Page li has list-style-type none', async function(){
		await driver.get(url)

		const li = await driver.findElement(By.css('li'));

		const listStyle = await li.getCssValue('list-style-type')

		expect(listStyle).to.be.equal("none");
	})

	// after() hook in Mocha is typically used to perform cleanup tasks after all tests have been executed.
	after(async function (){
		await driver.quit();

		console.log("======================");
		console.log(`Test Results: ${passedTests}/${totalTests}`);
		console.log(`Percentage: ${parseInt((passedTests/totalTests*100).toFixed(2))}%`);
		console.log("======================");
	})
})