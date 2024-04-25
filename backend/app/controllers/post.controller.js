const Post = require('../models/post.model');
const jwt = require('jsonwebtoken')
const fs = require('fs');
const sanitizeHtml = require('sanitize-html')

async function createPost(req, res) {
    try {
        const {title, summary, content } = req.body;
        const file = req.file;
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path+'.'+ext;
        fs.renameSync(path, newPath);

        if( !title ||!summary || !content || !file ) {
            return res.status(400).json({message: 'Missing required fields'})
        }

        const authorId = res.locals.user.id;

        const cleanContent = sanitizeHtml(content, {
            allowedTags: [], 
            allowedAttributes: {} 
        });

        const newPost = new Post({
            "title": title,
            "summary": summary,
            "content": cleanContent,
            "cover": newPath,
            "author": authorId
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
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20);

        // Konvertera bilderna till data-URI
        const postsWithImageDataURI = posts.map(post => {
            const imageData = fs.readFileSync(post.cover);
            const imageBase64 = Buffer.from(imageData).toString('base64');
            const dataURI = `data:image/jpeg;base64,${imageBase64}`;
            return { ...post.toObject(), cover: dataURI };
        });

        res.status(200).json(postsWithImageDataURI);
    } catch (error) {
        console.log('Error fetching Posts ', error);
        res.status(500).json({ message: 'Error fetching Posts' });
    }
};

async function showPost(req, res) {
    const { id } = req.params;

    try {
        const postDoc = await Post.findById(id).populate('author');
        
        if (!postDoc) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const imageData = fs.readFileSync(postDoc.cover);
        const imageBase64 = Buffer.from(imageData).toString('base64');
        const dataURI = `data:image/jpeg;base64,${imageBase64}`;

        const postWithImageDataURI = { ...postDoc.toObject(), cover: dataURI };

        res.status(200).json(postWithImageDataURI);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    createPost,
    getPosts,
    showPost
}