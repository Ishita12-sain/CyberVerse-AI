import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { colors, spacing, borderRadius } from '../constants/theme';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AuthBackground } from '../components/auth/AuthBackground';
import { RoleCard } from '../components/role/RoleCard';
import { ROLES } from '../data/roles';

export default function RoleSelectionScreen() {
  const router = useRouter();
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selectedRoleId) return;
    router.push('/dashboard');
  };

  return (
    <AuthBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar style="light" />

        {/* Top Header Bar */}
        <View style={styles.topHeader}>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Back"
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

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Centered Main Area Container */}
          <View style={styles.centerWrapper}>
            {/* Eyebrow Badge */}
            <Badge
              label="✦ YOUR PROFILE"
              variant="AI"
              style={styles.eyebrow}
            />

            {/* Screen Titles */}
            <Text variant="h1" align="center" style={styles.headingTitle}>
              CHOOSE YOUR ROLE
            </Text>
            <Text variant="body" align="center" style={styles.headingSubtitle}>
              Choose a role to personalize your workplace simulations.
            </Text>

            {/* 8-Role 2-Column Responsive Grid */}
            <View style={styles.grid}>
              {ROLES.map((role) => (
                <View key={role.id} style={styles.gridCol}>
                  <RoleCard
                    id={role.id}
                    title={role.title}
                    description={role.description}
                    icon={role.icon}
                    selected={selectedRoleId === role.id}
                    onSelect={(id) => setSelectedRoleId(id)}
                  />
                </View>
              ))}
            </View>

            {/* Continue Primary CTA Button */}
            <Button
              title="CONTINUE →"
              variant="primary"
              disabled={!selectedRoleId}
              onPress={handleContinue}
              style={[
                styles.continueButton,
                !selectedRoleId && styles.continueButtonDisabled,
              ]}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topHeader: {
    height: 46,
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center', // Vertically center selection experience
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  centerWrapper: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    alignItems: 'center',
  },
  eyebrow: {
    marginBottom: spacing.xs / 2,
    borderColor: 'rgba(168, 85, 247, 0.4)',
    backgroundColor: 'rgba(168, 85, 247, 0.12)',
  },
  headingTitle: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '900',
    letterSpacing: 1,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  headingSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginBottom: spacing.md,
    maxWidth: 320,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs + 2,
    marginBottom: spacing.md,
    width: '100%',
  },
  gridCol: {
    width: '48.5%', // 2-column layout
  },
  continueButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#8B5CF6',
    borderRadius: borderRadius.medium,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  continueButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    shadowOpacity: 0,
    elevation: 0,
  },
  pressed: {
    opacity: 0.75,
  },
});
