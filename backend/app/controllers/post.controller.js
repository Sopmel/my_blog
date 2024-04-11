const Post = require('../models/post.model');

async function createPost(req, res) {
    try {
        const {title, content } = req.body;
        if( !title || !content ) {
            return res.status(400).json({message: 'Missing required fields'})
        }

        const newPost = new Post({
            "title": title,
            "content": content
        });
        console.log('newPost: ', newPost);
        const savedPost = new Post(newPost)

        await savedPost.save()
        res.status(201).send(savedPost)
    } catch (error) {
        console.log('Error creating Post ', error);
        res.status(400).json({message: 'Error in createPost'})
    }
};

async function getPosts(req, res) {
    try {
        const posts = await Post.find()
        res.status(200).send(posts)
        console.log('Posts: ', posts);
    } catch (error) {
        console.log('Error fetching Posts ', error);
        res.status(400).json({message: 'Error fetching Posts'})
    }
};

module.exports = {
    createPost,
    getPosts
}