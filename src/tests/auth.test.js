const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/userModel');

describe('Auth API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await User.deleteMany();
    });

    it('should sign up a new user', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                username: 'testuser',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('should log in an existing user', async () => {
        await request(app)
            .post('/api/auth/signup')
            .send({
                username: 'testuser',
                password: 'password123'
            });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
