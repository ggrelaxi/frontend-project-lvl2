import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const ast = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, state: 'added', value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { key, state: 'deleted', value: obj1[key] };
    }

    if (obj1[key] === obj2[key]) {
      return { key, state: 'unchange', value: obj2[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const children = buildDiff(obj1[key], obj2[key]);
      return { key, state: 'haveChildren', children };
    }
    return {
      key,
      state: 'change',
      oldValue: obj1[key],
      newValue: obj2[key],
    };
  });
  return ast;
};

export default buildDiff;
