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

const decompress = async () => {
  const readStream = fs.createReadStream(archiveFileNamePath);
  const writeStream = fs.createWriteStream(fileNamePath);
  const gzip = zlib.createGunzip();

  readStream.pipe(gzip).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log(`File ${fileNamePath} has been decompressed to ${archiveFileNamePath}`);
  });
};

await decompress();