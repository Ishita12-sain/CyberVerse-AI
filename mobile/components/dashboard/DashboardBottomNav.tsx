import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { colors, spacing } from '../../constants/theme';
import { Text } from '../ui/Text';

export type BottomTab = 'home' | 'missions' | 'profile';

export interface DashboardBottomNavProps {
  activeTab: BottomTab;
  onSelectTab: (tab: BottomTab) => void;
}

export const DashboardBottomNav: React.FC<DashboardBottomNavProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const tabs: { id: BottomTab; label: string; icon: string }[] = [
    { id: 'home', label: 'HOME', icon: '🏠' },
    { id: 'missions', label: 'MISSIONS', icon: '🎯' },
    { id: 'profile', label: 'PROFILE', icon: '👤' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              onPress={() => onSelectTab(tab.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              style={styles.tabButton}
            >
              <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
                {tab.icon}
              </Text>
              <Text
                variant="caption"
                color={isActive ? colors.accent : colors.textMuted}
                style={[styles.tabLabel, isActive && styles.tabLabelActive]}
              >
                {tab.label}
              </Text>
              {isActive && <View style={styles.activeDot} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#070B16',
    borderTopWidth: 1,
    borderTopColor: 'rgba(99, 102, 241, 0.25)',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  content: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: spacing.xs,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    position: 'relative',
    width: 80,
  },
  tabIcon: {
    fontSize: 18,
    opacity: 0.6,
    marginBottom: 2,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  tabLabelActive: {
    fontWeight: '800',
  },
  activeDot: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
});
