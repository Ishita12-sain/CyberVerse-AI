import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import { spacing, borderRadius } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { Text } from '../components/ui/Text';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { AuthBackground } from '../components/auth/AuthBackground';
import { AppHeader } from '../components/navigation/AppHeader';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Password validation rules
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

  const isPasswordValid =
    hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;

  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const canSubmit =
    currentPassword.length > 0 && isPasswordValid && passwordsMatch && !isLoading;

  let inlineError = '';
  if (newPassword.length > 0 && !hasMinLength) {
    inlineError = 'Password must contain at least 8 characters.';
  } else if (newPassword.length > 0 && !isPasswordValid) {
    inlineError = 'Password must meet all security requirements below.';
  } else if (confirmPassword.length > 0 && !passwordsMatch) {
    inlineError = 'Passwords do not match.';
  }

  const handleUpdate = () => {
    if (!canSubmit) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <AuthBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        <AppHeader title="CHANGE PASSWORD" subtitle="✦ SECURITY CENTER" showBack />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {isSuccess ? (
            <View style={[styles.successCard, { backgroundColor: colors.surface, borderColor: colors.success }]}>
              <Text style={styles.successIcon}>✓</Text>
              <Text variant="h2" color={colors.success} style={styles.successTitle}>
                PASSWORD UPDATED
              </Text>
              <Text variant="body" color={colors.textSecondary} style={styles.successSub}>
                Your account password has been updated successfully.
              </Text>
              <Button
                title="BACK TO SETTINGS"
                variant="primary"
                onPress={() => router.replace('/settings')}
                style={styles.successBtn}
              />
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Text variant="h2" style={styles.headingTitle}>
                UPDATE PASSWORD
              </Text>
              <Text variant="body" color={colors.textSecondary} style={styles.headingSub}>
                Keep your CyberVerse AI account secure with a strong password.
              </Text>

              {/* Current Password Field */}
              <View style={styles.fieldBox}>
                <Text variant="caption" color={colors.textMuted} style={styles.fieldLabel}>
                  CURRENT PASSWORD
                </Text>
                <Input
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="Enter current password"
                  secureTextEntry={!showCurrent}
                />
                <Pressable
                  onPress={() => setShowCurrent(!showCurrent)}
                  style={styles.toggleBtn}
                >
                  <Text variant="caption" color={colors.accent}>
                    {showCurrent ? 'HIDE' : 'SHOW'}
                  </Text>
                </Pressable>
              </View>

              {/* New Password Field */}
              <View style={styles.fieldBox}>
                <Text variant="caption" color={colors.textMuted} style={styles.fieldLabel}>
                  NEW PASSWORD
                </Text>
                <Input
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Enter new password"
                  secureTextEntry={!showNew}
                />
                <Pressable
                  onPress={() => setShowNew(!showNew)}
                  style={styles.toggleBtn}
                >
                  <Text variant="caption" color={colors.accent}>
                    {showNew ? 'HIDE' : 'SHOW'}
                  </Text>
                </Pressable>
              </View>

              {/* Confirm Password Field */}
              <View style={styles.fieldBox}>
                <Text variant="caption" color={colors.textMuted} style={styles.fieldLabel}>
                  CONFIRM NEW PASSWORD
                </Text>
                <Input
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Re-enter new password"
                  secureTextEntry={!showConfirm}
                />
                <Pressable
                  onPress={() => setShowConfirm(!showConfirm)}
                  style={styles.toggleBtn}
                >
                  <Text variant="caption" color={colors.accent}>
                    {showConfirm ? 'HIDE' : 'SHOW'}
                  </Text>
                </Pressable>
              </View>

              {/* Inline Error Message */}
              {inlineError ? (
                <Text variant="caption" color={colors.error} style={styles.errorText}>
                  ⚠️ {inlineError}
                </Text>
              ) : null}

              {/* Password Requirements Checklist */}
              <View style={[styles.checklistCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text variant="caption" color={colors.textMuted} style={styles.checklistTitle}>
                  PASSWORD REQUIREMENTS
                </Text>

                <View style={styles.checkRow}>
                  <Text style={{ color: hasMinLength ? colors.success : colors.textMuted }}>
                    {hasMinLength ? '✓' : '○'}
                  </Text>
                  <Text variant="caption" color={hasMinLength ? colors.textPrimary : colors.textMuted}>
                    At least 8 characters
                  </Text>
                </View>

                <View style={styles.checkRow}>
                  <Text style={{ color: hasUppercase ? colors.success : colors.textMuted }}>
                    {hasUppercase ? '✓' : '○'}
                  </Text>
                  <Text variant="caption" color={hasUppercase ? colors.textPrimary : colors.textMuted}>
                    Uppercase letter (A-Z)
                  </Text>
                </View>

                <View style={styles.checkRow}>
                  <Text style={{ color: hasLowercase ? colors.success : colors.textMuted }}>
                    {hasLowercase ? '✓' : '○'}
                  </Text>
                  <Text variant="caption" color={hasLowercase ? colors.textPrimary : colors.textMuted}>
                    Lowercase letter (a-z)
                  </Text>
                </View>

                <View style={styles.checkRow}>
                  <Text style={{ color: hasNumber ? colors.success : colors.textMuted }}>
                    {hasNumber ? '✓' : '○'}
                  </Text>
                  <Text variant="caption" color={hasNumber ? colors.textPrimary : colors.textMuted}>
                    Number (0-9)
                  </Text>
                </View>

                <View style={styles.checkRow}>
                  <Text style={{ color: hasSpecial ? colors.success : colors.textMuted }}>
                    {hasSpecial ? '✓' : '○'}
                  </Text>
                  <Text variant="caption" color={hasSpecial ? colors.textPrimary : colors.textMuted}>
                    Special character (!@#$%^&*)
                  </Text>
                </View>
              </View>

              {/* Submit Update Button */}
              <Button
                title={isLoading ? 'UPDATING...' : 'UPDATE PASSWORD'}
                variant="primary"
                onPress={handleUpdate}
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
    gap: spacing.sm,
  },
  headingTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 2,
  },
  headingSub: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: spacing.xs,
  },
  fieldBox: {
    position: 'relative',
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  toggleBtn: {
    position: 'absolute',
    right: spacing.sm,
    top: 28,
  },
  errorText: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  checklistCard: {
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.xs,
    marginVertical: spacing.xs,
  },
  checklistTitle: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 2,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  submitBtn: {
    height: 48,
    marginTop: spacing.xs,
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
});
