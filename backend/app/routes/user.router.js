const Router = require('express');
const { createUser, getUsers, loginUser } = require('../controllers/user.constroller')
const { authenticateUser, checkUser} = require('../middlewares/auth.middleware')

const userRouter = Router();

userRouter.post('/register', createUser);
userRouter.get('/', getUsers, checkUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', authenticateUser, checkUser)

module.exports = userRouter;