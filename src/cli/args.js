const PREFIX = '--';

const parseArgs = () => {
  const args = process.argv.slice(2);
  const argsStrings = args.reduce((acc, arg, i, arr) => {
    if (arg.startsWith(PREFIX)) {
      const argEntries = `${arg.slice(PREFIX.length)} is ${arr[i + 1]}`;
      return [...acc, argEntries];
    }
    return acc;
  }, []);
  console.log(argsStrings.join(', '));
};

parseArgs();
