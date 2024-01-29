import path from 'path';
import fsPromises from 'fs/promises';
import { createFsError } from '../utils/createFsError.js';
import { getDirNameFromMetaUrl } from '../utils/getDirNameFromMetaUrl.js';

const FOLDER_NAME = 'files';

const __dirname = getDirNameFromMetaUrl(import.meta.url);
const folderPath = path.join(__dirname, FOLDER_NAME);

const list = async () => {
  try {
    const files = await fsPromises.readdir(folderPath, { withFileTypes: true });
    files
      .filter((file) => file.isFile())
      .forEach((file) => {
        console.log(file.name);
      });
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw createFsError();
    }
    throw error;
  }
};

await list();
