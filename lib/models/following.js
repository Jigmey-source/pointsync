import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    name: { type: String },
    userId: { type: String },
    imageUrl: { type: String, default: '' },
});

const following = mongoose.model('following', schema);
export default following;