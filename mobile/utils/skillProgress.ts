import { MissionData } from '../types/mission';

export interface UserSkillProgress {
  name: string;
  before: number;
  after: number;
  delta: number;
}

export const INITIAL_USER_SKILLS: Record<string, number> = {
  'Risk Awareness': 68,
  'Decision Making': 72,
  'Communication': 60,
  'Leadership': 70,
  'Problem Solving': 65,
};

export const updateSkillProgress = (
  currentSkills: Record<string, number>,
  mission: MissionData,
  isCorrect: boolean
): UserSkillProgress[] => {
  const targetSkills = mission.skills || [
    { name: 'Risk Awareness', weight: 'primary' },
    { name: 'Decision Making', weight: 'secondary' },
  ];

  return targetSkills.map((s) => {
    const beforeVal = currentSkills[s.name] ?? 70;
    let delta = 0;

    if (isCorrect) {
      delta = s.weight === 'primary' ? Math.floor(Math.random() * 4) + 5 : Math.floor(Math.random() * 4) + 1; // +5..+8 or +1..+4
    } else {
      delta = s.weight === 'primary' ? -(Math.floor(Math.random() * 4) + 1) : 0; // -1..-4 or 0
    }

    const afterVal = Math.min(100, Math.max(0, beforeVal + delta));

    return {
      name: s.name,
      before: beforeVal,
      after: afterVal,
      delta: afterVal - beforeVal,
    };
  });
};
