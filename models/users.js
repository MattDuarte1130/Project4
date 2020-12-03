const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  profilePic: String,
  sunday: {type: Boolean, default: false},
  monday: {type: Boolean, default: false},
  tuesday: {type: Boolean, default: false},
  wednesday: {type: Boolean, default: false},
  thursday: {type: Boolean, default: false},
  friday: {type: Boolean, default: false},
  saturday: {type: Boolean, default: false},
})

const User = mongoose.model('User', userSchema)

module.exports = User
