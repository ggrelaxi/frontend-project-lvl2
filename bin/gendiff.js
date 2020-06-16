#!/usr/bin/env node

import commander from 'commander';

import gendiff from '../index.js';

commander
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.');

commander
  .option('-f, --format [type]', 'output format', 'json');

commander
  .arguments('<filepath1> <filepath2>');

commander
  .action((filepath1, filepath2) => {
    const diff = gendiff(filepath1, filepath2, commander.format);
    console.log(diff);
  });

commander.parse(process.argv);
