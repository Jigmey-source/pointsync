import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    url: { type: String },
    file: { type: String }
});

export default model('profile_picture', schema);
