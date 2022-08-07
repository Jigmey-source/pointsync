"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    blocked: { type: Object, required: true },
    created_at: { type: Date, required: true, default: Date.now },
    description: { type: String, required: true },
    followers: { type: Number, required: true },
    following: { type: Object, required: true },
    group: { type: String, required: true },
    hideFrom: { type: Object, required: true },
    place_marker: { type: Object, required: true },
    posts: { type: Number, required: true },
    name: { type: String, required: true },
    platform: { type: Object, required: true },
    profile_picture: { type: Object, required: true },
    userId: { type: String, required: true },
});
module.exports = mongoose_1.default.model('users', userSchema);
