import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { getDirNameFromMetaUrl } from '../utils/getDirNameFromMetaUrl.js';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToCompress.txt';
const ARCHIVE_FILE_NAME = 'archive.gz';

const __dirname = getDirNameFromMetaUrl(import.meta.url);
const fileNamePath = path.join(__dirname, FOLDER_NAME, FILE_NAME);
const archiveFileNamePath = path.join(__dirname, FOLDER_NAME, ARCHIVE_FILE_NAME);

const compress = async () => {
  const readStream = fs.createReadStream(fileNamePath);
  const writeStream = fs.createWriteStream(archiveFileNamePath);
  const gzip = zlib.createGzip();

  readStream.pipe(gzip).pipe(writeStream);
};

await compress();
