import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';

interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: string;
}

interface AuthContextType {
  readonly isAuthenticated: boolean;
  readonly user: User | null;
  readonly login: (email: string, password: string) => Promise<void>;
  readonly signup: (name: string, email: string, password: string) => Promise<void>;
  readonly logout: () => void;
  readonly isLoading: boolean;
}

interface AuthProviderProps {
  readonly children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in a real app this would call an API
    const mockUser = {
      id: '1',
      name: 'AIMDek Technologies',
      email: 'marketing@aimdek.com',
      role: 'admin',
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(mockUser);
    setIsAuthenticated(true);
    
    // Store auth state in localStorage
    localStorage.setItem('auth', JSON.stringify({ 
      isAuthenticated: true, 
      user: mockUser 
    }));
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup - in a real app this would call an API
    const mockUser = {
      id: '2',
      name: name,
      email: email,
      role: 'user',
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
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

  const contextValue = useMemo(() => ({
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    isLoading
  }), [isAuthenticated, user, isLoading]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={contextValue}>
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
