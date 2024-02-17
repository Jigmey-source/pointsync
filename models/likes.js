import mongoose from 'mongoose';
const { Schema } = mongoose;

const like = Schema({
    link: { type: String },
    name: { type: String },
    userId: { type: String, required: true },
}, { _id: false });

const schema = Schema({
    link: { type: String, required: true },
    likes: [like]
});

const likes = mongoose.model('likes', schema);
export default likes;
