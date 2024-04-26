const Router = require('express');
const { createPost, getPosts, showPost, EditPost } = require('../controllers/post.controller');
const { checkUser, authenticateUser } = require('../middlewares/auth.middleware')

const postsRouter = Router();

postsRouter.post('/', checkUser, createPost);
postsRouter.get('/', checkUser, getPosts);
postsRouter.get('/post/:id', showPost)
postsRouter.put('/post/:id', checkUser, EditPost)
module.exports = postsRouter;