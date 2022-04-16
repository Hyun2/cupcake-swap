



const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
require("dotenv").config();
//router import
const accountRouter = require('./routes/AccountRouter')
const ProposalRouter = require('./routes/ProposalRouter')
const { proposals } = require('./database_mongo/models/proposals')


class Server {
	app;
	constructor() {
		const app = express();
		this.app = app;
	}

	setRoute() {
	this.app.use('/accounts', accountRouter)
	this.app.use('/proposals', ProposalRouter);
	}

	setMiddleware() {
	//* json middleware
      this.app.use(express.json());
	//* cors middleware
      this.app.use(cors());
      this.app.use(express.urlencoded({ extended: false }));
	  this.setRoute();
	}

	setMongoDB() {	
     mongoose
     .connect(
     	process.env.MONGDB,
     	{ useNewUrlParser: true }
     )
     .then(() => console.log('MongoDB Connected success !!'))
     .catch((err) => console.log(err));
	}

	listen() {
		this.setMiddleware();
		this.setMongoDB();
		this.app.listen(5000, () => {
			console.log('5___port startedd');
		})
	}
}

const init = () => {
	const server = new Server();
	server.listen();
}
init();
