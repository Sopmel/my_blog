const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 4,
        

    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    isAdmin: { 
        type: Boolean, 
        default: false }
})

const User = mongoose.model('User', userSchema)
module.exports = User