import mongoose from "mongoose";
import { CommentInt } from "../config/interface";
const Schema = mongoose.Schema;

const Comment = new Schema({
 user: {
  type: Schema.Types.ObjectId,
  ref: "User"
 },
 content: {
  type: String,
  required: true,
  minLength: 1,
  maxLength: 140
 },
 blog_id: Schema.Types.ObjectId,
 blog_user_id: Schema.Types.ObjectId,
 reply_comment: [{
  type: Schema.Types.ObjectId,
  ref: "Comment"
 }],
 reply_user: {
  type: Schema.Types.ObjectId,
  ref: "User"
 },
 comment_root: {
  type: Schema.Types.ObjectId,
  ref: "Comment"
 }
}, { timestamps: true });

export default mongoose.model<CommentInt>("Comment", Comment); 