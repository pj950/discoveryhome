export interface Property {
  id: number;
  name: string;
  price: number;
  imageUrl: string; // Main thumbnail
  location: string;
  date: string;
  status: 'Active' | 'Responded' | 'Inactive';
  gallery: string[];
  address: string;
  amenities: string[];
}

export interface Booking {
  id: number;
  propertyId: number;
  propertyName: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  createdAt: string;
}
