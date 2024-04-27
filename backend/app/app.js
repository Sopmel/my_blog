const express = require('express');
const cors = require('cors');
const { urlencoded } = require('express');
const postsRouter = require('./routes/post.router');
const userRouter = require('./routes/user.router');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/'})

const app = express();

app.use(
    cors({
        origin: ['https://my-blog-frontend-nepw.onrender.com', 'http://localhost:5173'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    })
)

app.use(urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());

app.use('/post', uploadMiddleware.single('file'), postsRouter)
 


app.use(userRouter);
app.use(postsRouter);

// app.get('/post/:id', postsRouter)
// app.put('/post/:id', postsRouter);
// app.delete('/post/:id', postsRouter)
// app.post('/logout', postsRouter)

module.exports = app; 