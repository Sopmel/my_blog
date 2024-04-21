const Post = require('../models/post.model');

async function createPost(req, res) {
    try {
        const {title, summary, content } = req.body;
        const file = req.file;

        if( !title ||!summary || !content || !file ) {
            return res.status(400).json({message: 'Missing required fields'})
        }

        const newPost = new Post({
            "title": title,
            "summary": summary,
            "content": content,
            "file": file.path
        });
        console.log('newPost: ', newPost);
        const savedPost = new Post(newPost)

        await savedPost.save()
        res.status(201).json(savedPost)
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