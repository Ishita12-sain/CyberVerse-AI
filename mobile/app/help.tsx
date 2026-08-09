import React, { useState, useMemo } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import { colors, spacing, borderRadius } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { Text } from '../components/ui/Text';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { AuthBackground } from '../components/auth/AuthBackground';
import { AppHeader } from '../components/navigation/AppHeader';
import { MOCK_FAQ_ITEMS, FAQItem } from '../data/faq';

export default function HelpScreen() {
  const router = useRouter();
  const { colors: activeColors, isDark } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_FAQ_ITEMS;
    const q = searchQuery.toLowerCase();
    return MOCK_FAQ_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <AuthBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        <AppHeader title="HELP & SUPPORT" subtitle="✦ GUIDANCE CENTER" showBack />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Heading & Search Input */}
          <View style={styles.heroBox}>
            <Text variant="caption" color={activeColors.accent} style={styles.heroTag}>
              ✦ SUPPORT & GUIDANCE
            </Text>
            <Text variant="h1" style={styles.heroTitle}>
              HOW CAN WE HELP?
            </Text>
            <Text variant="body" color={activeColors.textSecondary} style={styles.heroSub}>
              Search frequent questions or browse topics to learn more about CyberVerse.
            </Text>

            <View style={styles.searchBox}>
              <Input
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search help topics or questions..."
              />
            </View>
          </View>

          {/* FAQ Accordion List */}
          <View style={styles.faqSection}>
            <Text variant="caption" color={activeColors.textMuted} style={styles.sectionTitle}>
              FREQUENTLY ASKED QUESTIONS ({filteredFaqs.length})
            </Text>

            {filteredFaqs.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text variant="body" color={activeColors.textMuted}>
                  No questions match your search.
                </Text>
              </View>
            ) : (
              filteredFaqs.map((item) => {
                const isExpanded = expandedId === item.id;
                return (
                  <Card key={item.id} style={styles.faqCard}>
                    <Pressable
                      onPress={() => toggleAccordion(item.id)}
                      accessibilityRole="button"
                      style={({ pressed }) => [styles.accordionHeader, pressed && styles.pressed]}
                    >
                      <Text variant="label" color={activeColors.textPrimary} style={styles.questionText}>
                        {item.question}
                      </Text>
                      <Text style={styles.chevronIcon}>{isExpanded ? '▲' : '▼'}</Text>
                    </Pressable>

                    {isExpanded && (
                      <View style={styles.accordionBody}>
                        <Text variant="body" color={activeColors.textSecondary} style={styles.answerText}>
                          {item.answer}
                        </Text>
                      </View>
                    )}
                  </Card>
                );
              })
            )}
          </View>

          {/* Still Need Help Box */}
          <View style={styles.contactSupportCard}>
            <Text variant="h3" style={styles.contactTitle}>
              STILL NEED HELP?
            </Text>
            <Text variant="body" color={activeColors.textSecondary} style={styles.contactSub}>
              Can't find what you're looking for? Contact our support team directly.
            </Text>
            <Button
              title="CONTACT SUPPORT →"
              variant="primary"
              onPress={() => router.push('/support')}
              style={styles.contactBtn}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
  heroBox: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  heroTag: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 2,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 2,
  },
  heroSub: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: spacing.sm,
  },
  searchBox: {
    marginTop: spacing.xs,
  },
  faqSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.xs + 2,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  emptyBox: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  faqCard: {
    backgroundColor: '#0D1322',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    padding: 0,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  questionText: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
    paddingRight: spacing.xs,
  },
  chevronIcon: {
    fontSize: 10,
    color: colors.textMuted,
  },
  accordionBody: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.04)',
    paddingTop: spacing.xs,
  },
  answerText: {
    fontSize: 12,
    lineHeight: 18,
  },
  contactSupportCard: {
    marginHorizontal: spacing.md,
    backgroundColor: 'rgba(139, 92, 246, 0.12)',
    borderColor: 'rgba(139, 92, 246, 0.35)',
    borderWidth: 1,
    borderRadius: borderRadius.large,
    padding: spacing.md,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 4,
  },
  contactSub: {
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  contactBtn: {
    width: '100%',
  },
  pressed: {
    opacity: 0.75,
  },
});
