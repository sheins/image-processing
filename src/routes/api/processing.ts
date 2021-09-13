import sharp from 'sharp';
import {
    getThumbnailPath,
    getFullPath,
    existingCachedFile,
    getAvailableImages,
} from './helpers';

const thumbnailifyImage = async (filename: string, width: number, height: number): Promise<string> => {
    return await sharp(getFullPath(filename))
    .resize(width, height)
    .jpeg({ mozjpeg: true })
    .toFile(getThumbnailPath(filename, width, height))
    .then(() => {
      console.log('returning newly generated thumbnail');
      return getThumbnailPath(filename, width, height);
    })
    .catch((err: Error) => {
      throw new Error(err.message);
    });
}

const processImage = async (filename: string, width: number, height: number): Promise<string> => {
    if (!filename || !width || !height) {
      throw new Error(
        'Bad request. "filename", "width", and "height" are all required parameters. Ex: /api/images?filename=fjord&width=200&height=200.'
      )
    }
  
    const existingFiles = getAvailableImages();
    if (!existingFiles.includes(filename)) {
      throw new Error(
        `Bad request. Filename must match an existing filename: ${existingFiles}`
      )
    }
  
    try {
      const cachedImagePath = await existingCachedFile(filename, width, height);
      console.log('returning cached image');
      return cachedImagePath;
    } catch (e) {
      console.log(e);
    }
  
    return await thumbnailifyImage(filename, width, height);
  }

export { thumbnailifyImage, processImage }