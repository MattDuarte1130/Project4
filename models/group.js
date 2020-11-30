const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    userCreatedId: {type: String, required: true},
    title:  { type: String, required: true },
    description:  { type: String, required: true },
    img: { type: String, required: true },
    members: [{type: String}],
    min: {type: Number, default: 0, required: true },
    max: {type: Number, default: 0, required: true }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
