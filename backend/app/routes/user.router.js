const { Router } = require('express');
const { createUser, getUsers, loginUser, logoutUser, getUserProfile, getUserPosts } = require('../controllers/user.constroller')
const { authenticateUser, checkUser} = require('../middlewares/auth.middleware')

const userRouter = Router();

userRouter.post('/register', createUser);
userRouter.get('/', getUsers, checkUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', authenticateUser, checkUser);
userRouter.post('/logout', logoutUser);
userRouter.get('/profilepage/:id', getUserProfile);
userRouter.get('/posts/user/:id', getUserPosts);
userRouter.get('/user', getUsers)

module.exports = userRouter;