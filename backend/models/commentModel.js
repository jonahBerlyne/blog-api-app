"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Comment = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
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
exports.default = mongoose_1.default.model("Comment", Comment);
