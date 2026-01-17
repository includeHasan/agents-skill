import * as fs from 'fs-extra';
import * as path from 'path';

/**
 * Get the .agents directory path
 */
export function getAgentsDir(targetDir: string = '.'): string {
  return path.join(path.resolve(targetDir), '.agents');
}

/**
 * Ensure .agents directory exists
 */
export async function ensureAgentsDir(targetDir: string = '.'): Promise<string> {
  const agentsDir = getAgentsDir(targetDir);
  await fs.ensureDir(agentsDir);
  return agentsDir;
}

/**
 * Check if a skill is installed
 */
export async function isSkillInstalled(skillFolderName: string, targetDir: string = '.'): Promise<boolean> {
  const skillPath = path.join(getAgentsDir(targetDir), skillFolderName);
  return fs.pathExists(skillPath);
}

/**
 * Get list of installed skill folders
 */
export async function getInstalledSkills(targetDir: string = '.'): Promise<string[]> {
  const agentsDir = getAgentsDir(targetDir);
  
  if (!await fs.pathExists(agentsDir)) {
    return [];
  }

  const items = await fs.readdir(agentsDir, { withFileTypes: true });
  return items
    .filter(item => item.isDirectory() && item.name.endsWith('-skills'))
    .map(item => item.name);
}

/**
 * Copy skill folder to .agents
 */
export async function copySkillFolder(
  sourcePath: string, 
  skillFolderName: string, 
  targetDir: string = '.'
): Promise<string> {
  const agentsDir = await ensureAgentsDir(targetDir);
  const destPath = path.join(agentsDir, skillFolderName);
  
  await fs.copy(sourcePath, destPath, { overwrite: true });
  return destPath;
}

/**
 * Remove skill folder from .agents
 */
export async function removeSkillFolder(
  skillFolderName: string, 
  targetDir: string = '.'
): Promise<boolean> {
  const skillPath = path.join(getAgentsDir(targetDir), skillFolderName);
  
  if (await fs.pathExists(skillPath)) {
    await fs.remove(skillPath);
    return true;
  }
  return false;
}

/**
 * Get the skills source directory (bundled with package)
 */
export function getSkillsSourceDir(): string {
  return path.join(__dirname, '..', '..', 'skills');
}
