const mongoose = require('mongoose');

const connect = async (databaseUrl) => {
    try {
        await mongoose.connect(databaseUrl)
        console.log('Mongoose has connected to, ', databaseUrl);
    } catch (error) {
        console.log('Error: Mongoose did not connect', error);
    }
};

module.exports = {connect}