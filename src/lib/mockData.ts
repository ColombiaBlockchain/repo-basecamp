// Mock data for Event Metrics platform

export interface Event {
  id: string;
  name: string;
  objectives: string;
  city: string;
  expectedParticipants: number;
  actualParticipants?: number;
  type: EventType;
  date?: string;
  time?: string;
  status: 'planned' | 'active' | 'completed';
  roi?: number;
  engagement?: number;
}

export interface User {
  id: string;
  email: string;
  country: string;
  team: string;
  name: string;
}

export interface KPIData {
  totalEvents: number;
  totalAttendees: number;
  avgROI: number;
  activeEvents: number;
  monthlyGrowth: number;
  engagementRate: number;
}

export type EventType = 
  | 'Workshop' 
  | 'Bootcamp' 
  | 'Networking social' 
  | 'Hackathon' 
  | 'Feria/Expo' 
  | 'Taller educativo' 
  | 'Demo Day' 
  | 'AMA/Meetup técnico';

export const eventTypes: EventType[] = [
  'Workshop',
  'Bootcamp', 
  'Networking social',
  'Hackathon',
  'Feria/Expo',
  'Taller educativo',
  'Demo Day',
  'AMA/Meetup técnico'
];

export const countries = [
  'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica',
  'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'México', 'Nicaragua',
  'Panamá', 'Paraguay', 'Perú', 'República Dominicana', 'Uruguay', 'Venezuela',
  'España', 'Estados Unidos', 'Canadá'
];

export const teams = [
  'Team One Latinoamérica',
  'Team One Europa', 
  'Team One África',
  'Team One Asia',
  'Team One Norteamérica'
];

// Mock data
export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Blockchain Summit 2024',
    objectives: 'Educate developers about Web3 technologies and DeFi protocols',
    city: 'Buenos Aires',
    expectedParticipants: 500,
    actualParticipants: 547,
    type: 'Feria/Expo',
    date: '2024-01-15',
    time: '09:00',
    status: 'completed',
    roi: 187,
    engagement: 94
  },
  {
    id: '2', 
    name: 'DeFi Workshop Series',
    objectives: 'Hands-on training for smart contract development',
    city: 'México DF',
    expectedParticipants: 100,
    actualParticipants: 89,
    type: 'Workshop',
    date: '2024-02-20',
    time: '14:00',
    status: 'completed',
    roi: 156,
    engagement: 87
  },
  {
    id: '3',
    name: 'Crypto Hackathon',
    objectives: 'Build innovative dApps for the future of finance',
    city: 'Medellín',
    expectedParticipants: 200,
    actualParticipants: 178,
    type: 'Hackathon',
    date: '2024-03-10',
    time: '08:00',
    status: 'completed',
    roi: 234,
    engagement: 96
  },
  {
    id: '4',
    name: 'Web3 Networking Night',
    objectives: 'Connect blockchain professionals and entrepreneurs',
    city: 'Santiago',
    expectedParticipants: 150,
    type: 'Networking social',
    date: '2024-12-15',
    time: '19:00',
    status: 'planned'
  },
  {
    id: '5',
    name: 'NFT Creator Bootcamp',
    objectives: 'Learn to create and launch successful NFT collections',
    city: 'Lima',
    expectedParticipants: 80,
    actualParticipants: 76,
    type: 'Bootcamp',
    date: '2024-11-25',
    time: '10:00',
    status: 'active',
    engagement: 91
  }
];

export const mockKPIs: KPIData = {
  totalEvents: 12,
  totalAttendees: 2847,
  avgROI: 189,
  activeEvents: 3,
  monthlyGrowth: 23,
  engagementRate: 92
};

export const mockUser: User = {
  id: '1',
  email: 'admin@eventmetrics.com',
  country: 'Argentina',
  team: 'Team One Latinoamérica',
  name: 'Event Manager'
};

// Chart data for dashboard
export const monthlyEventsData = [
  { month: 'Ene', events: 2, attendees: 450 },
  { month: 'Feb', events: 3, attendees: 680 },
  { month: 'Mar', events: 2, attendees: 520 },
  { month: 'Abr', events: 1, attendees: 340 },
  { month: 'May', events: 4, attendees: 890 },
  { month: 'Jun', events: 3, attendees: 670 },
];

export const eventTypeDistribution = [
  { type: 'Workshop', count: 4, percentage: 33 },
  { type: 'Hackathon', count: 3, percentage: 25 },
  { type: 'Networking', count: 2, percentage: 17 },
  { type: 'Bootcamp', count: 2, percentage: 17 },
  { type: 'Expo', count: 1, percentage: 8 },
];