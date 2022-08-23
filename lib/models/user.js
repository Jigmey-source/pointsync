import mongoose from 'mongoose';
const { Schema } = mongoose;

const following = Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    link: { type: String, default: '' }
}, { _id: false });

const placemarker = Schema({
    online: { type: Boolean },
    country: { type: String },
    locality: { type: String },
    adminArea: { type: String },
    lat: { type: Number },
    lng: { type: Number }
}, { _id: false });

const schema = Schema({
    blocked: [{ type: String }],
    created_at: { type: Date, default: Date.now },
    description: { type: String, default: '' },
    following: [following],
    group: { type: String, required: true },
    hide_from: [{ type: String }],
    token: { type: String, required: true },
    name: { type: String, required: true },
    placemarker: placemarker,
    posts: { type: Number, default: 0 },
    link: { type: String },
    userId: { type: String, required: true },
    totalfollowers: { type: Number, default: 0 },
    totalfollowing: { type: Number, default: 0 },
    work: [{ type: Object }],
});

const user = mongoose.model('user', schema);
export default user;
