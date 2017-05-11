const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    text: String,
    createdAt: Date
}, {
    versionKey: false
}, {
    timestamps: true // why this isn't working at all?!
});

Message.methods.toJSON = function() {
    const obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    delete obj.createdAt;
    return obj;
};

module.exports = mongoose.model('Message', Message);