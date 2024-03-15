import validator from "validator";
import fs from "fs";
import path from "path";

const isValidImageType = (mimeType: string): boolean => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/tiff",
  ];

  return validator.isMimeType(mimeType, allowedTypes);
};

const  validateInputs = async (
  imageName: string,
  width: string,
  height: string
): Promise<string | null> => {
  width = String(width);
  height = String(height);

  // Validate imageName
  if (!imageName) {
    return "Invalid image name.";
  }

  // Validate width and height
  if (
    !width ||
    !height ||
    !validator.isNumeric(String(width)) ||
    !validator.isNumeric(String(height)) ||
    !validator.isInt(String(width), { min: 100, max: 3000 }) ||
    !validator.isInt(String(height), { min: 100, max: 3000 })
  ) {
    return "Invalid width or height. Width and height should be numeric values between 100 and 3000.";
  }
  const imagePath = path.join(__dirname, "..", "../public", "data", imageName);
  try {
    await fs.promises.access(imagePath, fs.constants.F_OK);
  } catch (error) {
    return "Image file does not exist.";
  }
  return null;
};

const validateCropInputs = async (
  imageName: string,
  x: string,
  y: string,
  width: string,
  height: string
): Promise<string | null> => {
  // Validate imageName
  if (!imageName) {
    return "Invalid image name.";
  }

  // Validate x and y coordinates
  if (!x || !y || !width || !height) {
    return "Coordinates (x, y, width, height) are missing.";
  }

  // Validate x and y coordinates
  if (
    !validator.isNumeric(String(x)) ||
    !validator.isNumeric(String(y)) ||
    !validator.isInt(String(x)) ||
    !validator.isInt(String(y)) ||
    parseFloat(x) <= 0 || // Check for positive x coordinate
    parseFloat(y) <= 0    // Check for positive y coordinate
  ) {
    return "Invalid coordinates. Coordinates (x, y) should be positive numeric values.";
  }


  // Validate width and height
  if (
    !validator.isNumeric(String(height)) ||
    !validator.isNumeric(String(width)) ||
    !validator.isInt(String(width)) ||
    !validator.isInt(String(height))
  ) {
    return "Invalid width or height. Width and height should be numeric integer values between 100 and 3000.";
  }
  if (x + width > width) {
    return "Cropping width exceeds image width";
}

// Check if y + height is within image height
if (y + height > height) {
  return "Cropping height exceeds image height";
}
  // Check if the image file exists asynchronously
  const imagePath = path.join(__dirname, "..", "../public", "data", imageName);
  try {
    await fs.promises.access(imagePath, fs.constants.F_OK);
  } catch (error) {
    return "Image file does not exist.";
  }

  return null;
};

export { isValidImageType, validateInputs, validateCropInputs };
