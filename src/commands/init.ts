/**
 * Init Command
 * Initialize agent configuration with smart project detection
 */

import * as p from '@clack/prompts';
import chalk from 'chalk';
import { detectProject, getProjectIcon } from '../utils/project-detector.js';

export interface InitOptions {
  yes?: boolean;
  global?: boolean;
}

/**
 * Initialize agent configuration with smart detection
 */
export async function initCommand(options: InitOptions): Promise<void> {
  console.log();
  p.intro(chalk.bgCyan.black(' unifai init '));

  const spinner = p.spinner();

  // Step 1: Detect project type
  spinner.start('Detecting project type...');
  const project = await detectProject(process.cwd());

  if (project) {
    const icon = getProjectIcon(project.type);
    spinner.stop(`Detected: ${icon} ${chalk.cyan(project.displayName)}${project.name ? ` (${project.name})` : ''}`);

    console.log();
    p.log.step(chalk.bold('Project Profile'));
    p.log.message(`Tech Stack: ${chalk.cyan(project.techStack.join(', '))}`);
    console.log();

    p.log.info('To set up universal AI agent instructions for this project:');
    p.log.message(`  ${chalk.cyan('unifai agent init')}`);
    console.log();

    p.log.info('To sync your configuration across all detected IDEs:');
    p.log.message(`  ${chalk.cyan('unifai sync')}`);
  } else {
    spinner.stop('No specific project type detected');

    console.log();
    p.log.info('You can initialize your agent configuration manually:');
    p.log.message(`  ${chalk.cyan('unifai agent init')}`);
  }

  console.log();
  p.outro(chalk.green('Initialization guide complete!'));
}

export default initCommand;
