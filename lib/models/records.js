import mongoose from 'mongoose';
const { Schema } = mongoose;

const record = Schema({
    point: { type: String },
    event: { type: String, default: '' },
    type: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    average_rate: { type: Number, default: 0 },
    recommendations: { type: Number, default: 0 },
    // searchKey: [{ type: String, required: true }],
}, { _id: false });

const schema = Schema({
    locality: { type: String },
    adminArea: { type: String },
    // searchKey: { type: String },
    record: [record]
});

const records = mongoose.model('records', schema);
export default records;