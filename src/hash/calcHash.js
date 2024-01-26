import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToCalculateHashFor.txt';

const ALGORITHM = 'sha256';
const ENCODING_OF_RESULT = 'hex';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, FOLDER_NAME, FILE_NAME);

const calculateHash = async () => {
  const readStream = fs.createReadStream(filePath);
  const hash = crypto.createHash(ALGORITHM);

  readStream.on('data', data => {
    hash.update(data);
  });

  readStream.on('end', () => {
    const resHash = hash.digest(ENCODING_OF_RESULT);
    console.log(`${filePath} hash is ${resHash}`);
  });

  readStream.on('error', error => {
    throw error;
  });
}




await calculateHash();