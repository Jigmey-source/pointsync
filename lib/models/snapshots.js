import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    userId: { type: String, required: true },
    snaps: [{ type: Object, ref: 'snapshot' }]
});

const snapshots = mongoose.model('snapshots', schema);
export default snapshots;
