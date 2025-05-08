import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Search, 
  PlusCircle, 
  RefreshCcw, 
  Trash2, 
  Clock,
  ChevronDown
} from "lucide-react";
import { useSocialAccounts } from "@/contexts/SocialAccountsContext";
import { SocialAccount } from "@/types";
import { Link } from "react-router-dom";

interface SocialMediaPlatformCardProps {
  platform: SocialAccount['platform'];
  title: string;
  onConnect: (platform: SocialAccount['platform']) => void;
}

export const SocialMediaPlatformCard = ({ platform, title, onConnect }: SocialMediaPlatformCardProps) => {
  let icon;
  
  switch (platform) {
    case 'twitter':
      icon = <Twitter className="h-10 w-10 text-blue-400" />;
      break;
    case 'linkedin':
      icon = <Linkedin className="h-10 w-10 text-blue-700" />;
      break;
    case 'facebook':
      icon = <Facebook className="h-10 w-10 text-blue-600" />;
      break;
    case 'instagram':
      icon = <Instagram className="h-10 w-10 text-pink-500" />;
      break;
    case 'pinterest':
      icon = <div className="h-10 w-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl">P</div>;
      break;
    case 'shopify':
      icon = <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">S</div>;
      break;
    default:
      icon = <PlusCircle className="h-10 w-10 text-gray-400" />;
  }
  
  return (
    <div className="p-4 sm:p-6 border rounded-md flex flex-col items-center">
      {icon}
      <h3 className="mt-4 mb-6 text-center">{title}</h3>
      <Button 
        onClick={() => onConnect(platform)}
        className="w-full"
        variant="outline"
      >
        CONNECT
      </Button>
    </div>
  );
};

const ConnectSocialMedia = () => {
  const { accounts, connectAccount, disconnectAccount, reconnectAccount, removeAccount } = useSocialAccounts();
  
  const handleConnect = (platform: SocialAccount['platform']) => {
    const username = prompt(`Enter your ${platform} username`);
    if (username) {
      connectAccount(platform, username);
    }
  };

  // Helper to get platform icon
  const getPlatformIcon = (platform: SocialAccount['platform']) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="h-5 w-5 text-blue-400" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5 text-blue-700" />;
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-500" />;
      case 'pinterest':
        return <div className="h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs">P</div>;
      case 'shopify':
        return <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">S</div>;
      default:
        return <PlusCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle className="text-xl font-semibold">Connected Social Networks</CardTitle>
        <Link to="/connect/new">
          <Button>Connect New Channel</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="relative w-full mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input placeholder="Search social account" className="pl-10" />
        </div>

        {/* Connected accounts */}
        <div className="space-y-4">
          {accounts.map((account) => (
            <div key={account.id} className="flex flex-col sm:flex-row items-start sm:items-center border rounded-md p-4 gap-4">
              <div className="flex items-center flex-1 gap-3">
                <div className={`h-8 w-8 rounded-full ${account.status === 'connected' ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center`}>
                  {account.status === 'connected' ? (
                    <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                  )}
                </div>
                
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  {getPlatformIcon(account.platform)}
                </div>
                
                <div className="flex flex-col">
                  <span className="font-medium">{account.username}</span>
                  <span className="text-xs text-gray-500">{account.accountType}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {account.status === 'connected' ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => disconnectAccount(account.id)}
                      className="flex-1 sm:flex-none"
                    >
                      Disconnect
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      <Clock className="h-4 w-4" />
                      <span className="ml-1">Manage Queue Time</span>
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => reconnectAccount(account.id)}
                    className="flex-1 sm:flex-none"
                  >
                    <RefreshCcw className="h-4 w-4 mr-1" />
                    Reconnect
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => removeAccount(account.id)}
                  className="flex-1 sm:flex-none"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="ml-1">Remove Channel</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectSocialMedia;
