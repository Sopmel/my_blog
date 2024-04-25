const Router = require('express');
const { createPost, getPosts, showPost } = require('../controllers/post.controller');
const { checkUser } = require('../middlewares/auth.middleware')

const postsRouter = Router();

postsRouter.post('/', checkUser, createPost);
postsRouter.get('/', checkUser, getPosts);
postsRouter.get('/post/:id', showPost)

module.exports = postsRouter;