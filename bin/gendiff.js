#!/usr/bin/env node

import commander from 'commander';

commander
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format');

// Commands

commander
  .arguments('<path1> <path2>')
  .action(() => {});

commander.parse(process.argv);
