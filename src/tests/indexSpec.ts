import supertest from 'supertest';
import app from '../index';
import fs from 'fs';
import path from 'path';
import * as helpers from '../routes/api/helpers';

const request = supertest(app);

// note: there's a warning that using done() is depracated so
// I've omitted it here vs what was explained in the course.

describe('Test basic endpoint responses', () => {
  it('gets the main endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });

  it('returns a status of 400 the api/images endpoint without the proper query params', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
  });

  it('returns a status of 400 when the filename is not valid', async () => {
    const consoleSpy = spyOn(console, 'log');
    const response = await request
      .get('/api/images')
      .query({ filename: 'fjorda', width: '300', height: '200' });
    expect(response.status).toBe(400);
  });
});
