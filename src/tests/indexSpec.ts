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

describe('Test processing on the endpoint which require setup', () => {
  const testImageName = 'fjord';
  const testImageWidth = '645';
  const testImageHeight = '232';
  afterAll(() => {
    fs.unlink(
      `./images/thumb/${testImageName}-${testImageWidth}-${testImageHeight}.jpg`,
      () => {
        console.log('cleaning up test image');
      }
    );
  });

  it('returns a status of 200 and logs that a new image is displayed from api/images endpoint when a cached version does not already exist', async () => {
    const consoleSpy = spyOn(console, 'log');
    const response = await request.get('/api/images').query({
      filename: testImageName,
      width: testImageWidth,
      height: testImageHeight
    });
    expect(consoleSpy).toHaveBeenCalledWith(
      'returning newly generated thumbnail'
    );
    expect(response.status).toBe(200);
  });

  it('returns a status of 200 and alerts user that the cached image is displayed from api/images endpoint when one exists', async () => {
    const consoleSpy = spyOn(console, 'log');
    const response = await request.get('/api/images').query({
      filename: testImageName,
      width: testImageWidth,
      height: testImageHeight
    });
    expect(consoleSpy).toHaveBeenCalledWith('returning cached image');
    expect(response.status).toBe(200);
  });

  // helper function here since it requires the same test set up as the api endpoint tests

  it('returns the cached file path if the file exists', async () => {
    await expectAsync(
      helpers.existingCachedFile(
        testImageName,
        Number(testImageWidth),
        Number(testImageHeight)
      )
    ).toBeResolvedTo(
      path.resolve(`./images/thumb/${testImageName}-${testImageWidth}-${testImageHeight}.jpg`)
    );
  });
});
