
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, Subscription } from '../types';

interface AuthContextType {
  user: User | null;
  subscription: Subscription | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  register: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for an existing session
    setTimeout(() => {
      const storedUser = localStorage.getItem('alphaHunterUser');
      const storedSub = localStorage.getItem('alphaHunterSub');
      if (storedUser && storedSub) {
        const parsedUser = JSON.parse(storedUser);
        const parsedSub = JSON.parse(storedSub);
        // Important: Convert date string back to Date object
        if (parsedSub.trialEnd) {
            parsedSub.trialEnd = new Date(parsedSub.trialEnd);
        }
        setUser(parsedUser);
        setSubscription(parsedSub);
      }
      setLoading(false);
    }, 1000);
  }, []);

  const login = async (email: string) => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 500)); // Simulate API call
    const mockUser: User = { uid: 'mock-uid-123', email };
    // Simulate a user who has an active subscription
     const mockSub: Subscription = { status: 'active', trialEnd: null };
    localStorage.setItem('alphaHunterUser', JSON.stringify(mockUser));
    localStorage.setItem('alphaHunterSub', JSON.stringify(mockSub));
    setUser(mockUser);
    setSubscription(mockSub);
    setLoading(false);
  };

  const register = async (email: string) => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 500)); // Simulate API call
    const mockUser: User = { uid: 'new-mock-uid-456', email };
    const trialEnd = new Date();
    trialEnd.setHours(trialEnd.getHours() + 1);
    const mockSub: Subscription = { status: 'trialing', trialEnd };
    localStorage.setItem('alphaHunterUser', JSON.stringify(mockUser));
    localStorage.setItem('alphaHunterSub', JSON.stringify(mockSub));
    setUser(mockUser);
    setSubscription(mockSub);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 500)); // Simulate API call
    localStorage.removeItem('alphaHunterUser');
    localStorage.removeItem('alphaHunterSub');
    setUser(null);
    setSubscription(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, subscription, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
