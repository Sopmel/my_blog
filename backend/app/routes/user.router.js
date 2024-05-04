const { Router } = require('express');
const { createUser, getUsers, loginUser, logoutUser, getUserProfile, getUserPosts } = require('../controllers/user.constroller')
const { authenticateUser, checkUser} = require('../middlewares/auth.middleware')

const userRouter = Router();

userRouter.post('/logout', logoutUser);

userRouter.post('/register', createUser);
userRouter.get('/', getUsers);
userRouter.post('/login', loginUser);
userRouter.get('/userlist', getUsers)
userRouter.get('/profilepage/:id', checkUser, getUserProfile)
userRouter.get('/posts/:id', getUserPosts)




module.exports ={
    userRouter
}