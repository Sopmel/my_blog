const express = require('express');
const cors = require('cors');
const { urlencoded } = require('express');
const postsRouter = require('./routes/post.router');
const userRouter = require('./routes/user.router');

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

app.use('/posts', postsRouter)

app.post('/register', userRouter);

app.get('/register', (req, res) => res.send('Hello World from /'));



module.exports = app; 