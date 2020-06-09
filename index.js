import _ from 'lodash';

import path from 'path';

import fs from 'fs';

// [host, timeout, proxy, follow, verbose]

const compareValues = (obj1, obj2, key) => {
  let str = '';
  const space = ' ';
  if (obj1[key] === obj2[key]) {
    str = `    ${key}: ${obj1[key]}\n`;
  }
  if (obj1[key] !== obj2[key]) {
    str = ` - ${key}: ${obj1[key]}\n ${space}+ ${key}: ${obj2[key]}\n`;
  }
  if (!obj1[key]) {
    str = ` + ${key}: ${obj2[key]}\n`;
  }
  if (!obj2[key]) {
    str = ` - ${key}: ${obj1[key]}\n`;
  }
  return str;
};

const gendiff = (firstPath, secondPath) => {
  const firstFilePath = path.resolve(firstPath);
  const secondFilePath = path.resolve(secondPath);
  const obj1 = JSON.parse(fs.readFileSync(firstFilePath).toString());
  const obj2 = JSON.parse(fs.readFileSync(secondFilePath).toString());
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const result = keys.reduce((acc, key) => {
    const resultStr = compareValues(obj1, obj2, key);
    acc.push(resultStr);
    return acc;
  }, []);
  const str = (`\n{\n${result.join(' ')}}`);
  console.log(str);
  return str;
};

export default gendiff;
