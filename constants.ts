import { type Property, type Booking } from './types';

export const MOCK_PROPERTIES: Property[] = [
  { 
    id: 1, 
    name: 'Forest View Suite', 
    price: 850, 
    imageUrl: 'https://storage.googleapis.com/aistudio-programmable-ui-project-previews/1e07575b-8f15-472e-836e-34b7f87968b5/assets/image_1.jpeg', 
    location: 'Willow Creek, CA',
    date: '2024-07-29',
    status: 'Active',
    gallery: [
      'https://storage.googleapis.com/aistudio-programmable-ui-project-previews/1e07575b-8f15-472e-836e-34b7f87968b5/assets/image_1.jpeg',
      'https://picsum.photos/seed/forest-2/800/600',
      'https://picsum.photos/seed/forest-3/800/600'
    ],
    address: '123 Forest Lane, Willow Creek, CA 95573',
    amenities: ['AC', 'Wi-Fi', 'Kitchen', 'Free Parking']
  },
   { 
    id: 3, 
    name: 'Urban Loft Retreat', 
    price: 980, 
    imageUrl: 'https://storage.googleapis.com/aistudio-programmable-ui-project-previews/1e07575b-8f15-472e-836e-34b7f87968b5/assets/image_2.jpeg',
    location: 'Metropolis, NY',
    date: '2024-07-15',
    status: 'Active',
    gallery: [
      'https://storage.googleapis.com/aistudio-programmable-ui-project-previews/1e07575b-8f15-472e-836e-34b7f87968b5/assets/image_2.jpeg',
      'https://picsum.photos/seed/loft-2/800/600'
    ],
    address: '789 High Street, Metropolis, NY 10001',
    amenities: ['AC', 'Wi-Fi', 'Gym', 'Elevator']
  },
  { 
    id: 4, 
    name: 'Mountain Cabin Charm', 
    price: 620, 
    imageUrl: 'https://storage.googleapis.com/aistudio-programmable-ui-project-previews/1e07575b-8f15-472e-836e-34b7f87968b5/assets/image_4.jpeg',
    location: 'Aspen, CO',
    date: '2024-07-10',
    status: 'Active',
    gallery: ['https://storage.googleapis.com/aistudio-programmable-ui-project-previews/1e07575b-8f15-472e-836e-34b7f87968b5/assets/image_4.jpeg', 'https://picsum.photos/seed/cabin-2/800/600'],
    address: '101 Mountain Pass, Aspen, CO 81611',
    amenities: ['Kitchen', 'Hot Tub', 'Wi-Fi']
  },
  { 
    id: 2, 
    name: 'Boho Green Oasis', 
    price: 920, 
    imageUrl: 'https://storage.googleapis.com/aistudio-programmable-ui-project-previews/1e07575b-8f15-472e-836e-34b7f87968b5/assets/image_3.jpeg', 
    location: 'Kitilrives',
    date: '2024-07-19',
    status: 'Responded',
    gallery: [
      'https://storage.googleapis.com/aistudio-programmable-ui-project-previews/1e07575b-8f15-472e-836e-34b7f87968b5/assets/image_3.jpeg',
      'https://picsum.photos/seed/boho-2/800/600',
      'https://picsum.photos/seed/boho-3/800/600'
    ],
    address: '456 Oasis Way, Kitilrives, TX 78704',
    amenities: ['AC', 'Pool', 'Pet Friendly']
  },
  { 
    id: 5, 
    name: 'Ocean Breeze Studio', 
    price: 1220, 
    imageUrl: 'https://storage.googleapis.com/aistudio-programmable-ui-project-previews/1e07575b-8f15-472e-836e-34b7f87968b5/assets/image_5.jpeg',
    location: 'Malibu, CA',
    date: '2024-07-05',
    status: 'Responded',
    gallery: ['https://storage.googleapis.com/aistudio-programmable-ui-project-previews/1e07575b-8f15-472e-836e-34b7f87968b5/assets/image_5.jpeg', 'https://picsum.photos/seed/ocean-2/800/600'],
    address: '202 Beachfront Dr, Malibu, CA 90265',
    amenities: ['AC', 'Wi-Fi', 'Pool']
  },
  { 
    id: 6, 
    name: 'Sunny Garden Apt.', 
    price: 700, 
    imageUrl: 'https://storage.googleapis.com/aistudio-programmable-ui-project-previews/1e07575b-8f15-472e-836e-34b7f87968b5/assets/image_7.jpeg',
    location: 'Savannah, GA',
    date: '2024-06-28',
    status: 'Active',
    gallery: ['https://storage.googleapis.com/aistudio-programmable-ui-project-previews/1e07575b-8f15-472e-836e-34b7f87968b5/assets/image_7.jpeg', 'https://picsum.photos/seed/garden-2/800/600'],
    address: '303 Garden Walk, Savannah, GA 31401',
    amenities: ['Kitchen', 'Free Parking', 'Pet Friendly']
  },
  { 
    id: 7, 
    name: 'Seaside Villa', 
    price: 1100, 
    imageUrl: 'https://storage.googleapis.com/aistudio-programmable-ui-project-previews/1e07575b-8f15-472e-836e-34b7f87968b5/assets/image_6.jpeg',
    location: 'Santorini, Greece',
    date: '2024-06-20',
    status: 'Active',
    gallery: ['https://storage.googleapis.com/aistudio-programmable-ui-project-previews/1e07575b-8f15-472e-836e-34b7f87968b5/assets/image_6.jpeg', 'https://picsum.photos/seed/villa-2/800/600'],
    address: 'Oia, Santorini, Greece 84702',
    amenities: ['Pool', 'Wi-Fi']
  }
];

