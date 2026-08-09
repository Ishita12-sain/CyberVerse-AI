export interface UserProgressData {
  name: string;
  role: string;
  avatarInitials: string;
  profilePhotoUri?: string | null;
  xp: number;
  streak: number;
  completedMissionsCount: number;
  overallScore: number;
}

export const USER_PROGRESS: UserProgressData = {
  name: 'Alex',
  role: 'IT & TECHNOLOGY',
  avatarInitials: 'A',
  profilePhotoUri: null,
  xp: 1240,
  streak: 7,
  completedMissionsCount: 12,
  overallScore: 86,
};
