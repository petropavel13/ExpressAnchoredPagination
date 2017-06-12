import uuid from 'uuid';

export function syncMessages(model) {
    model.sync({force: true}).then(() => {
        return model.bulkCreate([
            {
                id: uuid(),
                body: "First message",
                createdAt: '2017-05-22 11:51:12'
            },
            {
                id: uuid(),
                body: "Second message",
                createdAt: '2017-05-22 11:51:24'
            },
            {
                id: uuid(),
                body: "Third message",
                createdAt: '2017-05-22 12:00:39'
            },
            {
                id: uuid(),
                body: "Fourth message",
                createdAt: '2017-05-22 12:10:39'
            }
        ]);
    });
}