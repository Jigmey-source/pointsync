import mongoose from "mongoose";

export const schema = new mongoose.Schema({
    online: { type: Boolean, required: true },
    country: { type: String, required: true },
    locality: { type: String, required: true },
    adminArea: { type: String, required: true },
    geopoint: { type: Object, ref: 'geopoint' },
});

const placemarker = mongoose.model('placemarker', schema)
export default placemarker;
