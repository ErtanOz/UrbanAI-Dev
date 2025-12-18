export interface EventLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category: 'Garten' | 'Wald' | 'Kultur' | 'Tierpark';
  description: string;
}

export interface EventInstance {
  id: string;
  locationId: string;
  title: string;
  date: string;
  time: string;
  description: string;
  guide?: string;
  cost?: string;
  accessible: boolean;
  registrationRequired: boolean;
  hasWC: boolean;
  registrationUrl?: string;
}

export interface AppState {
  selectedLocationId: string | null;
  selectedEventId: string | null;
  filterCategory: string;
  searchQuery: string;
}