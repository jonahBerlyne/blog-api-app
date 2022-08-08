const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = new Schema({
 author: {
  type: Schema.Types.ObjectId,
  ref: "User",
  required: true
 },
 title: {
  type: String,
  required: true,
  minLength: 1
 },
 text: {
  type: String,
  required: true,
  minLength: 1,
  maxLength: 140
 },
 comments: {
  type: Array,
  default: []
 },
 likes: {
  type: Array,
  default: []
 }
}, { timestamps: true });

module.exports = mongoose.model("Blog", Blog);