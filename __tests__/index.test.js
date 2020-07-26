import fs from 'fs';
import gendiff from '../index.js';

let resultStylish;
let resultPlain;
let resultJson;

beforeAll(() => {
  resultStylish = fs.readFileSync('./__fixtures__/resultStylish');
  resultPlain = fs.readFileSync('./__fixtures__/resultPlain');
  resultJson = fs.readFileSync('./__fixtures__/resultJson');
});

describe('get different from two files', () => {
  test.each([
    ['ini'],
    ['yml'],
    ['json'],

  ])('files format - %p', (extension) => {
    const beforeFullPath = `${process.cwd()}/__fixtures__/before.${extension}`;
    const afterFullPath = `${process.cwd()}/__fixtures__/after.${extension}`;
    expect(gendiff(beforeFullPath, afterFullPath, 'stylish')).toEqual(resultStylish.toString());
    expect(gendiff(beforeFullPath, afterFullPath, 'plain')).toEqual(resultPlain.toString());
    expect(gendiff(beforeFullPath, afterFullPath, 'json')).toEqual(resultJson.toString());
  });
});
