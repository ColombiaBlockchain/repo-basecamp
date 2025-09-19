// Local Storage utilities for EventMetrics

export interface User {
  id: string;
  email: string;
  displayName: string;
  country: string;
  team: string;
  role?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Event {
  id: string;
  ownerId: string;
  name: string;
  objectives: string;
  city: string;
  locationUrl?: string;
  expectedAttendees?: number;
  eventType: string;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
}

export interface EventMetrics {
  eventId: string;
  attendedCount: number;
  ticketRevenue: number;
  sponsorRevenue: number;
  costs: number;
  roiEstimate: number;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
}

// Countries data
export const COUNTRIES = [
  { code: 'AR', nameEn: 'Argentina', nameEs: 'Argentina' },
  { code: 'BR', nameEn: 'Brazil', nameEs: 'Brasil' },
  { code: 'CL', nameEn: 'Chile', nameEs: 'Chile' },
  { code: 'CO', nameEn: 'Colombia', nameEs: 'Colombia' },
  { code: 'MX', nameEn: 'Mexico', nameEs: 'México' },
  { code: 'PE', nameEn: 'Peru', nameEs: 'Perú' },
  { code: 'ES', nameEn: 'Spain', nameEs: 'España' },
  { code: 'US', nameEn: 'United States', nameEs: 'Estados Unidos' },
  { code: 'GB', nameEn: 'United Kingdom', nameEs: 'Reino Unido' },
  { code: 'DE', nameEn: 'Germany', nameEs: 'Alemania' },
  { code: 'FR', nameEn: 'France', nameEs: 'Francia' },
  { code: 'IT', nameEn: 'Italy', nameEs: 'Italia' },
];

// Teams data
export const TEAMS = [
  { id: '1', name: 'Ethereum Foundation', region: 'Global' },
  { id: '2', name: 'Polygon Labs', region: 'Global' },
  { id: '3', name: 'Chainlink', region: 'Global' },
  { id: '4', name: 'Binance', region: 'Global' },
  { id: '5', name: 'Solana Foundation', region: 'Global' },
  { id: '6', name: 'Avalanche', region: 'Global' },
  { id: '7', name: 'Near Protocol', region: 'Global' },
  { id: '8', name: 'Cosmos', region: 'Global' },
  { id: 'other', name: 'Other', region: 'Global' },
];

// Storage keys
const STORAGE_KEYS = {
  users: 'eventmetrix-users',
  events: 'eventmetrix-events',
  metrics: 'eventmetrix-metrics',
  session: 'eventmetrix-session',
  teams: 'eventmetrix-teams',
} as const;

// Utility functions
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

// Users
export const getUsers = (): User[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.users);
  return stored ? JSON.parse(stored) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
};

export const getUserByEmail = (email: string): User | null => {
  const users = getUsers();
  return users.find(user => user.email === email) || null;
};

export const getUserById = (id: string): User | null => {
  const users = getUsers();
  return users.find(user => user.id === id) || null;
};

// Sessions
export const getCurrentSession = (): Session | null => {
  const stored = localStorage.getItem(STORAGE_KEYS.session);
  if (!stored) return null;
  
  const session = JSON.parse(stored) as Session;
  if (new Date(session.expiresAt) < new Date()) {
    localStorage.removeItem(STORAGE_KEYS.session);
    return null;
  }
  
  return session;
};

export const createSession = (userId: string): Session => {
  const session: Session = {
    id: generateId(),
    userId,
    token: generateId(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  };
  
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
  return session;
};

export const clearSession = (): void => {
  localStorage.removeItem(STORAGE_KEYS.session);
};

// Events
export const getEvents = (): Event[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.events);
  return stored ? JSON.parse(stored).map((e: any) => ({
    ...e,
    createdAt: new Date(e.createdAt),
    startDate: e.startDate ? new Date(e.startDate) : undefined,
    endDate: e.endDate ? new Date(e.endDate) : undefined,
  })) : [];
};

export const saveEvent = (event: Event): void => {
  const events = getEvents();
  events.push(event);
  localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(events));
  
  // Create initial metrics
  const metrics: EventMetrics = {
    eventId: event.id,
    attendedCount: Math.floor(Math.random() * (event.expectedAttendees || 100)),
    ticketRevenue: Math.floor(Math.random() * 50000),
    sponsorRevenue: Math.floor(Math.random() * 100000),
    costs: Math.floor(Math.random() * 30000),
    roiEstimate: 0,
    updatedAt: new Date(),
  };
  metrics.roiEstimate = ((metrics.ticketRevenue + metrics.sponsorRevenue - metrics.costs) / metrics.costs) * 100;
  
  saveEventMetrics(metrics);
};

export const getEventsByUserId = (userId: string): Event[] => {
  const events = getEvents();
  return events.filter(event => event.ownerId === userId);
};

// Event Metrics
export const getEventMetrics = (): EventMetrics[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.metrics);
  return stored ? JSON.parse(stored).map((m: any) => ({
    ...m,
    updatedAt: new Date(m.updatedAt),
  })) : [];
};

export const saveEventMetrics = (metrics: EventMetrics): void => {
  const allMetrics = getEventMetrics();
  const existingIndex = allMetrics.findIndex(m => m.eventId === metrics.eventId);
  
  if (existingIndex >= 0) {
    allMetrics[existingIndex] = metrics;
  } else {
    allMetrics.push(metrics);
  }
  
  localStorage.setItem(STORAGE_KEYS.metrics, JSON.stringify(allMetrics));
};

export const getMetricsByEventId = (eventId: string): EventMetrics | null => {
  const metrics = getEventMetrics();
  return metrics.find(m => m.eventId === eventId) || null;
};

// Custom Teams
export const getCustomTeams = (): Array<{ id: string; name: string; region: string }> => {
  const stored = localStorage.getItem(STORAGE_KEYS.teams);
  return stored ? JSON.parse(stored) : [];
};

export const saveCustomTeam = (name: string, region: string = 'Global'): string => {
  const teams = getCustomTeams();
  const id = generateId();
  teams.push({ id, name, region });
  localStorage.setItem(STORAGE_KEYS.teams, JSON.stringify(teams));
  return id;
};

export const getAllTeams = () => {
  return [...TEAMS, ...getCustomTeams()];
};