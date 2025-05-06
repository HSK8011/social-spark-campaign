
import { createContext, useContext, useState, ReactNode } from 'react';
import { Post } from '@/types';
import { toast } from 'sonner';

interface PostsContextType {
  posts: Post[];
  drafts: Post[];
  queuedPosts: Post[];
  pendingApproval: Post[];
  delivered: Post[];
  createPost: (post: Partial<Post>) => void;
  schedulePost: (id: string, date: string) => void;
  approvePost: (id: string) => void;
  rejectPost: (id: string) => void;
  deletePost: (id: string) => void;
}

// Generate mock data
const generateMockPosts = (): Post[] => {
  const template = {
    content: "Data and Creativity ❤️ The dynamic duo that your marketing strategy needs. Discover how they go hand-in-hand when it comes to campaign success.",
    media: ['/lovable-uploads/b2bfff79-ac5b-4388-81b9-5da444119c92.png'],
    author: 'AIMDek Technologies',
    createdAt: '2023-09-27T10:23:00Z',
    updatedAt: '2023-09-27T10:23:00Z',
  };
  
  const mockPosts: Post[] = [];
  
  // Generate 5 drafts
  for (let i = 1; i <= 5; i++) {
    mockPosts.push({
      ...template,
      id: `draft-${i}`,
      status: 'draft',
      account: {
        id: '1',
        platform: 'twitter',
        username: 'aimdektech',
        profileImage: '/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png',
        status: 'connected',
        accountType: 'Twitter Profile'
      }
    });
  }
  
  // Generate 20 queued posts
  for (let i = 1; i <= 20; i++) {
    mockPosts.push({
      ...template,
      id: `queued-${i}`,
      status: 'queued',
      scheduledFor: `2023-08-08T0${Math.floor(Math.random() * 9)}:00:00Z`,
      account: {
        id: String(Math.floor(Math.random() * 3) + 1),
        platform: ['twitter', 'facebook', 'linkedin'][Math.floor(Math.random() * 3)] as any,
        username: 'aimdektech',
        profileImage: '/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png',
        status: 'connected',
        accountType: 'Profile'
      }
    });
  }
  
  // Generate 8 pending approval
  for (let i = 1; i <= 8; i++) {
    mockPosts.push({
      ...template,
      id: `pending-${i}`,
      status: 'pending',
      account: {
        id: '2',
        platform: 'facebook',
        username: 'AIMDek Technologies',
        profileImage: '/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png',
        status: 'connected',
        accountType: 'Facebook Page'
      }
    });
  }
  
  // Generate 5 delivered
  for (let i = 1; i <= 5; i++) {
    mockPosts.push({
      ...template,
      id: `delivered-${i}`,
      status: 'delivered',
      scheduledFor: '2023-09-27T10:23:00Z',
      account: {
        id: '3',
        platform: 'linkedin',
        username: 'aimdek-technologies',
        profileImage: '/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png',
        status: 'connected',
        accountType: 'LinkedIn Page'
      },
      engagement: {
        likes: 100,
        comments: 20,
        shares: 30,
        views: 500
      }
    });
  }
  
  return mockPosts;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(generateMockPosts());
  
  // Filter posts by status
  const drafts = posts.filter(post => post.status === 'draft');
  const queuedPosts = posts.filter(post => post.status === 'queued');
  const pendingApproval = posts.filter(post => post.status === 'pending');
  const delivered = posts.filter(post => post.status === 'delivered');

  const createPost = (post: Partial<Post>) => {
    const newPost: Post = {
      id: `post-${Math.random().toString(36).substring(2, 9)}`,
      content: post.content || '',
      media: post.media || [],
      status: post.status || 'draft',
      account: post.account!,
      scheduledFor: post.scheduledFor,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: post.author || 'User',
    };
    
    setPosts(prev => [...prev, newPost]);
    toast.success(`Post ${post.status === 'queued' ? 'scheduled' : 'created'} successfully`);
  };

  const schedulePost = (id: string, date: string) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === id 
          ? { ...post, scheduledFor: date, status: 'queued', updatedAt: new Date().toISOString() } 
          : post
      )
    );
    toast.success('Post scheduled successfully');
  };

  const approvePost = (id: string) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === id 
          ? { ...post, status: 'queued', updatedAt: new Date().toISOString() } 
          : post
      )
    );
    toast.success('Post approved');
  };

  const rejectPost = (id: string) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === id 
          ? { ...post, status: 'draft', updatedAt: new Date().toISOString() } 
          : post
      )
    );
    toast.info('Post rejected');
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
    toast.info('Post deleted');
  };

  return (
    <PostsContext.Provider 
      value={{ 
        posts, 
        drafts, 
        queuedPosts,
        pendingApproval,
        delivered,
        createPost, 
        schedulePost,
        approvePost,
        rejectPost,
        deletePost
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};
