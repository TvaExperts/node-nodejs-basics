import { constants } from 'fs';
import fsPromises from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FOLDER_NAME = 'files';
const FILE_NAME = 'wrongFilename.txt';
const NEW_FILE_NAME = 'properFilename.md';

const fileNamePath = path.join(__dirname, FOLDER_NAME, FILE_NAME);
const newFileNamePath = path.join(__dirname, FOLDER_NAME, NEW_FILE_NAME);


const rename = async () => {

  try {
    await fsPromises.access(fileNamePath, constants.F_OK);

    try {
      await fsPromises.access(newFileNamePath, constants.F_OK);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }
    await fsPromises.rename(fileNamePath, newFileNamePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
    throw err;
  }
};

await rename();