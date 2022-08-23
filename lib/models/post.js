import mongoose from 'mongoose';
const { Schema } = mongoose;

const comments = Schema({
    comment: { type: String },
    commentId: { type: String },
    link: { type: String },
    name: { type: String },
    timestamp: { type: Date, default: Date.now },
    userId: { type: String },
});

const schema = Schema({
    admin: { type: String },
    address: { type: String },
    description: { type: String, default: '' },
    locality: { type: String },
    adminArea: { type: String },
    country: { type: String },
    location: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    likes: { type: Number, default: 0 },
    link: { type: String },
    name: { type: String },
    recordId: { type: String },
    timestamp: { type: Date, default: Date.now },
    totalcomments: { type: Number, default: 0 },
    type: { type: String },
    userId: { type: String },
    comments: [comments],
});

const post = mongoose.model('post', schema);
export default post;
