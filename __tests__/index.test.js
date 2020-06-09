import { test, expect } from '@jest/globals';

import { dirname } from 'path';

import fs from 'fs';

import gendiff from '../index.js';

test('gendiff', () => {
  const firstPath = 'before.json';
  const secondPath = 'after.json';
  const correctResult = fs.readFileSync('/home/alex/Desktop/Git-repository/hexlet/frontend-project-lvl2/__tests__/fixtures/resultDifferent');
  expect(gendiff(firstPath, secondPath)).toEqual(correctResult.toString());
});
