import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '@/utils/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof theme.spacing;
}

export function GlassCard({ children, style, padding = 'md' }: GlassCardProps) {
  return (
    <View style={[
      styles.container,
      { padding: theme.spacing[padding] },
      style
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
});