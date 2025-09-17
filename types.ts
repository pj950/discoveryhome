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
  bookings?: Booking[];
  totalBookings?: number;
  monthlyRevenue?: number;
}

export interface Booking {
  id: number;
  propertyId: number;
  guestName: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingDate: string;
}

export interface MonthlyStats {
  month: string;
  bookings: number;
  revenue: number;
  properties: string[];
}

export interface DashboardStats {
  totalProperties: number;
  totalBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
  monthlyStats: MonthlyStats[];
}
