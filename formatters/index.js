import stylish from './stylish.js';

import plain from './plain.js';

const formatter = (result, format) => {
  switch (format) {
    case 'tree':
      return stylish(result);
    case 'plain':
      return plain(result);
    case 'json':
      return JSON.stringify(stylish(result));
    default:
      return 'incorrect format';
  }
};

export default formatter;
