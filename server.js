import express from 'express';
import bodyParser from 'body-parser';
import Promise from 'bluebird';
import Sequelize from 'sequelize';

const config = require('./config.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


import { syncMessages } from './app/message/logic/sync';
import { messageModel } from './app/message/models/message';

import { messagesRouter } from './app/message/routes/messages';

Promise.resolve()
    .then(() => new Sequelize('sqlite://messages.db'))
    .then((sequelize) => messageModel(sequelize))
    .then((Message) => {
        syncMessages(Message);
        app.use('/api', messagesRouter(Message));
    })
    .catch((err) => console.error(err.stack))
    .finally(() => app.listen(config.httpPort));
