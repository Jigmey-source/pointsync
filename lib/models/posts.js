import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    admin: {type: String },
    address: {type: String },
    name: {type: String },
    location: {type: String },
    likes: {type: String },
    comments: {type: String },
    description: {type: String },
    postId: {type: String },
    userId: {type: String },
    recordId: {type: String },
    timeStamp: {type: String },
    type: {type: String },
    imageUrl: {type: String },
    locality: {type: String },
    adminArea: {type: String },
    country: {type: String },
});

const post = mongoose.model('posts', schema);
export default post;
