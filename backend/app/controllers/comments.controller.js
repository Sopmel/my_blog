//const Post = require('../models/post.model');

async function createComment(req, res) {
    try {
        const { content } = req.body;
        const { postId } = req.params;
        const userId = req.locals.user.id; 

        if (!content) {
            return res.status(400).json({ message: 'Content is required for the comment' });
        }
        const comment = new Comment({
            content,
            author: userId,
            post: postId
        });

        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = {
    createComment
};
