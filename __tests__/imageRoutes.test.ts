import request from 'supertest';
import express from 'express';
import imageRoutes from '../src/routes/imageRoutes';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());
app.use( imageRoutes);
const testImagePath = path.join(__dirname, '../upload.png');
const testImage = fs.readFileSync(testImagePath);
describe('Image Routes', () => {
  // // Test for GET /
  // it('GET / should return status 200 and render the image list page', async () => {
  //   const res = await request(app).get('/');
  //   expect(res.status).toBe(200);
  // });

  // // Test for GET /upload
  // it('GET /upload should return status 200 and render the upload form page', async () => {
  //   const res = await request(app).get('/upload');
  //   expect(res.status).toBe(200);
  // });

  // // Test for GET /crop/:imageName
  // it('GET /crop/:imageName should return status 200 and render the crop form page', async () => {
  //   const imageName = 'example.jpg'; // Provide a valid image name for testing
  //   const res = await request(app).get(`/crop/${imageName}`);
  //   expect(res.status).toBe(200);
  // });

  // // Test for PUT /crop/:imageName
  // it('PUT /crop/:imageName should return status 200 and crop the image', async () => {
  //   const imageName = 'example.jpg'; // Provide a valid image name for testing
  //   const res = await request(app).put(`/crop/${imageName}`).send({ width: 100, height: 100, x: 0, y: 0 });
  //   expect(res.status).toBe(200);
  // });

  // // Test for GET /resize/:imageName
  // it('GET /resize/:imageName should return status 200 and render the resize form page', async () => {
  //   const imageName = 'example.jpg'; // Provide a valid image name for testing
  //   const res = await request(app).get(`/resize/${imageName}`);
  //   expect(res.status).toBe(200);
  // });

  // // Test for PUT /resize/:imageName
  // it('PUT /resize/:imageName should return status 200 and resize the image', async () => {
  //   const imageName = 'example.jpg'; // Provide a valid image name for testing
  //   const res = await request(app).put(`/resize/${imageName}`).send({ width: 100, height: 100 });
  //   expect(res.status).toBe(200);
  // });

  // // Test for GET /watermark/:imageName
  // it('GET /watermark/:imageName should return status 200 and render the watermark form page', async () => {
  //   const imageName = 'example.jpg'; // Provide a valid image name for testing
  //   const res = await request(app).get(`/watermark/${imageName}`);
  //   expect(res.status).toBe(200);
  // });

  // // Test for POST /watermark/:imageName
  // it('POST /watermark/:imageName should return status 200 and watermark the image', async () => {
  //   const imageName = 'example.jpg'; // Provide a valid image name for testing
  //   const res = await request(app).post(`/watermark/${imageName}`).send({ /* provide image data */ });
  //   expect(res.status).toBe(200);
  // });

  // // Test for GET /download/:imageName
  // it('GET /download/:imageName should return status 200 and download the image', async () => {
  //   const imageName = 'example.jpg'; // Provide a valid image name for testing
  //   const res = await request(app).get(`/download/${imageName}`);
  //   expect(res.status).toBe(200);
  // });

  // // Test for PUT /grey/:imageName
  // it('PUT /grey/:imageName should return status 200 and apply grayscale to the image', async () => {
  //   const imageName = 'example.jpg'; // Provide a valid image name for testing
  //   const res = await request(app).put(`/grey/${imageName}`);
  //   expect(res.status).toBe(200);
  // });

  // Test for POST /upload
  it('POST /upload should return status 200 and handle file upload', async () => {
    // Provide image upload data


    // Send POST request with FormData
    const res = await request(app)
      .post('/upload')
      .set('Content-Type', 'multipart/form-data')
      .attach('image', testImage, 'upload.jpg');

    // Assert response status
    expect(res.status).toBe(200);
  });
});
