import fsPromises from 'fs/promises';
import path from 'path';
import { createFsError } from '../utils/createFsError.js';
import { getDirNameFromMetaUrl } from '../utils/getDirNameFromMetaUrl.js';

const FOLDER_NAME = 'files';
const NEW_FOLDER_NAME = 'files_copy';

const __dirname = getDirNameFromMetaUrl(import.meta.url);
const folderPath = path.join(__dirname, FOLDER_NAME);
const newFolderPath = path.join(__dirname, NEW_FOLDER_NAME);

const copy = async () => {
  try {
    const filesPromise = fsPromises.readdir(folderPath, {
      withFileTypes: true,
    });
    const mkdirPromise = fsPromises.mkdir(newFolderPath);

    const [files] = await Promise.all([filesPromise, mkdirPromise]);

    const copyPromises = files
      .filter((file) => file.isFile())
      .map((file) => {
        const sourceFile = path.join(folderPath, file.name);
        const destFile = path.join(newFolderPath, file.name);
        return fsPromises.copyFile(sourceFile, destFile);
      });
    await Promise.all(copyPromises);
  } catch {
    throw createFsError();
  }
};

await copy();
