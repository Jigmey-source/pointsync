import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    locality: { type: String },
    adminArea: { type: String },
    record: [{type: Object, ref: 'record'}]
});

const records = mongoose.model('records', schema);
export default records;