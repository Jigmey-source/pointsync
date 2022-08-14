import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    event: { type: String },
    average_rate: { type: Number},
    recommendations: { type: Number },
    type: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    searchKey: [{ type: String, required: true }],
});

const record = mongoose.model('record', schema);
export default record;