const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');
require('dotenv').config();  

const tokenFilePath = path.join(__dirname, 'token.txt');
let token; 
const username = process.env.TEST_USERNAME; 
const email = process.env.TEST_EMAIL;  
const password = process.env.TEST_PASSWORD;  

describe('Auth API', () => {
    let mongoServer;

    beforeAll(async () => {

        process.env.JWT_SECRET = 'testsecret'; 
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
                email,
                password

            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('username', username);
        expect(res.body).toHaveProperty('email', email);
    });

    it('should log in an existing user', async () => {

        await request(app)

            .post('/api/auth/signup')
            .send({
                username,
                email,
                password
            });

        const res = await request(app)

            .post('/api/auth/login')
            .send({
                username,
                password
            });

        expect(res.statusCode).toEqual(200);

        expect(res.body).toHaveProperty('token');

        expect(res.body.token).toBeTruthy();

        token = res.body.token; 
        
        fs.writeFileSync(tokenFilePath, JSON.stringify({ username, token }));
        
    });

});


module.exports = { getToken: (username) => {


    const data = JSON.parse(fs.readFileSync(tokenFilePath, 'utf8'));
    return data.username === username ? data.token : null;

}}; 

