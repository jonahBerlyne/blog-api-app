import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
 username: {
  type: String,
  required: [true, "Please add your username"],
  trim: true,
  minLength: 5,
  maxLength: [20, "Username can only be 20 characters max."]
 },
 password: {
  type: String,
  required: [true, "Please add your password"],
  minLength: 5
 },
 account: {
  type: String,
  required: [true, "Pleasee add your phone or email"],
  trim: true,
  unique: true
 },
 avatar: {
  type: String,
 },
 role: {
  type: String,
  default: "user"
 },
 type: {
  type: String,
  default: "register"
 },
 rf_token: {
  type: String,
  select: false
 }
}, { timestamps: true });

export default mongoose.model("User", User);