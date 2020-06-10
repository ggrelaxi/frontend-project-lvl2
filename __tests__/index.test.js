import { test, expect } from '@jest/globals';

import fs from 'fs';

import gendiff from '../index.js';

test('gendiffJson', () => {
  const firstPath = 'before.json';
  const secondPath = 'after.json';
  const correctResult = fs.readFileSync('./__tests__/fixtures/resultDifferent');
  expect(gendiff(firstPath, secondPath)).toEqual(correctResult.toString());
});

test('gendiffYml', () => {
  const firstPath = 'before.yml';
  const secondPath = 'after.yml';
  const correctResult = fs.readFileSync('./__tests__/fixtures/resultDifferent');
  expect(gendiff(firstPath, secondPath)).toEqual(correctResult.toString());
});
