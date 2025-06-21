import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { Bot, Zap, TrendingUp, MapPin, Building2, Users, ChartBar as BarChart3 } from 'lucide-react-native';
import { SearchBar } from '@/components/SearchBar';
import { PropertyCard } from '@/components/PropertyCard';
import { GlassCard } from '@/components/GlassCard';
import { PropertyListShimmer } from '@/components/LoadingShimmer';
import { mockProperties } from '@/data/mockData';
import { theme } from '@/utils/theme';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Get user role (in real app, this would come from auth context)
  const userRole = (global as any).userRole || 'buyer';

  const featuredProperties = mockProperties.filter(p => p.featured);
  const quickFilters = [
    { label: 'Under 5 Cr', icon: TrendingUp, value: 'price-5cr' },
    { label: 'DHA Lahore', icon: MapPin, value: 'dha-lahore' },
    { label: '3-4 Beds', icon: Zap, value: 'beds-3-4' },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 2000);
  }, []);

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

  const handleChatPress = () => {
    router.push('/chat');
  };

  const AIAssistantButton = () => (
    <Animatable.View 
      animation="pulse" 
      iterationCount="infinite"
      style={styles.aiButtonContainer}
    >
      <TouchableOpacity 
        style={styles.aiButton}
        onPress={handleChatPress}
      >
        <Bot size={28} color={theme.colors.text} />
      </TouchableOpacity>
    </Animatable.View>
  );

  // Agent Dashboard Content
  if (userRole === 'agent') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Agent Header */}
          <Animatable.View animation="fadeInDown" style={styles.header}>
            <Text style={styles.greeting}>Welcome back, Agent!</Text>
            <Text style={styles.welcomeText}>Manage your listings</Text>
          </Animatable.View>

          {/* Agent Stats */}
          <Animatable.View animation="fadeInUp" delay={300}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.statsContainer}
            >
              <GlassCard style={styles.statCard}>
                <Building2 size={24} color={theme.colors.primary} />
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Active Listings</Text>
              </GlassCard>
              <GlassCard style={styles.statCard}>
                <Users size={24} color={theme.colors.secondary} />
                <Text style={styles.statNumber}>48</Text>
                <Text style={styles.statLabel}>Inquiries</Text>
              </GlassCard>
              <GlassCard style={styles.statCard}>
                <BarChart3 size={24} color={theme.colors.warning} />
                <Text style={styles.statNumber}>2.1K</Text>
                <Text style={styles.statLabel}>Views</Text>
              </GlassCard>
            </ScrollView>
          </Animatable.View>

          {/* Quick Actions */}
          <Animatable.View animation="fadeInUp" delay={500}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
            </View>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity 
                style={styles.quickActionCard}
                onPress={() => router.push('/(tabs)/add-property')}
              >
                <GlassCard style={styles.quickActionContent}>
                  <Building2 size={32} color={theme.colors.primary} />
                  <Text style={styles.quickActionTitle}>Add Property</Text>
                  <Text style={styles.quickActionSubtitle}>List new property</Text>
                </GlassCard>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.quickActionCard}
                onPress={() => router.push('/(tabs)/search')}
              >
                <GlassCard style={styles.quickActionContent}>
                  <BarChart3 size={32} color={theme.colors.secondary} />
                  <Text style={styles.quickActionTitle}>Analytics</Text>
                  <Text style={styles.quickActionSubtitle}>View performance</Text>
                </GlassCard>
              </TouchableOpacity>
            </View>
          </Animatable.View>

          {/* My Recent Listings */}
          <Animatable.View animation="fadeInUp" delay={700}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Listings</Text>
              <TouchableOpacity onPress={() => router.push('/search')}>
                <Text style={styles.seeAllText}>View All</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>

          {loading ? (
            <PropertyListShimmer count={2} />
          ) : (
            <View style={styles.propertiesList}>
              {featuredProperties.slice(0, 3).map((property, index) => (
                <Animatable.View 
                  key={property.id}
                  animation="fadeInUp" 
                  delay={800 + (index * 200)}
                >
                  <PropertyCard
                    property={property}
                    onPress={() => handlePropertyPress(property.id)}
                    onFavorite={() => handleFavoriteToggle(property.id)}
                    isFavorite={favorites.includes(property.id)}
                  />
                </Animatable.View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* AI Assistant Button */}
        <AIAssistantButton />
      </SafeAreaView>
    );
  }

  // Buyer Dashboard Content (Original)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animatable.View animation="fadeInDown" style={styles.header}>
          <Text style={styles.greeting}>Good Morning!</Text>
          <Text style={styles.welcomeText}>Find your dream home</Text>
        </Animatable.View>

        {/* Search Bar */}
        <Animatable.View animation="fadeInUp" delay={300}>
          <SearchBar
            placeholder="Search '3BHK in Lahore near school'"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSearch={(query) => console.log('Search:', query)}
            onFilterPress={() => console.log('Filters pressed')}
          />
        </Animatable.View>

        {/* Quick Filters */}
        <Animatable.View animation="fadeInUp" delay={500}>
          <View style={styles.quickFiltersContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {quickFilters.map((filter, index) => (
                <TouchableOpacity key={filter.value} style={styles.filterChip}>
                  <filter.icon size={16} color={theme.colors.primary} />
                  <Text style={styles.filterChipText}>{filter.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Animatable.View>

        {/* Stats Cards */}
        <Animatable.View animation="fadeInUp" delay={700}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.statsContainer}
          >
            <GlassCard style={styles.statCard}>
              <Text style={styles.statNumber}>2.5K+</Text>
              <Text style={styles.statLabel}>Properties</Text>
            </GlassCard>
            <GlassCard style={styles.statCard}>
              <Text style={styles.statNumber}>150+</Text>
              <Text style={styles.statLabel}>Agents</Text>
            </GlassCard>
            <GlassCard style={styles.statCard}>
              <Text style={styles.statNumber}>95%</Text>
              <Text style={styles.statLabel}>Satisfaction</Text>
            </GlassCard>
          </ScrollView>
        </Animatable.View>

        {/* Featured Properties */}
        <Animatable.View animation="fadeInUp" delay={900}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Properties</Text>
            <TouchableOpacity onPress={() => router.push('/search')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {loading ? (
          <PropertyListShimmer count={2} />
        ) : (
          <View style={styles.propertiesList}>
            {featuredProperties.map((property, index) => (
              <Animatable.View 
                key={property.id}
                animation="fadeInUp" 
                delay={1000 + (index * 200)}
              >
                <PropertyCard
                  property={property}
                  onPress={() => handlePropertyPress(property.id)}
                  onFavorite={() => handleFavoriteToggle(property.id)}
                  isFavorite={favorites.includes(property.id)}
                />
              </Animatable.View>
            ))}
          </View>
        )}

        {/* Recent Activity */}
        <Animatable.View animation="fadeInUp" delay={1400}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <GlassCard style={styles.activityCard}>
            <Text style={styles.activityText}>
              🏠 New property added in DHA Phase 5
            </Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </GlassCard>
        </Animatable.View>
      </ScrollView>

      {/* AI Assistant Button */}
      <AIAssistantButton />
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
  greeting: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  welcomeText: {
    fontSize: theme.fontSize.title,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  quickFiltersContainer: {
    paddingLeft: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.xl,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterChipText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    marginLeft: theme.spacing.xs,
    fontWeight: theme.fontWeight.medium,
  },
  statsContainer: {
    paddingLeft: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    minWidth: 100,
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  statNumber: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  seeAllText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.medium,
  },
  propertiesList: {
    paddingBottom: theme.spacing.lg,
  },
  activityCard: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  activityText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  activityTime: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  aiButtonContainer: {
    position: 'absolute',
    bottom: 90,
    right: theme.spacing.lg,
    zIndex: 1000,
  },
  aiButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  quickActionCard: {
    flex: 1,
  },
  quickActionContent: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  quickActionTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  quickActionSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});