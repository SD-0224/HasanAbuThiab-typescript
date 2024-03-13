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

const validateInputs = (
  imageName: string,
  width: string,
  height: string
): string | null => {
  // Validate imageName
  if (!imageName) {
    return "Invalid image name.";
  }

  // Validate width and height
  if (
    !width ||
    !height ||
    !validator.isNumeric(width) ||
    !validator.isNumeric(height) ||
    !validator.isInt(width, { min: 100, max: 3000 }) ||
    !validator.isInt(height, { min: 100, max: 3000 })
  ) {
    return "Invalid width or height. Width and height should be numeric values between 100 and 3000.";
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
  if (
    !x ||
    !y ||
    !validator.isNumeric(x) ||
    !validator.isNumeric(y) ||
    !validator.isInt(x) ||
    !validator.isInt(y) ||
    !validator.isPositive(parseFloat(x)) || // Check for positive x coordinate
    !validator.isPositive(parseFloat(y)) // Check for positive y coordinate
  ) {
    return "Invalid coordinates. Coordinates (x, y) should be positive numeric values.";
  }

  // Validate width and height
  if (
    !width ||
    !height ||
    !validator.isNumeric(width) ||
    !validator.isNumeric(height) ||
    !validator.isInt(width) ||
    !validator.isInt(height) ||
    !validator.isInt(width, { min: 100, max: 3000 }) ||
    !validator.isInt(height, { min: 100, max: 3000 })
  ) {
    return "Invalid width or height. Width and height should be numeric integer values between 100 and 3000.";
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
