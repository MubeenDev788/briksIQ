export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  description: string;
  amenities: string[];
  agentId: string;
  agentName: string;
  agentPhone: string;
  featured: boolean;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  properties: Property[];
  verified: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'agent';
  avatar?: string;
  favorites: string[];
}

export interface SearchFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  propertyType?: string;
}