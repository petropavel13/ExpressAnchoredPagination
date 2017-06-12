import Router from 'express';
import { queryAll, queryAnchor, querySinceTill, create } from '../logic/query';

export function messagesRouter(messageModel) {
    const router = Router();

    router.post('/message/listing', async (req, res, next) => {
        const sinceId = req.body.since_id || null;
        const tillId = req.body.till_id || null;
        const offset = parseInt(req.body.offset) || 0;
        const limit = parseInt(req.body.limit) || 20;

        let sinceNotEmpty = sinceId !== null;
        let tillNotEmpty = tillId !== null;

        try {
            if (sinceNotEmpty && tillNotEmpty) {
                res.json(await querySinceTill(messageModel, sinceId, tillId, limit, offset));
            } else if (sinceNotEmpty || tillNotEmpty) {
                const anchor = sinceId || tillId;

                res.json(await queryAnchor(messageModel, sinceNotEmpty, anchor, limit, offset));
            } else {
                res.json(await queryAll(messageModel, limit, offset));
            }
        } catch (err) {
            next(err);
        }
    });

    router.post('/message/create', async (req, res, next) => {
        const body = req.body.text || "";


        try {
            const newMessage = await create(messageModel, body);

            res.json({message: 'New message created with id: ' + newMessage.id});
        } catch (err) {
            next(err);
        }
    });

    return router;
}
