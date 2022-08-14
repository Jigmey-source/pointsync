import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    name: { type: String },
    imageUrl: { type: String },
    description: { type: String },
});

const snaps = mongoose.model('snaps', schema);
export default snaps;
