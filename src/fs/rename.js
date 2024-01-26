import { constants } from 'fs';
import fsPromises from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const FOLDER_NAME = 'files';
const FILE_NAME = 'wrongFilename.txt';
const NEW_FILE_NAME = 'properFilename.md';

const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileNamePath = path.join(__dirname, FOLDER_NAME, FILE_NAME);
const newFileNamePath = path.join(__dirname, FOLDER_NAME, NEW_FILE_NAME);


const rename = async () => {
  try {
    await fsPromises.access(fileNamePath, constants.F_OK);

    try {
      await fsPromises.access(newFileNamePath, constants.F_OK);
      throw new Error(ERROR_MESSAGE);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    await fsPromises.rename(fileNamePath, newFileNamePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(ERROR_MESSAGE);
    }
    throw err;
  }
};

await rename();