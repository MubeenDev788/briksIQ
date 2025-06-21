import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/utils/theme';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const { width } = Dimensions.get('window');

export function PropertyCardShimmer() {
  return (
    <View style={styles.card}>
      <ShimmerPlaceholder style={styles.image} />
      <View style={styles.content}>
        <ShimmerPlaceholder style={styles.title} />
        <ShimmerPlaceholder style={styles.location} />
        <View style={styles.features}>
          <ShimmerPlaceholder style={styles.feature} />
          <ShimmerPlaceholder style={styles.feature} />
          <ShimmerPlaceholder style={styles.feature} />
        </View>
      </View>
    </View>
  );
}

export function PropertyListShimmer({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <PropertyCardShimmer key={index} />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: theme.spacing.md,
  },
  title: {
    width: '80%',
    height: 20,
    marginBottom: theme.spacing.sm,
  },
  location: {
    width: '60%',
    height: 16,
    marginBottom: theme.spacing.sm,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feature: {
    width: 60,
    height: 16,
  },
});