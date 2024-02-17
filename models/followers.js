import mongoose from 'mongoose';
const { Schema } = mongoose;

const follower = Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true },
    link: { type: String, default: '' }
}, { _id: false });

const schema = Schema({
    userId: { type: String, required: true },
    followers: [follower]
});

const followers = mongoose.model('followers', schema);
export default followers;
