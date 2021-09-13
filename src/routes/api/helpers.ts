import path from 'path';
import fs, { promises as fsPromises } from 'fs';

const getThumbnailName = (
  filename: string,
  width: number,
  height: number
): string => `${filename}-${width}-${height}`;

const getThumbnailPath = (
  filename: string,
  width: number,
  height: number
): string =>
  path.resolve(
    `./images/thumb/${getThumbnailName(filename, width, height)}.jpg`
  );

const getFullPath = (filename: string): string =>
  path.resolve(`./images/full/${filename}.jpg`);

const existingCachedFile = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  const cachedFilePath = getThumbnailPath(filename, width, height);
  try {
    await fsPromises.open(cachedFilePath, 'r');
    console.log(`cached file exists at path: ${cachedFilePath}`);
    return cachedFilePath;
  } catch {
    throw new Error(`Could not find cached file at path: ${cachedFilePath} `);
  }
};

const getAvailableImages = (): string[] =>
  fs
    .readdirSync('./images/full/')
    .map((file) => file.replace('.jpg', ''))
    .filter((file) => !file.startsWith('.'));


export {
  getThumbnailName,
  getThumbnailPath,
  getFullPath,
  existingCachedFile,
  getAvailableImages,
};
