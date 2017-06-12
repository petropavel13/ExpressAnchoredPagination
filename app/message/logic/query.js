import uuid from 'uuid';

export async function queryAll(model, limit, offset) {
    return model.findAll({
        limit: limit,
        offset: offset
    });
}

export async function queryAnchor(model, since, anchor, limit, offset) {
    let anchorMessage = await model.find({
        where: {
            id: anchor
        }
    });

    const whereClause = since ? {
        createdAt: { $gt: anchorMessage.createdAt }
    } : {
        createdAt: { $lt: anchorMessage.createdAt }
    };

    return model.findAll({
        where: whereClause,
        order: [
            ['createdAt', 'ASC']
        ],
        limit: limit,
        offset: offset
    });
}

export async function querySinceTill(model, sinceId, tillId, limit, offset) {
    let sinceTillMessages = await model.findAll({
        where: {
            id: { $in: [sinceId, tillId] }
        }
    });

    const sinceCreatedDate = (sinceTillMessages[0].id === sinceId ? sinceTillMessages[0] : sinceTillMessages[1]).createdAt;
    const tillCreatedDate = (sinceTillMessages[0].id === tillId ? sinceTillMessages[0] : sinceTillMessages[1]).createdAt;

    return model.findAll({
        where: {
            createdAt: {
                $gt: sinceCreatedDate,
                $lt: tillCreatedDate
            }
        },
        order: [
            ['createdAt', 'ASC']
        ],
        limit: limit,
        offset: offset
    });
}

export async function create(model, body) {
    return model.create({
        id: uuid(),
        body: body
    })
}