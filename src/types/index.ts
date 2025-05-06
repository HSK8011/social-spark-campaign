
export interface User {
  id: string;
  name: string;
  email: string;
  permissions: string[];
}

export interface SocialAccount {
  id: string;
  platform: 'twitter' | 'facebook' | 'linkedin' | 'instagram' | 'pinterest' | 'shopify';
  username: string;
  profileImage?: string;
  status: 'connected' | 'disconnected';
  accountType: string;
}

export interface Post {
  id: string;
  content: string;
  media?: string[];
  scheduledFor?: string;
  status: 'draft' | 'pending' | 'queued' | 'delivered';
  account: SocialAccount;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface Comment {
  id: string;
  user: {
    name: string;
    handle: string;
  };
  content: string;
  timestamp: string;
}

export interface Analytics {
  followers: number;
  posts: number;
  queuedPosts: number;
  engagements: number;
  followerGrowth: {
    percentage: number;
    period: string;
  };
}

export interface Notification {
  id: string;
  type: string;
  description: string;
  isRead: boolean;
  createdAt: string;
}
