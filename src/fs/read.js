import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { constants } from 'fs';
import fsPromises from 'fs/promises';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToRead.txt';

const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, FOLDER_NAME, FILE_NAME);

const read = async () => {
  try {
   await fsPromises.access(filePath, constants.R_OK);

   const dataFromFile = await fsPromises.readFile(filePath, {encoding:'utf8'});

   console.log(dataFromFile);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(ERROR_MESSAGE)
    }
    throw error;
  }
};

await read();