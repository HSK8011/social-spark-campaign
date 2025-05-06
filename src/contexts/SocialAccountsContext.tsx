
import { createContext, useContext, useState, ReactNode } from 'react';
import { SocialAccount } from '@/types';
import { toast } from 'sonner';

interface SocialAccountsContextType {
  accounts: SocialAccount[];
  loading: boolean;
  connectAccount: (platform: SocialAccount['platform'], username: string) => void;
  disconnectAccount: (id: string) => void;
  removeAccount: (id: string) => void;
}

const mockAccounts: SocialAccount[] = [
  {
    id: '1',
    platform: 'twitter',
    username: 'aimdektech',
    profileImage: '/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png',
    status: 'connected',
    accountType: 'Twitter Profile'
  },
  {
    id: '2',
    platform: 'linkedin',
    username: 'aimdek-technologies',
    profileImage: '/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png',
    status: 'connected',
    accountType: 'LinkedIn Page'
  },
  {
    id: '3',
    platform: 'facebook',
    username: 'AIMDek Technologies',
    profileImage: '/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png',
    status: 'connected',
    accountType: 'Facebook Page'
  },
  {
    id: '4',
    platform: 'pinterest',
    username: 'Avakash Dekavadiya',
    profileImage: '/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png',
    status: 'disconnected',
    accountType: 'Pinterest Profile'
  }
];

const SocialAccountsContext = createContext<SocialAccountsContextType | undefined>(undefined);

export function SocialAccountsProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<SocialAccount[]>(mockAccounts);
  const [loading, setLoading] = useState<boolean>(false);

  const connectAccount = (platform: SocialAccount['platform'], username: string) => {
    setLoading(true);
    setTimeout(() => {
      const newAccount: SocialAccount = {
        id: `${Math.random().toString(36).substring(2, 9)}`,
        platform,
        username,
        profileImage: '/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png',
        status: 'connected',
        accountType: `${platform.charAt(0).toUpperCase() + platform.slice(1)} ${platform === 'shopify' ? 'Store' : platform === 'instagram' || platform === 'facebook' ? 'Business Account' : 'Profile'}`,
      };
      
      setAccounts(prev => [...prev, newAccount]);
      setLoading(false);
      toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} account connected successfully`);
    }, 1000);
  };

  const disconnectAccount = (id: string) => {
    setAccounts(prev => 
      prev.map(account => 
        account.id === id 
          ? { ...account, status: 'disconnected' } 
          : account
      )
    );
    toast.info('Account disconnected');
  };

  const removeAccount = (id: string) => {
    setAccounts(prev => prev.filter(account => account.id !== id));
    toast.info('Account removed');
  };

  return (
    <SocialAccountsContext.Provider value={{ accounts, loading, connectAccount, disconnectAccount, removeAccount }}>
      {children}
    </SocialAccountsContext.Provider>
  );
}

export const useSocialAccounts = () => {
  const context = useContext(SocialAccountsContext);
  if (context === undefined) {
    throw new Error('useSocialAccounts must be used within a SocialAccountsProvider');
  }
  return context;
};
