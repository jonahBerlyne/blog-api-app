"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Category = new Schema({
    name: {
        type: String,
        required: [true, "Please add a category"],
        trim: true,
        unique: true,
        minLength: 1,
        maxLength: [50, "Category can only be 50 characters max."]
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Category", Category);
