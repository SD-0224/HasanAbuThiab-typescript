import validator from 'validator';

const isValidImageType = (mimeType: string): boolean => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp',
    'image/tiff',
  ];

  return validator.isMimeType(mimeType, allowedTypes);
};
const validateInputs = (imageName: string, width: string, height: string): string | null => {
  // Validate imageName
  if (!imageName) {
    return 'Invalid image name.';
  }

  // Validate width and height
  if (!width || !height || !validator.isNumeric(width) || !validator.isNumeric(height) || !validator.isInt(width, { min: 100, max: 3000 }) || !validator.isInt(height, { min: 100, max: 3000 })) {
    return 'Invalid width or height. Width and height should be numeric values between 100 and 3000.';
  }

  return null; 
};
export { isValidImageType, validateInputs };