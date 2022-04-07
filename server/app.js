



const express = require('express');
const app = express();
const cors = require("cors");
require("dotenv").config();
//router import
const accountRouter = require('./routes/AccountRouter')
const ProposalRouter = require('./routes/ProposalRouter')
const { proposals } = require('./database_mongo/models/proposals')



// '/'로 들어오는 요청은 기본적으로 indexRouter로 이동해서 된다.

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/accounts', accountRouter)
app.use('/proposals', ProposalRouter);


//DB connect
const mongoose = require('mongoose');
console.log(process.env.MONGDB);
mongoose
	.connect(
		process.env.MONGDB,
		{ useNewUrlParser: true }
	)
	.then(() => console.log('MongoDB Connected success !!'))
	.catch((err) => console.log(err));

app.listen(5000, () => {
    console.log('5___port startedd');
})
