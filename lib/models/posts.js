import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    locality: { type: String },
    adminArea: { type: String },
    snaps: [{ type: Object, ref: 'snapshot' }]
});

const post = mongoose.model('posts', schema);
export default post;
