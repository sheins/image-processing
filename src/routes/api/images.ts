import express from 'express';
import sharp from 'sharp';
import {
  getThumbnailPath,
  getFullPath,
  existingCachedFile,
  getAvailableImages
} from './helpers';

const images = express.Router();

images.get('/', async (req, res) => {
  const { filename: filenameQ, width: widthQ, height: heightQ } = req.query;

  const width = Number(widthQ) || 0;
  const height = Number(heightQ) || 0;
  const filename = filenameQ ? filenameQ.toString() : '';

  if (!filename || !width || !height) {
    res
      .status(400)
      .send(
        'Bad request. "filename", "width", and "height" are all required parameters. Ex: /api/images?filename=fjord&width=200&height=200.'
      );
    return;
  }

  const existingFiles = getAvailableImages();
  if (!existingFiles.includes(filename)) {
    res
      .status(400)
      .send(
        `Bad request. Filename must match an existing filename: ${existingFiles}`
      );
    return;
  }

  try {
    const cachedImagePath = await existingCachedFile(filename, width, height);
    res.sendFile(cachedImagePath);
    console.log('returning cached image');
    return;
  } catch (e) {
    console.log(e);
  }

  sharp(getFullPath(filename))
    .resize(width, height)
    .jpeg({ mozjpeg: true })
    .toFile(getThumbnailPath(filename, width, height))
    .then(() => {
      res.sendFile(getThumbnailPath(filename, width, height));
      console.log('returning newly generated thumbnail');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

export default images;
