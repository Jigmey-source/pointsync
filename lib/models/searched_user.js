import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    name: { type: String },
    userId: { type: String },
    imageUrl: { type: String },
    time_stamp: { type: Date, default: Date.now },
});

const searchedusers = mongoose.model('searched_users', schema);
export default searchedusers;