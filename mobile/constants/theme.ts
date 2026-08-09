export interface ColorTokens {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  background: string;
  surface: string;
  surfaceElevated: string;
  surfaceOverlay: string;
  border: string;
  borderHighlight: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  accent: string;
  accentGlow: string;
  success: string;
  warning: string;
  error: string;
  badgeAiBg: string;
  badgeAiText: string;
  badgeAiBorder: string;
  badgeAiBackground: string;
  inputBackground: string;
  inputBorder: string;
  inputBorderFocused: string;
}

export const darkColors: ColorTokens = {
  primary: '#8B5CF6',
  primaryLight: '#A78BFA',
  primaryDark: '#7C3AED',
  secondary: '#6366F1',
  secondaryLight: '#818CF8',
  secondaryDark: '#4F46E5',
  background: '#070B16',
  surface: '#0D1322',
  surfaceElevated: '#131B2E',
  surfaceOverlay: 'rgba(5, 8, 16, 0.85)',
  border: 'rgba(255, 255, 255, 0.08)',
  borderHighlight: 'rgba(99, 102, 241, 0.4)',
  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textInverse: '#070B16',
  accent: '#38BDF8',
  accentGlow: 'rgba(56, 189, 248, 0.15)',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  badgeAiBg: 'rgba(139, 92, 246, 0.15)',
  badgeAiText: '#A78BFA',
  badgeAiBorder: 'rgba(139, 92, 246, 0.4)',
  badgeAiBackground: 'rgba(139, 92, 246, 0.15)',
  inputBackground: '#0D1322',
  inputBorder: 'rgba(255, 255, 255, 0.08)',
  inputBorderFocused: '#8B5CF6',
};

export const lightColors: ColorTokens = {
  primary: '#7C3AED',
  primaryLight: '#8B5CF6',
  primaryDark: '#6D28D9',
  secondary: '#4F46E5',
  secondaryLight: '#6366F1',
  secondaryDark: '#4338CA',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceElevated: '#F1F5F9',
  surfaceOverlay: 'rgba(15, 23, 42, 0.65)',
  border: '#E2E8F0',
  borderHighlight: 'rgba(124, 58, 237, 0.35)',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#64748B',
  textInverse: '#FFFFFF',
  accent: '#0284C7',
  accentGlow: 'rgba(2, 132, 199, 0.12)',
  success: '#16A34A',
  warning: '#D97706',
  error: '#DC2626',
  badgeAiBg: 'rgba(124, 58, 237, 0.1)',
  badgeAiText: '#7C3AED',
  badgeAiBorder: 'rgba(124, 58, 237, 0.3)',
  badgeAiBackground: 'rgba(124, 58, 237, 0.1)',
  inputBackground: '#FFFFFF',
  inputBorder: '#E2E8F0',
  inputBorderFocused: '#7C3AED',
};

export const colors = darkColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  massive: 48,
  giant: 64,
} as const;

export const borderRadius = {
  small: 8,
  medium: 12,
  large: 16, // Default card radius
  extraLarge: 20,
  pill: 999,
} as const;

export const typography = {
  display: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '800' as const,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  h1: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700' as const,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700' as const,
    color: colors.textPrimary,
  },
  h3: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
    color: colors.textPrimary,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400' as const,
    color: colors.textSecondary,
  },
  bodyMedium: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500' as const,
    color: colors.textPrimary,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
    color: colors.textMuted,
  },
  label: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700' as const,
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  muted: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
    color: colors.textMuted,
  },
} as const;

export const elevation = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;

export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  elevation,
} as const;

export type Theme = typeof theme;
