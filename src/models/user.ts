import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    blocked: Object,
    created_at: Date,
    description: String,
    followers: Number,
    following: Object,
    group: String,
    hideFrom: Object,
    placemarker: Object,
    posts: Number,
    name: String,
    platform: Object,
    profile_picture: Object,
    userId: String,
};

export const userSchema = new mongoose.Schema({
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

const user = mongoose.model<IUser>('users', userSchema)
export default user;
