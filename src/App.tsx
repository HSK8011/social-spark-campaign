
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "@/contexts/AuthContext";
import { SocialAccountsProvider } from "@/contexts/SocialAccountsContext";
import { PostsProvider } from "@/contexts/PostsContext";
import { UsersProvider } from "@/contexts/UsersContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Connect from "./pages/Connect";
import ConnectNew from "./pages/ConnectNew";
import PublishIndex from "./pages/publish/Index";
import Schedule from "./pages/publish/Schedule";
import QueuedPosts from "./pages/publish/QueuedPosts";
import PendingApproval from "./pages/publish/PendingApproval";
import Drafts from "./pages/publish/Drafts";
import Delivered from "./pages/publish/Delivered";
import Engage from "./pages/Engage";
import Analyze from "./pages/Analyze";
import Promote from "./pages/Promote";
import ManageUsers from "./pages/ManageUsers";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import { useAuth } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/connect" element={<ProtectedRoute><Connect /></ProtectedRoute>} />
      <Route path="/connect/new" element={<ProtectedRoute><ConnectNew /></ProtectedRoute>} />
      
      {/* Publish Routes */}
      <Route path="/publish" element={<ProtectedRoute><PublishIndex /></ProtectedRoute>} />
      <Route path="/publish/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
      <Route path="/publish/queued" element={<ProtectedRoute><QueuedPosts /></ProtectedRoute>} />
      <Route path="/publish/pending-approval" element={<ProtectedRoute><PendingApproval /></ProtectedRoute>} />
      <Route path="/publish/drafts" element={<ProtectedRoute><Drafts /></ProtectedRoute>} />
      <Route path="/publish/delivered" element={<ProtectedRoute><Delivered /></ProtectedRoute>} />
      
      <Route path="/engage" element={<ProtectedRoute><Engage /></ProtectedRoute>} />
      <Route path="/analyze" element={<ProtectedRoute><Analyze /></ProtectedRoute>} />
      <Route path="/promote" element={<ProtectedRoute><Promote /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><ManageUsers /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <SocialAccountsProvider>
          <PostsProvider>
            <UsersProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </UsersProvider>
          </PostsProvider>
        </SocialAccountsProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
