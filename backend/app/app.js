const express = require('express');
const cors = require('cors');
const { urlencoded } = require('express');
const postsRouter = require('./routes/post.router');
const {userRouter, userRouterProtected }= require('./routes/user.router');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/'})
const commentRouter = require('./routes/comment.router'); 


const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use(
    cors({
        origin: ['https://my-blog-frontend-nepw.onrender.com', 'http://localhost:5173', 'https://my-blog-h7wn.onrender.com', 'http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    })
)

app.use(urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());



app.use('/post', uploadMiddleware.single('file'), postsRouter)
//app.use('/user', userRouterProtected);
app.use('/user', userRouter);
app.use('/comments', commentRouter);



 


// app.use(userRouter);
// app.use(postsRouter);
// app.use('/comments', commentRouter);


// app.get('/post/:id', postsRouter)
// app.put('/post/:id', postsRouter);
// app.delete('/post/:id', postsRouter)
//app.post('/logout', postsRouter)

module.exports = app; 