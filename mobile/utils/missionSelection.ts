import { MissionData, MissionDifficulty } from '../types/mission';
import { MISSION_LIBRARY } from '../data/missions';

/**
 * Resolves a mission by its unique ID string.
 */
export const getMissionById = (id: string): MissionData | undefined => {
  return MISSION_LIBRARY.find((m) => m.id === id);
};

/**
 * Resolves all missions belonging to a given category.
 */
export const getMissionsByCategory = (category: string): MissionData[] => {
  return MISSION_LIBRARY.filter(
    (m) => m.category.toLowerCase() === category.toLowerCase()
  );
};

/**
 * Resolves all missions belonging to a given difficulty level.
 */
export const getMissionsByDifficulty = (difficulty: MissionDifficulty): MissionData[] => {
  return MISSION_LIBRARY.filter((m) => m.difficulty === difficulty);
};

/**
 * Deterministically generates a daily selection of 3 missions based on date string and optional user role.
 * Refreshing or re-rendering on the same day guarantees the same 3 missions.
 */
export const getDailyMissions = (dateInput?: Date | string, userRole?: string): MissionData[] => {
  const dateStr = dateInput
    ? typeof dateInput === 'string'
      ? dateInput
      : dateInput.toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  // Simple deterministic hash based on date string
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);

  let pool = MISSION_LIBRARY;

  // Prioritize role-relevant categories if userRole is provided
  if (userRole) {
    const roleLower = userRole.toLowerCase();
    let relevantCategories: string[] = [];

    if (roleLower.includes('cyber') || roleLower.includes('it') || roleLower.includes('tech')) {
      relevantCategories = ['cybersecurity', 'it & technology', 'data & analytics'];
    } else if (roleLower.includes('hr') || roleLower.includes('human')) {
      relevantCategories = ['human resources', 'management & leadership'];
    } else if (roleLower.includes('finance') || roleLower.includes('acc')) {
      relevantCategories = ['finance', 'operations', 'legal & compliance'];
    } else if (roleLower.includes('sales') || roleLower.includes('market')) {
      relevantCategories = ['sales & marketing', 'management & leadership'];
    } else if (roleLower.includes('ops') || roleLower.includes('operation')) {
      relevantCategories = ['operations', 'finance', 'it & technology'];
    }

    if (relevantCategories.length > 0) {
      const filtered = MISSION_LIBRARY.filter((m) =>
        relevantCategories.includes(m.category.toLowerCase())
      );
      if (filtered.length >= 3) {
        pool = filtered;
      }
    }
  }

  const index1 = positiveHash % pool.length;
  const index2 = (positiveHash + 7) % pool.length;
  const index3 = (positiveHash + 19) % pool.length;

  const selected = [pool[index1], pool[index2], pool[index3]];

  // Deduplicate in rare hash overlap
  const uniqueMissions = Array.from(new Set(selected));
  while (uniqueMissions.length < 3) {
    const fallbackIndex = (uniqueMissions.length * 11) % MISSION_LIBRARY.length;
    if (!uniqueMissions.includes(MISSION_LIBRARY[fallbackIndex])) {
      uniqueMissions.push(MISSION_LIBRARY[fallbackIndex]);
    }
  }

  return uniqueMissions;
};
