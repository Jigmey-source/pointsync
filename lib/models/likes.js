import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    imageUrl: { type: String },
    name: { type: String },
    userId: { type: String }
});

const like = mongoose.model('likes', schema);
export default like;
