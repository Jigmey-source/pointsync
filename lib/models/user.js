import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    blocked: { type: Object },
    created_at: { type: Date, required: true, default: Date.now },
    description: { type: String },
    followers: { type: Number, required: true, default: 0 },
    following: { type: Object },
    group: { type: String, required: true },
    hideFrom: { type: Object },
    placemarker: { type: Object, ref: 'placemarker' },
    posts: { type: Number, required: true, default: 0 },
    name: { type: String, required: true, default: '' },
    platform: { type: Object, ref: 'platform' },
    profile_picture: { type: Object, ref: 'profile_picture' },
    userId: { type: String, required: true },
});

const user = mongoose.model('user', schema);
export default user;
