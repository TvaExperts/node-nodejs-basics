import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';

import './files/c.js';

const PATH_FILE_A = './files/a.json';
const PATH_FILE_B = './files/b.json';

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const random = Math.random();
const unknownObject = random >= 0.5 ? require(PATH_FILE_A) : require(PATH_FILE_B);
console.log(unknownObject);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
