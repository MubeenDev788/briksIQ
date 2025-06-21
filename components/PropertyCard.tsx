import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react-native';
import { GlassCard } from './GlassCard';
import { Property } from '@/types';
import { theme } from '@/utils/theme';

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export function PropertyCard({ property, onPress, onFavorite, isFavorite }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(1)} Lac`;
    }
    return price.toLocaleString();
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <GlassCard style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: property.images[0] }} style={styles.image} />
          {onFavorite && (
            <TouchableOpacity 
              style={styles.favoriteButton} 
              onPress={(e) => {
                e.stopPropagation();
                onFavorite();
              }}
            >
              <Heart 
                size={20} 
                color={isFavorite ? theme.colors.error : theme.colors.text} 
                fill={isFavorite ? theme.colors.error : 'transparent'}
              />
            </TouchableOpacity>
          )}
          {property.featured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>Featured</Text>
            </View>
          )}
          <View style={styles.priceOverlay}>
            <Text style={styles.price}>PKR {formatPrice(property.price)}</Text>
          </View>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>{property.title}</Text>
          
          <View style={styles.locationRow}>
            <MapPin size={14} color={theme.colors.textSecondary} />
            <Text style={styles.location}>{property.location}</Text>
          </View>
          
          <View style={styles.features}>
            <View style={styles.feature}>
              <Bed size={16} color={theme.colors.textSecondary} />
              <Text style={styles.featureText}>{property.bedrooms}</Text>
            </View>
            <View style={styles.feature}>
              <Bath size={16} color={theme.colors.textSecondary} />
              <Text style={styles.featureText}>{property.bathrooms}</Text>
            </View>
            <View style={styles.feature}>
              <Square size={16} color={theme.colors.textSecondary} />
              <Text style={styles.featureText}>{property.area} sq ft</Text>
            </View>
          </View>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: theme.spacing.xs,
  },
  featuredBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  featuredText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
  priceOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: theme.spacing.sm,
  },
  price: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
  },
  content: {
    padding: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  location: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    marginLeft: theme.spacing.xs,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    marginLeft: theme.spacing.xs,
  },
});