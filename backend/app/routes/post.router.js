const { Router } = require('express');
const { createPost, getPosts, showPost, EditPost, deletePost, likePost, unlikePost } = require('../controllers/post.controller');
const { checkUser, authenticateUser } = require('../middlewares/auth.middleware')

const postsRouter = Router();

postsRouter.post('/', checkUser, createPost);
postsRouter.get('/', getPosts);
postsRouter.get('/:id', showPost);
postsRouter.put('/:id', checkUser, EditPost)
postsRouter.delete('/:id', checkUser, deletePost)
postsRouter.put('/like/:postId', likePost);
postsRouter.put('/unlike/:postId', unlikePost);

module.exports = postsRouter;