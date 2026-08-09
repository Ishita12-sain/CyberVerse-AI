import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';

export interface ActivityItem {
  id: string;
  icon: string;
  title: string;
  status: string;
  xp: number;
}

export interface RecentActivityProps {
  activities: ActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <View style={styles.container}>
      <Text variant="caption" color={colors.textMuted} style={styles.sectionTitle}>
        RECENT ACTIVITY
      </Text>

      <View style={styles.listContainer}>
        {activities.map((item) => (
          <View key={item.id} style={styles.row}>
            <View style={styles.iconBox}>
              <Text style={styles.iconText}>{item.icon}</Text>
            </View>

            <View style={styles.titleBox}>
              <Text variant="label" color={colors.textPrimary} style={styles.itemTitle}>
                {item.title}
              </Text>
              <Text variant="caption" color={colors.success} style={styles.itemStatus}>
                {item.status}
              </Text>
            </View>

            <Text variant="label" color={colors.accent} style={styles.xpText}>
              +{item.xp} XP
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  listContainer: {
    backgroundColor: '#0D1322',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs + 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  iconBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  iconText: {
    fontSize: 11,
    color: colors.success,
  },
  titleBox: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  itemStatus: {
    fontSize: 10,
    marginTop: 1,
  },
  xpText: {
    fontSize: 11,
    fontWeight: '800',
  },
});
