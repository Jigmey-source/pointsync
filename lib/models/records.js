import mongoose from 'mongoose';
const { Schema } = mongoose;

const record = Schema({
    point: { type: String },
    event: { type: String, default: '' },
    type: { type: String, required: true },
    title: { type: String, required: true },
    link: { type: String, required: true },
    averagerate: { type: Number, default: 0 },
    recommendations: { type: Number, default: 0 },
}, { _id: false });

const schema = Schema({
    locality: { type: String },
    adminArea: { type: String },
    records: [record]
});

const records = mongoose.model('records', schema);
export default records;