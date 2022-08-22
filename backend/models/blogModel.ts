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
 content: {
  type: String,
  required: true,
  minLength: 2000
 },
 description: {
  type: String,
  required: true,
  trim: true,
  minLength: 50,
  maxLength: 200
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