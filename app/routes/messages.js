const express = require('express');
const router = express.Router();

const Message = require('../models/message');

router.get('/messages', function(req, res) {
    const anchor = req.query.anchor || null;
    const direction = req.query.direction || 'backward';
    const isForwardDirection = direction === 'forward';
    const limit = parseInt(req.query.limit) || 0;

    responseMessages(res, anchor, isForwardDirection, limit);
});

function responseMessages(res, anchor, isForwardDirection, limit) {
    if (anchor !== null) {
        Message.findOne({ _id: anchor })
            .select('createdAt')
            .exec(function (err, message) {
                if (err) {
                    res.send(err);
                } else {
                    const createdAt = message.createdAt;
                    const condition = isForwardDirection ? { $gt: createdAt } : { $lt: createdAt };

                    Message.find({ createdAt: condition })
                        .limit(limit)
                        .exec(function (err, messages) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.json(messages);
                            }
                        });
                }
            });
    } else {
        Message.find()
            .sort({ createdAt: isForwardDirection ? -1 : 1 })
            .limit(limit)
            .exec(function(err, messages) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(messages);
                }
            });
    }
}

router.post('/message/create', function(req, res) {
    const message = new Message();
    message.text = req.body.text;
    message.createdAt = Date();

    message.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'New message created with id: ' + message.id });
        }
    });

});

module.exports = router;