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

const errorHandler = (err: any,req:Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  if (req.url === '/api/upload') {
    if (err instanceof multer.MulterError) {
      // Handle Multer errors for upload endpoint
      handleFileUploadError(err, res);
    } else {
      // Generic error handling for upload endpoint
      res.status(500).render('uploadForm', { error: 'Error uploading file. Please try again.' });
    }
  } else {
    // Generic error handling for other endpoints
    res.status(500).render('error', { error: 'Internal Server Error' });
  }

  next();
};

export = errorHandler;
