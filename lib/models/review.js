import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    name: { type: String },
    rate: { type: Number },
    imageUrl: { type: String },
    review: { type: String },
    userId: { type: String },
    response: { type: Object, ref: 'response' },
    time_stamp: { type: Date, default: Date.now },
});

const review = mongoose.model('review', schema);
export default review;