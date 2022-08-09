import mongoose from 'mongoose';

export const schema = new mongoose.Schema({
    url: { type: String, required: true },
    file: { type: String, required: true },
});

const profile_picture = mongoose.model('profile_picture', schema);
export default profile_picture;