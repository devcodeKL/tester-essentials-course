// import chai
const chai = require('chai');

// import chai-http module
const http = require('chai-http');

// Enables Chai to perform HTTP-based testing in your code by incorporating the Chai HTTP plugin's functionalities.
chai.use(http);

// import expect from chai
const { expect } = chai;

const app = require("../app/index.js");

describe("test app routes", () => {
    	
    //In Mocha, the done() function is used to handle asynchronous testing. It signals to Mocha that the test case has completed its execution.

   //Not all mocha tests needs done().
   //done() is only used for tests that involve asynchronous tasks.
	it("/getData route returns 200 status code", (done) => {

		//chai.request() allows us to send a request to an application.
		chai.request(app)
			//.get() is chained to request() to allow us to indicate the HTTP method and endpoint that we want to test.
			.get('/app/getData')
			//end() allows us to end the request. This is where we can add our assertions.
			//It takes a handler function that handles the error or the response.
			.end((err, res) => {
				//console.log(res.status)

				// assertion: Expect res.status to be 200
				expect(res.status).to.equal(200);

				//done() is usually added on chai-http test to ensure end of test case.
				done();
			})

	})

	it("/getData returns an array", (done) => {

		chai.request(app)
			.get('/app/getData')
			.end((err, res) => {
				//console.log(res.body);

				//a() method is an assertion method used to check the type of a value.
				//an() is an alias that can be used to do the same type of assertion.
				expect(res.body).to.be.an("array");

				//done() is usually added on chai-http test to ensure end of test case.
				done();
			})

	})

	it('/addData returns 201 if complete input', (done) => {

		chai.request(app)
			// post() sends a POST request to a specified endpoint.
			.post('/app/addData')
			// type() sets the content type of the request like the application/json header.
			.type('json')
			// send() attaches data to the request body for sending data in a POST request.
			.send({
				name: "Feel Special CD",
				description: "A Twice Album",
				price: 2000
			})
			.end((err, res) => {

				expect(res.status).to.equal(201);
				done();

			})

	})

	it('/addData returns 400 if no name input',(done)=>{

        chai.request(app)
	        .post('/app/addData')
	        .type('json')
	        .send({
	            description: "A Twice Album",
	            price: 2000
	        })
	        .end((err, res) => {

	            expect(res.status).to.equal(400);
	            done();
	        })

    })

	it('/addData returns the correct message if no name input',(done)=>{

        chai.request(app)
	        .post('/app/addData')
	        .type('json')
	        .send({
	            description: "A Twice Album",
	            price: 2000
	        })
	        .end((err, res) => {
	        	//res.text contains the string responses.
	            expect(res.text).to.equal("Incomplete Input: No Name");
	            done();
	        })

    })

    it('/addData returns 400 if no description input', (done) => {

    	chai.request(app)
    		.post('/app/addData')
    		.type('json')
    		.send({
    			name: "Feel Special CD",
    			price: 2000
    		})
    		.end((err, res) => {

    			expect(res.status).to.equal(400);
    			done();

    		})

    })

    it('/addData returns the correct message if no description input',(done)=>{

        chai.request(app)
	        .post('/app/addData')
	        .type('json')
	        .send({
	            name: "Feel Special CD",
	            price: 2000
	        })
	        .end((err, res) => {
	        	//res.text contains the string responses.
	            expect(res.text).to.equal("Incomplete Input: No Description");
	            done();
	        })

    })

    it('/addData returns 400 if no price input', (done) => {

    	chai.request(app)
    		.post('/app/addData')
    		.type('json')
    		.send({
    			name: "Feel Special CD",
    			description: "A Twice Album"
    		})
    		.end((err, res) => {

    			expect(res.status).to.equal(400);
    			done();

    		})

    })

	it('/addData returns the correct message if no price input',(done)=>{

        chai.request(app)
	        .post('/app/addData')
	        .type('json')
	        .send({
	            name: "Feel Special CD",
    			description: "A Twice Album"
	        })
	        .end((err, res) => {
	        	//res.text contains the string responses.
	            expect(res.text).to.equal("Incomplete Input: No Price");
	            done();
	        })

    })
    
})

