import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    blocked: { type: Object, default: {} },
    created_at: { type: Date, default: Date.now },
    description: { type: String, default: '' },
    followers: { type: Number, default: 0 },
    following: { type: Object, default: {} },
    group: { type: String },
    hide_from: { type: Object, default: {} },
    token: { type: String },
    name: { type: String },
    placemarker: { type: Object, ref: 'placemarker' },
    posts: { type: Number, default: 0 },
    profile_picture: { type: Object, ref: 'profile_picture' },
    searchKey: [{ type: String }],
    searched_user: [{type: Object}],
    userId: { type: String },
});

const user = mongoose.model('user', schema);
export default user;
