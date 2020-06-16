import { test, expect } from '@jest/globals';

import fs from 'fs';

import gendiff from '../index.js';

test('gendiffJson', () => {
  const firstPath = './__tests__/fixtures/before.json';
  const secondPath = './__tests__/fixtures/after.json';
  const correctResult = fs.readFileSync('./__tests__/fixtures/resultDifferent');
  expect(gendiff(firstPath, secondPath)).toEqual(correctResult.toString());
});

test('gendiffYml', () => {
  const firstPath = './__tests__/fixtures/before.yml';
  const secondPath = './__tests__/fixtures/after.yml';
  const correctResult = fs.readFileSync('./__tests__/fixtures/resultDifferent');
  expect(gendiff(firstPath, secondPath)).toEqual(correctResult.toString());
});

test('gendiffIni', () => {
  const firstPath = './__tests__/fixtures/before.ini';
  const secondPath = './__tests__/fixtures/after.ini';
  const correctResult = fs.readFileSync('./__tests__/fixtures/resultDifferent');
  expect(gendiff(firstPath, secondPath)).toEqual(correctResult.toString());
});

test('gendiiffTree', () => {
  const firstPath = './__tests__/fixtures/beforeTree.json';
  const secondPath = './__tests__/fixtures/afterTree.json';
  const correctResult = fs.readFileSync('./__tests__/fixtures/resultTreeDifferent');
  expect(gendiff(firstPath, secondPath)).toEqual(correctResult.toString());
});
