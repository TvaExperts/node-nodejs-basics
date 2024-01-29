import fs from 'fs';
import path from 'path';
import { getDirNameFromMetaUrl } from '../utils/getDirNameFromMetaUrl.js';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToWrite.txt';

const __dirname = getDirNameFromMetaUrl(import.meta.url);
const filePath = path.join(__dirname, FOLDER_NAME, FILE_NAME);

const write = async () => {
  let dataToWrite = '';

  const writeStream = fs.createWriteStream(filePath);

  process.stdin.on('data', (data) => {
    dataToWrite += data;
  });

  process.on('SIGINT', () => {
    writeStream.write(dataToWrite);
    writeStream.close();
    process.exit();
  });
};

await write();
