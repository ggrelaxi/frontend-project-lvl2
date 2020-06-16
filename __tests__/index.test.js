import { test, expect } from '@jest/globals';

import fs from 'fs';

import gendiff from '../index.js';

test('gendiffJson', () => {
  const firstPath = './fixtures/before.json';
  const secondPath = './fixtures/after.json';
  const correctResult = fs.readFileSync('./fixtures/resultDifferent');
  expect(gendiff(firstPath, secondPath)).toEqual(correctResult.toString());
});

test('gendiffYml', () => {
  const firstPath = './fixtures/before.yml';
  const secondPath = './fixtures/after.yml';
  const correctResult = fs.readFileSync('./fixtures/resultDifferent');
  expect(gendiff(firstPath, secondPath)).toEqual(correctResult.toString());
});

test('gendiffIni', () => {
  const firstPath = './fixtures/before.ini';
  const secondPath = './fixtures/after.ini';
  const correctResult = fs.readFileSync('./fixtures/resultDifferent');
  expect(gendiff(firstPath, secondPath)).toEqual(correctResult.toString());
});

test('gendiiffTree', () => {
  const firstPath = './fixtures/beforeTree.json';
  const secondPath = './fixtures/afterTree.json';
  const correctResult = fs.readFileSync('./fixtures/resultTreeDifferent');
  expect(gendiff(firstPath, secondPath)).toEqual(correctResult.toString());
});
