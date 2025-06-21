import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { GlassCard } from './GlassCard';
import { theme } from '@/utils/theme';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onFilterPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

export function SearchBar({ 
  placeholder = 'Search properties...', 
  onSearch, 
  onFilterPress,
  value,
  onChangeText 
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(value || '');

  const handleSearch = () => {
    onSearch?.(searchQuery);
  };

  const handleTextChange = (text: string) => {
    setSearchQuery(text);
    onChangeText?.(text);
  };

  return (
    <GlassCard style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={handleTextChange}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {onFilterPress && (
          <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
            <SlidersHorizontal size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    padding: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    paddingVertical: theme.spacing.xs,
  },
  filterButton: {
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
  },
});