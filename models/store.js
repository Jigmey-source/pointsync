import mongoose from 'mongoose';
const { Schema } = mongoose;

const response = Schema({
    content: { type: String },
    timestamp: { type: Date, default: Date.now },
    title: { type: String },
}, { _id: false });

const commends = Schema({
    name: { type: String },
    userId: { type: String },
    link: { type: String },
    timestamp: { type: Date, default: Date.now },
}, { _id: false });

const reviews = Schema({
    name: { type: String, required: true },
    rate: { type: Number, required: true },
    link: { type: String },
    review: { type: String, required: true },
    userId: { type: String, required: true },
    response: response,
    timestamp: { type: Date, default: Date.now },
}, { _id: false });

const request = Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    userId: { type: String, required: true },
}, { _id: false });

const schema = Schema({
    admin: { type: String },
    address: { type: String },
    averagerate: { type: Number, default: 0 },
    description: { type: String, default: '' },
    event: { type: String, default: '' },
    link: { type: String, required: true },
    lat: { type: Number },
    lng: { type: Number },
    parent: { type: String },
    point: { type: String },
    recommendations: { type: Number, default: 0 },
    title: { type: String, required: true },
    type: { type: String, required: true },
    request: request,
    reviews: [reviews],
    commends: [commends],
});

const stores = mongoose.model('stores', schema);
export default stores;