import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    address: { type: String },
    admin: { type: String },
    adminArea: { type: String },
    average_rate: { type: Number },
    blocked: [{ type: String }],
    comments: { type: Number },
    country: { type: String },
    description: { type: String },
    event: { type: String },
    followers: { type: Number },
    following: [following],
    group: { type: String },
    hide_from: [{ type: String }],
    imageUrl: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    likes: { type: Number },
    locality: { type: String },
    name: { type: String },
    placemarker: placemarker,
    posts: { type: Number },
    postId: { type: String },
    recommendations: { type: Number },
    recordId: { type: String },
    time_stamp: { type: Date, default: Date.now },
    title: { type: String },
    type: { type: String },
    token: { type: String },
    userId: { type: String },
    work: [{ type: Object }],
});

const report = mongoose.model('reports', schema);
export default report;
