const formatValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const renderPlain = (content, fullPath = '') => {
  const iter = (node, ancestry) => {
    const path = ancestry.length > 0 ? `${ancestry}.${node.key}` : node.key;
    if (node.state === 'added') {
      return `Property '${path}' was added with value: ${formatValue(node.value)}`;
    }
    if (node.state === 'deleted') {
      return `Property '${path}' was deleted`;
    }
    if (node.state === 'change') {
      return `Property '${path}' was changed from ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
    }
    if (node.state === 'unchange') {
      return '';
    }
    const children = renderPlain(node.children, path);
    return children;
  };
  return content
    .flatMap((node) => iter(node, fullPath))
    .filter((string) => string)
    .join('\n');
};

export default renderPlain;
