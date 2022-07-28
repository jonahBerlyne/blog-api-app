const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
 author: {
  type: String,
  required: true
 },
 text: {
  type: String,
  required: true,
  minLength: 1,
  maxLength: 140
 }
}, { timestamps: true });

module.exports = mongoose.model("Comment", Comment); 