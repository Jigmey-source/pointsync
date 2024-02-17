import mongoose from 'mongoose';
const { Schema } = mongoose;

const record = Schema({
    averagerate: { type: Number, default: 0 },
    event: { type: String, default: '' },
    link: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    point: { type: String },
    recommendations: { type: Number, default: 0 },
}, { _id: false });

const schema = Schema({
    locality: { type: String },
    adminArea: { type: String },
    records: [record]
});

const records = mongoose.model('records', schema);
export default records;