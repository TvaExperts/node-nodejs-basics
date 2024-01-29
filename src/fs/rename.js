import fs from 'fs';
import path from 'path';
import { createFsError } from '../utils/createFsError.js';
import { getDirNameFromMetaUrl } from '../utils/getDirNameFromMetaUrl.js';

const FOLDER_NAME = 'files';
const FILE_NAME = 'wrongFilename.txt';
const NEW_FILE_NAME = 'properFilename.md';

const __dirname = getDirNameFromMetaUrl(import.meta.url);
const fileNamePath = path.join(__dirname, FOLDER_NAME, FILE_NAME);
const newFileNamePath = path.join(__dirname, FOLDER_NAME, NEW_FILE_NAME);

const rename = async () => {
  fs.access(newFileNamePath, fs.constants.F_OK, (error) => {
    if (!error) {
      throw createFsError();
    }

    fs.rename(fileNamePath, newFileNamePath, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          throw createFsError();
        }
        throw err;
      }
    });
  });
};

await rename();
