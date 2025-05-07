
import { ReactNode, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Bell, 
  Search,
  LayoutDashboard,
  Link as LinkIcon,
  Send,
  MessagesSquare,
  BarChart3,
  LogOut,
  ChevronDown,
  User,
  Settings,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppShellProps {
  children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const sidebarLinks = [
    { 
      path: "/dashboard", 
      label: "Dashboard", 
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      path: "/connect", 
      label: "Connect", 
      icon: <LinkIcon className="w-5 h-5" /> 
    },
    { 
      path: "/publish", 
      label: "Publish", 
      icon: <Send className="w-5 h-5" /> 
    },
    { 
      path: "/engage", 
      label: "Engage", 
      icon: <MessagesSquare className="w-5 h-5" /> 
    },
    { 
      path: "/promote", 
      label: "Promote", 
      icon: <BarChart3 className="w-5 h-5" />,
      isPro: true 
    },
    { 
      path: "/analyze", 
      label: "Analyze", 
      icon: <BarChart3 className="w-5 h-5" />,
      isPro: true  
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <div className="hidden md:block ml-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search here anything" 
                className="pl-8 pr-4 py-2 bg-gray-100 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar>
                  <AvatarImage src="/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png" />
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-sm">AIMDek Technologies</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-gray-400">marketing@aimdek.com</span>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/users')}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Manage Users</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-white border-r border-gray-200 w-16 md:w-56">
          <nav className="flex flex-col py-4">
            {sidebarLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50
                  ${isActive ? 'bg-blue-700 text-white hover:bg-blue-700' : ''}
                  ${link.path === '/publish' && location.pathname.includes('/publish/') ? 'bg-blue-700 text-white hover:bg-blue-700' : ''}
                `}
              >
                {link.icon}
                <span className="hidden md:block">{link.label}</span>
                {link.isPro && (
                  <span className="hidden md:block ml-auto text-xs font-medium bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">PRO</span>
                )}
              </NavLink>
            ))}
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;
