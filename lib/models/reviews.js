import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    imageUrl: { type: String },
    like: { type: Number },
    name: { type: String },
    rate: { type: Number },
    response: { type: Object, ref: 'response' },
    review: { type: String },
    timeStamp: { type: Date, default: Date.now },
    userId: { type: String },
    reviewId: { type: String },
});

const review = mongoose.model('reviews', schema);
export default review;