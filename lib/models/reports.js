import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    address: { type: String },
    admin: { type: String },
    adminArea: { type: String },
    averagerate: { type: Number },
    blocked: [{ type: String }],
    totalcomments: { type: Number },
    country: { type: String },
    description: { type: String },
    event: { type: String },
    followers: { type: Number },
    group: { type: String },
    hidefrom: [{ type: String }],
    link: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    likes: { type: Number },
    locality: { type: String },
    name: { type: String },
    placemarker: { type: Object },
    posts: { type: Number },
    recommendations: { type: Number },
    timestamp: { type: Date, default: Date.now },
    title: { type: String },
    type: { type: String },
    token: { type: String },
    userId: { type: String },
    work: [{ type: Object }],
});

const report = mongoose.model('reports', schema);
export default report;
