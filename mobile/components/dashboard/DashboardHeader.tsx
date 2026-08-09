import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';

export interface DashboardHeaderProps {
  userName: string;
  onProfilePress?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  onProfilePress,
}) => {
  return (
    <View style={styles.container}>
      {/* Top Header Row */}
      <View style={styles.topRow}>
        <View>
          <Text variant="h3" style={styles.brandTitle}>
            CYBERVERSE <Text variant="h3" color={colors.accent} style={styles.brandAccent}>AI</Text>
          </Text>
          <Text variant="caption" color={colors.accent} style={styles.subTag}>
            ✦ YOUR MISSION CONTROL
          </Text>
        </View>

        <Pressable
          onPress={onProfilePress}
          accessibilityRole="button"
          accessibilityLabel="User Profile"
          style={({ pressed }) => [styles.avatarButton, pressed && styles.pressed]}
        >
          <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
        </Pressable>
      </View>

      {/* Greeting Banner */}
      <View style={styles.greetingSection}>
        <Text variant="h2" style={styles.greetingTitle}>
          GOOD MORNING, {userName.toUpperCase()}
        </Text>
        <Text variant="body" color={colors.textMuted} style={styles.greetingSub}>
          Ready for your next mission?
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    marginBottom: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  brandTitle: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: colors.textPrimary,
  },
  brandAccent: {
    textShadowColor: 'rgba(56, 189, 248, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  subTag: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginTop: 1,
  },
  avatarButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.textPrimary,
    fontWeight: '800',
    fontSize: 15,
  },
  greetingSection: {
    alignItems: 'flex-start',
  },
  greetingTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '900',
    letterSpacing: 0.5,
    color: colors.textPrimary,
  },
  greetingSub: {
    fontSize: 13,
  },
  pressed: {
    opacity: 0.8,
  },
});
