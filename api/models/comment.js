import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    publishment: {
        type: mongoose.Schema.ObjectId, ref: 'Publishment'
    }
});

export const Comment = mongoose.model('Comment', commentSchema);

