import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    adminArea: { type: String },
    imageUrl: { type: String },
    locality: { type: String },
    mediaUrl: { type: String },
    name: { type: String },
    notificationId: { type: String },
    postId: { type: String },
    recordId: { type: String },
    timeStamp: { type: Date, default: Date.now },
    title: { type: String },
    type: { type: String },
    userId: { type: String },
    seen: { type: Boolean },
});

const notice = mongoose.model('notifications', schema);
export default notice;
