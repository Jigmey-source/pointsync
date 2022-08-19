import mongoose from 'mongoose';
const { Schema } = mongoose;

const likes = Schema({
    link: { type: String },
    name: { type: String },
    userId: { type: String },
}, { _id: false });

const schema = Schema({
    link: { type: String },
    likes: [likes]
});

const like = mongoose.model('likes', schema);
export default like;
