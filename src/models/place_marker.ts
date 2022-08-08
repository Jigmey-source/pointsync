import mongoose from "mongoose";
import geoPoint from "./geo_point";

export interface IPlatform extends mongoose.Document { 
    online: Boolean,
    country: String,
    locality: String,
    adminArea: String,
    geopoint: Object,
}

export const placeMarkerSchema = new mongoose.Schema({
    online: { type: Boolean, required: true },
    country: { type: String, required: true },
    locality: { type: String, required: true },
    adminArea: { type: String, required: true },
    geopoint: { type: geoPoint, required: true },
});

const placemarker = mongoose.model<IPlatform>('placemarker', placeMarkerSchema)
export default placemarker;
