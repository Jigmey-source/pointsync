import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    admin: { type: String },
    address: { type: String },
    description: { type: String },
    file: { type: String },
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    event: { type: String },
    average_rate: { type: Number },
    recommendations: { type: Number },
    type: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    reviews: [{ type: String, ref: 'review' }],
});

const store = mongoose.model('store', schema);
export default store;