export interface Property {
  id: number;
  name: string;
  price: number;
  imageUrl: string; // Main thumbnail
  location: string;
  date: string;
  status: 'Active' | 'Responded';
  gallery: string[];
  address: string;
  amenities: string[];
  roomType: string;
  subscriptionsByMonth: Record<string, number>; // e.g., { '2024-07': 12 }
}
