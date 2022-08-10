import mongoose from 'mongoose';
const { Schema } = mongoose;
const schema = Schema({
    imageUrl: { type: String },
    name: { type: String },
    userId: { type: String },
});

const searches = mongoose.model('searches', schema);
export default searches;