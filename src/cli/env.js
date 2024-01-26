
const PREFIX = 'RSS_';

const parseEnv = () => {

  const envVariables = Object.entries(process.env)
    .filter(([key]) => key.startsWith(PREFIX))
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');

  console.log(envVariables);
};

parseEnv();