import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';

export interface LevelCardProps {
  level: number;
  xp: number;
  xpProgress: number;
  xpToNextLevel: number;
}

export const LevelCard: React.FC<LevelCardProps> = ({
  level,
  xp,
  xpProgress,
  xpToNextLevel,
}) => {
  return (
    <Card elevated style={styles.card}>
      {/* Corner Bracket Accents */}
      <View style={[styles.cornerBracket, styles.topLeftBracket]} />
      <View style={[styles.cornerBracket, styles.topRightBracket]} />

      <View style={styles.headerRow}>
        <View style={styles.rankBadgeBox}>
          <Text style={styles.rankIcon}>🛡️</Text>
          <View>
            <Text variant="caption" color={colors.textMuted} style={styles.label}>
              CURRENT RANK
            </Text>
            <Text variant="h1" color={colors.accent} style={styles.levelText}>
              LEVEL {level < 10 ? `0${level}` : level}
            </Text>
          </View>
        </View>

        <View style={styles.xpBox}>
          <Text variant="h2" color={colors.textPrimary} style={styles.xpText}>
            {xp.toLocaleString()} XP
          </Text>
          <Text variant="caption" color={colors.badgeAiText} style={styles.percentText}>
            {xpProgress}%
          </Text>
        </View>
      </View>

      <ProgressBar progress={xpProgress} variant="default" height={8} style={styles.progress} />

      <View style={styles.footerRow}>
        <Text variant="caption" color={colors.textMuted}>
          {xpToNextLevel} XP to Level {level + 1 < 10 ? `0${level + 1}` : level + 1}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: '#0D1322',
    borderColor: 'rgba(168, 85, 247, 0.35)',
    padding: spacing.md,
    position: 'relative',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  cornerBracket: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderColor: colors.accent,
  },
  topLeftBracket: {
    top: -1,
    left: -1,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderTopLeftRadius: borderRadius.large,
  },
  topRightBracket: {
    top: -1,
    right: -1,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderTopRightRadius: borderRadius.large,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  rankBadgeBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankIcon: {
    fontSize: 26,
    marginRight: spacing.sm,
    textShadowColor: 'rgba(99, 102, 241, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  label: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  levelText: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '900',
  },
  xpBox: {
    alignItems: 'flex-end',
  },
  xpText: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '800',
  },
  percentText: {
    fontSize: 11,
    fontWeight: '800',
  },
  progress: {
    marginBottom: spacing.xs,
  },
  footerRow: {
    alignItems: 'flex-end',
  },
});
