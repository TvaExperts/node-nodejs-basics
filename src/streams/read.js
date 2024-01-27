import fs from 'fs';
import path from 'path';
import { getDirNameFromMetaUrl } from '../utils/getDirNameFromMetaUrl.js';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToRead.txt';

const __dirname = getDirNameFromMetaUrl(import.meta.url);
const filePath = path.join(__dirname, FOLDER_NAME, FILE_NAME);

const read = async () => {
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(process.stdout);
};

await read();
