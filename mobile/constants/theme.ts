export const colors = {
  // Base Palette
  background: '#080B14',
  surface: '#111827',
  surfaceElevated: '#172033',
  primary: '#6366F1',
  secondary: '#8B5CF6',
  accent: '#38BDF8',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  textPrimary: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textMuted: '#94A3B8',
  border: '#263248',

  // Semantic Aliases
  cardBackground: '#111827',
  cardBackgroundElevated: '#172033',
  inputBackground: '#111827',
  inputBorder: '#263248',
  inputBorderFocused: '#6366F1',
  badgeAiBackground: 'rgba(99, 102, 241, 0.15)',
  badgeAiBorder: '#6366F1',
  badgeAiText: '#38BDF8',
} as const;

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
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700' as const,
    color: colors.textPrimary,
  },
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
    color: colors.textPrimary,
  },
  h2: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '600' as const,
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
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600' as const,
    color: colors.textPrimary,
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
