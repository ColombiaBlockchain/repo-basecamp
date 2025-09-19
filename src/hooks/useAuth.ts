import { useState, useEffect } from 'react';
import { 
  User, 
  Session, 
  getCurrentSession, 
  createSession, 
  clearSession, 
  getUserById, 
  getUserByEmail,
  saveUser,
  generateId 
} from '@/lib/storage';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = getCurrentSession();
    if (currentSession) {
      const userData = getUserById(currentSession.userId);
      if (userData) {
        setUser(userData);
        setSession(currentSession);
      } else {
        clearSession();
      }
    }
    setLoading(false);
  }, []);

  const login = (identifier: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      // Prototype mode - accept any credentials
      setTimeout(() => {
        let userData = getUserByEmail(identifier);
        
        if (!userData) {
          // Create a temporary user for prototype
          userData = {
            id: generateId(),
            email: identifier,
            displayName: identifier.split('@')[0] || 'User',
            country: 'US',
            team: 'other',
            role: 'attendee',
            createdAt: new Date(),
          };
          saveUser(userData);
        }
        
        const newSession = createSession(userData.id);
        setUser(userData);
        setSession(newSession);
        
        resolve({ success: true });
      }, 500);
    });
  };

  const register = (data: {
    email: string;
    password: string;
    displayName: string;
    country: string;
    team: string;
    role?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = getUserByEmail(data.email);
        if (existingUser) {
          resolve({ success: false, error: 'User already exists' });
          return;
        }

        const newUser: User = {
          id: generateId(),
          email: data.email,
          displayName: data.displayName,
          country: data.country,
          team: data.team,
          role: data.role,
          createdAt: new Date(),
        };

        saveUser(newUser);
        const newSession = createSession(newUser.id);
        
        setUser(newUser);
        setSession(newSession);
        
        resolve({ success: true });
      }, 500);
    });
  };

  const logout = () => {
    clearSession();
    setUser(null);
    setSession(null);
  };

  return {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
};