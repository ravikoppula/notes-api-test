const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./utils/db');
const logger = require('./utils/logger');

dotenv.config({ path: './.env' });

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
