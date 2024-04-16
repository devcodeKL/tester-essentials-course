const express = require('express');

const app = express();

const port = 4000;

app.use(express.json());

const routes = require("./routes/routes.js");
app.use('/app',routes)


if(require.main === module){
	// "process.env.PORT || port" will use the environment variable if it is available OR will used port 4000 if none is defined
	// This syntax will allow flexibility when using the application locally or as a hosted application
	app.listen(process.env.PORT || port, () => {
	    console.log(`API is now online on port ${ process.env.PORT || port }`)
	});
}

module.exports = app;