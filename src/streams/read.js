import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToRead.txt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, FOLDER_NAME, FILE_NAME);

const read = async () => {
  const readStream = fs.createReadStream(filePath);
  readStream.on('data', (chunk) => process.stdout.write(chunk.toString()));
};

await read();