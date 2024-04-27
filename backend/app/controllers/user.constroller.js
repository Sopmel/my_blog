const User = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken'); 
const Post = require('../models/post.model');

const secret = 'jlsjsljäöspkd3ejjlkwe';


async function createUser(req, res) {
    try {
        const {username, password, isAdmin } = req.body;
        if( !username || !password ) {
            return res.status(400).json({message: 'Missing required fields'})
        }

       const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            "username": username,
            "password": hashedPassword,
            "isAdmin": isAdmin || false,
        });
        console.log('newUser: ', newUser);
        const savedUser = new User(newUser)

        await savedUser.save()
        res.status(201).send(savedUser)
    } catch (error) {
        console.log('Error creating User ', error);
        res.status(400).json({message: 'Error in createUser'})
    }
};

async function getUsers(req, res) {
    try {
        const users = await User.find()
        res.status(200).send(users)
        console.log('Users: ', users);
    } catch (error) {
        console.log('Error fetching Users ', error);
        res.status(400).json({message: 'Error fetching Users'})
    }
};

async function loginUser(req, res) {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({ username });

        if (!userDoc) {
            return res.status(401).json({ message: 'Wrong credentials' });
        }

        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (!passOk) {
            return res.status(401).json({ message: 'Wrong credentials' });
        }

        // Om användaren är en administratör
        let isAdmin = false;
        if (userDoc.isAdmin) {
            isAdmin = true;
        }

        // Generera JWT-token
        jwt.sign({ username, id: userDoc._id, isAdmin: userDoc.isAdmin }, secret, {}, (err, token) => {
            if (err) {
                console.error('Error generating token:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
                isAdmin: isAdmin // Skicka med isAdmin
            });
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function logoutUser(req, res) {
    try {
        // Rensa token från klientens cookie
        res.clearCookie('token');
        // Skicka ett bekräftelsemeddelande till klienten
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getUserProfile(req, res) {
    try {
        const user = await User.findById(req.params.id); 
        res.json(user); 
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getUserPosts(req, res) {
    const userId = req.params.id;
    try {
        const posts = await Post.find({ author: userId }); 
        res.json(posts); 
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    createUser,
    getUsers,
    loginUser,
    logoutUser,
    getUserProfile,
    getUserPosts
}