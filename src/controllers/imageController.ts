// controllers/imageController.ts
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import { promisify } from 'util';
import { isValidImageType, validateInputs } from '../utils/imageValidator';
import errorHandler from '../utils/errorHandler';
import fs from 'fs';  
import sharp from 'sharp';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const writeFileAsync = promisify(require('fs').writeFile);

const uploadImage = upload.single('image');

const handleFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).render('uploadForm', { error: 'No file uploaded.' });
    }

    // Validate file type 
    if (!isValidImageType(req.file.mimetype)) {
      return res.status(400).render('uploadForm', { error: 'Invalid file type. Please upload an image (JPEG, PNG, GIF).' });
    }
    const originalFileName = path.parse(req.file.originalname).name;
    const uniqueFilename = `${Date.now()}-${originalFileName}${path.extname(req.file.originalname)}`;
    const imagePath = path.join(__dirname, '..', '../public', 'data', uniqueFilename);

    await writeFileAsync(imagePath, req.file.buffer);

    res.status(200).send('File uploaded successfully');
  } catch (error) {
    console.error(error);
    next(errorHandler);
  }
};

const getImageList = async (req: Request, res: Response, next:NextFunction) => {
  const dataDir = path.join(__dirname, '..', '../public', 'data');
  try {
    const files = await fs.promises.readdir(dataDir);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    res.render('index', { images: imageFiles });
  } catch (error) {
    console.error('Error reading images:', error);
    next(errorHandler)
  }
};

const renderResizeForm = (req: Request, res: Response) => {
  const { imageName } = req.params;
  res.render('resizeForm', { imageName });
};

const resizeImage = async (req: Request, res: Response, next: NextFunction) => {
  
  const { imageName } = req.params;
  const { width, height } = req.body;
  const validationError = validateInputs(imageName, width, height);
  if (validationError) {
  console.log(validationError);
  return res.status(400).render('resizeForm', { error: validationError });
}
  const imagePath = path.join(__dirname,'..', '../public', 'data', imageName);
  try
  {
    const originalImageBuffer = fs.readFileSync(imagePath);
    const resizedImageBuffer = await sharp(originalImageBuffer)
    .resize({ width: parseInt(width as string), height: parseInt(height as string) })
    .toBuffer();
    await writeFileAsync(imagePath, resizedImageBuffer);
    res.status(200).send('Image resized successfully');
  }
  catch (err)
  {
    console.error('Error cropping image');
    next(errorHandler);
  }
}
export { uploadImage, handleFile, getImageList,resizeImage,renderResizeForm };
