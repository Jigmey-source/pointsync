import mongoose from 'mongoose';
const { Schema } = mongoose;

const users = Schema({
    name: { type: String },
    userId: { type: String },
    imageUrl: { type: String, default: '' },
    time_stamp: { type: Date, default: Date.now },
}, { _id: false });

const places = Schema({
    locality: { type: String },
    adminArea: { type: String },
    country: { type: String },
    time_stamp: { type: Date, default: Date.now },
}, { _id: false });

const stores = Schema({
    title: { type: String },
    type: { type: String },
    time_stamp: { type: Date, default: Date.now },
}, { _id: false });

const schema = Schema({
    userId: { type: String, required: true },
    users: [users],
    places: [places],
    stores: [stores],
});

const searches = mongoose.model('search_history', schema);
export default searches;