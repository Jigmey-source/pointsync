import mongoose from 'mongoose';
const { Schema } = mongoose;

const notification = Schema({
    link: { type: String },
    admin: { type: String },
    title: { type: String },
    review: { type: String },
    comment: { type: String },
    content: { type: String },
    mediaurl: { type: String },
    type: { type: String, required: true },
    name: { type: String, required: true },
    userId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    seen: { type: Boolean, required: true, default: false },
}, { _id: false });

const schema = Schema({
    userId: { type: String, required: true },
    notifications: [notification]
});

const notifications = mongoose.model('notifications', schema);
export default notifications;
