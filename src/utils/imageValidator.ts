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

export { isValidImageType };