const mongoose = require('mongoose');

const connect = async (DATABASE_PATH) => {
    try {
        await mongoose.connect(DATABASE_PATH)
        console.log('Mongoose has connected to, ', DATABASE_PATH);
    } catch (error) {
        console.log('Error: Mongoose did not connect', error);
    }
};

module.exports = {connect}