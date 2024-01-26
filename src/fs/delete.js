import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToRemove.txt';

const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, FOLDER_NAME, FILE_NAME);


const remove = async () => {
   try {
     await fsPromises.rm(filePath);
   } catch (error) {
     if (error.code === 'ENOENT') {
       throw new Error(ERROR_MESSAGE);
     }
     throw error;
   }
};

await remove();