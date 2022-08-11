import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    userId: { type: String },
    followers: { type: Object, ref: 'users' }
});

const followers = mongoose.model('followers', schema);
export default followers;
