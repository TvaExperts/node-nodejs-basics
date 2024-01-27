import fs from 'fs';
import path from 'path';
import { createFsError } from '../utils/createFsError.js';
import { getDirNameFromMetaUrl } from '../utils/getDirNameFromMetaUrl.js';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fresh.txt';

const TEXT_VALUE = 'I am fresh and young';

const __dirname = getDirNameFromMetaUrl(import.meta.url);
const filePath = path.join(__dirname, FOLDER_NAME, FILE_NAME);

const create = async () => {
  fs.writeFile(filePath, TEXT_VALUE, { flag: 'wx' }, (error) => {
    if (error) {
      if (error.code === 'EEXIST') {
        throw createFsError();
      }
      throw error;
    }
  });
};

await create();
