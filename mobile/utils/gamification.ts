export const XP_PER_LEVEL = 500;

export interface LevelInfo {
  level: number;
  currentXP: number;
  levelXP: number;
  xpToNextLevel: number;
  progressPercentage: number;
}

export const getLevelFromXP = (xp: number): LevelInfo => {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const levelXP = xp % XP_PER_LEVEL;
  const xpToNextLevel = XP_PER_LEVEL - levelXP;
  const progressPercentage = Math.min(100, Math.round((levelXP / XP_PER_LEVEL) * 100));

  return {
    level,
    currentXP: xp,
    levelXP,
    xpToNextLevel,
    progressPercentage,
  };
};
