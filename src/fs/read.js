import path from 'path';
import fs from 'fs';
import { createFsError } from '../utils/createFsError.js';
import { getDirNameFromMetaUrl } from '../utils/getDirNameFromMetaUrl.js';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToRead.txt';

const __dirname = getDirNameFromMetaUrl(import.meta.url);
const filePath = path.join(__dirname, FOLDER_NAME, FILE_NAME);

const read = async () => {
  fs.readFile(filePath, { encoding: 'utf8' }, (error, data) => {
    if (error) {
      if (error.code === 'ENOENT') {
        throw createFsError();
      }
      throw error;
    }
    console.log(data);
  });
};

await read();
