import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SlidersHorizontal, MapPin, Filter } from 'lucide-react-native';
import { SearchBar } from '@/components/SearchBar';
import { PropertyCard } from '@/components/PropertyCard';
import { GlassCard } from '@/components/GlassCard';
import { AnimatedButton } from '@/components/AnimatedButton';
import { mockProperties } from '@/data/mockData';
import { theme } from '@/utils/theme';

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { label: 'All', value: null },
    { label: 'Under 5 Cr', value: 'price-low' },
    { label: '5-10 Cr', value: 'price-mid' },
    { label: '10+ Cr', value: 'price-high' },
    { label: '2 BHK', value: 'beds-2' },
    { label: '3 BHK', value: 'beds-3' },
    { label: '4+ BHK', value: 'beds-4' },
  ];

  const locations = [
    'DHA Phase 5, Lahore',
    'Gulberg III, Lahore',
    'Model Town, Lahore',
    'Emaar Canyon Views, Islamabad',
  ];

  const handlePropertyPress = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  const handleFavoriteToggle = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const filteredProperties = mockProperties.filter(property => {
    if (searchQuery) {
      return property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             property.location.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Properties</Text>
        <TouchableOpacity 
          style={styles.mapButton}
          onPress={() => console.log('Map view')}
        >
          <MapPin size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <SearchBar
        placeholder="Search location, property type..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={(query) => console.log('Search:', query)}
        onFilterPress={() => setShowFilters(!showFilters)}
      />

      {/* Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.label}
                style={[
                  styles.filterChip,
                  selectedFilter === filter.value && styles.activeFilterChip
                ]}
                onPress={() => setSelectedFilter(filter.value)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedFilter === filter.value && styles.activeFilterChipText
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Popular Locations */}
      <View style={styles.locationsContainer}>
        <Text style={styles.sectionTitle}>Popular Locations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {locations.map((location, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.locationCard}
              onPress={() => setSearchQuery(location)}
            >
              <GlassCard style={styles.locationCardContent}>
                <MapPin size={16} color={theme.colors.primary} />
                <Text style={styles.locationText}>{location.split(',')[0]}</Text>
              </GlassCard>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>
          {filteredProperties.length} Properties Found
        </Text>
        <TouchableOpacity style={styles.sortButton}>
          <SlidersHorizontal size={16} color={theme.colors.textSecondary} />
          <Text style={styles.sortText}>Sort</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.propertiesList}
        showsVerticalScrollIndicator={false}
      >
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onPress={() => handlePropertyPress(property.id)}
            onFavorite={() => handleFavoriteToggle(property.id)}
            isFavorite={favorites.includes(property.id)}
          />
        ))}
        
        {filteredProperties.length === 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No properties found</Text>
            <Text style={styles.noResultsSubtext}>
              Try adjusting your search criteria
            </Text>
          </View>
        )}
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
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.fontSize.title,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  mapButton: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filtersContainer: {
    paddingLeft: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  filterChip: {
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.xl,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeFilterChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
  },
  activeFilterChipText: {
    color: theme.colors.text,
  },
  locationsContainer: {
    paddingLeft: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.xs,
  },
  locationCard: {
    marginRight: theme.spacing.sm,
  },
  locationCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  locationText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    marginLeft: theme.spacing.xs,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  resultsTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
  sortText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    marginLeft: theme.spacing.xs,
  },
  propertiesList: {
    flex: 1,
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  noResultsText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  noResultsSubtext: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
});