import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { colors, spacing, borderRadius } from '../constants/theme';
import { Text } from '../components/ui/Text';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { AuthBackground } from '../components/auth/AuthBackground';
import { PasswordInput } from '../components/auth/PasswordInput';

export default function SignUpScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  // Password Requirement Checks
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  const requirementsList = [
    { label: 'At least 8 characters', satisfied: hasMinLength },
    { label: 'Uppercase letter', satisfied: hasUppercase },
    { label: 'Lowercase letter', satisfied: hasLowercase },
    { label: 'Number', satisfied: hasNumber },
    { label: 'Special character (!@#$%^&*)', satisfied: hasSpecialChar },
  ];

  const satisfiedCount = requirementsList.filter((r) => r.satisfied).length;

  let strengthLabel = 'Weak';
  let strengthColor: string = colors.error;
  let progressVariant: 'default' | 'success' | 'warning' = 'warning';

  if (satisfiedCount >= 5) {
    strengthLabel = 'Strong';
    strengthColor = colors.success;
    progressVariant = 'success';
  } else if (satisfiedCount >= 3) {
    strengthLabel = 'Medium';
    strengthColor = colors.warning;
    progressVariant = 'warning';
  } else {
    strengthLabel = 'Weak';
    strengthColor = colors.error;
    progressVariant = 'warning';
  }

  const validate = () => {
    let valid = true;
    setFullNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!fullName.trim()) {
      setFullNameError('Full name is required.');
      valid = false;
    } else if (fullName.trim().length < 2) {
      setFullNameError('Name must be at least 2 characters.');
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (satisfiedCount < 5) {
      setPasswordError('Password does not satisfy all security requirements.');
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password.');
      valid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match.');
      valid = false;
    }

    return valid;
  };

  const handleSignUp = () => {
    setInfoMessage('');
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/role-selection');
    }, 800);
  };

  return (
    <AuthBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar style="light" />

        {/* Top Header Row with Back Button */}
        <View style={styles.topHeader}>
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
            CYBERVERSE <Text variant="h3" color={colors.accent} style={styles.brandAccent}>AI</Text>
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.centerWrapper}>
              <Card elevated style={styles.authPanel}>
                {/* HUD Corner Accents */}
                <View style={[styles.cornerBracket, styles.topLeftBracket]} />
                <View style={[styles.cornerBracket, styles.topRightBracket]} />
                <View style={[styles.cornerBracket, styles.bottomLeftBracket]} />
                <View style={[styles.cornerBracket, styles.bottomRightBracket]} />

                {/* Heading */}
                <View style={styles.headingBox}>
                  <Text variant="h1" align="center" style={styles.headingTitle}>
                    CREATE ACCOUNT
                  </Text>
                  <Text variant="body" align="center" style={styles.headingSubtitle}>
                    Start your CyberVerse journey.
                  </Text>
                </View>

                {/* Form Fields */}
                <Input
                  label="FULL NAME"
                  placeholder="Enter your name"
                  value={fullName}
                  onChangeText={setFullName}
                  error={fullNameError}
                  autoCapitalize="words"
                  style={styles.inputField}
                />

                <Input
                  label="EMAIL"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  error={emailError}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.inputField}
                />

                <PasswordInput
                  label="PASSWORD"
                  placeholder="Create a password"
                  value={password}
                  onChangeText={setPassword}
                  error={passwordError}
                  style={styles.inputField}
                />

                {/* Password Strength & Real-time Indicator Box */}
                {password.length > 0 && (
                  <View style={styles.strengthBox}>
                    <View style={styles.strengthHeaderRow}>
                      <Text variant="caption" color={colors.textMuted} style={styles.strengthTitle}>
                        PASSWORD STRENGTH
                      </Text>
                      <Text variant="label" color={strengthColor} style={styles.strengthBadge}>
                        {strengthLabel}
                      </Text>
                    </View>

                    <ProgressBar
                      progress={(satisfiedCount / 5) * 100}
                      variant={progressVariant}
                      height={4}
                      style={styles.progressBar}
                    />

                    {/* Requirements Checklist */}
                    <View style={styles.requirementsContainer}>
                      {requirementsList.map((req, idx) => (
                        <View key={idx} style={styles.reqRow}>
                          <Text
                            variant="caption"
                            color={req.satisfied ? colors.success : colors.textMuted}
                            style={styles.reqIcon}
                          >
                            {req.satisfied ? '✓' : '○'}
                          </Text>
                          <Text
                            variant="caption"
                            color={req.satisfied ? colors.textPrimary : colors.textMuted}
                            style={styles.reqText}
                          >
                            {req.label}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                <PasswordInput
                  label="CONFIRM PASSWORD"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  error={confirmPasswordError}
                  style={styles.inputField}
                />

                {infoMessage ? (
                  <View style={styles.infoBanner}>
                    <Text variant="caption" color={colors.accent} align="center">
                      {infoMessage}
                    </Text>
                  </View>
                ) : null}

                <Button
                  title="CREATE ACCOUNT →"
                  variant="primary"
                  loading={loading}
                  onPress={handleSignUp}
                  style={styles.signUpButton}
                />

                <View style={styles.switchRow}>
                  <Text variant="body" color={colors.textMuted} style={styles.switchText}>
                    Already have an account?{' '}
                  </Text>
                  <Pressable onPress={() => router.push('/login')} accessibilityRole="button">
                    <Text variant="bodyMedium" color={colors.accent} style={styles.switchLink}>
                      Sign In
                    </Text>
                  </Pressable>
                </View>
              </Card>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topHeader: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  backButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    borderRadius: borderRadius.small,
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
    color: colors.textPrimary,
  },
  brandAccent: {
    textShadowColor: 'rgba(56, 189, 248, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  headerSpacer: {
    width: 60,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  centerWrapper: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  authPanel: {
    backgroundColor: '#0D1322',
    borderColor: 'rgba(168, 85, 247, 0.35)',
    borderRadius: borderRadius.large,
    padding: spacing.lg,
    position: 'relative',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  // HUD Corner Accents
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
  headingBox: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headingTitle: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '900',
    letterSpacing: 1,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  headingSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
  },
  inputField: {
    fontSize: 15,
  },
  strengthBox: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: borderRadius.small,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.25)',
    padding: spacing.sm,
    marginBottom: spacing.md,
    marginTop: -spacing.xs,
  },
  strengthHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs / 2,
  },
  strengthTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  strengthBadge: {
    fontSize: 11,
    fontWeight: '800',
  },
  progressBar: {
    marginBottom: spacing.xs,
  },
  requirementsContainer: {
    gap: 2,
  },
  reqRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reqIcon: {
    fontSize: 11,
    marginRight: spacing.xs,
    width: 12,
  },
  reqText: {
    fontSize: 11,
  },
  infoBanner: {
    padding: spacing.sm,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderRadius: borderRadius.small,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    marginBottom: spacing.md,
  },
  signUpButton: {
    height: 52,
    backgroundColor: '#8B5CF6',
    borderRadius: borderRadius.medium,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
    marginTop: spacing.xs,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  switchText: {
    fontSize: 14,
  },
  switchLink: {
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.75,
  },
});
