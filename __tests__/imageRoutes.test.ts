import request from "supertest";
import express from "express";
import imageRoutes from "../src/routes/imageRoutes";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
app.use(imageRoutes);
const testImagePath = path.join(__dirname, "../upload.png");
const testImage = fs.readFileSync(testImagePath);
describe("Image Routes", () => {
  // Test for PUT /crop/:imageName
  it("PUT /crop/:imageName should return status 200 and crop the image", async () => {
    const imageName = "1710506038668-upload.png";
    const requestBody = { x: "10", y: "10", width: "220", height: "120" };

    const res = await request(app).put(`/crop/${imageName}`).send(requestBody);
    expect(res.status).toBe(200);
  });
  it("PUT /crop/:imageName should return status 400", async () => {
    const invalidCases = [
      // Missing x coordinate
      {
        imageName: "1710505278073-upload.png",
        requestBody: { y: "10", width: "520", height: "420" },
      },
      // Missing y coordinate
      {
        imageName: "1710505278073-upload.png",
        requestBody: { x: "10", width: "520", height: "420" },
      },
      // Invalid width
      {
        imageName: "1710505278073-upload.png",
        requestBody: { x: "10", y: "10", width: "invalid", height: "420" },
      },
      // Invalid height
      {
        imageName: "1710505278073-upload.png",
        requestBody: { x: "10", y: "10", width: "520", height: "invalid" },
      },
    ];

    for (const { imageName, requestBody } of invalidCases) {
      const res = await request(app)
        .put(`/crop/${imageName}`)
        .send(requestBody);
      expect(res.status).toBe(400);
    }
  });
  // Test for PUT /resize/:imageName
  it("PUT /resize/:imageName should return status 200 and resize the image", async () => {
    const imageName = "1710505094418-upload.png";
    const requestBody = { width: "280", height: "280" };

    const res = await request(app)
      .put(`/resize/${imageName}`)
      .send(requestBody);
    expect(res.status).toBe(200);
  });

  it("PUT /resize/:imageName should return status 400", async () => {
    const invalidCases = [
      // Invalid width
      {
        imageName: "1710505278073-upload.png",
        requestBody: {width: "invalid", height: "420" },
      },
      // Invalid height
      {
        imageName: "1710505278073-upload.png",
        requestBody: {width: "520", height: "invalid" },
      },
    ];

    for (const { imageName, requestBody } of invalidCases) {
      const res = await request(app)
        .put(`/resize/${imageName}`)
        .send(requestBody);
      expect(res.status).toBe(400);
    }
  });

  // Test for POST /watermark/:imageName
  it("POST /watermark/:imageName should return status 200 and watermark the image", async () => {
    const imageName = "1710501770917-upload.png"; // Provide a valid image name for testing
    const res = await request(app)
      .post(`/watermark/${imageName}`)
      .set("Content-Type", "multipart/form-data")
      .attach("image", testImage, "upload.png");
    expect(res.status).toBe(302);
  });

  // Test for GET /download/:imageName
  it("GET /download/:imageName should return status 200 and download the image", async () => {
    const imageName = "1710502095149-upload.png"; // Provide a valid image name for testing
    const res = await request(app).get(`/download/${imageName}`);
    expect(res.status).toBe(200);
  });

  // Test for PUT /grey/:imageName
  it("PUT /grey/:imageName should return status 200 and apply grayscale to the image", async () => {
    const imageName = "1710502095149-upload.png"; // Provide a valid image name for testing
    const res = await request(app).put(`/grey/${imageName}`);
    expect(res.status).toBe(200);
  });

  // Test for POST /upload
  it("POST /upload should return status 200 and handle file upload", async () => {
    // Provide image upload data

    // Send POST request with FormData
    const res = await request(app)
      .post("/upload")
      .set("Content-Type", "multipart/form-data")
      .attach("image", testImage, "upload.png");

    // Assert response status
    expect(res.status).toBe(302);
  });
});
