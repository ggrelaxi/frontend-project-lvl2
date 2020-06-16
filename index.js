import _ from 'lodash';

import path from 'path';

import getParsedContent from './parsers/parsers.js';

import getFormatter from './formatters/index.js';

// [host, timeout, proxy, follow, verbose]

const compareValues = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const node = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, state: 'added', value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { key, state: 'deleted', value: obj1[key] };
    }

    if (obj1[key] === obj2[key]) {
      return { key, state: 'unchange', value: obj2[key] };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      const children = compareValues(obj1[key], obj2[key]);
      return { key, state: 'haveChildren', children };
    }
    return {
      key,
      state: 'change',
      oldValue: obj1[key],
      newValue: obj2[key],
    };
  });
  return node;
};

const gendiff = (firstPath, secondPath, format) => {
  const firstFilePath = path.resolve(firstPath);
  const secondFilePath = path.resolve(secondPath);
  const obj1 = getParsedContent(firstFilePath);
  const obj2 = getParsedContent(secondFilePath);
  const result = compareValues(obj1, obj2);
  const resultStr = getFormatter(result, format);
  return resultStr;
};

export default gendiff;
