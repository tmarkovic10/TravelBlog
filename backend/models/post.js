const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    creator: String,
    name: String,
    title: String,
    description: String,
    tags: [String],
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    likes: {
        type: [String],
        default: []
    }
})

const Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;