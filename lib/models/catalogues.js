import mongoose from 'mongoose';
const { Schema } = mongoose;

const catalogue = Schema({
    event: { type: String, default: '' },
    type: { type: String, required: true },
    title: { type: String, required: true },
    link: { type: String, required: true },
    average_rate: { type: Number, default: 0 },
    recommendations: { type: Number, default: 0 },
}, { _id: false });

const schema = Schema({
    link: { type: String, required: true },
    catalogue: [catalogue]
});

const catalogues = mongoose.model('catalogues', schema);
export default catalogues;