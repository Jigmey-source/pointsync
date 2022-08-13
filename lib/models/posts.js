import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = Schema({
    userId: { type: String },
    posts: [{
        admin: { type: String },
        address: { type: String },
        name: { type: String },
        location: { type: String },
        likes: { type: String },
        comments: { type: String },
        description: { type: String },
        postId: { type: String },
        userId: { type: String },
        recordId: { type: String },
        time_stamp: { type: Date, default: Date.now },
        type: { type: String },
        imageUrl: { type: String },
        locality: { type: String },
        adminArea: { type: String },
        country: { type: String },
        default: {},
    }]
});

const post = mongoose.model('posts', schema);
export default post;
