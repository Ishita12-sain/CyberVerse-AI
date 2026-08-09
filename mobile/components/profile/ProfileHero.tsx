import React from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';

export interface ProfileHeroProps {
  name: string;
  role: string;
  level: number;
  initials: string;
  photoUri?: string | null;
  onEditPhotoPress?: () => void;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({
  name,
  role,
  level,
  initials,
  photoUri,
  onEditPhotoPress,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onEditPhotoPress}
        accessibilityRole="button"
        accessibilityLabel="Edit Profile Photo"
        style={({ pressed }) => [styles.avatarTouchBox, pressed && styles.pressed]}
      >
        <View style={styles.avatarRing}>
          <View style={styles.innerAvatar}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.photoImage} />
            ) : (
              <Text style={styles.avatarText}>{initials}</Text>
            )}
          </View>
        </View>

        {/* Camera Edit Badge Icon */}
        <View style={styles.cameraBadge}>
          <Text style={styles.cameraIcon}>📷</Text>
        </View>
      </Pressable>

      <Text variant="h1" style={styles.nameText}>
        {name.toUpperCase()}
      </Text>

      <View style={styles.badgeRow}>
        <Badge label={role} variant="AI" />
        <View style={styles.levelBadge}>
          <Text variant="caption" color={colors.accent} style={styles.levelText}>
            LEVEL {level < 10 ? `0${level}` : level}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
  },
  avatarTouchBox: {
    position: 'relative',
    marginBottom: spacing.xs + 2,
  },
  avatarRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  innerAvatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#0D1322',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 31,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8B5CF6',
    borderWidth: 1.5,
    borderColor: '#070B16',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  cameraIcon: {
    fontSize: 11,
  },
  pressed: {
    opacity: 0.8,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  nameText: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  levelBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    paddingVertical: 2,
    paddingHorizontal: spacing.xs + 2,
  },
  levelText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
});