export const ALL_AMENITIES = ['AC', 'Wi-Fi', 'Kitchen', 'Free Parking', 'Pool', 'Pet Friendly', 'Gym', 'Elevator', 'Hot Tub', 'Workspace'];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 1,
    propertyId: 1,
    propertyName: 'Forest View Suite',
    guestName: 'John Smith',
    guestEmail: 'john.smith@email.com',
    checkIn: '2025-09-20',
    checkOut: '2025-09-25',
    guests: 2,
    totalAmount: 4250,
    status: 'Confirmed',
    createdAt: '2025-09-10'
  },
  {
    id: 2,
    propertyId: 3,
    propertyName: 'Urban Loft Retreat',
    guestName: 'Emily Johnson',
    guestEmail: 'emily.j@email.com',
    checkIn: '2025-09-18',
    checkOut: '2025-09-22',
    guests: 3,
    totalAmount: 3920,
    status: 'Pending',
    createdAt: '2025-09-15'
  },
  {
    id: 3,
    propertyId: 2,
    propertyName: 'Boho Green Oasis',
    guestName: 'Michael Chen',
    guestEmail: 'mchen@email.com',
    checkIn: '2025-10-01',
    checkOut: '2025-10-05',
    guests: 2,
    totalAmount: 3680,
    status: 'Confirmed',
    createdAt: '2025-09-12'
  },
  {
    id: 4,
    propertyId: 5,
    propertyName: 'Ocean Breeze Studio',
    guestName: 'Sarah Williams',
    guestEmail: 'sarah.w@email.com',
    checkIn: '2025-09-25',
    checkOut: '2025-09-28',
    guests: 2,
    totalAmount: 3660,
    status: 'Completed',
    createdAt: '2025-08-20'
  },
  {
    id: 5,
    propertyId: 4,
    propertyName: 'Mountain Cabin Charm',
    guestName: 'David Brown',
    guestEmail: 'dbrown@email.com',
    checkIn: '2025-10-10',
    checkOut: '2025-10-15',
    guests: 4,
    totalAmount: 3100,
    status: 'Pending',
    createdAt: '2025-09-16'
  },
  {
    id: 6,
    propertyId: 7,
    propertyName: 'Seaside Villa',
    guestName: 'Lisa Martinez',
    guestEmail: 'lisa.m@email.com',
    checkIn: '2025-09-22',
    checkOut: '2025-09-26',
    guests: 2,
    totalAmount: 4400,
    status: 'Cancelled',
    createdAt: '2025-09-05'
  },
  {
    id: 7,
    propertyId: 1,
    propertyName: 'Forest View Suite',
    guestName: 'Robert Taylor',
    guestEmail: 'rtaylor@email.com',
    checkIn: '2025-08-15',
    checkOut: '2025-08-20',
    guests: 2,
    totalAmount: 4250,
    status: 'Completed',
    createdAt: '2025-08-01'
  },
  {
    id: 8,
    propertyId: 6,
    propertyName: 'Sunny Garden Apt.',
    guestName: 'Jennifer Lee',
    guestEmail: 'jlee@email.com',
    checkIn: '2025-09-30',
    checkOut: '2025-10-03',
    guests: 1,
    totalAmount: 2100,
    status: 'Confirmed',
    createdAt: '2025-09-14'
  },
  {
    id: 9,
    propertyId: 3,
    propertyName: 'Urban Loft Retreat',
    guestName: 'Thomas Anderson',
    guestEmail: 'tanderson@email.com',
    checkIn: '2025-08-20',
    checkOut: '2025-08-25',
    guests: 2,
    totalAmount: 4900,
    status: 'Completed',
    createdAt: '2025-08-10'
  },
  {
    id: 10,
    propertyId: 2,
    propertyName: 'Boho Green Oasis',
    guestName: 'Maria Garcia',
    guestEmail: 'mgarcia@email.com',
    checkIn: '2025-10-15',
    checkOut: '2025-10-18',
    guests: 3,
    totalAmount: 2760,
    status: 'Pending',
    createdAt: '2025-09-17'
  },
  {
    id: 11,
    propertyId: 5,
    propertyName: 'Ocean Breeze Studio',
    guestName: 'Kevin Wilson',
    guestEmail: 'kwilson@email.com',
    checkIn: '2025-07-10',
    checkOut: '2025-07-15',
    guests: 2,
    totalAmount: 6100,
    status: 'Completed',
    createdAt: '2025-07-01'
  },
  {
    id: 12,
    propertyId: 4,
    propertyName: 'Mountain Cabin Charm',
    guestName: 'Amanda Davis',
    guestEmail: 'adavis@email.com',
    checkIn: '2025-08-05',
    checkOut: '2025-08-10',
    guests: 3,
    totalAmount: 3100,
    status: 'Completed',
    createdAt: '2025-07-25'
  }
];
