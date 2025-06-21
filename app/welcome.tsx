import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { Building2 } from 'lucide-react-native';
import { AnimatedButton } from '@/components/AnimatedButton';
import { theme } from '@/utils/theme';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animatable.View 
          animation="fadeInUp" 
          delay={300}
          style={styles.logoContainer}
        >
          <View style={styles.iconContainer}>
            <Building2 size={60} color={theme.colors.primary} />
          </View>
          <Text style={styles.appName}>BriksIQ</Text>
          <Text style={styles.tagline}>Find your next home... smarter</Text>
        </Animatable.View>

        <Animatable.View 
          animation="fadeInUp" 
          delay={600}
          style={styles.heroSection}
        >
          <Text style={styles.heroTitle}>
            AI-Powered {'\n'}Real Estate
          </Text>
          <Text style={styles.heroSubtitle}>
            Discover properties that match your lifestyle with intelligent recommendations
          </Text>
        </Animatable.View>

        <Animatable.View 
          animation="fadeInUp" 
          delay={900}
          style={styles.buttonContainer}
        >
          <AnimatedButton
            title="Get Started"
            onPress={() => router.push('/auth')}
            size="large"
            style={styles.getStartedButton}
          />
          
          <Text style={styles.footerText}>
            Join thousands of happy homeowners
          </Text>
        </Animatable.View>
      </View>

      {/* Decorative Elements */}
      <Animatable.View 
        animation="pulse" 
        iterationCount="infinite" 
        style={[styles.decorativeCircle, styles.circle1]} 
      />
      <Animatable.View 
        animation="pulse" 
        iterationCount="infinite" 
        delay={1000}
        style={[styles.decorativeCircle, styles.circle2]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  iconContainer: {
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
  appName: {
    fontSize: theme.fontSize.hero,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  tagline: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  heroTitle: {
    fontSize: theme.fontSize.hero,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: theme.spacing.md,
  },
  heroSubtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: width * 0.8,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  getStartedButton: {
    width: width * 0.8,
    marginBottom: theme.spacing.lg,
  },
  footerText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: theme.colors.primary,
    opacity: 0.1,
  },
  circle1: {
    width: 200,
    height: 200,
    top: height * 0.1,
    right: -100,
  },
  circle2: {
    width: 150,
    height: 150,
    bottom: height * 0.2,
    left: -75,
  },
});