const User = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken'); // Glöm inte att importera jwt här också

const secret = 'jlsjsljäöspkd3ejjlkwe';


async function createUser(req, res) {
    try {
        const {username, password } = req.body;
        if( !username || !password ) {
            return res.status(400).json({message: 'Missing required fields'})
        }

       const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            "username": username,
            "password": hashedPassword
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
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});

    const passOk = bcrypt.compareSync(password, userDoc.password)
    if(passOk) {
        //logged in
        jwt.sign({username, id:userDoc._id}, secret, {}, (err,token) => {
            if (err) throw err;
            res.cookie('token', token).json({ 
                id:userDoc._id,
                username,
            });
            
        });
    } else {
        res.status(401).json({ message: 'Wrong credentials' })
        console.log('err')
    }
}


module.exports = {
    createUser,
    getUsers,
    loginUser
}