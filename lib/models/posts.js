import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    userId: { type: String },
    posts: [{ type: Object, ref: 'post' }]
});

const post = mongoose.model('posts', schema);
export default post;
