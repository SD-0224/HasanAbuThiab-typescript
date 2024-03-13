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
    throw err;
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
    throw err;
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
    throw err;
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
    throw err;
  }
};

const renderWaterMarkForm = (req: Request, res: Response) => {
  const { imageName } = req.params;
  res.render("waterMarkForm", { imageName });
};
const waterMarkImage = async (req: Request, res: Response): Promise<void> => {
  const imageName = req.params.imageName; 
  const imagePath = path.join(__dirname, "..", "../public", "data", imageName);

  try {
    await fs.promises.access(imagePath, fs.constants.F_OK);
  } catch (error) {
    return res.status(400).send({error:"Image file does not exist."});
  }

  try {
    if (!req.file) {
      return res
        .status(400).send({ error: "No file uploaded." });
    }

    // Validate file type
    if (!isValidImageType(req.file.mimetype)) {
      return res.status(400).send({ error: "File type not valid." });
    }
    
      await applyWatermark(imagePath, req.file.buffer);

      res.redirect('/');
  } catch (err) {
      console.error("Error in watermarkController:", err);
      throw err;
    }
};
const applyGreyScale = async(req:Request, res:Response) => {
  const {imageName} = req.params;
  if (!imageName || typeof imageName !== 'string') {
    return res.status(400).send({ error: "Invalid image name." });
  }

  const imagePath = path.join(__dirname, "..", "../public", "data", imageName);
  try {
    await fs.promises.access(imagePath, fs.constants.F_OK);
  } catch (error) {
    console.log(error);
    return res.status(400).send({error:"Image file does not exist."});
  }

  try{
    const originalImageBuffer = await fs.promises.readFile(imagePath);

    // Apply greyscale effect
    const greyscaleImageBuffer = await sharp(originalImageBuffer)
        .greyscale()
        .toBuffer();
    // Write the greyscaled image buffer back to the original file
    await fs.promises.writeFile(imagePath, greyscaleImageBuffer);
    res.status(200);
  }
  catch (err) {
    console.error("Error in applyGreyScale:", err);
    throw err;
  }
}
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
  applyGreyScale,
  
};
