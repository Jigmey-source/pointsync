import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    online: { type: Boolean, required: true },
    country: { type: String, required: true },
    locality: { type: String, required: true },
    adminArea: { type: String, required: true },
    location: { type: { type: String, default: 'Point' }, coordinates: [Number] },
});

export default model('placemarker', schema);
