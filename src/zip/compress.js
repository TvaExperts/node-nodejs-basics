import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import zlib from 'zlib';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToCompress.txt';
const ARCHIVE_FILE_NAME = 'archive.gz';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileNamePath = join(__dirname, FOLDER_NAME, FILE_NAME);
const archiveFileNamePath = join(__dirname, FOLDER_NAME, ARCHIVE_FILE_NAME);

const compress = async () => {
  const readStream = fs.createReadStream(fileNamePath);
  const writeStream = fs.createWriteStream(archiveFileNamePath);
  const gzip = zlib.createGzip();

  readStream.pipe(gzip).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log(`File ${fileNamePath} has been compressed to ${archiveFileNamePath}`);
  });

  writeStream.on('error', error => {
    console.error('Error writing compressed file:', error);
  });
};

await compress();