const dotenv = require('dotenv');
const http = require('http');
const https = require('https');
const fs = require('fs');
const app = require('./app');
const connectDB = require('./utils/db');
const logger = require('./utils/logger');

dotenv.config({ path: './.env' });

connectDB();

const PORT = process.env.PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;

// Create HTTP server
const httpServer = http.createServer(app);

// Create HTTPS server with self-signed certificate for local development
const httpsServer = https.createServer({
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem')
}, app);

httpServer.listen(PORT, () => {
    logger.info(`HTTP Server running on port ${PORT}`);
});

httpsServer.listen(HTTPS_PORT, () => {
    logger.info(`HTTPS Server running on port ${HTTPS_PORT}`);
});

httpServer.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        logger.error(`Port ${PORT} is already in use. Please free up the port and try again.`);
        process.exit(1);
    } else {
        throw error;
    }
});

httpsServer.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        logger.error(`Port ${HTTPS_PORT} is already in use. Please free up the port and try again.`);
        process.exit(1);
    } else {
        throw error;
    }
});
