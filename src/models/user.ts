import mongoose from 'mongoose';
import placemarker from './place_marker';

export interface IUser extends mongoose.Document {
    blocked: Object,
    created_at: Date,
    description: String,
    followers: Number,
    following: Object,
    group: String,
    hideFrom: Object,
    place_marker: Object,
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
    placemarker: { type: placemarker, required: true },
    posts: { type: Number, required: true },
    name: { type: String, required: true },
    platform: { type: Object, required: true },
    profile_picture: { type: Object, required: true },
    userId: { type: String, required: true },
});

const user = mongoose.model<IUser>('user', userSchema)
export default user;
