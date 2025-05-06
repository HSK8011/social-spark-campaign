
import AppShell from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SocialMediaPlatformCard } from "@/components/connect/ConnectSocialMedia";
import { useSocialAccounts } from "@/contexts/SocialAccountsContext";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ConnectNew = () => {
  const { connectAccount } = useSocialAccounts();
  
  const handleConnect = (platform: any) => {
    const username = prompt(`Enter your ${platform} username`);
    if (username) {
      connectAccount(platform, username);
    }
  };

  return (
    <AppShell>
      <div className="p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold">Connect New Channel</CardTitle>
            <Link to="/connect">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back To Channels
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 mb-8">
              Looking for step-by-step instructions? Visit our Help Center to read our Getting Started guides and learn about supported channel types.
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SocialMediaPlatformCard 
                platform="twitter"
                title="Twitter Profile"
                onConnect={handleConnect}
              />
              
              <SocialMediaPlatformCard 
                platform="linkedin"
                title="LinkedIn Page / Profile"
                onConnect={handleConnect}
              />
              
              <SocialMediaPlatformCard 
                platform="pinterest"
                title="Pinterest Business"
                onConnect={handleConnect}
              />
              
              <SocialMediaPlatformCard 
                platform="facebook"
                title="Facebook Page / Group"
                onConnect={handleConnect}
              />
              
              <SocialMediaPlatformCard 
                platform="instagram"
                title="Instagram Business Account"
                onConnect={handleConnect}
              />
              
              <SocialMediaPlatformCard 
                platform="shopify"
                title="Shopify Store"
                onConnect={handleConnect}
              />
            </div>
            
            <div className="mt-8">
              <div className="bg-blue-50 rounded-lg p-6 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <img src="/lovable-uploads/196291a1-714f-4df8-9468-7ea2c6ba51c2.png" alt="Gift" className="w-8 h-8" />
                    <h3 className="font-medium text-lg">CURRENT PLAN</h3>
                  </div>
                  <h2 className="text-2xl font-bold text-blue-700">FREE PLAN</h2>
                  <p className="text-gray-600">You've hit your plan limit of 3 connected channels.</p>
                </div>
                <Button className="px-8">Upgrade Now</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default ConnectNew;
