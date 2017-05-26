## Pagination

### Methods:

* [POST] `/api/message/listing` - list of messages
* [POST] `/api/message/create` - create a message
 
#### `/api/message/listing` parameters:

* since_id - message UUID
* till_id - message UUID
* limit - maximum number of messages
* offset - offset from first message in results
 
### `/api/message/create` parameters:

* body - message text

### Examples:

#### `/api/message/create`

* { body: "message text" } - create new message with "message text"

#### `/api/message/listing`

* { } - all messages

* { limit: 2, offset: 1 } - Two messages starting from second.

* { since_id: b500f4df-db19-4bc8-8913-6af25c228b0c } - all messages since anchor (NOTE: anchor message not included)

* { till_id: 311c7064-80c5-4473-894d-b0ebebe5ef28 } - all messages till anchor (NOTE: anchor message not included)

* { since_id: b500f4df-db19-4bc8-8913-6af25c228b0c, till_id: 311c7064-80c5-4473-894d-b0ebebe5ef28 } - all messages between anchors (NOTE: anchors messages not included)
