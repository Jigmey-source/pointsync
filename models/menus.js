import mongoose from 'mongoose';
const { Schema } = mongoose;

const menu = Schema({
    event: { type: String, default: '' },
    type: { type: String, required: true },
    title: { type: String, required: true },
    link: { type: String, required: true },
    averagerate: { type: Number, default: 0 },
    recommendations: { type: Number, default: 0 },
}, { _id: false });

const schema = Schema({
    link: { type: String, required: true },
    menu: [menu]
});

const menus = mongoose.model('menus', schema);
export default menus;