import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import { colors, spacing, borderRadius } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { Text } from '../components/ui/Text';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { AuthBackground } from '../components/auth/AuthBackground';
import { AppHeader } from '../components/navigation/AppHeader';

const ISSUE_CATEGORIES = [
  'Account',
  'Missions',
  'AI Coach',
  'XP / Progress',
  'Technical Issue',
  'Other',
];

export default function SupportFormScreen() {
  const router = useRouter();
  const { colors: activeColors, isDark } = useTheme();

  const [name, setName] = useState('Alex');
  const [email, setEmail] = useState('alex@cyberverse.ai');
  const [selectedIssue, setSelectedIssue] = useState('Technical Issue');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const canSubmit = name.trim() && email.trim() && message.trim() && !isLoading;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <AuthBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        <AppHeader title="CONTACT SUPPORT" subtitle="✦ SUPPORT REQUEST" showBack />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {isSubmitted ? (
            <View style={[styles.successCard, { backgroundColor: activeColors.surface, borderColor: activeColors.success }]}>
              <Text style={styles.successIcon}>✓</Text>
              <Text variant="h2" color={activeColors.success} style={styles.successTitle}>
                REQUEST SUBMITTED
              </Text>
              <Text variant="body" color={activeColors.textSecondary} style={styles.successSub}>
                Thanks! Our support team will review your request and get back to you shortly.
              </Text>
              <Button
                title="BACK TO HELP CENTER"
                variant="primary"
                onPress={() => router.replace('/help')}
                style={styles.successBtn}
              />
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Text variant="h2" style={styles.title}>
                SUBMIT SUPPORT TICKET
              </Text>
              <Text variant="body" color={activeColors.textSecondary} style={styles.sub}>
                Let us know what issue or question you have with CyberVerse.
              </Text>

              {/* Name Field */}
              <Input label="YOUR NAME" value={name} onChangeText={setName} placeholder="Enter your name" />

              {/* Email Field */}
              <Input label="EMAIL ADDRESS" value={email} onChangeText={setEmail} placeholder="Enter your email" keyboardType="email-address" />

              {/* Issue Category Chips */}
              <View style={styles.issueSection}>
                <Text variant="caption" color={activeColors.textMuted} style={styles.issueLabel}>
                  ISSUE CATEGORY
                </Text>
                <View style={styles.chipRow}>
                  {ISSUE_CATEGORIES.map((cat) => {
                    const isActive = selectedIssue === cat;
                    return (
                      <Pressable
                        key={cat}
                        onPress={() => setSelectedIssue(cat)}
                        style={({ pressed }) => [
                          styles.chip,
                          isActive && styles.activeChip,
                          pressed && styles.pressed,
                        ]}
                      >
                        <Text
                          variant="caption"
                          color={isActive ? activeColors.textPrimary : activeColors.textMuted}
                          style={styles.chipText}
                        >
                          {cat}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              {/* Message Field */}
              <Input
                label="MESSAGE"
                value={message}
                onChangeText={setMessage}
                placeholder="Describe your issue or question in detail..."
                multiline
                numberOfLines={4}
                style={styles.textArea}
              />

              <Button
                title={isLoading ? 'SUBMITTING...' : 'SEND REQUEST →'}
                variant="primary"
                onPress={handleSubmit}
                disabled={!canSubmit}
                style={styles.submitBtn}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  formContainer: {
    gap: spacing.xs,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 2,
  },
  sub: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: spacing.sm,
  },
  issueSection: {
    marginBottom: spacing.md,
  },
  issueLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: spacing.sm + 2,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  activeChip: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 10,
    fontWeight: '800',
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  submitBtn: {
    height: 48,
    marginTop: spacing.sm,
  },
  successCard: {
    borderRadius: borderRadius.large,
    borderWidth: 1.5,
    padding: spacing.xl,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  successIcon: {
    fontSize: 36,
    color: '#22C55E',
    fontWeight: '900',
    marginBottom: spacing.xs,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 4,
  },
  successSub: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  successBtn: {
    width: '100%',
  },
  pressed: {
    opacity: 0.8,
  },
});