describe("s03-activity", () => {
    it('/addData returns a message if there is a duplicate name in the array', (done) => {
        chai.request(app)
	        .post('/app/addData')
	        .type('json')
	        .send({
	            name: "Soap",
	            description: "Used to clean body.",
	            price: 25.00,
	            isActive: false
	        })
	        .end((err, res) => {
	            // console.log(res.status);
	            expect(res.text).to.equal("Duplicate items");
	            done();
	        })
    })

    it('/addData returns a message if the price is less than 100', (done) => {
        chai.request(app)
            .post('/app/addData')
            .type('json')
            .send({
                name: "Shampoo",
                description: "Used to clean the hair.",
                price: 35.50,
                isActive: true
            })
            .end((err, res) => {
                // console.log(res.status);
                expect(res.text).to.equal("Price is invalid");
                done();
            })
    })

    it('/updateData returns 400 if no name input', (done) => {

        chai.request(app)
	        .put("/app/updateData/${index}")
	        .type('json')
	        .send({
	            description: "A Twice Album",
	            price: 2000
	        })
	        .end((err, res) => {

	            expect(res.status).to.equal(400);
	            done();
	        })

    })

    it('/updateData returns the correct message if no name input',(done)=>{

        chai.request(app)
	        .put('/app/updateData/${index}')
	        .type('json')
	        .send({
	            description: "A Twice Album",
	            price: 2000
	        })
	        .end((err, res) => {
	        	//res.text contains the string responses.
	            expect(res.text).to.equal("Incomplete Input: No Name");
	            done();
	        })

    })

    it('/updateData returns 400 if no description input', (done) => {

    	chai.request(app)
    		.put("/app/updateData/${index}")
    		.type('json')
    		.send({
    			name: "Feel Special CD",
    			price: 2000
    		})
    		.end((err, res) => {

    			expect(res.status).to.equal(400);
    			done();

    		})

    })

    it('/updateData returns the correct message if no description input',(done)=>{

        chai.request(app)
	        .put('/app/updateData/${index}')
	        .type('json')
	        .send({
	            name: "Feel Special CD",
    			price: 2000
	        })
	        .end((err, res) => {
	        	//res.text contains the string responses.
	            expect(res.text).to.equal("Incomplete Input: No Description");
	            done();
	        })

    })

    it('/updateData returns 400 if no price input', (done) => {

    	chai.request(app)
    		.put("/app/updateData/${index}")
    		.type('json')
    		.send({
    			name: "Feel Special CD",
    			description: "A Twice Album"
    		})
    		.end((err, res) => {

    			expect(res.status).to.equal(400);
    			done();

    		})

    })

    it('/updateData returns the correct message if no price input',(done)=>{

        chai.request(app)
	        .put('/app/updateData/${index}')
	        .type('json')
	        .send({
	            name: "Feel Special CD",
    			description: "A Twice Album",
	        })
	        .end((err, res) => {
	        	//res.text contains the string responses.
	            expect(res.text).to.equal("Incomplete Input: No Price");
	            done();
	        })

    })

    it('/updateData returns 200 if complete input', (done) => {

		chai.request(app)
			.put("/app/updateData/${index}")
			.type('json')
			.send({
				name: "Feel Special CD",
				description: "A Twice Album",
				price: 2500
			})
			.end((err, res) => {

				expect(res.status).to.equal(200);
				done();

			})

	})

	it('/deleteData returns 200 after successful deletion of last item', (done) => {
        chai.request(app)
	        .delete('/app/deleteData')
	        .type('json')
	        .end((err, res) => {
	            expect(res.status).to.equal(200);
	            done();
	        })
    })

    it('/deleteData returns an array after successful deletion', (done) => {
        chai.request(app)
	        .delete('/app/deleteData')
	        .type('json')
	        .end((err,res ) => {
	            expect(res.body).to.be.an('array');
	            done();
	        })
    })

})