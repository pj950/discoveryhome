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

// 模拟预订数据
export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 1,
    propertyId: 1,
    guestName: '张三',
    checkIn: '2024-08-15',
    checkOut: '2024-08-18',
    totalAmount: 2550,
    status: 'confirmed',
    bookingDate: '2024-07-20'
  },
  {
    id: 2,
    propertyId: 1,
    guestName: '李四',
    checkIn: '2024-09-10',
    checkOut: '2024-09-13',
    totalAmount: 2550,
    status: 'confirmed',
    bookingDate: '2024-08-15'
  },
  {
    id: 3,
    propertyId: 2,
    guestName: '王五',
    checkIn: '2024-08-20',
    checkOut: '2024-08-25',
    totalAmount: 4600,
    status: 'confirmed',
    bookingDate: '2024-07-25'
  },
  {
    id: 4,
    propertyId: 3,
    guestName: '赵六',
    checkIn: '2024-09-05',
    checkOut: '2024-09-08',
    totalAmount: 2940,
    status: 'confirmed',
    bookingDate: '2024-08-10'
  },
  {
    id: 5,
    propertyId: 4,
    guestName: '陈七',
    checkIn: '2024-08-28',
    checkOut: '2024-09-02',
    totalAmount: 3100,
    status: 'confirmed',
    bookingDate: '2024-08-05'
  },
  {
    id: 6,
    propertyId: 5,
    guestName: '刘八',
    checkIn: '2024-09-15',
    checkOut: '2024-09-18',
    totalAmount: 3660,
    status: 'pending',
    bookingDate: '2024-09-01'
  },
  {
    id: 7,
    propertyId: 6,
    guestName: '孙九',
    checkIn: '2024-08-12',
    checkOut: '2024-08-16',
    totalAmount: 2800,
    status: 'confirmed',
    bookingDate: '2024-07-18'
  },
  {
    id: 8,
    propertyId: 7,
    guestName: '周十',
    checkIn: '2024-09-20',
    checkOut: '2024-09-24',
    totalAmount: 4400,
    status: 'confirmed',
    bookingDate: '2024-08-25'
  }
];
