import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    admin: { type: String },
    address: { type: String },
    name: { type: String },
    location: { type: String },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    description: { type: String, default: '' },
    postId: { type: String },
    userId: { type: String },
    recordId: { type: String },
    time_stamp: { type: Date, default: Date.now },
    type: { type: String },
    imageUrl: { type: String },
    locality: { type: String },
    adminArea: { type: String },
    country: { type: String },
});

const post = mongoose.model('post', schema);
export default post;
