import { test, expect } from '@jest/globals';

import gendiff from '../index.js';

test('gendiff', () => {
  const firstJson = 'before.json';
  const secondJson = 'second.json';
  expect(gendiff(firstJson, secondJson)).toEqual('{ key1: value1 }');
});
