const jwt = require('jsonwebtoken')
const User = require('../models/user.model');


const secret = 'jlsjsljäöspkd3ejjlkwe'

async function authenticateUser(req, res) {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            // Om det uppstår ett fel, skicka en felrespons till klienten
            return res.status(500).json({ error: 'Authentication failed' });
        } else {
            // Om verifieringen lyckas, skicka användarinformationen till klienten
            info.token = token;
            //console.log(info);
            return res.json(info);
        }
    });
}

const checkUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, secret, {}, async (err, decodedToken) => {
            if (err) {
                console.error('Error verifying token:', err);
                res.locals.user = null;
                next();
            } else {
                console.log('Decoded token:', decodedToken);
                try {
                    const user = await User.findById(decodedToken.id);
                    res.locals.user = user;
                    next();
                } catch (error) {
                    console.error('Error fetching user:', error);
                    res.locals.user = null;
                    next();
                }
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = {
    authenticateUser,
    checkUser
};