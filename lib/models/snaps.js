import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    name: { type: String },
    imageUrl: { type: String },
    description: { type: String },
    time_stamp: { type: Date, default: Date.now },
});

const snaps = mongoose.model('snapshot', schema);
export default snaps;
