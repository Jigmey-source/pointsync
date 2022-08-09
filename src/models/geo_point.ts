import mongoose from 'mongoose';

export const schema = new mongoose.Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
});

const geopoint = mongoose.model('geopoint', schema)
export default geopoint;
