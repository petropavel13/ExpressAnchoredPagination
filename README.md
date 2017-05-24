## Pagination

### Methods:

* [POST] /api/messages/listing - list of messages
* [POST] /api/message/create - create a message
 
### api/messages url parameters:

* since_id - message UUID
* till_id - message UUID
* limit - maximum number of messages
* offset - offset from first message in results

### api/messages body parameters:

* { body: "message text" } - json object with `body` field

### Examples:

* `http://localhost:3000/api/messages/listing/` - all messages
* `http://localhost:3000/api/messages/listing/?limit=2&offset=1` - Two messages starting from second.
* `http://localhost:3000/api/messages/listing/?since_id=b500f4df-db19-4bc8-8913-6af25c228b0c` - all messages since anchor (NOTE: anchor message not included)
* `http://localhost:3000/api/messages/listing/?till_id=311c7064-80c5-4473-894d-b0ebebe5ef28` - all messages till anchor (NOTE: anchor message not included)
* `http://localhost:3000/api/messages/listing/?since_id=b500f4df-db19-4bc8-8913-6af25c228b0c&till_id=311c7064-80c5-4473-894d-b0ebebe5ef28` - all messages between anchors (NOTE: anchors messages not included)
