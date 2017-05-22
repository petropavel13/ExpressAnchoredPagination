const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageModel = new Schema({
    text: String,
    createdAt: Date
}, {
    versionKey: false
}, {
    timestamps: true // why this isn't working at all?!
});

MessageModel.methods.toJSON = function() {
    const obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    delete obj.createdAt;
    return obj;
};

export const Message = mongoose.model('Message', MessageModel);
