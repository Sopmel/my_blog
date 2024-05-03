const { Router } = require('express');
const { createPost, getPosts, showPost, EditPost, deletePost } = require('../controllers/post.controller');
const { checkUser, authenticateUser } = require('../middlewares/auth.middleware')

const postsRouter = Router();

postsRouter.post('/', checkUser, createPost);
postsRouter.get('/', getPosts);
postsRouter.get('/:id', showPost);
postsRouter.put('/:id', checkUser, EditPost)
postsRouter.delete('/:id', checkUser, deletePost)

module.exports = postsRouter;