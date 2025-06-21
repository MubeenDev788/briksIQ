import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react-native';
import { AnimatedButton } from '@/components/AnimatedButton';
import { GlassCard } from '@/components/GlassCard';
import { theme } from '@/utils/theme';

const { width } = Dimensions.get('window');

export default function AuthScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState<'buyer' | 'agent'>('buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleAuth = () => {
    // Mock authentication - in real app, validate credentials
    console.log('Auth attempt:', { isLogin, userRole, formData });
    
    // Store user role for role-based UI
    global.userRole = userRole;
    
    router.replace('/(tabs)');
  };

  const InputField = ({ 
    icon: Icon, 
    placeholder, 
    value, 
    onChangeText, 
    secureTextEntry = false,
    keyboardType = 'default' 
  }: any) => (
    <View style={styles.inputContainer}>
      <Icon size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
      {placeholder.toLowerCase().includes('password') && (
        <TouchableOpacity 
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          {showPassword ? (
            <EyeOff size={20} color={theme.colors.textSecondary} />
          ) : (
            <Eye size={20} color={theme.colors.textSecondary} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animatable.View animation="fadeInDown" delay={300}>
          <Text style={styles.title}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Sign in to continue' : 'Join BriksIQ today'}
          </Text>
        </Animatable.View>

        {/* Role Toggle */}
        <Animatable.View animation="fadeInUp" delay={500}>
          <GlassCard style={styles.roleToggle}>
            <Text style={styles.roleLabel}>I am a:</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  userRole === 'buyer' && styles.activeToggle
                ]}
                onPress={() => setUserRole('buyer')}
              >
                <Text style={[
                  styles.toggleText,
                  userRole === 'buyer' && styles.activeToggleText
                ]}>
                  Buyer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  userRole === 'agent' && styles.activeToggle
                ]}
                onPress={() => setUserRole('agent')}
              >
                <Text style={[
                  styles.toggleText,
                  userRole === 'agent' && styles.activeToggleText
                ]}>
                  Agent
                </Text>
              </TouchableOpacity>
            </View>
          </GlassCard>
        </Animatable.View>

        {/* Form */}
        <Animatable.View animation="fadeInUp" delay={700}>
          <GlassCard style={styles.formCard}>
            {!isLogin && (
              <InputField
                icon={User}
                placeholder="Full Name"
                value={formData.name}
                onChangeText={(text: string) => setFormData({ ...formData, name: text })}
              />
            )}
            
            <InputField
              icon={Mail}
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(text: string) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
            />
            
            <InputField
              icon={Lock}
              placeholder="Password"
              value={formData.password}
              onChangeText={(text: string) => setFormData({ ...formData, password: text })}
              secureTextEntry={!showPassword}
            />

            {isLogin && (
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <AnimatedButton
              title={isLogin ? 'Sign In' : 'Create Account'}
              onPress={handleAuth}
              size="large"
              style={styles.authButton}
            />
          </GlassCard>
        </Animatable.View>

        {/* Switch Auth Mode */}
        <Animatable.View animation="fadeInUp" delay={900}>
          <TouchableOpacity 
            style={styles.switchMode}
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text style={styles.switchModeText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Text style={styles.switchModeLink}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </Text>
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xxl,
    minHeight: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSize.hero,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  roleToggle: {
    marginBottom: theme.spacing.lg,
  },
  roleLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xs,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: theme.colors.primary,
  },
  toggleText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.medium,
  },
  activeToggleText: {
    color: theme.colors.text,
  },
  formCard: {
    marginBottom: theme.spacing.lg,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  inputIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    paddingVertical: theme.spacing.md,
  },
  eyeIcon: {
    padding: theme.spacing.xs,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.lg,
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.sm,
  },
  authButton: {
    width: '100%',
  },
  switchMode: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  switchModeText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
  switchModeLink: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.semibold,
  },
});