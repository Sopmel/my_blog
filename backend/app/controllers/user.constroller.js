const User = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken'); 
const Post = require('../models/post.model');
const fs = require('fs');

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
        console.log('Attempting to find user:', username);
        const userDoc = await User.findOne({ username });

        if (!userDoc) {
            console.log('User not found:', username);
            return res.status(401).json({ message: 'Wrong credentials' });
        }

        console.log('User found:', username);

        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (!passOk) {
            console.log('Incorrect password for user:', username);
            return res.status(401).json({ message: 'Wrong credentials' });
        }

        console.log('Password correct for user:', username);

        // Om användaren är en administratör
        let isAdmin = false;
        if (userDoc.isAdmin) {
            isAdmin = true;
        }

        console.log('Generating JWT token for user:', username);

        // Generera JWT-token
        jwt.sign({ username, id: userDoc._id, isAdmin: userDoc.isAdmin }, secret, {}, (err, token) => {
            if (err) {
                console.error('Error generating token:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            console.log('JWT token generated successfully for user:', username);
            res.cookie('token', token, {secure:true, sameSite:'none'}).json({
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
        console.log('Starting logout process');

        if (req.cookies && req.cookies.token) {
            console.log('Attempting to clear token cookie');
            res.clearCookie('token');
            console.log('Token cookie cleared successfully');
        } else {
            console.log('Token cookie does not exist, no need to clear');
        }

        console.log('Sending logout success response to client');
        res.status(200).json({ message: 'Logout successful' });
        console.log('Logout success response sent');
    } catch (error) {
        console.log('Error during logout:', error);
        // Only send this if a response hasn't been sent yet
        if (!res.headersSent) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    console.log('Logout process completed');
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
        const posts = await Post.find({ author: userId })
        .sort({ createdAt: -1 })
        .limit(20);

        // Konvertera bilderna till data-URI
        const postsWithImageDataURI = posts.map(post => {
            const imageData = fs.readFileSync(post.cover);
            const imageBase64 = Buffer.from(imageData).toString('base64');
            const dataURI = `data:image/jpeg;base64,${imageBase64}`;
            return { ...post.toObject(), cover: dataURI };
        });
        
        res.json(postsWithImageDataURI); 
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteUser(req, res){
    const userId = req.params.id;

    try{
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deleteUser) {
            return res.status(404).json({error: 'User not found'});
        }

        res.json({ message: 'User deleted Successfully'});
    } catch (error) {
        console.error('Error deleting User:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const upgradeUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isAdmin = true;
        await user.save();

        res.json({ message: 'User upgraded to admin' });
    } catch (error) {
        console.error('Error upgrading user:', error);
        res.status(500).json({ message: 'Error upgrading user' });
    }
};

const downgradeUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isAdmin = false;
        await user.save();

        res.json({ message: 'User downgraded from admin' });
    } catch (error) {
        console.error('Error downgrading user:', error);
        res.status(500).json({ message: 'Error downgrading user' });
    }
};


module.exports = {
    createUser,
    getUsers,
    loginUser,
    logoutUser,
    getUserProfile,
    getUserPosts,
    deleteUser,
    upgradeUser,
    downgradeUser
}