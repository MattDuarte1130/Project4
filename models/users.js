const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  profilePic: String,
  sunday: {type: Boolean},
  monday: {type: Boolean},
  tuesday: {type: Boolean},
  wednesday: {type: Boolean},
  thursday: {type: Boolean},
  friday: {type: Boolean},
  saturday: {type: Boolean},
})

const User = mongoose.model('User', userSchema)

module.exports = User
