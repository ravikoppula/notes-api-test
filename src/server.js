const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./utils/db');
const logger = require('./utils/logger');

dotenv.config({ path: './.env' });

connectDB();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {

    logger.info(`Server running on port ${PORT}`);

});

server.on('error', (error) => {

    if (error.code === 'EADDRINUSE') {

        logger.error(`Port ${PORT} is already in use. Please free up the port and try again.`);
        process.exit(1);

    } else {

        throw error;
    }
});
