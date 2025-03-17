const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');

const tokenFilePath = path.join(__dirname, 'token.txt');
let token; // Declare a variable to store the token
const username = 'testuser'; // Declare a global variable for the username

describe('Auth API', () => {
    let mongoServer;

    beforeAll(async () => {
        process.env.JWT_SECRET = 'testsecret'; // Set JWT secret for testing
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    afterEach(async () => {
        await User.deleteMany();
    });

    it('should sign up a new user', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                username,
                email: 'testuser@gmail.com',
                password: '123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('username', username);
        expect(res.body).toHaveProperty('email', 'testuser@gmail.com');
    });

    it('should log in an existing user', async () => {
        await request(app)
            .post('/api/auth/signup')
            .send({
                username,
                email: 'testuser@gmail.com',
                password: '123'
            });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username,
                password: '123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.token).toBeTruthy();
        token = res.body.token; // Store the token
        //console.log('Writing token to file:', tokenFilePath);
        fs.writeFileSync(tokenFilePath, JSON.stringify({ username, token })); // Write username and token to file in JSON format
        //console.log('Token written to file:', tokenFilePath);
        //console.log('Token:', res.body.token); // Log the token to the console
    });
});

module.exports = { getToken: (username) => {
    const data = JSON.parse(fs.readFileSync(tokenFilePath, 'utf8'));
    return data.username === username ? data.token : null;
}}; // Export a function that reads the token from the file based on the username
