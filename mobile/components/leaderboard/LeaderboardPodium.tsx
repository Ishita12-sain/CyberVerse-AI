import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { LeaderboardUser } from '../../data/leaderboard';

export interface PodiumProps {
  topUsers: { user: LeaderboardUser; rank: number; xp: number }[];
}

export const LeaderboardPodium: React.FC<PodiumProps> = ({ topUsers }) => {
  const first = topUsers.find((u) => u.rank === 1);
  const second = topUsers.find((u) => u.rank === 2);
  const third = topUsers.find((u) => u.rank === 3);

  return (
    <View style={styles.container}>
      {/* Rank #2 (Silver - Left) */}
      {second && (
        <View style={[styles.podiumCol, styles.secondCol]}>
          <View style={[styles.avatarRing, styles.silverRing]}>
            <Text style={styles.avatarText}>{second.user.avatarInitials}</Text>
            <View style={[styles.rankBadge, styles.silverBadge]}>
              <Text style={styles.rankNumText}>2</Text>
            </View>
          </View>
          <Text variant="label" color={colors.textPrimary} style={styles.name} numberOfLines={1}>
            {second.user.name.split(' ')[0]}
          </Text>
          <Text variant="caption" color={colors.textMuted} style={styles.xp}>
            {second.xp.toLocaleString()} XP
          </Text>
          <View style={[styles.stepBar, styles.secondStep]} />
        </View>
      )}

      {/* Rank #1 (Gold - Center) */}
      {first && (
        <View style={[styles.podiumCol, styles.firstCol]}>
          <View style={styles.crownBox}>
            <Text style={styles.crownIcon}>👑</Text>
          </View>
          <View style={[styles.avatarRing, styles.goldRing]}>
            <Text style={styles.avatarText}>{first.user.avatarInitials}</Text>
            <View style={[styles.rankBadge, styles.goldBadge]}>
              <Text style={styles.rankNumText}>1</Text>
            </View>
          </View>
          <Text variant="label" color={colors.textPrimary} style={styles.name} numberOfLines={1}>
            {first.user.name.split(' ')[0]}
          </Text>
          <Text variant="caption" color={colors.warning} style={styles.xpGold}>
            {first.xp.toLocaleString()} XP
          </Text>
          <View style={[styles.stepBar, styles.firstStep]} />
        </View>
      )}

      {/* Rank #3 (Bronze - Right) */}
      {third && (
        <View style={[styles.podiumCol, styles.thirdCol]}>
          <View style={[styles.avatarRing, styles.bronzeRing]}>
            <Text style={styles.avatarText}>{third.user.avatarInitials}</Text>
            <View style={[styles.rankBadge, styles.bronzeBadge]}>
              <Text style={styles.rankNumText}>3</Text>
            </View>
          </View>
          <Text variant="label" color={colors.textPrimary} style={styles.name} numberOfLines={1}>
            {third.user.name.split(' ')[0]}
          </Text>
          <Text variant="caption" color={colors.textMuted} style={styles.xp}>
            {third.xp.toLocaleString()} XP
          </Text>
          <View style={[styles.stepBar, styles.thirdStep]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    marginVertical: spacing.md,
    gap: spacing.sm,
  },
  podiumCol: {
    alignItems: 'center',
    flex: 1,
    maxWidth: 100,
  },
  firstCol: {
    zIndex: 2,
  },
  secondCol: {
    zIndex: 1,
  },
  thirdCol: {
    zIndex: 1,
  },
  crownBox: {
    marginBottom: -4,
  },
  crownIcon: {
    fontSize: 16,
  },
  avatarRing: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#0D1322',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: spacing.xs,
  },
  goldRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: '#F59E0B',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  silverRing: {
    borderColor: '#94A3B8',
  },
  bronzeRing: {
    borderColor: '#D97706',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  rankBadge: {
    position: 'absolute',
    bottom: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#070B16',
  },
  goldBadge: {
    backgroundColor: '#F59E0B',
  },
  silverBadge: {
    backgroundColor: '#94A3B8',
  },
  bronzeBadge: {
    backgroundColor: '#D97706',
  },
  rankNumText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000000',
  },
  name: {
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
  xp: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 1,
  },
  xpGold: {
    fontSize: 11,
    fontWeight: '900',
    marginTop: 1,
  },
  stepBar: {
    width: '100%',
    borderRadius: borderRadius.small,
    marginTop: spacing.xs,
  },
  firstStep: {
    height: 36,
    backgroundColor: 'rgba(245, 158, 11, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  secondStep: {
    height: 26,
    backgroundColor: 'rgba(148, 163, 184, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.3)',
  },
  thirdStep: {
    height: 18,
    backgroundColor: 'rgba(217, 119, 6, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.3)',
  },
});
