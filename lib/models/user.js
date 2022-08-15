import mongoose from 'mongoose';
const { Schema } = mongoose;

const following = Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, default: '' }
}, { _id: false });

const schema = Schema({
    blocked: [{ type: String }],
    created_at: { type: Date, default: Date.now },
    description: { type: String, default: '' },
    followers: { type: Number, default: 0 },
    following: [following],
    group: { type: String, required: true },
    hide_from: [{ type: String }],
    token: { type: String, required: true },
    name: { type: String, required: true },
    placemarker: { type: Object, ref: 'placemarker' },
    posts: { type: Number, default: 0 },
    profile_picture: { type: Object, ref: 'profile_picture' },
    searchKey: [{ type: String, required: true }],
    searched_users: [{ type: Object, ref: 'searched_users' }],
    userId: { type: String, required: true },
    work: [{ type: Object }],
});

const user = mongoose.model('user', schema);
export default user;
