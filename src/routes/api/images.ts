import express from 'express';
import { processImage } from './processing';

const images = express.Router();

images.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const { filename: filenameQ, width: widthQ, height: heightQ } = req.query;

    const width = Number(widthQ) || 0;
    const height = Number(heightQ) || 0;
    const filename = filenameQ ? filenameQ.toString() : '';

    try {
      const image = await processImage(filename, width, height);
      res.sendFile(image);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  }
);

export default images;
