import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    comment: { type: String },
    commentId: { type: String },
    name: { type: String },
    imageUrl: { type: String },
    timeStamp: { type: Date, default: Date.now },
    userId: { type: String },
});

const comment = mongoose.model('comments', schema);
export default comment;
