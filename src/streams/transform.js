import { Transform } from 'stream';

class ReverseTransform extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    const reversedChunk = chunk.toString().trim().split('').reverse().join('');
    callback(null, `${reversedChunk}\n`);
  }
}

const transform = async () => {
  const reverseTransform = new ReverseTransform();
  process.stdin.pipe(reverseTransform).pipe(process.stdout);
};

await transform();
