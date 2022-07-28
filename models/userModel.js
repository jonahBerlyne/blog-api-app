const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
 username: {
  type: String,
  required: true,
  minLength: 5,
  maxLength: 20
 },
 password: {
  type: String,
  required: true,
  minLength: 5
 }
});

module.exports = mongoose.model("User", User);