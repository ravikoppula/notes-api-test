const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Note = require('../models/noteModel');

describe('Note API', () => {
    let token;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);

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

        token = res.body.token;
    });

    afterAll(async () => {
        await mongoose.connection.close();
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
});
