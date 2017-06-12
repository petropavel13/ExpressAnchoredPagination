import express from 'express';
import bodyParser from 'body-parser';
import db from 'sqlite';
import Promise from 'bluebird';

const config = require('./config.json');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


import { router as messagesRouter } from './app/message/routes/messages';

app.use('/api', messagesRouter);

Promise.resolve()
    .then(() => db.open('./pagination.sqlite', { Promise }))
    .then(() => db.migrate({ force: 'last' }))
    .catch((err) => console.error(err.stack))
    .finally(() => app.listen(config.httpPort));
