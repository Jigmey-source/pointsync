import mongoose from 'mongoose';
const { Schema } = mongoose;

const feed = Schema({
    lat: { type: Number },
    lng: { type: Number },
    type: { type: String },
    name: { type: String },
    link: { type: String },
    description: { type: String },
    timestamp: { type: Date, default: Date.now },
}, { _id: false });

const schema = Schema({
    userId: { type: String, required: true },
    feeds: [feed]
});

const feeds = mongoose.model('feeds', schema);
export default feeds;