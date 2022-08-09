"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
;
exports.userSchema = new mongoose_1.default.Schema({
    blocked: { type: Object, required: true },
    created_at: { type: Date, required: true, default: Date.now },
    description: { type: String, required: true },
    followers: { type: Number, required: true },
    following: { type: Object, required: true },
    group: { type: String, required: true },
    hideFrom: { type: Object, required: true },
    placemarker: { type: Object, ref: 'placemarker' },
    posts: { type: Number, required: true },
    name: { type: String, required: true },
    platform: { type: Object, ref: 'platform' },
    profile_picture: { type: Object, ref: 'profile_picture' },
    userId: { type: String, required: true },
});
const user = mongoose_1.default.model('users', exports.userSchema);
exports.default = user;
