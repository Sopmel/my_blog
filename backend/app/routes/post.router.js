const Router = require('express');
const { createPost, getPosts } = require('../controllers/post.controller');

const postsRouter = Router();

postsRouter.post('/', createPost);
postsRouter.get('/', getPosts);

module.exports = postsRouter;