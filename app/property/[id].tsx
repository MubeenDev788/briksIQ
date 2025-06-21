import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Heart, Share2, Phone, MessageCircle, Bed, Bath, Square, MapPin, Star, Shield } from 'lucide-react-native';
import { GlassCard } from '@/components/GlassCard';
import { AnimatedButton } from '@/components/AnimatedButton';
import { mockProperties } from '@/data/mockData';
import { theme } from '@/utils/theme';

const { width } = Dimensions.get('window');

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Property not found</Text>
          <AnimatedButton
            title="Go Back"
            onPress={() => router.back()}
            variant="outline"
          />
        </View>
      </SafeAreaView>
    );
  }

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(1)} Lac`;
    }
    return price.toLocaleString();
  };

  const handleCall = () => {
    Linking.openURL(`tel:${property.agentPhone}`);
  };

  const handleMessage = () => {
    Linking.openURL(`sms:${property.agentPhone}`);
  };

  const handleShare = () => {
    // In a real app, implement proper sharing
    console.log('Share property:', property.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={handleShare}
          >
            <Share2 size={20} color={theme.colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Heart 
              size={20} 
              color={isFavorite ? theme.colors.error : theme.colors.text}
              fill={isFavorite ? theme.colors.error : 'transparent'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Slider */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
          >
            {property.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.propertyImage}
              />
            ))}
          </ScrollView>
          
          {/* Image Indicators */}
          <View style={styles.imageIndicators}>
            {property.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentImageIndex && styles.activeIndicator
                ]}
              />
            ))}
          </View>

          {/* Featured Badge */}
          {property.featured && (
            <View style={styles.featuredBadge}>
              <Star size={12} color={theme.colors.text} fill={theme.colors.warning} />
              <Text style={styles.featuredText}>Featured</Text>
            </View>
          )}
        </View>

        {/* Property Info */}
        <View style={styles.content}>
          <GlassCard style={styles.infoCard}>
            <View style={styles.priceRow}>
              <Text style={styles.price}>PKR {formatPrice(property.price)}</Text>
              <View style={styles.verifiedBadge}>
                <Shield size={14} color={theme.colors.success} />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>
            
            <Text style={styles.title}>{property.title}</Text>
            
            <View style={styles.locationRow}>
              <MapPin size={16} color={theme.colors.textSecondary} />
              <Text style={styles.location}>{property.location}</Text>
            </View>

            {/* Property Features */}
            <View style={styles.features}>
              {property.bedrooms > 0 && (
                <View style={styles.feature}>
                  <Bed size={18} color={theme.colors.primary} />
                  <Text style={styles.featureText}>{property.bedrooms} Beds</Text>
                </View>
              )}
              <View style={styles.feature}>
                <Bath size={18} color={theme.colors.primary} />
                <Text style={styles.featureText}>{property.bathrooms} Baths</Text>
              </View>
              <View style={styles.feature}>
                <Square size={18} color={theme.colors.primary} />
                <Text style={styles.featureText}>{property.area} sq ft</Text>
              </View>
            </View>
          </GlassCard>

          {/* Description */}
          <GlassCard style={styles.descriptionCard}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{property.description}</Text>
          </GlassCard>

          {/* Amenities */}
          <GlassCard style={styles.amenitiesCard}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {property.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityChip}>
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </GlassCard>

          {/* Agent Info */}
          <GlassCard style={styles.agentCard}>
            <Text style={styles.sectionTitle}>Listed by</Text>
            <View style={styles.agentInfo}>
              <Image
                source={{ uri: `https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg` }}
                style={styles.agentAvatar}
              />
              <View style={styles.agentDetails}>
                <Text style={styles.agentName}>{property.agentName}</Text>
                <Text style={styles.agentTitle}>Real Estate Agent</Text>
                <Text style={styles.agentPhone}>{property.agentPhone}</Text>
              </View>
              <View style={styles.agentRating}>
                <Star size={16} color={theme.colors.warning} fill={theme.colors.warning} />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>
          </GlassCard>

          {/* Contact Buttons */}
          <View style={styles.contactButtons}>
            <AnimatedButton
              title="Call Agent"
              onPress={handleCall}
              variant="outline"
              style={styles.callButton}
            />
            <AnimatedButton
              title="Message"
              onPress={handleMessage}
              style={styles.messageButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  propertyImage: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: theme.spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.xs,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeIndicator: {
    backgroundColor: theme.colors.primary,
  },
  featuredBadge: {
    position: 'absolute',
    top: theme.spacing.lg,
    left: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.warning,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  featuredText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    marginLeft: theme.spacing.xs,
  },
  content: {
    padding: theme.spacing.md,
  },
  infoCard: {
    marginBottom: theme.spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  price: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.success,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  verifiedText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
    marginLeft: theme.spacing.xs,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  location: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  feature: {
    alignItems: 'center',
  },
  featureText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    marginTop: theme.spacing.xs,
    fontWeight: theme.fontWeight.medium,
  },
  descriptionCard: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  amenitiesCard: {
    marginBottom: theme.spacing.md,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  amenityChip: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  amenityText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
  agentCard: {
    marginBottom: theme.spacing.lg,
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: theme.spacing.sm,
  },
  agentDetails: {
    flex: 1,
  },
  agentName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  agentTitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  agentPhone: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
  },
  agentRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
    fontWeight: theme.fontWeight.medium,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  callButton: {
    flex: 1,
  },
  messageButton: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  errorText: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
});