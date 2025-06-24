import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { Mail, Lock, User, Eye, EyeOff, Loader } from 'lucide-react-native';
import { AnimatedButton } from '@/components/AnimatedButton';
import { GlassCard } from '@/components/GlassCard';
import { useAuth } from '@/contexts/AuthContext';
import { theme } from '@/utils/theme';

const { width } = Dimensions.get('window');

export default function AuthScreen() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState<'buyer' | 'agent'>('buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleAuth = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!isLogin && !formData.name) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    setLoading(true);
    
    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.email, formData.password, formData.name, userRole);
      }
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Authentication Error', error.message);
    } finally {
      setLoading(false);
    }
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
        editable={!loading}
      />
      {placeholder.toLowerCase().includes('password') && (
        <TouchableOpacity 
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
          disabled={loading}
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

        {/* Role Toggle - Only show for signup */}
        {!isLogin && (
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
                  disabled={loading}
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
                  disabled={loading}
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
        )}

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
              <TouchableOpacity style={styles.forgotPassword} disabled={loading}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.authButton, loading && styles.authButtonDisabled]}
              onPress={handleAuth}
              disabled={loading}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <Loader size={20} color={theme.colors.text} />
                  <Text style={styles.authButtonText}>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </Text>
                </View>
              ) : (
                <Text style={styles.authButtonText}>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Text>
              )}
            </TouchableOpacity>
          </GlassCard>
        </Animatable.View>

        {/* Switch Auth Mode */}
        <Animatable.View animation="fadeInUp" delay={900}>
          <TouchableOpacity 
            style={styles.switchMode}
            onPress={() => setIsLogin(!isLogin)}
            disabled={loading}
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
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  authButtonDisabled: {
    opacity: 0.7,
  },
  authButtonText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
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