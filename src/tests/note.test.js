//console.log('note.test.js is loading');

jest.setTimeout(30000);

require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/userModel');
const Note = require('../models/noteModel');
const { getToken } = require('./auth.test'); // Import the function to get the token

// console.log(__dirname);
const tokenFilePath = path.join(__dirname, 'token.txt');
const username = 'testuser'; // Define the username

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
                email: 'testuser@example.com',
                password: '123'
            });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username,
                password: '123'
            });

        token = res.body.token; // Get the token from the response
       // console.log('Writing token to file:', tokenFilePath);
        fs.writeFileSync(tokenFilePath, JSON.stringify({ username, token })); // Write username and token to file in JSON format
        //console.log('Token written to file:', tokenFilePath);
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



