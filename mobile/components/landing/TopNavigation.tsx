import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../../constants/theme';
import { Text } from '../ui/Text';

export const TopNavigation: React.FC = () => {
  const router = useRouter();

  const handleLogoPress = () => {
    router.replace('/');
  };

  const handleSignInPress = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleLogoPress}
        accessibilityRole="button"
        accessibilityLabel="CyberVerse AI Home"
        style={({ pressed }) => [styles.logoButton, pressed && styles.pressed]}
      >
        <Text variant="h3" style={styles.brandTitle}>
          CYBERVERSE <Text variant="h3" color={colors.accent}>AI</Text>
        </Text>
      </Pressable>

      <Pressable
        onPress={handleSignInPress}
        accessibilityRole="button"
        accessibilityLabel="Sign In"
        style={({ pressed }) => [styles.signInButton, pressed && styles.pressed]}
      >
        <Text variant="label" color={colors.accent} style={styles.signInText}>
          SIGN IN →
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 102, 241, 0.15)',
  },
  logoButton: {
    paddingVertical: spacing.xs,
  },
  brandTitle: {
    fontWeight: '800',
    letterSpacing: 1.5,
    fontSize: 16,
    color: colors.textPrimary,
  },
  signInButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  signInText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  pressed: {
    opacity: 0.75,
  },
});
