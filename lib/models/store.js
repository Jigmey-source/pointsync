import mongoose from 'mongoose';
const { Schema } = mongoose;

const response = Schema({
    content: { type: String },
    time_stamp: { type: Date, default: Date.now },
    title: { type: String },
}, { _id: false });

const commends = Schema({
    name: { type: String },
    userId: { type: String },
    link: { type: String },
    time_stamp: { type: Date, default: Date.now },
}, { _id: false });

const reviews = Schema({
    name: { type: String, required:true },
    rate: { type: Number, required: true },
    link: { type: String },
    review: { type: String, required: true },
    userId: { type: String, required: true },
    response: response,
    time_stamp: { type: Date, default: Date.now },
}, { _id: false });

const schema = Schema({
    admin: { type: String },
    address: { type: String },
    description: { type: String },
    event: { type: String },
    average_rate: { type: Number },
    recommendations: { type: Number },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    link: { type: String, required: true },
    reviews: [reviews],
    commends: [commends],
});

const stores = mongoose.model('stores', schema);
export default stores;