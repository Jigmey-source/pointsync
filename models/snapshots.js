import mongoose from 'mongoose';
const { Schema } = mongoose;

const snaps = Schema({
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
    userId: { type: String, required: true },
    snaps: [snaps]
});

const snapshots = mongoose.model('snapshots', schema);
export default snapshots;
