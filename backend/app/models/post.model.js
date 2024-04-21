const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    file: {
        type: Buffer,
        required: true,
    }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post