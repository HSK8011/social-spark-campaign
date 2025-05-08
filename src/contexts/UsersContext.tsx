import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';
import { toast } from 'sonner';

interface UsersContextType {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'AIMDek Technologies',
    email: 'info@aimdek.com',
    role: 'admin',
    permissions: ['create-post', 'connect-accounts', 'view-analytics', 'manage-users', 'approve-posts']
  },
  {
    id: '2',
    name: 'AIMDek Marketing',
    email: 'marketing@aimdek.com',
    role: 'manager',
    permissions: ['create-post', 'connect-accounts', 'view-analytics', 'approve-posts']
  },
  {
    id: '3',
    name: 'Tudu Marketing',
    email: 'mkt@tudu.com',
    role: 'creator',
    permissions: ['create-post']
  }
];

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substring(2, 9)
    };
    
    setUsers(prev => [...prev, newUser]);
    toast.success(`User ${user.name} has been added`);
  };

  const updateUser = (id: string, userData: Partial<User>) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id 
          ? { ...user, ...userData } 
          : user
      )
    );
    toast.success('User updated successfully');
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    toast.info('User removed');
  };

  return (
    <UsersContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};
