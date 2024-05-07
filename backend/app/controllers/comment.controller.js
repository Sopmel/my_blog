const Comment = require('../models/comment.model');

async function createComment(req, res) {
    try {
        console.log("postId",  req.params.postId)
        const { content } = req.body;
        const postId = req.params.postId;
        const authorId = res.locals.user._id; // Get the author ID from the authenticated user
        console.log("backend", content, postId)

        let blurredContent = content.replace(/\b(ugly|diet)\b/gi, "****");

        if( !content ) {
            return res.status(400).json({message: 'Missing required fields'})
        }

        const newComment = new Comment({
            "content": blurredContent,
            "author": authorId,
            "post": postId
        });
        console.log('newComment: ', newComment);
        const savedComment = await newComment.save();

        res.status(201).json(savedComment)
    } catch (error) {
        console.log('Error creating Comment ', error);
        // Only send this if a response hasn't been sent yet
        if (!res.headersSent) {
            res.status(400).json({message: 'Error in createComment'})
        }
    }
}

async function getComments(req, res) {
    try {
        const postId = req.params.postId;
        const comments = await Comment.find({ post: postId }).populate('author');
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function deleteComment(req, res){
    const commentId = req.params.commentId;
    console.log(req.params.commentId)

    try{
        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({error: 'comment not found'});
        }

        res.json({ message: 'Comment deleted Successfully'});
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createComment,
    getComments, 
    deleteComment
}