const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const errorHandler = require('./middlewares/errorHandler');

const rateLimiter = require('./middlewares/rateLimiter');

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Notes API',
            version: '1.0.0',
            description: 'A secure and scalable RESTful API for managing notes'
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}/api`
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Update CORS configuration
app.use(cors({
    origin: [
        'http://localhost:3000',  'https://notes-api-test-t902.onrender.com'
    ]
}));

app.use('/api', rateLimiter); // Apply rate limiter to all routes starting with /api 

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.use(errorHandler);

module.exports = app;
