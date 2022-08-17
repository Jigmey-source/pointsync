import mongoose from 'mongoose';
const { Schema } = mongoose;

const likes = Schema({
    imageUrl: { type: String },
    name: { type: String },
    userId: { type: String },
});

const schema = Schema({
    posturl: { type: String },
    likes: [likes]
});

const like = mongoose.model('likes', schema);
export default like;
