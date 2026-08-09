import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { LeaderboardUser } from '../../data/leaderboard';

export interface LeaderboardRowProps {
  rank: number;
  user: LeaderboardUser;
  xp: number;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  rank,
  user,
  xp,
}) => {
  const isSelf = user.isCurrentUser;

  return (
    <View
      style={[
        styles.row,
        isSelf && styles.selfRow,
      ]}
    >
      <Text
        variant="label"
        color={isSelf ? colors.accent : colors.textMuted}
        style={styles.rankText}
      >
        #{rank}
      </Text>

      <View style={styles.avatarCircle}>
        <Text style={styles.avatarText}>{user.avatarInitials}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text
          variant="label"
          color={isSelf ? colors.textPrimary : colors.textPrimary}
          style={styles.name}
          numberOfLines={1}
        >
          {user.name} {isSelf ? '(YOU)' : ''}
        </Text>
        <Text variant="caption" color={colors.textMuted} style={styles.role}>
          {user.role}
        </Text>
      </View>

      <Text
        variant="label"
        color={isSelf ? colors.accent : colors.textPrimary}
        style={styles.xpText}
      >
        {xp.toLocaleString()} XP
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: '#0D1322',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: spacing.xs,
  },
  selfRow: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  rankText: {
    width: 32,
    fontSize: 12,
    fontWeight: '900',
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  infoBox: {
    flex: 1,
    paddingRight: spacing.xs,
  },
  name: {
    fontSize: 12,
    fontWeight: '800',
  },
  role: {
    fontSize: 10,
    marginTop: 1,
  },
  xpText: {
    fontSize: 12,
    fontWeight: '900',
  },
});
