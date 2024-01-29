import path from 'path';
import fsPromises from 'fs/promises';
import { getDirNameFromMetaUrl } from '../utils/getDirNameFromMetaUrl.js';
import { createFsError } from '../utils/createFsError.js';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToRemove.txt';

const __dirname = getDirNameFromMetaUrl(import.meta.url);
const filePath = path.join(__dirname, FOLDER_NAME, FILE_NAME);

const remove = async () => {
  try {
    await fsPromises.rm(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw createFsError();
    }
    throw error;
  }
};

await remove();
