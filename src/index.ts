/**
 * Agent Skills - Main Entry Point
 * 
 * Programmatic API for agent-skills package
 */

export { installSkills, InstallOptions } from './commands/install';
export { listSkills, ListOptions } from './commands/list';
export { removeSkills, RemoveOptions } from './commands/remove';
export { initAgents, InitOptions } from './commands/init';
export { 
  getAllSkills, 
  getSkill, 
  skillExists, 
  SkillInfo, 
  SkillWithId, 
  SkillRegistry 
} from './registry';
