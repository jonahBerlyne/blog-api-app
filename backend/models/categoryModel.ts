import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Category = new Schema({
 name: {
  type: String,
  required: [true, "Please add a category"],
  trim: true,
  unique: true,
  minLength: 1,
  maxLength: [50, "Category can only be 50 characters max"]
 }
}, { timestamps: true });

export default mongoose.model("Category", Category);