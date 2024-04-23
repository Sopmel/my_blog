const Router = require('express');
const { createPost, getPosts } = require('../controllers/post.controller');
const { checkUser } = require('../middlewares/auth.middleware')

const postsRouter = Router();

postsRouter.post('/', checkUser, createPost);
postsRouter.get('/', checkUser, getPosts);

module.exports = postsRouter;