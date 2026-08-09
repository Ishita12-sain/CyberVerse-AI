import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';

export interface ScenarioCardProps {
  title: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  rewardXP: number;
  estimatedTime: string;
  scenario: string;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  title,
  difficulty,
  rewardXP,
  estimatedTime,
  scenario,
}) => {
  return (
    <Card elevated style={styles.card}>
      {/* HUD Corner Accents */}
      <View style={[styles.cornerBracket, styles.topLeftBracket]} />
      <View style={[styles.cornerBracket, styles.topRightBracket]} />
      <View style={[styles.cornerBracket, styles.bottomLeftBracket]} />
      <View style={[styles.cornerBracket, styles.bottomRightBracket]} />

      {/* Meta Row */}
      <View style={styles.headerRow}>
        <Text variant="h2" style={styles.titleText}>
          ✦ {title}
        </Text>
        <View style={styles.badgeRow}>
          <Text variant="caption" color={colors.warning} style={styles.diffBadge}>
            {difficulty}
          </Text>
          <Text variant="caption" color={colors.accent} style={styles.rewardBadge}>
            +{rewardXP} XP
          </Text>
          <Text variant="caption" color={colors.textMuted} style={styles.timeBadge}>
            ⏱ {estimatedTime}
          </Text>
        </View>
      </View>

      {/* Scenario Situation Body */}
      <View style={styles.situationBox}>
        <Text variant="caption" color={colors.badgeAiText} style={styles.situationLabel}>
          SITUATION
        </Text>
        <Text variant="body" color={colors.textPrimary} style={styles.scenarioText}>
          {scenario}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0D1322',
    borderColor: 'rgba(168, 85, 247, 0.35)',
    borderWidth: 1,
    borderRadius: borderRadius.large,
    padding: spacing.md,
    position: 'relative',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
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
    marginBottom: spacing.sm,
  },
  titleText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
    color: colors.textPrimary,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  diffBadge: {
    fontSize: 10,
    fontWeight: '800',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rewardBadge: {
    fontSize: 10,
    fontWeight: '800',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timeBadge: {
    fontSize: 10,
    fontWeight: '700',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  situationBox: {
    padding: spacing.sm,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: borderRadius.small,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  situationLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  scenarioText: {
    fontSize: 13,
    lineHeight: 19,
  },
});
