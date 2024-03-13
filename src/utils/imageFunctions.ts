import sharp from 'sharp';
import { promises as fsPromises } from 'fs';

async function resizeImageFnc(imagePath: string, width: number, height: number): Promise<void> {
    try {
        const originalImageBuffer = await fsPromises.readFile(imagePath);
        const resizedImageBuffer = await sharp(originalImageBuffer)
            .resize({
                width: parseInt(width.toString()),
                height: parseInt(height.toString()),
                fit: "fill",
            })
            .toBuffer();
        await fsPromises.writeFile(imagePath, resizedImageBuffer);
    } catch (error) {
        console.error('Error resizing image:', error);
    }
}

 

export {resizeImageFnc}