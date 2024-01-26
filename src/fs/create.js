import { open, close, write } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fresh.txt';

const TEXT_VALUE = 'I am fresh and young';

const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, FOLDER_NAME ,FILE_NAME);

const create = async () => {
  open(filePath, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        throw new Error(ERROR_MESSAGE);
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