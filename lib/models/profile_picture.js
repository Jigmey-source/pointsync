import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    url: { type: String },
    file: { type: String }
});

const pfp = mongoose.model('profile_picture', schema);
export default pfp;
