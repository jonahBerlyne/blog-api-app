import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Blog = new Schema({
 user: {
  type: Schema.Types.ObjectId,
  ref: "User"
 },
 title: {
  type: String,
  required: true,
  minLength: 5,
  maxLength: 50,
  trim: true
 },
 text: {
  type: String,
  required: true,
  minLength: 1000
 },
 thumbnail: {
  type: String,
  required: true
 },
 category: {
  type: Schema.Types.ObjectId,
  ref: "Category" 
 }
}, { timestamps: true });

export default mongoose.model("Blog", Blog);