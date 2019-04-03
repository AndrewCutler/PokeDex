const mongoose = require('mongoose'),
  passportLocalMongoose = require('passport-local-mongoose')

//user schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
})

UserSchema.methods.isValidPassword = function(pw) {
  return pw.length > 7
}

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)
