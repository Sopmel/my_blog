const express = require('express');
// const cors = require('cors');
// const { urlencoded } = require('express');
const postsRouter = require('./routes/post.router');

const app = express();

// app.use(
//     cors({
//         origin: ['https://hakims-webshop-frontend.onrender.com', 'http://localhost:5173'],
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         credentials: true
//     })
// )

// app.use(urlencoded({ extended: true }))
app.use(express.json());

app.use('/posts', postsRouter)

app.get('/', (req, res) => res.send('Hello World from /'));

module.exports = app; 