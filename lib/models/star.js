import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    imageUrl: { type: String },
    name: { type: String },
    recommendId: { type: String },
    recordId: { type: String },
    timeStamp: { type: Date, default: Default.now },
    userId: { type: String },
});

const star = mongoose.model('recommendations', schema);
export default star;
