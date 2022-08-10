import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    imageUrl: { type: String },
    name: { type: String },
    recommendId: { type: String },
    recordId: { type: String },
    timeStamp: { type: Date, default: Date.now },
    userId: { type: String },
});

const store = mongoose.model('record', schema);
export default store;