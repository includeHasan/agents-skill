/**
 * Skill Registry
 * Defines all available skills and their metadata
 */

export interface SkillInfo {
  folderName: string;
  description: string;
  tags: string[];
}

export interface SkillRegistry {
  [key: string]: SkillInfo;
}

export interface SkillWithId extends SkillInfo {
  id: string;
}

export const registry: SkillRegistry = {
  'skill-writer': {
    folderName: 'skill-writer-skills',
    description: 'Universal guide for creating well-structured Agent Skills for any technology',
    tags: ['universal', 'meta', 'documentation']
  },
  'flutter': {
    folderName: 'flutter-skills',
    description: 'Flutter/Dart best practices, widget patterns, and state management',
    tags: ['mobile', 'dart', 'cross-platform']
  },
  'react': {
    folderName: 'react-skills',
    description: 'React/Next.js performance optimization and patterns',
    tags: ['frontend', 'javascript', 'web']
  },
  'clean-code': {
    folderName: 'clean-code-skills',
    description: 'Universal clean code principles and refactoring patterns',
    tags: ['universal', 'refactoring', 'quality']
  },
  'typescript': {
    folderName: 'typescript-skills',
    description: 'TypeScript type patterns and best practices',
    tags: ['frontend', 'backend', 'types']
  },
  'api-design': {
    folderName: 'api-design-skills',
    description: 'REST and GraphQL API design patterns',
    tags: ['backend', 'api', 'architecture']
  },
  'git': {
    folderName: 'git-skills',
    description: 'Git workflows, commit conventions, and branching strategies',
    tags: ['universal', 'version-control', 'workflow']
  },
  'testing': {
    folderName: 'testing-skills',
    description: 'Testing strategies, patterns, and best practices',
    tags: ['universal', 'quality', 'testing']
  },
  'springboot': {
    folderName: 'springboot-skills',
    description: 'Spring Boot patterns and Java best practices',
    tags: ['backend', 'java', 'enterprise']
  },
  'node': {
    folderName: 'node-skills',
    description: 'Node.js/Express patterns and best practices',
    tags: ['backend', 'javascript', 'api']
  },
  'python': {
    folderName: 'python-skills',
    description: 'Python best practices and patterns',
    tags: ['backend', 'scripting', 'data']
  }
};

/**
 * Get skill info by ID
 */
export function getSkill(skillId: string): SkillInfo | null {
  return registry[skillId.toLowerCase()] || null;
}

/**
 * Get all available skill IDs
 */
export function getAllSkillIds(): string[] {
  return Object.keys(registry);
}

/**
 * Get all skills with full info
 */
export function getAllSkills(): SkillWithId[] {
  return Object.entries(registry).map(([id, info]) => ({
    id,
    ...info
  }));
}

/**
 * Check if skill exists
 */
export function skillExists(skillId: string): boolean {
  return skillId.toLowerCase() in registry;
}
