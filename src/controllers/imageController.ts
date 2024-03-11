// controllers/imageController.ts
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import { promisify } from 'util';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const writeFileAsync = promisify(require('fs').writeFile);

const uploadImage = upload.single('image');

const handleFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      // Render the upload form with an error message
      return res.status(400).render('uploadForm', { error: 'No file uploaded.' });
    }

    // Your asynchronous file handling logic here
    const originalFileName = path.parse(req.file.originalname).name;
    const uniqueFilename = `${Date.now()}-${originalFileName}${path.extname(req.file.originalname)}`;
    const imagePath = path.join(__dirname, '..', '../public', 'data', uniqueFilename);

    // Using async/await to make the file write operation asynchronous
    await writeFileAsync(imagePath, req.file.buffer);

    res.status(200).send('File uploaded successfully');
  } catch (error) {
    // Render the upload form with an error message
    console.error(error);
    return res.status(500).render('uploadForm', { error: 'Something went wrong.' });
  }
};

export { uploadImage, handleFile };
