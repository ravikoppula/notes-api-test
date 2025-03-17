const mongoose = require('mongoose');
const logger = require('./logger');
const Note = require('../models/noteModel');

const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'UserNotes'
        });
        
        logger.info('MongoDB connected successfully');
 
        await Note.syncIndexes();

        logger.info('Text index created for Note model');

    } catch (error) {

        logger.error('MongoDB connection failed', error);
        process.exit(1);

    }
};

module.exports = connectDB;
