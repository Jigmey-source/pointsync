import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    name: { type: String },
    userId: { type: String },
    imageUrl: { type: String },
    time_stamp: { type: Date, default: Date.now },
});

const searched_user = mongoose.model('searched_user', schema);
export default searched_user;