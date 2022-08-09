import mongoose from 'mongoose';

export const schema = new mongoose.Schema({
    platform: { type: String, required: true },
    token: { type: String, required: true },
});

const platform = mongoose.model('platform', schema);
export default platform;