import _ from 'lodash';

const makeIndent = (depth, marker = null) => {
  const indentStep = 4;
  const actualIndent = ' '.repeat(depth * indentStep);
  return marker === null ? actualIndent : `${actualIndent.slice(2)}${marker} `;
};

const formatValue = (values, depth) => {
  if (_.isObject(values)) {
    const objectIndent = makeIndent(depth + 1);
    const objectContent = Object.entries(values)
      .map(([key, value]) => `${objectIndent}${key}: ${value}`)
      .join('\n');
    return `{\n${objectContent}\n${makeIndent(depth)}}`;
  }
  return `${values}`;
};

const renderStylish = (content, depth = 1) => {
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
    const innerTree = renderStylish(node.children, depth + 1);
    return `${indent}${node.key}: ${innerTree}`;
  };
  const tree = content.flatMap((node) => iter(node)).join('\n');
  return `{\n${tree}\n${makeIndent(depth - 1)}}`;
};

export default renderStylish;
