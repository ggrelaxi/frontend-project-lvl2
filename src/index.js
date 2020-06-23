import path from 'path';
import fs from 'fs';
import getParsedContent from './parsers/parsers.js';
import getFormatting from './formatters/index.js';
import buildDiff from './compare.js';

const gendiff = (firstPath, secondPath, format = 'stylish') => {
  const firstFilePath = path.resolve(process.cwd(), firstPath);
  const secondFilePath = path.resolve(process.cwd(), secondPath);
  const firstFileData = fs.readFileSync(firstFilePath, 'utf8');
  const secondFileData = fs.readFileSync(secondFilePath, 'utf8');
  const firstFileExtension = path.extname(firstFilePath).slice(1);
  const secondFileExtension = path.extname(secondFilePath).slice(1);
  const obj1 = getParsedContent(firstFileData, firstFileExtension);
  const obj2 = getParsedContent(secondFileData, secondFileExtension);
  const internalTree = buildDiff(obj1, obj2);
  const result = getFormatting(internalTree, format);
  return result;
};

export default gendiff;
