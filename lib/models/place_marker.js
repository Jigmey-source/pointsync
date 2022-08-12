import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    online: { type: Boolean },
    country: { type: String },
    locality: { type: String },
    adminArea: { type: String },
    lat: { type: Number },
    lng: { type: Number }
});

const place = mongoose.model('placemarker', schema);
export default place;
