const Post = require('../models/post.model');
const fs = require('fs');

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

        let blurredTitle = title.replace(/\b(ugly|diet)\b/gi, "****");
        let blurredSummary = summary.replace(/\b(ugly|diet)\b/gi, "****");
        let blurredContent = content.replace(/\b(ugly|diet)\b/gi, "****");

        const authorId = res.locals.user.id;

        const newPost = new Post({
            "title": blurredTitle,
            "summary": blurredSummary,
            "content": blurredContent,
            "cover": newPath,
            "author": authorId,
            "likes": []
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

        const userId = res.locals.user ? res.locals.user._id : null;

        // Konvertera bilderna till data-URI
        const postsWithImageDataURI = await Promise.all(posts.map(async post => {
            const imageData = fs.readFileSync(post.cover);
            const imageBase64 = Buffer.from(imageData).toString('base64');
            const dataURI = `data:image/jpeg;base64,${imageBase64}`;

            const hasLiked = post.likes.includes(userId);
            return { ...post.toObject(), cover: dataURI, hasLiked };
        }));

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

async function EditPost(req, res) {
    let newPath = null;

    const { id, title, summary, content } = req.body;

    let blurredTitle = title.replace(/\b(ugly|diet)\b/gi, "****");
    let blurredSummary = summary.replace(/\b(ugly|diet)\b/gi, "****");
    let blurredContent = content.replace(/\b(ugly|diet)\b/gi, "****");

    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const postDoc = await Post.findById(id);
    console.log('Logged in user ID:', res.locals.user.id);

    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(res.locals.user.id);
    if (!isAuthor) {
        return res.status(400).json('not the Author');
    }
    
    await postDoc.updateOne({
        title: blurredTitle,
        summary: blurredSummary,
        content: blurredContent,
        cover: newPath ? newPath : postDoc.cover,
    });
    console.log('udpost', postDoc)
    res.json(postDoc);
    
}

async function deletePost(req, res){
    const postId = req.params.id;

    try{
        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletePost) {
            return res.status(404).json({error: 'Post not found'});
        }

        res.json({ message: 'Post deleted Successfully'});
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const likePost = async (req, res) => {
    console.log('likePost function called');
    try {
        const postId = req.params.postId;
        console.log('postId:', postId);

        const post = await Post.findById(postId);
        console.log('post:', post);

        if (!post) {
            console.log('Post not found');
            return res.status(404).json({ message: 'Post not found' });
        }
        const userId = res.locals.user.id; // Användarens ID från autentisering

        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
            await post.save();
        }

        res.json({ likeCount: post.likes.length });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Error liking post' });
    }
};

const unlikePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const userId = res.locals.user.id;

        const index = post.likes.indexOf(userId);
        if (index !== -1) {
            post.likes.splice(index, 1);
            await post.save();
        }

        res.json({ likeCount: post.likes.length });
    } catch (error) {
        console.error('Error unliking post:', error);
        res.status(500).json({ message: 'Error unliking post' });
    }
};


module.exports = {
    createPost,
    getPosts,
    showPost,
    EditPost,
    deletePost,
    likePost,
    unlikePost
}