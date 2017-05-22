import Router from 'express';
export const router = Router();

import Message from '../models/message';

router.get('/messages', (req, res) => {
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
            .exec((err, message) => {
                if (err) {
                    res.send(err);
                } else {
                    const createdAt = message.createdAt;
                    const condition = isForwardDirection ? { $gt: createdAt } : { $lt: createdAt };

                    Message.find({ createdAt: condition })
                        .limit(limit)
                        .exec((err, messages) => {
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
            .exec((err, messages) => {
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
    message.createdAt = new Date();

    message.save(err => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'New message created with id: ' + message.id });
        }
    });

});
