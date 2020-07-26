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

const renderStylish = (content) => {
  const iter = (node, depth) => {
    if (node.state === 'added') {
      const indent = makeIndent(depth, '+');
      const formattedValue = formatValue(node.value, depth);
      return `${indent}${node.key}: ${formattedValue}`;
    }
    if (node.state === 'deleted') {
      const indent = makeIndent(depth, '-');
      const formattedValue = formatValue(node.value, depth);
      return `${indent}${node.key}: ${formattedValue}`;
    }
    if (node.state === 'unchanged') {
      const indent = makeIndent(depth);
      const formattedValue = formatValue(node.value, depth);
      return `${indent}${node.key}: ${formattedValue}`;
    }
    if (node.state === 'change') {
      const deleteIndent = makeIndent(depth, '-');
      const addedIndent = makeIndent(depth, '+');
      const formattedNewValue = formatValue(node.newValue, depth);
      const formattedOldValue = formatValue(node.oldValue, depth);
      return [
        `${deleteIndent}${node.key}: ${formattedOldValue}`,
        `${addedIndent}${node.key}: ${formattedNewValue}`,
      ];
    }
    console.log(node.children)
    return node.children.flatMap((children) => iter(children, depth + 1));
    // const innerTree = iter(node.children, depth + 1);
    // return `${indent}${node.key}: ${innerTree}`;
  };
  const tree = content.flatMap((node) => iter(node, 1)).join('\n');
  return `{\n${tree}\n${makeIndent(1)}}`;
};

export default renderStylish;
