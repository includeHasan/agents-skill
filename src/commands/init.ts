import chalk from 'chalk';
import * as fs from 'fs-extra';
import { ensureAgentsDir, getAgentsDir } from '../utils/fs-helpers';
import { updateReadme } from '../utils/readme-generator';

export interface InitOptions {
  dir?: string;
}

/**
 * Initialize .agents folder
 */
export async function initAgents(options: InitOptions): Promise<void> {
  const targetDir = options.dir || '.';
  const agentsDir = getAgentsDir(targetDir);
  
  console.log(chalk.blue('\n🚀 Agent Skills Init\n'));
  
  // Check if already exists
  const exists = await fs.pathExists(agentsDir);
  
  if (exists) {
    console.log(chalk.yellow(`⚠ .agents folder already exists at ${agentsDir}`));
    console.log(chalk.gray('Use `agent-skills install <skill>` to add skills.'));
  } else {
    // Create folder
    await ensureAgentsDir(targetDir);
    
    // Create initial README
    await updateReadme(targetDir);
    
    console.log(chalk.green(`✓ Created .agents folder at ${agentsDir}`));
    console.log(chalk.gray('\nNext steps:'));
    console.log(chalk.gray('  agent-skills list              # See available skills'));
    console.log(chalk.gray('  agent-skills install flutter   # Install a skill'));
  }
  
  console.log('');
}
