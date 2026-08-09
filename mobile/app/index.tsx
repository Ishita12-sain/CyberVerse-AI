import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, spacing } from '../constants/theme';
import { Text } from '../components/ui/Text';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text variant="display" align="center" style={styles.title}>
        CyberVerse AI
      </Text>
      <Text variant="body" align="center" style={styles.description}>
        Practice real-world workplace decisions with AI-powered simulations, personalized feedback, and intelligent coaching.
      </Text>
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
    marginBottom: spacing.lg,
  },
  description: {
    color: colors.textMuted,
    maxWidth: 320,
  },
});
