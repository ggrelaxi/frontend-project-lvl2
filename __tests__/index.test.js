import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import gendiff from '../index.js';

describe('get different from two INI files', () => {
  test.each([
    ['stylish', './fixtures/before.ini', './fixtures/after.ini', fs.readFileSync('./fixtures/resultIniStylish')],
    ['plain', './fixtures/before.ini', './fixtures/after.ini', fs.readFileSync('./fixtures/resultIniPlain')],
    ['json', './fixtures/before.ini', './fixtures/after.ini', fs.readFileSync('./fixtures/resultIniJson')],
  ])('input be %p', (format, firstPath, secondPath, expected) => {
    expect(gendiff(firstPath, secondPath, format)).toEqual(expected.toString());
  });
});

describe('get different from two YML files', () => {
  test.each([
    ['stylish', './fixtures/before.yml', './fixtures/after.yml', fs.readFileSync('./fixtures/resultYmlStylish')],
    ['plain', './fixtures/before.yml', './fixtures/after.yml', fs.readFileSync('./fixtures/resultYmlPlain')],
    ['json', './fixtures/before.yml', './fixtures/after.yml', fs.readFileSync('./fixtures/resultYmlJson')],
  ])('input be %p', (format, firstPath, secondPath, expected) => {
    expect(gendiff(firstPath, secondPath, format)).toEqual(expected.toString());
  });
});

describe('get different from two JSON files', () => {
  test.each([
    ['stylish', './fixtures/before.json', './fixtures/after.json', fs.readFileSync('./fixtures/resultJsonStylish')],
    ['plain', './fixtures/before.json', './fixtures/after.json', fs.readFileSync('./fixtures/resultJsonPlain')],
    ['json', './fixtures/before.json', './fixtures/after.json', fs.readFileSync('./fixtures/resultJsonJson')],
  ])('input be %p', (format, firstPath, secondPath, expected) => {
    expect(gendiff(firstPath, secondPath, format)).toEqual(expected.toString());
  });
});

// describe('yml format', () => {
//   test('ini to stylish', () => {
//   });
// )};

// describe('json format', () => {
//   test('ini to stylish', () => {
//   });
// )};

// test('gendiiffTree', () => {
//   const firstPath = './fixtures/before.json';
//   const secondPath = './fixtures/after.json';
//   const correctResult = fs.readFileSync('./fixtures/resultStylish');
//   expect(gendiff(firstPath, secondPath)).toEqual(correctResult.toString());
// });

// test('gendiiffPlain', () => {
//   const firstPath = './fixtures/before.json';
//   const secondPath = './fixtures/after.json';
//   const correctResult = fs.readFileSync('./fixtures/resultPlain');
//   expect(gendiff(firstPath, secondPath, 'plain')).toEqual(correctResult.toString());
// });

// test('gendiffJson', () => {
//   const firstPath = './fixtures/before.json';
//   const secondPath = './fixtures/after.json';
//   const correctResult = fs.readFileSync('./fixtures/resultJson');
//   expect(gendiff(firstPath, secondPath, 'json')).toEqual(correctResult.toString());
// });
