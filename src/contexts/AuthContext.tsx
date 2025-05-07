
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedAuth = localStorage.getItem('auth');
    
    if (storedAuth) {
      try {
        const { isAuthenticated: storedIsAuthenticated, user: storedUser } = JSON.parse(storedAuth);
        setIsAuthenticated(storedIsAuthenticated);
        setUser(storedUser);
      } catch (error) {
        console.error('Error parsing auth from localStorage:', error);
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    // Mock login - in a real app this would call an API
    const mockUser = {
      id: '1',
      name: 'AIMDek Technologies',
      email: 'marketing@aimdek.com',
      role: 'admin',
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    
    // Store auth state in localStorage
    localStorage.setItem('auth', JSON.stringify({ 
      isAuthenticated: true, 
      user: mockUser 
    }));
  };

  const signup = (name: string, email: string, password: string) => {
    // Mock signup - in a real app this would call an API
    const mockUser = {
      id: '2',
      name: name,
      email: email,
      role: 'user',
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    
    // Store auth state in localStorage
    localStorage.setItem('auth', JSON.stringify({ 
      isAuthenticated: true, 
      user: mockUser 
    }));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
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
