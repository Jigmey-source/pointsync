import mongoose from 'mongoose';
const { Schema } = mongoose;

const users = Schema({
    name: { type: String },
    userId: { type: String },
    link: { type: String, default: '' },
    timestamp: { type: Date, default: Date.now },
}, { _id: false });

const places = Schema({
    locality: { type: String },
    adminArea: { type: String },
    country: { type: String },
    timestamp: { type: Date, default: Date.now },
}, { _id: false });

const stores = Schema({
    title: { type: String },
    type: { type: String },
    timestamp: { type: Date, default: Date.now },
}, { _id: false });

const schema = Schema({
    userId: { type: String, required: true },
    users: [users],
    places: [places],
    stores: [stores],
});

const history = mongoose.model('whatever', schema);
export default history;
