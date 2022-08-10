import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
});

export default model('geopoint', schema);
