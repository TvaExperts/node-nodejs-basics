import os from 'os';
import path from 'path';
import { Worker } from 'worker_threads';
import { getDirNameFromMetaUrl } from '../utils/getDirNameFromMetaUrl.js';

const START_NUMBER = 10;

const TASK_STATUS = {
  RESOLVED: 'resolved',
  ERROR: 'error',
};

const WORKER_FILE_NAME = 'worker.js';

const __dirname = getDirNameFromMetaUrl(import.meta.url);
const workerPath = path.join(__dirname, WORKER_FILE_NAME);

const cpusCount = os.cpus().length;

function calculateFibonacci(num) {
  return new Promise((resolve) => {
    const worker = new Worker(workerPath, { workerData: num });

    worker.on('message', (data) => {
      resolve({ status: TASK_STATUS.RESOLVED, ...data });
      //resolve({ status: TASK_STATUS.RESOLVED, value: data });
    });

    worker.on('error', () => {
      resolve({ status: TASK_STATUS.ERROR, value: null });
    });
  });
}

const performCalculations = async () => {
  const calculationFibonacciPromises = new Array(cpusCount)
    .fill(null)
    .map((_, i) => calculateFibonacci(i /* * 10 */ + START_NUMBER));

  const results = await Promise.all(calculationFibonacciPromises);

  console.log(results);
};

await performCalculations();
