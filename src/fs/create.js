import { open, close, write } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FOLDER_NAME = 'files';
const FILE_NAME = 'fresh.txt';

const filePath = path.join(__dirname, FOLDER_NAME ,FILE_NAME);

const TEXT_VALUE = 'I am fresh and young';

const create = async () => {
  open(filePath, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        throw new Error('FS operation failed');
      }
      throw err;
    }
    try {
      write(fd, TEXT_VALUE,(err) => {
        if (err) throw err;
      })
    } finally {
      close(fd, (err) => {
        if (err) throw err;
      });
    }
  });
};

await create();