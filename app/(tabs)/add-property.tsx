import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Upload, MapPin, Chrome as Home, DollarSign } from 'lucide-react-native';
import { GlassCard } from '@/components/GlassCard';
import { AnimatedButton } from '@/components/AnimatedButton';
import { theme } from '@/utils/theme';

export default function AddPropertyScreen() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    propertyType: 'house',
  });

  const propertyTypes = [
    { label: 'House', value: 'house' },
    { label: 'Apartment', value: 'apartment' },
    { label: 'Villa', value: 'villa' },
    { label: 'Commercial', value: 'commercial' },
  ];

  const amenities = [
    'Swimming Pool', 'Garden', 'Garage', 'Security', 
    'Elevator', 'Gym', 'Playground', 'Backup Generator'
  ];

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!formData.title || !formData.price || !formData.location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    console.log('Property submitted:', { ...formData, amenities: selectedAmenities });
    Alert.alert('Success', 'Property listed successfully!');
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const InputField = ({ 
    icon: Icon, 
    label, 
    placeholder, 
    value, 
    onChangeText, 
    keyboardType = 'default',
    multiline = false 
  }: any) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <Icon size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Property</Text>
        <Text style={styles.headerSubtitle}>List your property for sale or rent</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <GlassCard style={styles.formCard}>
          {/* Basic Information */}
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <InputField
            icon={Home}
            label="Property Title *"
            placeholder="e.g., Modern 3BHK Villa in DHA"
            value={formData.title}
            onChangeText={(text: string) => setFormData({ ...formData, title: text })}
          />

          <InputField
            icon={DollarSign}
            label="Price (PKR) *"
            placeholder="e.g., 12500000"
            value={formData.price}
            onChangeText={(text: string) => setFormData({ ...formData, price: text })}
            keyboardType="numeric"
          />

          <InputField
            icon={MapPin}
            label="Location *"
            placeholder="e.g., DHA Phase 5, Lahore"
            value={formData.location}
            onChangeText={(text: string) => setFormData({ ...formData, location: text })}
          />

          {/* Property Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Property Type</Text>
            <View style={styles.propertyTypeContainer}>
              {propertyTypes.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  style={[
                    styles.propertyTypeChip,
                    formData.propertyType === type.value && styles.activePropertyType
                  ]}
                  onPress={() => setFormData({ ...formData, propertyType: type.value })}
                >
                  <Text style={[
                    styles.propertyTypeText,
                    formData.propertyType === type.value && styles.activePropertyTypeText
                  ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Property Details */}
          <Text style={styles.sectionTitle}>Property Details</Text>
          
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <InputField
                icon={Home}
                label="Bedrooms"
                placeholder="3"
                value={formData.bedrooms}
                onChangeText={(text: string) => setFormData({ ...formData, bedrooms: text })}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfWidth}>
              <InputField
                icon={Home}
                label="Bathrooms"
                placeholder="2"
                value={formData.bathrooms}
                onChangeText={(text: string) => setFormData({ ...formData, bathrooms: text })}
                keyboardType="numeric"
              />
            </View>
          </View>

          <InputField
            icon={Home}
            label="Area (sq ft)"
            placeholder="2500"
            value={formData.area}
            onChangeText={(text: string) => setFormData({ ...formData, area: text })}
            keyboardType="numeric"
          />

          <InputField
            icon={Home}
            label="Description"
            placeholder="Describe your property..."
            value={formData.description}
            onChangeText={(text: string) => setFormData({ ...formData, description: text })}
            multiline={true}
          />

          {/* Amenities */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {amenities.map((amenity) => (
                <TouchableOpacity
                  key={amenity}
                  style={[
                    styles.amenityChip,
                    selectedAmenities.includes(amenity) && styles.activeAmenity
                  ]}
                  onPress={() => toggleAmenity(amenity)}
                >
                  <Text style={[
                    styles.amenityText,
                    selectedAmenities.includes(amenity) && styles.activeAmenityText
                  ]}>
                    {amenity}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Images */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Property Images</Text>
            <View style={styles.imageUploadContainer}>
              <TouchableOpacity style={styles.imageUploadButton}>
                <Camera size={24} color={theme.colors.textSecondary} />
                <Text style={styles.imageUploadText}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageUploadButton}>
                <Upload size={24} color={theme.colors.textSecondary} />
                <Text style={styles.imageUploadText}>Upload from Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>

          <AnimatedButton
            title="List Property"
            onPress={handleSubmit}
            size="large"
            style={styles.submitButton}
          />
        </GlassCard>
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
  formCard: {
    margin: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  inputLabel: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
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
  multilineInput: {
    paddingVertical: theme.spacing.md,
    textAlignVertical: 'top',
  },
  propertyTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  propertyTypeChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activePropertyType: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  propertyTypeText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
  },
  activePropertyTypeText: {
    color: theme.colors.text,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  amenityChip: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeAmenity: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  },
  amenityText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
  },
  activeAmenityText: {
    color: theme.colors.text,
  },
  imageUploadContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  imageUploadButton: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
  },
  imageUploadText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.xs,
  },
  submitButton: {
    marginTop: theme.spacing.lg,
  },
});