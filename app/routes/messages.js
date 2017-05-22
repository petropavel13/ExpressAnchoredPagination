import Router from 'express';
export const router = Router();

import db from 'sqlite';

import uuid from 'uuid';

async function responseSinceTill(sinceId, tillId, offset, limit, res) {
    const sinceTillCreatedDates = await db.all("SELECT created_at " +
        "FROM messages " +
        "WHERE id IN (?, ?) " +
        "ORDER BY CASE WHEN " +
        "id = ? THEN 1 " +
        "ELSE 2 END;", sinceId, tillId, sinceId);

    if (sinceTillCreatedDates !== undefined && sinceTillCreatedDates.length > 1) {
        const sinceCreatedDate = sinceTillCreatedDates[0]['created_at'];
        const tillCreatedDate = sinceTillCreatedDates[1]['created_at'];

        const messages = await db.all("SELECT id, created_at, body " +
            "FROM messages " +
            "WHERE created_at > ? AND created_at < ? " +
            "ORDER BY created_at ASC " +
            "LIMIT ?" +
            "OFFSET ?;", sinceCreatedDate, tillCreatedDate, limit, offset);

        res.json(messages);
    } else {
        res.json([]);
    }
}

async function responseAnchor(since, anchor, limit, offset, res) {
    const query = "SELECT m.id, m.created_at, m.body " +
        "FROM messages m " +
        "JOIN messages md ON md.created_at " + (since ? "<" : ">") + " m.created_at " +
        "WHERE md.id = ? " +
        "ORDER BY m.created_at ASC " +
        "LIMIT ?" +
        "OFFSET ?";
    
    const messages = await db.all(query, anchor, limit, offset);

    res.json(messages);
}

async function responseAll(limit, offset, res) {
    const messages = await db.all("SELECT id, created_at, body " +
        "FROM messages " +
        "ORDER BY created_at ASC " +
        "LIMIT ?" +
        "OFFSET ?;", limit, offset);

    res.json(messages);
}

router.get('/messages', async (req, res, next) => {
    const sinceId = req.query.since_id || null;
    const tillId = req.query.till_id || null;
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 20;

    let sinceNotEmpty = sinceId !== null;
    let tillNotEmpty = tillId !== null;

    try {
        if (sinceNotEmpty && tillNotEmpty) {
            await responseSinceTill(sinceId, tillId, offset, limit, res);
        } else if (sinceNotEmpty || tillNotEmpty) {
            const anchor = sinceId || tillId;

            await responseAnchor(sinceNotEmpty, anchor, limit, offset, res);
        } else {
            await responseAll(limit, offset, res);
        }
    } catch (err) {
        next(err);
    }
});

router.post('/message/create', (req, res) =>{
    const body = req.body.text || "";
    const id = uuid();

    db.run("INSERT INTO messages (id, body) VALUES (?, ?);", id, body);

    res.json({ message: 'New message created with id: ' + id });
});
