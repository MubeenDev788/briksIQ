import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { User, Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, Building2, Star, Heart } from 'lucide-react-native';
import { GlassCard } from '@/components/GlassCard';
import { theme } from '@/utils/theme';

export default function ProfileScreen() {
  const router = useRouter();

  const userStats = [
    { label: 'Listed', value: '12', icon: Building2 },
    { label: 'Reviews', value: '4.8', icon: Star },
    { label: 'Favorites', value: '23', icon: Heart },
  ];

  const menuItems = [
    { 
      icon: User, 
      label: 'Edit Profile', 
      onPress: () => console.log('Edit Profile') 
    },
    { 
      icon: Bell, 
      label: 'Notifications', 
      onPress: () => console.log('Notifications'),
      badge: '3'
    },
    { 
      icon: Shield, 
      label: 'Privacy & Security', 
      onPress: () => console.log('Privacy') 
    },
    { 
      icon: Settings, 
      label: 'App Settings', 
      onPress: () => console.log('Settings') 
    },
    { 
      icon: HelpCircle, 
      label: 'Help & Support', 
      onPress: () => console.log('Help') 
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => router.replace('/welcome')
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <GlassCard style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ 
                  uri: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg' 
                }}
                style={styles.avatar}
              />
              <View style={styles.verifiedBadge}>
                <Shield size={12} color={theme.colors.success} />
              </View>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>Sarah Ahmed</Text>
              <Text style={styles.userRole}>Premium Agent</Text>
              <Text style={styles.userLocation}>Lahore, Pakistan</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            {userStats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <stat.icon size={20} color={theme.colors.primary} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Building2 size={24} color={theme.colors.primary} />
            <Text style={styles.quickActionText}>My Listings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Heart size={24} color={theme.colors.error} />
            <Text style={styles.quickActionText}>Favorites</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <Text style={styles.sectionTitle}>Account</Text>
        <GlassCard style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.menuItem,
                index !== menuItems.length - 1 && styles.menuItemBorder
              ]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <item.icon size={20} color={theme.colors.textSecondary} />
                </View>
                <Text style={styles.menuItemText}>{item.label}</Text>
              </View>
              
              <View style={styles.menuItemRight}>
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
                <ChevronRight size={16} color={theme.colors.textSecondary} />
              </View>
            </TouchableOpacity>
          ))}
        </GlassCard>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color={theme.colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileCard: {
    margin: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: theme.spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    padding: 4,
    borderWidth: 2,
    borderColor: theme.colors.success,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  userRole: {
    fontSize: theme.fontSize.md,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.medium,
    marginBottom: theme.spacing.xs,
  },
  userLocation: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  quickActionText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    marginTop: theme.spacing.sm,
  },
  menuCard: {
    marginHorizontal: theme.spacing.md,
    padding: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  menuItemText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.medium,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: theme.colors.error,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: theme.spacing.sm,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: theme.colors.text,
    fontSize: 10,
    fontWeight: theme.fontWeight.semibold,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  logoutText: {
    color: theme.colors.error,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    marginLeft: theme.spacing.sm,
  },
  versionText: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
});