import { parentPort, workerData } from 'worker_threads';

const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

// if (Math.random() > 0.5) throw new Error('A-A-A-A-A');

const sendResult = () => {
  // const startTime = new Date().getTime();
  const value = nthFibonacci(workerData);
  // const duration = new Date().getTime() - startTime;
  parentPort.postMessage({ /* num: workerData, */ value /*, duration */ });
};

sendResult();
