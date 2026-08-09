import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { colors, spacing, borderRadius } from '../constants/theme';
import { Button } from '../components/ui/Button';
import { Text } from '../components/ui/Text';
import { TopNavigation } from '../components/landing/TopNavigation';
import { HeroSection } from '../components/landing/HeroSection';
import { FuturisticHeroWorld } from '../components/landing/FuturisticHeroWorld';
import { DecisionSection } from '../components/landing/DecisionSection';
import { MinimalFooter } from '../components/landing/MinimalFooter';

export default function LandingPage() {
  const router = useRouter();

  const handleStartJourney = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />
      <TopNavigation />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cinematic Intro Hero */}
        <HeroSection />

        {/* Futuristic Environment Visual World & Floating HUD */}
        <FuturisticHeroWorld />

        {/* Mission Launch Primary CTA */}
        <View style={styles.ctaContainer}>
          <Button
            title="START YOUR JOURNEY  →"
            variant="primary"
            onPress={handleStartJourney}
            style={styles.primaryCta}
          />
        </View>

        {/* Second Section: Decision Outcome */}
        <DecisionSection />

        {/* Bottom Tagline & Brand End */}
        <View style={styles.bottomTaglineRow}>
          <Text variant="caption" color={colors.textMuted} style={styles.bottomTagline}>
            SIMULATE  •  DECIDE  •  GROW
          </Text>
        </View>
        <MinimalFooter />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#04060E', // Sci-fi deep black/navy
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xs,
  },
  ctaContainer: {
    marginVertical: spacing.sm,
    alignItems: 'center',
    width: '100%',
  },
  primaryCta: {
    width: '100%',
    maxWidth: 380,
    height: 52,
    borderRadius: borderRadius.medium,
    backgroundColor: '#8B5CF6', // Electric Purple / Violet
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 8,
  },
  bottomTaglineRow: {
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  bottomTagline: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
});
