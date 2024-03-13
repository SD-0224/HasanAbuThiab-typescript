import multer from "multer";
import { Response, NextFunction } from "express";

const handleFileUploadError = (err: multer.MulterError, res: Response) => {
  switch (err.code) {
    case "LIMIT_FILE_SIZE":
      res
        .status(400)
        .render("uploadForm", {
          error: "File size is too large. Maximum size allowed is 5MB.",
        });

      break;
    case "LIMIT_UNEXPECTED_FILE":
      res
        .status(400)
        .render("uploadForm", {
          error: "Unexpected field. Please check your form data.",
        });
      break;
    default:
      res.status(500).render("uploadForm", { error: "Something went wrong.." });
  }
};
const handleResizeError = (err: any, res: Response) => {
  let errorMessage: string;

  switch (err.code) {
    case "ENOENT":
      errorMessage = "File not found.";
      res.status(404).json({ error: errorMessage });
      break;
    case "EINVAL":
    case "EPIPE":
      errorMessage = "Invalid request parameters.";
      res.status(400).json({ error: errorMessage });
      break;
    case "EACCES":
      errorMessage = "Permission denied.";
      res.status(403).json({ error: errorMessage });
      break;
    case "ENOSPC":
      errorMessage = "Disk full. Unable to process request.";
      res.status(500).json({ error: errorMessage });
      break;
    default:
      errorMessage = "Internal Server Error";
      res.status(500).json({ error: errorMessage });
      break;
  }
};
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
) => {
  console.error(err.stack);
  if (req.url.startsWith("/resize")) {
    handleResizeError(err, res);
  } else if (req.url.startsWith("/upload")) {
    if (err instanceof multer.MulterError) {
      // Handle Multer errors for upload endpoint
      handleFileUploadError(err, res);
    } else {
      // Generic error handling for upload endpoint
      res
        .status(500)
        .render("uploadForm", {
          error: "Error uploading file. Please try again.",
        });
    }
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export = errorHandler;
