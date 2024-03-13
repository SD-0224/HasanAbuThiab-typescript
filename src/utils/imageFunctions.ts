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
    }
}

async function cropImageFnc(imagePath: string, width: number, height: number, x : number, y : number)
{
    const originalImageBuffer = await fs.promises.readFile(imagePath);
      const croppedImageBuffer = await sharp(originalImageBuffer)
          .extract({ left:x, top:y, width: width, height: height })
          .toBuffer();
      await fs.promises.writeFile(imagePath, croppedImageBuffer);
}
 

export {resizeImageFnc,cropImageFnc}