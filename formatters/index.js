import stylish from './stylish.js';

import plain from './plain.js';

const formatter = (result, format) => {
  switch (format) {
    case 'json':
      return stylish(result);
    case 'plain':
      return plain(result);
    default:
      return 'incorrect format';
  }
};

export default formatter;
