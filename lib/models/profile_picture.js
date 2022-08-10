import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    url: { type: String, required: true },
    file: { type: String, required: true }
});

export default model('profile_picture', schema);
