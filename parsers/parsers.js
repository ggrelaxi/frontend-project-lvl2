import path from 'path';

import fs from 'fs';

import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

const getParsedContent = (pathToFile) => {
  const readFile = fs.readFileSync(pathToFile, 'utf8');
  const extension = path.extname(pathToFile).slice(1);
  return parsers[extension](readFile);
};

export default getParsedContent;
