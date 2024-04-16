// Allows us to import the file/application to be tested
const app = require("./index.js")

// Allows us to import assertion styles for chai
const { expect } = require("chai")

// test value
describe("index.js test", () => {
    // it() method is used to create a test case
    it('greetUser() returns the correct message', () => {
        let returnedValue = app.greetUser();

        expect(returnedValue).to.equal("Hello!")
    })

    it('sampleVariable has correct value', () => {
        expect(app.sampleVariable).to.equal("My Value")
    })

    it('addNumbers() returns correct values', () => {
        expect(app.addNumbers(2,4)).to.equal(6)
    })

    it('addNumbers() returns a message on wrong input type', () => {
        expect(app.addNumbers(2,"String")).to.equal("Wrong Input!")
    })

    it('divisibleBy4() return correct values', () => {
        expect(app.divisibleBy4(8)).to.equal(true);
    })
})