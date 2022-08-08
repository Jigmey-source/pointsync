import mongoose from 'mongoose';

export interface GeoPoint extends mongoose.Document { 
    lat: Number, lng: Number
}

export const geoPointSchema = new mongoose.Schema({
    lat: { type: Number, required: true },
    lng: {type: Number, required: true},
})

const geoPoint = mongoose.model<GeoPoint>('geopoint', geoPointSchema)
export default geoPoint;
