const { Router } = require('express');
const { createComment, getComments, deleteComment } = require('../controllers/comment.controller');
//const { checkUser, authenticateUser } = require('../middlewares/auth.middleware')

const commentRouter = Router();

commentRouter.post('/posts/:postId',createComment);
commentRouter.get('/posts/:postId', getComments);
commentRouter.delete('/:commentId', deleteComment);

module.exports = commentRouter;