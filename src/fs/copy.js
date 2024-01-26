import { constants } from 'fs';
import fsPromises from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const FOLDER_NAME = 'files';
const NEW_FOLDER_NAME = 'files_copy';

const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const folderPath = path.join(__dirname, FOLDER_NAME)
const newFolderPath = path.join(__dirname, NEW_FOLDER_NAME)

const copy = async () => {
  try {
    await fsPromises.access(folderPath, constants.F_OK)
    await fsPromises.mkdir(newFolderPath);
  } catch {
    throw new Error(ERROR_MESSAGE);
  }
  const files = await fsPromises.readdir(folderPath, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      const sourceFile = path.join(folderPath, file.name);
      const destFile = path.join(newFolderPath, file.name);
      await fsPromises.copyFile(sourceFile, destFile);
    }
  }
};

await copy();
