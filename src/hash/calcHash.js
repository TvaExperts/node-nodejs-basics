import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToCalculateHashFor.txt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, FOLDER_NAME, FILE_NAME);

const calculateHash = async () => {
  const readStream = fs.createReadStream(filePath);
  const hash = crypto.createHash('sha256');

  readStream.on('data', (data) => {
    hash.update(data);
  });

  readStream.on('end', () => {
    const resHash = hash.digest('hex');
    console.log(`${filePath} hash is ${resHash}`);
  });
};

await calculateHash();
