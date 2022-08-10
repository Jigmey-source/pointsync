import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    online: { type: Boolean, required: true },
    country: { type: String, required: true },
    locality: { type: String, required: true },
    adminArea: { type: String, required: true },
    geopoint: { type: Object, ref: 'geopoint' },
});

export default model('placemarker', schema);
