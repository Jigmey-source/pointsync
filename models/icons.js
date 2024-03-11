import mongoose from 'mongoose';
const { Schema } = mongoose;

const icon = Schema({
    lat: { type: Number },
    lng: { type: Number },
    type: { type: String },
    name: { type: String },
    link: { type: String },
    description: { type: String },
    userId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
}, { _id: false });

const schema = Schema({
    locality: { type: String },
    adminArea: { type: String },
    icons: [icon]
});

const icons = mongoose.model('icons', schema);
export default icons;
