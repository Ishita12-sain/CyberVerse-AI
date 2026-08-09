import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../../constants/theme';
import { Text } from '../ui/Text';

export interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pressable
          onPress={() => router.replace('/')}
          accessibilityRole="button"
          accessibilityLabel="Back to home"
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Text variant="label" color={colors.accent} style={styles.backText}>
            ← BACK
          </Text>
        </Pressable>

        <Text variant="h3" style={styles.brandTitle}>
          CYBERVERSE <Text variant="h3" color={colors.accent}>AI</Text>
        </Text>

        <View style={styles.placeholderRight} />
      </View>

      <View style={styles.titleSection}>
        <Text variant="h1" align="center" style={styles.heading}>
          {title}
        </Text>
        <Text variant="body" align="center" style={styles.subtitle}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.xs,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
  },
  backButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  backText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  brandTitle: {
    fontWeight: '800',
    letterSpacing: 1.5,
    fontSize: 14,
  },
  placeholderRight: {
    width: 60,
  },
  titleSection: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
  heading: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '900',
    letterSpacing: 1,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    maxWidth: 280,
  },
  pressed: {
    opacity: 0.7,
  },
});
