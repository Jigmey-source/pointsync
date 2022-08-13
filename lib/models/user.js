import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    blocked: { type: Object, default: {} },
    created_at: { type: Date, default: Date.now },
    description: { type: String, default: '' },
    followers: { type: Number, default: 0 },
    following: [{ type: Object, ref: 'following' }],
    group: { type: String, required: true },
    hide_from: { type: Object, default: {} },
    token: { type: String, required: true },
    name: { type: String, required: true },
    placemarker: { type: Object, ref: 'placemarker' },
    posts: { type: Number, default: 0 },
    profile_picture: { type: Object, ref: 'profile_picture' },
    searchKey: [{ type: String, required: true }],
    searched_users: [{ type: Object, ref: 'searched_users' }],
    userId: { type: String, required: true },
});

const user = mongoose.model('user', schema);
export default user;
