import dotenv from 'dotenv';
dotenv.config();

import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import User from '../models/User.js';

describe('Auth Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('should return 400 when required registration fields are missing', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Incomplete User'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  test('should fail to register with an existing email', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'password123'
      });

    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Another User',
        email: 'existing@example.com',
        password: 'differentpassword'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('already exists');
  });

  test('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('email', 'testuser@example.com');
    expect(res.body.data).not.toHaveProperty('password');
  });

  test('should log in with correct credentials', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        name: 'Login Test User',
        email: 'login@example.com',
        password: 'password123'
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@example.com',
        password: 'password123'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('user');
  });

  test('should fail to log in with wrong password', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        name: 'Password Test User',
        email: 'wrongpass@example.com',
        password: 'correctpassword'
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'wrongpass@example.com',
        password: 'wrongpassword'
      });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message');
  });
});
