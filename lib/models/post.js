import mongoose from 'mongoose';
const { Schema } = mongoose;

const comments = Schema({
    comment: { type: String },
    commentId: { type: String },
    name: { type: String },
    link: { type: String },
    time_stamp: { type: Date, default: Date.now },
    userId: { type: String },
});

const schema = Schema({
    admin: { type: String },
    address: { type: String },
    name: { type: String },
    location: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    likes: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
    comments: [comments],
    description: { type: String, default: '' },
    postId: { type: String },
    userId: { type: String },
    recordId: { type: String },
    time_stamp: { type: Date, default: Date.now },
    type: { type: String },
    link: { type: String },
    locality: { type: String },
    adminArea: { type: String },
    country: { type: String },
});

const post = mongoose.model('post', schema);
export default post;
