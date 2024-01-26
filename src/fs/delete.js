import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToRemove.txt';

const filePath = path.join(__dirname, FOLDER_NAME, FILE_NAME);


const remove = async () => {
   try {
     await fsPromises.rm(filePath);
   } catch (error) {
     if (error.code === 'ENOENT') {
       throw new Error('FS operation failed');
     }
     throw error;
   }
};

await remove();