import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export interface MissionCardProps {
  title: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  rewardXP: number;
  objective?: string;
  estTime?: string;
  onStartMission: () => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({
  title,
  description,
  difficulty,
  rewardXP,
  objective = 'Investigate & respond',
  estTime = '15–20 min',
  onStartMission,
}) => {
  return (
    <View style={styles.container}>
      <Card elevated style={styles.card}>
        {/* Corner Brackets */}
        <View style={[styles.cornerBracket, styles.topLeftBracket]} />
        <View style={[styles.cornerBracket, styles.topRightBracket]} />
        <View style={[styles.cornerBracket, styles.bottomLeftBracket]} />
        <View style={[styles.cornerBracket, styles.bottomRightBracket]} />

        {/* Card Header */}
        <View style={styles.headerRow}>
          <Badge label="✦ NEXT MISSION" variant="AI" />
          <View style={styles.badgeGroup}>
            <Text variant="caption" color={colors.warning} style={styles.diffText}>
              {difficulty}
            </Text>
            <Text variant="caption" color={colors.accent} style={styles.rewardText}>
              +{rewardXP} XP
            </Text>
          </View>
        </View>

        {/* Mission Content */}
        <Text variant="h3" style={styles.missionTitle}>
          {title}
        </Text>
        <Text variant="body" color={colors.textMuted} style={styles.missionDesc}>
          {description}
        </Text>

        {/* Mission Metadata Items Row */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text variant="caption" color={colors.textMuted} style={styles.metaLabel}>
              OBJECTIVE
            </Text>
            <Text variant="caption" color={colors.textSecondary} style={styles.metaVal}>
              {objective}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Text variant="caption" color={colors.textMuted} style={styles.metaLabel}>
              EST. TIME
            </Text>
            <Text variant="caption" color={colors.textSecondary} style={styles.metaVal}>
              {estTime}
            </Text>
          </View>
        </View>

        {/* Primary CTA */}
        <Button
          title="START MISSION →"
          variant="primary"
          onPress={onStartMission}
          style={styles.startButton}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: '#0D1424',
    borderColor: 'rgba(99, 102, 241, 0.4)',
    borderWidth: 1.5,
    padding: spacing.md,
    position: 'relative',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
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
  bottomLeftBracket: {
    bottom: -1,
    left: -1,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderBottomLeftRadius: borderRadius.large,
  },
  bottomRightBracket: {
    bottom: -1,
    right: -1,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: borderRadius.large,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  badgeGroup: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  diffText: {
    fontSize: 10,
    fontWeight: '800',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rewardText: {
    fontSize: 10,
    fontWeight: '800',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  missionTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 4,
    color: colors.textPrimary,
  },
  missionDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: borderRadius.small,
    padding: spacing.xs + 2,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  metaVal: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 1,
  },
  startButton: {
    height: 48,
    backgroundColor: '#8B5CF6',
    borderRadius: borderRadius.medium,
  },
});
