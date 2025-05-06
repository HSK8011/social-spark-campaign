
import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Mock authentication function
  const login = async (email: string, password: string) => {
    try {
      // In a real app, you would make an API request to validate credentials
      console.log("Login attempt with:", email, password);
      
      // Mock successful login
      if (email && password) {
        const mockUser = {
          id: '1',
          name: 'AIMDek Technologies',
          email: email,
          permissions: ['create-post', 'connect-account'],
        };
        
        setUser(mockUser);
        toast.success('Successfully logged in');
        return;
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error("Login error:", error);
      toast.error('Failed to login. Please check your credentials.');
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // In a real app, you would make an API request to create a user
      console.log("Signup attempt with:", name, email, password);
      
      // Mock successful signup
      if (name && email && password) {
        const mockUser = {
          id: '1',
          name: name,
          email: email,
          permissions: ['create-post', 'connect-account'],
        };
        
        setUser(mockUser);
        toast.success('Account created successfully');
        return;
      }
      
      throw new Error('Invalid data for signup');
    } catch (error) {
      console.error("Signup error:", error);
      toast.error('Failed to create account. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
