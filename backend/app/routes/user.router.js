const Router = require('express');
const { createUser, getUsers } = require('../controllers/user.constroller')

const userRouter = Router();

userRouter.post('/register', createUser);
userRouter.get('/', getUsers);

module.exports = userRouter;