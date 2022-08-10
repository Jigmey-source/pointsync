import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    online: { type: Boolean },
    country: { type: String },
    locality: { type: String },
    adminArea: { type: String },
    location: { type: { type: String, default: 'point' }, coordinates: [Number] },
});

export default model('placemarker', schema);
