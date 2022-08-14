import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    event: { type: String, default: '' },
    type: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    average_rate: { type: Number, default: 0 },
    recommendations: { type: Number, default: 0 },
    searchKey: [{ type: String, required: true }],
});

const record = mongoose.model('record', schema);
export default record;