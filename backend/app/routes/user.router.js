const Router = require('express');
const { createUser, getUsers, loginUser, authenticateUser } = require('../controllers/user.constroller')

const userRouter = Router();

userRouter.post('/register', createUser);
userRouter.get('/', getUsers);
userRouter.post('/login', loginUser);
userRouter.get('/profile', authenticateUser)

module.exports = userRouter;