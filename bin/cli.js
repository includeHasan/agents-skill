#!/usr/bin/env node

const { program } = require('commander');
const { installSkills } = require('../dist/commands/install');
const { listSkills } = require('../dist/commands/list');
const { removeSkills } = require('../dist/commands/remove');
const { initAgents } = require('../dist/commands/init');
const pkg = require('../package.json');

program
  .name('agent-skills')
  .description('Install AI agent skills for any project')
  .version(pkg.version);

program
  .command('install <skills...>')
  .alias('i')
  .description('Install one or more skills')
  .option('-d, --dir <path>', 'Target directory', '.')
  .action((skills, options) => {
    installSkills(skills, options);
  });

program
  .command('list')
  .alias('ls')
  .description('List available and installed skills')
  .option('-d, --dir <path>', 'Target directory', '.')
  .action((options) => {
    listSkills(options);
  });

program
  .command('remove <skills...>')
  .alias('rm')
  .description('Remove installed skills')
  .option('-d, --dir <path>', 'Target directory', '.')
  .action((skills, options) => {
    removeSkills(skills, options);
  });

program
  .command('init')
  .description('Initialize .agents folder')
  .option('-d, --dir <path>', 'Target directory', '.')
  .action((options) => {
    initAgents(options);
  });

program.parse();
