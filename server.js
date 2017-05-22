import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const config = require('./config.json');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.Promise = global.Promise;

mongoose.connect(config.mongoConnection);


import { router as messagesRouter } from './app/routes/messages';

app.use('/api', messagesRouter);

app.listen(config.httpPort);