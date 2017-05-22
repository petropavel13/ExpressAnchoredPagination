const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config.json');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.Promise = global.Promise;

mongoose.connect(config.mongoConnection);


const messagesRouter = require('./app/routes/messages');

app.use('/api', messagesRouter);

app.listen(config.httpPort);