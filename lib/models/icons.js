import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    locality: { type: String },
    adminArea: { type: String },
    posts: [{ type: Object, ref: 'post' }]
});

const post = mongoose.model('icons', schema);
export default post;
