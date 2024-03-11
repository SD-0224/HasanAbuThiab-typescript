import multer from 'multer';
import {Response, NextFunction } from 'express';

const handleFileUploadError = (err: multer.MulterError, res:Response) => {
  switch (err.code) {
    case 'LIMIT_FILE_SIZE':
      res.status(400).render('uploadForm', { error: 'File size is too large. Maximum size allowed is 5MB.' });

      break;
    case 'LIMIT_UNEXPECTED_FILE':
        res.status(400).render('uploadForm', { error: 'Unexpected field. Please check your form data.' });
        break;
    default:
        res.status(500).render('uploadForm', { error: 'Something went wrong..' });
    }
};

const errorHandler = (err: any, res: Response, next: NextFunction) => {
  console.error(err.stack);

  if (err instanceof multer.MulterError) {
    // Handle Multer errors
    handleFileUploadError(err, res);
  } else {
    // Generic error handling
    res.status(500).render('uploadForm', { error: 'Something went wrong.' });
}
  next();
};

export = errorHandler;
