import mongoose from 'mongoose';
const { Schema } = mongoose;

const snaps = Schema({
    name: { type: String },
    link: { type: String },
    description: { type: String },
    timestamp: { type: Date, default: Date.now },
}, { _id: false });

const schema = Schema({
    locality: { type: String },
    adminArea: { type: String },
    snaps: [snaps]
});

const icons = mongoose.model('icons', schema);
export default icons;
