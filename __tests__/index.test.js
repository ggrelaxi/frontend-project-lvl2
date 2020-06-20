import {
  test, expect, describe, beforeAll,
} from '@jest/globals';
import fs from 'fs';
import gendiff from '../index.js';

let resultStylish;
let resultPlain;
let resultJson;

beforeAll(() => {
  resultStylish = fs.readFileSync('./fixtures/resultStylish');
  resultPlain = fs.readFileSync('./fixtures/resultPlain');
  resultJson = fs.readFileSync('./fixtures/resultJson');
});

describe('get different from two files', () => {
  test.each([
    ['ini'],
    ['yml'],
    ['json'],

  ])('files format - %p', (extension) => {
    const beforeFullPath = `${process.cwd()}/fixtures/before.${extension}`;
    const afterFullPath = `${process.cwd()}/fixtures/after.${extension}`;
    expect(gendiff(beforeFullPath, afterFullPath, 'stylish')).toEqual(resultStylish.toString());
    expect(gendiff(beforeFullPath, afterFullPath, 'plain')).toEqual(resultPlain.toString());
    expect(gendiff(beforeFullPath, afterFullPath, 'json')).toEqual(resultJson.toString());
  });
});
