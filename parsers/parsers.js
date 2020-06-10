import path from 'path';

import fs from 'fs';

import yaml from 'js-yaml';

import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const getParsedContent = (pathToFile) => {
  const readFile = fs.readFileSync(pathToFile, 'utf8');
  const extension = path.extname(pathToFile).slice(1);
  return parsers[extension](readFile);
};

export default getParsedContent;
