import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    userId: { type: String },
    notifications: [{ type: Object, ref: 'notifications' }],
});

const notify = mongoose.model('notify', schema);
export default notify;
