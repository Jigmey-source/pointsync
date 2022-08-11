import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    userId: { type: String },
    posts: [{ type: Object, ref: 'posts' }],
});

const feeds = mongoose.model('feeds', schema);
export default feeds;