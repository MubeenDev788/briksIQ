import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Heart, Search } from 'lucide-react-native';
import { PropertyCard } from '@/components/PropertyCard';
import { SearchBar } from '@/components/SearchBar';
import { mockProperties } from '@/data/mockData';
import { theme } from '@/utils/theme';

export default function FavoritesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['1', '3']); // Mock favorites

  const favoriteProperties = mockProperties.filter(property => 
    favorites.includes(property.id)
  );

  const filteredFavorites = favoriteProperties.filter(property => {
    if (searchQuery) {
      return property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             property.location.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const handlePropertyPress = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  const handleFavoriteToggle = (propertyId: string) => {
    setFavorites(prev => 
      prev.filter(id => id !== propertyId)
    );
  };

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Heart size={60} color={theme.colors.textSecondary} />
      </View>
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Properties you like will appear here. Start exploring and save your favorites!
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerSubtitle}>
          {favoriteProperties.length} saved properties
        </Text>
      </View>

      {favoriteProperties.length > 0 && (
        <SearchBar
          placeholder="Search your favorites..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSearch={(query) => console.log('Search favorites:', query)}
        />
      )}

      {favoriteProperties.length === 0 ? (
        <EmptyState />
      ) : (
        <ScrollView 
          style={styles.propertiesList}
          showsVerticalScrollIndicator={false}
        >
          {filteredFavorites.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onPress={() => handlePropertyPress(property.id)}
              onFavorite={() => handleFavoriteToggle(property.id)}
              isFavorite={true}
            />
          ))}
          
          {filteredFavorites.length === 0 && searchQuery && (
            <View style={styles.noResults}>
              <Search size={40} color={theme.colors.textSecondary} />
              <Text style={styles.noResultsText}>No matches found</Text>
              <Text style={styles.noResultsSubtext}>
                Try searching with different keywords
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.fontSize.title,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
  propertiesList: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  emptyTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  noResultsText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  noResultsSubtext: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});