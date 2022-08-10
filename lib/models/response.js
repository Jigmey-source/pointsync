import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    content: { type: String },
    timeStamp: { type: Date, default: Date.now },
    title: { type: String },
});

const response = mongoose.model('response', schema);
export default response;