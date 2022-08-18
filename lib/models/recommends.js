import mongoose from 'mongoose';
const { Schema } = mongoose;

const commends = Schema({
    name: { type: String },
    userId: { type: String },
    link: { type: String },
    time_stamp: { type: Date, default: Date.now },
}, { _id: false });

const schema = Schema({
    link: { type: String },
    commends: [commends]
});

const post = mongoose.model('recommends', schema);
export default post;
