import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    blocked: { type: Object, required: true },
    created_at: { type: Date, required: true, default: Date.now },
    description: { type: String, required: true },
    followers: { type: Number, required: true },
    following: { type: Object, required: true },
    group: { type: String, required: true },
    hideFrom: { type: Object, required: true },
    place_marker: { type: Object, required: true },
    posts: { type: Number, required: true },
    name: { type: String, required: true },
    platform: { type: Object, required: true },
    profile_picture: { type: Object, required: true },
    userId: { type: String, required: true },
});

module.exports = mongoose.model('users', userSchema);
