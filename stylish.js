import _ from 'lodash';

const makeIndent = (depth, marker) => {
  const indentStep = 4;
  const actualIndent = ' '.repeat(depth * indentStep);
  return marker === undefined ? actualIndent : `${actualIndent.slice(2)}${marker} `;
};

const braces = (content, depth) => {
  const bracesIndent = makeIndent(depth - 1);
  return `{\n${content}\n${bracesIndent}}`;
};

const formatObject = (object, depth) => {
  const objectIndent = makeIndent(depth + 1);
  const objectContent = Object.entries(object)
    .map(([key, value]) => `${objectIndent}${key}: ${value}`)
    .join('\n');
  return braces(objectContent, depth + 1);
};

const formatValue = (value, indentCount) => {
  const singleValue = _.isPlainObject(value) ? formatObject(value, indentCount) : `${value}`;
  return singleValue;
};

const stylish = (content, depth = 1) => {
  const iter = (node) => {
    if (node.state === 'added') {
      const indent = makeIndent(depth, '+');
      const value = formatValue(node.value, depth);
      return `${indent}${node.key}: ${value}`;
    }
    if (node.state === 'deleted') {
      const indent = makeIndent(depth, '-');
      const value = formatValue(node.value, depth);
      return `${indent}${node.key}: ${value}`;
    }
    if (node.state === 'unchange') {
      const indent = makeIndent(depth);
      const value = formatValue(node.value, depth);
      return `${indent}${node.key}: ${value}`;
    }
    if (node.state === 'change') {
      const deleteIndent = makeIndent(depth, '-');
      const addedIndent = makeIndent(depth, '+');
      const newValue = formatValue(node.newValue, depth);
      const oldValue = formatValue(node.oldValue, depth);
      return [
        `${deleteIndent}${node.key}: ${oldValue}`,
        `${addedIndent}${node.key}: ${newValue}`,
      ];
    }
    const indent = makeIndent(depth);
    const children = stylish(node.children, depth + 1);
    return `${indent}${node.key}: ${children}`;
  };
  const tree = content.flatMap((node) => iter(node)).join('\n');
  return braces(tree, depth);
};

export default stylish;
