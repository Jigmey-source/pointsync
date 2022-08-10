import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    blocked: { type: Object },
    created_at: { type: Date, default: Date.now },
    description: { type: String },
    followers: { type: Number, default: 0 },
    following: { type: Object },
    group: { type: String },
    hide_from: { type: Object },
    token: { type: String },
    placemarker: { type: Object, ref: 'placemarker' },
    posts: { type: Number, default: 0 },
    name: { type: String, default: '' },
    profile_picture: { type: Object, ref: 'profile_picture' },
    userId: { type: String },
});

const user = mongoose.model('user', schema);
export default user;
