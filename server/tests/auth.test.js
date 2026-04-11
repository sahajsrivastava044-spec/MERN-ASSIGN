import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import User from '../models/User.js';

describe('Auth Roputes', () => {
    test('should register a new user successfully',async()=>{
        //test will go here
        const res = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Incomplete User'
      // Missing email and password
    });

  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty('message');
    });

    test('should fail to register with an existing email',async()=>{
        //tests will go here
        await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Existing User',
      email: 'existing@example.com',
      password: 'password123'
    });

  // Try to register again with the same email
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Another User',
      email: 'existing@example.com',
      password: 'differentpassword'
    });

  expect(res.status).toBe(400); // or 409 Conflict
  expect(res.body).toHaveProperty('message');
  expect(res.body.message).toContain('already exists');
    });

    test('should register a new user successfully',async()=>{
        const res = await request(app)
        .post('/api/auth/register')
        .send({
            name:'Test User',
            email:'testuser@example.com',
            password:'password123'
        });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).toHaveProperty('email', 'testuser@example.com');
  })

  test('should log in with correct credentials', async () => {
  // First, register a user
  await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Login Test User',
      email: 'login@example.com',
      password: 'password123'
    });

  // Then log in
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'login@example.com',
      password: 'password123'
    });

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('token');
});

    test('should fail to log in with wrong password', async () => {
  // Register a user
  await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Password Test User',
      email: 'wrongpass@example.com',
      password: 'correctpassword'
    });

  // Try to log in with wrong password
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'wrongpass@example.com',
      password: 'wrongpassword'
    });

  expect(res.status).toBe(401); // Unauthorized
  expect(res.body).toHaveProperty('message');
});
});

describe('Auth Routes', () => {

  // Run before all tests in this file
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI_TEST);
  });

  // Run after each test
  afterEach(async () => {
    // Clear all users after each test
    await User.deleteMany({});
  });

  // Run after all tests in this file
  afterAll(async () => {
    // Close database connection
    await mongoose.connection.close();
  });

  test('should register a new user successfully', async () => {
    // ... test code
  });

});