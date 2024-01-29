import path from 'path';
import child_process from 'node:child_process';
import { getDirNameFromMetaUrl } from '../utils/getDirNameFromMetaUrl.js';

const FOLDER_NAME = 'files';
const FILE_NAME = 'script.js';

const __dirname = getDirNameFromMetaUrl(import.meta.url);
const filePath = path.join(__dirname, FOLDER_NAME, FILE_NAME);

const spawnChildProcess = async (args) => {
  child_process.fork(filePath, args);
};

// Put your arguments in function call to test this functionality
spawnChildProcess( /* ['someArgument1', 'someArgument2', 11] */ );
