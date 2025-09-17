import { type Property } from './types';

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
    amenities: ['AC', 'Wi-Fi', 'Kitchen', 'Free Parking'],
    roomType: 'Suite',
    subscriptionsByMonth: { '2024-06': 8, '2024-07': 12, '2024-08': 15, '2024-09': 10 }
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
    amenities: ['AC', 'Wi-Fi', 'Gym', 'Elevator'],
    roomType: 'Loft',
    subscriptionsByMonth: { '2024-06': 5, '2024-07': 9, '2024-08': 14, '2024-09': 11 }
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
    amenities: ['Kitchen', 'Hot Tub', 'Wi-Fi'],
    roomType: 'Cabin',
    subscriptionsByMonth: { '2024-06': 7, '2024-07': 7, '2024-08': 9, '2024-09': 6 }
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
    amenities: ['AC', 'Pool', 'Pet Friendly'],
    roomType: 'Entire home',
    subscriptionsByMonth: { '2024-06': 10, '2024-07': 13, '2024-08': 16, '2024-09': 12 }
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
    amenities: ['AC', 'Wi-Fi', 'Pool'],
    roomType: 'Studio',
    subscriptionsByMonth: { '2024-06': 6, '2024-07': 8, '2024-08': 11, '2024-09': 9 }
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
    amenities: ['Kitchen', 'Free Parking', 'Pet Friendly'],
    roomType: 'Apartment',
    subscriptionsByMonth: { '2024-06': 4, '2024-07': 6, '2024-08': 7, '2024-09': 5 }
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
    amenities: ['Pool', 'Wi-Fi'],
    roomType: 'Villa',
    subscriptionsByMonth: { '2024-06': 9, '2024-07': 10, '2024-08': 13, '2024-09': 8 }
  }
];

export const ALL_AMENITIES = ['AC', 'Wi-Fi', 'Kitchen', 'Free Parking', 'Pool', 'Pet Friendly', 'Gym', 'Elevator', 'Hot Tub', 'Workspace'];
