jest.setTimeout(30000);

require('dotenv').config(); // Load environment variables from .env file
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/userModel');
const Note = require('../models/noteModel');
const { getToken } = require('./auth.test'); // Import the function to get the token

const tokenFilePath = path.join(__dirname, 'token.txt');
const username = process.env.TEST_USERNAME; // Read username from .env file
const email = process.env.TEST_EMAIL; // Read email from .env file
const password = process.env.TEST_PASSWORD; // Read password from .env file

describe('Note API', () => {
    let token;
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);

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

        token = res.body.token; // Get the token from the response
        fs.writeFileSync(tokenFilePath, JSON.stringify({ username, token })); // Write username and token to file in JSON format
    });

    beforeEach(() => {
        token = getToken(username); // Read token from file using the function based on the username
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
        // Remove the username and token from the file
        if (fs.existsSync(tokenFilePath)) {
            fs.unlinkSync(tokenFilePath); // Clean up token file
        }
    });

    afterEach(async () => {
        await Note.deleteMany();
    });

    it('should create a new note', async () => {
        const res = await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Note',
                content: 'This is a test note'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('should get all notes for the authenticated user', async () => {
        await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Note',
                content: 'This is a test note'
            });

        const res = await request(app)
            .get('/api/notes')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should update a note by ID', async () => {
        const note = await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Note',
                content: 'This is a test note'
            });

        const res = await request(app)
            .put(`/api/notes/${note.body._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Updated Note',
                content: 'This is an updated test note'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual('Updated Note');
    });

    it('should delete a note by ID', async () => {
        const note = await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Note',
                content: 'This is a test note'
            });

        const res = await request(app)
            .delete(`/api/notes/${note.body._id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(204);
    });

    it('should share a note with another user', async () => {
        const note = await request(app)
            .post('/api/notes')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Note',
                content: 'This is a test note'
            });

        const res = await request(app)
            .post(`/api/notes/${note.body._id}/share`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                sharedWith: 'shareduser@example.com'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Note shared successfully');
    });

});



