// controllers/imageController.ts
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import { promisify } from "util";
import { isValidImageType, validateInputs } from "../utils/imageValidator";
import { resizeImageFnc, cropImageFnc,applyWatermark } from "../utils/imageFunctions";
import errorHandler from "../utils/errorHandler";
import fs from "fs";
import sharp from "sharp";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const writeFileAsync = promisify(require("fs").writeFile);

const uploadImage = upload.single("image");

const handleFile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .render("uploadForm", { error: "No file uploaded." });
    }

    // Validate file type
    if (!isValidImageType(req.file.mimetype)) {
      return res.status(400).render("uploadForm", {
        error: "Invalid file type. Please upload an image (JPEG, PNG, GIF).",
      });
    }
    const originalFileName = path.parse(req.file.originalname).name;
    const uniqueFilename = `${Date.now()}-${originalFileName}${path.extname(
      req.file.originalname
    )}`;
    const imagePath = path.join(
      __dirname,
      "..",
      "../public",
      "data",
      uniqueFilename
    );

    await writeFileAsync(imagePath, req.file.buffer);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    errorHandler(err, req, res);
  }
};

const getImageList = async (req: Request, res: Response): Promise<void> => {
  const dataDir = path.join(__dirname, "..", "../public", "data");
  try {
    const files = await fs.promises.readdir(dataDir);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );
    res.render("index", { images: imageFiles });
  } catch (err) {
    console.error("Error reading images:", err);
    errorHandler(err, req, res);
  }
};

const renderResizeForm = (req: Request, res: Response) => {
  const { imageName } = req.params;
  res.render("resizeForm", { imageName });
};

const resizeImage = async (req: Request, res: Response): Promise<void> => {
  const { imageName } = req.params;
  const { width, height } = req.body;
  const validationError = validateInputs(imageName, width, height);
  if (validationError) {
    console.log(validationError);
    return res.status(400).render("resizeForm", { error: validationError });
  }
  const imagePath = path.join(__dirname, "..", "../public", "data", imageName);
  try {
    resizeImageFnc(imagePath, parseInt(width), parseInt(height));
    res.status(200).send("Image resized successfully");
  } catch (err) {
    console.error("Error cropping image");
    errorHandler(err, req, res);
  }
};

const renderCropForm = (req: Request, res: Response) => {
  const { imageName } = req.params;
  res.render("cropForm", { imageName });
};

const cropImage = async (req: Request, res: Response) => {
  const { imageName } = req.params;
  const { x, y, width, height } = req.body;

  const validationError = validateInputs(imageName, width, height);
  if (validationError) {
    return res.status(400).send(validationError);
  }

  const imagePath = path.join(__dirname, "..", "../public", "data", imageName);

  try {
    cropImageFnc(
      imagePath,
      parseInt(width),
      parseInt(height),
      parseInt(x),
      parseInt(y)
    );
    res.status(200).send("Image cropped successfully!");
  } catch (err) {
    console.error("Error cropping image:", err);
    errorHandler(err, req, res);
  }
};

const renderWaterMarkForm = (req: Request, res: Response) => {
  const { imageName } = req.params;
  res.render("waterMarkForm", { imageName });
};
const waterMarkImage = async (req: Request, res: Response): Promise<void> => {
  const imageName = req.params.imageName; 
  console.log(req.file)

  try {
    if (!req.file) {
      return res
        .status(400).send({ error: "No file uploaded." });
    }

    // Validate file type
    if (!isValidImageType(req.file.mimetype)) {
      return res.status(400).send({ error: "File type not valid." });
    }
      const imagePath = path.join(__dirname, "..", "../public", "data", imageName);
      console.log(imagePath)
      await applyWatermark(imagePath, req.file.buffer);

      res.redirect('/');
  } catch (err) {
      console.error("Error in watermarkController:", err);
      errorHandler(err, req, res);
    }
};
export {
  uploadImage,
  handleFile,
  getImageList,
  resizeImage,
  renderResizeForm,
  renderCropForm,
  cropImage,
  renderWaterMarkForm,
  waterMarkImage,
};
