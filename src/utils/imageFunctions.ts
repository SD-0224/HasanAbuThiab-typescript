import sharp from 'sharp';
import  fs  from 'fs';

async function resizeImageFnc(imagePath: string, width: number, height: number): Promise<void> {
    try {
        const originalImageBuffer = await fs.promises.readFile(imagePath);
        const resizedImageBuffer = await sharp(originalImageBuffer)
            .resize({
                width: width,
                height: height,
                fit: "fill",
            })
            .toBuffer();
        await fs.promises.writeFile(imagePath, resizedImageBuffer);
    } catch (error) {
        console.error('Error resizing image:', error);
        throw error;
    }
}

async function cropImageFnc(imagePath: string, width: number, height: number, x : number, y : number)
{ try {
    const originalImageBuffer = await fs.promises.readFile(imagePath);
      const croppedImageBuffer = await sharp(originalImageBuffer)
          .extract({ left:x, top:y, width: width, height: height })
          .toBuffer();
      await fs.promises.writeFile(imagePath, croppedImageBuffer);
    } catch (error) {
        console.error('Error resizing image:', error);
        throw error;
    }
}
 



const applyWatermark = async (imagePath: string, watermarkBuffer: Buffer): Promise<void> => {
    try {
        const originalImageBuffer = await fs.promises.readFile(imagePath);

        // Get the dimensions of the original image
        const imageMetadata = await sharp(originalImageBuffer).metadata();
        const originalWidth = imageMetadata.width || 0;
        const originalHeight = imageMetadata.height || 0;

        // Resize the watermark image to 64x64 pixels
        const resizedWatermarkBuffer = await sharp(watermarkBuffer)
            .resize({ width: 64, height: 64 })
            .toBuffer();

        // Get the dimensions of the resized watermark image
        const watermarkMetadata = await sharp(resizedWatermarkBuffer).metadata();
        const watermarkWidth = watermarkMetadata.width || 0;
        const watermarkHeight = watermarkMetadata.height || 0;

        const posX = originalWidth - watermarkWidth - 10; 
        const posY = originalHeight - watermarkHeight - 10; 

        const watermarkedImageBuffer = await sharp(originalImageBuffer)
            .composite([{ input: resizedWatermarkBuffer, top: posY, left: posX }])
            .toBuffer();

        // Write the watermarked image buffer back to the original file
        await fs.promises.writeFile(imagePath, watermarkedImageBuffer);

        console.log("Watermark applied successfully");
    } catch (error) {
        console.error("Error applying watermark:", error);
        throw error; 
    }
};

export {resizeImageFnc,cropImageFnc,applyWatermark}
