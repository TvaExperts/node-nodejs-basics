import { parentPort, workerData } from 'worker_threads';

const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

// if (Math.random() >= 0.5) throw new Error('A-A-A-A-A');

const sendResult = () => {
  // const startTime = Date.now();
  const value = nthFibonacci(workerData);
   // const duration = Date.now() - startTime;
  parentPort.postMessage({ /* num: workerData, */ value /*, duration */ });
};

sendResult();
