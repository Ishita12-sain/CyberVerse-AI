import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors, spacing } from '../constants/theme';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';

export default function LoginPlaceholderScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text variant="h2" align="center" style={styles.title}>
        Login Coming Next
      </Text>
      <Text variant="body" align="center" style={styles.description}>
        Authentication and login screens will be implemented in a future step.
      </Text>
      <Button
        title="← Back to Home"
        variant="outline"
        onPress={() => router.back()}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  title: {
    marginBottom: spacing.md,
  },
  description: {
    color: colors.textMuted,
    marginBottom: spacing.xxl,
    maxWidth: 280,
  },
  button: {
    minWidth: 160,
  },
});
