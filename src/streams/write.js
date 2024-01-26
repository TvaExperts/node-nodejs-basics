import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToWrite.txt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, FOLDER_NAME, FILE_NAME);

const write = async () => {
  let dataToWrite = '';

  const writeStream = fs.createWriteStream(filePath);

  process.stdin.on('data', (data) => {
    dataToWrite += data;
  });

  process.on('SIGINT', () => {
    writeStream.write(dataToWrite);
    writeStream.close();
    process.exit()
  });
};

await write();