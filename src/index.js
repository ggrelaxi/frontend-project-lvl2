import path from 'path';
import fs from 'fs';
import getParsedContent from './parsers/parsers.js';
import getFormatter from './formatters/index.js';
import buildDiff from './compare.js';
// const gendiff = (firstPath, secondPath, format = 'stylish') => {
//   const firstFilePath = path.resolve(process.cwd(), firstPath);
//   const secondFilePath = path.resolve(process.cwd(), secondPath);
//   const obj1 = getParsedContent(firstFilePath);
//   const obj2 = getParsedContent(secondFilePath);
//   const internalRepresantation = buildDiff(obj1, obj2);
//   const result = getFormatter(internalRepresantation, format);
//   return result;
// };

const gendiff = (firstPath, secondPath, format = 'stylish') => {
  const firstFilePath = path.resolve(process.cwd(), firstPath);
  const secondFilePath = path.resolve(process.cwd(), secondPath);
  const firstFile = fs.readFileSync(firstFilePath, 'utf8');
  const firstFileExtension = path.extname(firstFilePath).slice(1);
  const secondFileExtension = path.extname(secondFilePath).slice(1);
  const secondFile = fs.readFileSync(secondFilePath, 'utf8');
  const obj1 = getParsedContent(firstFile, firstFileExtension);
  const obj2 = getParsedContent(secondFile, secondFileExtension);
  const internalRepresantation = buildDiff(obj1, obj2);
  const result = getFormatter(internalRepresantation, format);
  return result;
};

export default gendiff;
