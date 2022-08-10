import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    platform: { type: String, required: true },
    token: { type: String, required: true },
});

export default model('platform', schema);
