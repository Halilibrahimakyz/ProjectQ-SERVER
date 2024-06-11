import request from 'supertest';
import express from 'express';
import testRouter from '../routes/api/test';

const app = express();
app.use('/api/test', testRouter);

describe('Test API routes', () => {
  it('should respond with a success message on GET /', async () => {
    const response = await request(app).get('/api/test/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Test successful');
  });
});
