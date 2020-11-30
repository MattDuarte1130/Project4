const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    userId: {type: String},
    title:  { type: String, required: true },
    description:  { type: String, required: true },
    img: { type: String, required: true },
    members: [{type: String}],
    minMembers: {type: Number, default: 0, required: true },
    maxMembers: {type: Number, default: 0, required: true },
    sunday: Boolean,
    monday: Boolean,
    tuesday: Boolean,
    wednesday: Boolean,
    thursday: Boolean,
    friday: Boolean,
    saturday: Boolean,
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
