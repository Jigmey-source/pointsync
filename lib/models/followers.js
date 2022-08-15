import mongoose from 'mongoose';
const { Schema } = mongoose;

const docs = Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, default: '' }
}, { _id: false });

const schema = Schema({
    userId: { type: String },
    followers: [docs]
});

const followers = mongoose.model('followers', schema);
export default followers;
