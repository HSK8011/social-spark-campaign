import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSocialAccounts } from "@/contexts/SocialAccountsContext";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const AnalyticsWidget = () => {
  const { accounts } = useSocialAccounts();
  const activeAccount = accounts.find(account => account.status === 'connected');
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Channel Analytics</CardTitle>
          <Tabs defaultValue="month" className="space-x-1">
            <TabsList className="h-8">
              <TabsTrigger value="today" className="text-xs px-3">Today</TabsTrigger>
              <TabsTrigger value="week" className="text-xs px-3">This Week</TabsTrigger>
              <TabsTrigger value="month" className="text-xs px-3">This Month</TabsTrigger>
              <TabsTrigger value="custom" className="text-xs px-3">Custom</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Account Selector */}
          <Button
            variant="outline"
            className="w-full justify-between font-normal"
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <img 
                  src="/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png" 
                  alt="Profile" 
                  className="h-full w-full object-cover" 
                />
              </div>
              <span>AIMDek Technologies</span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </Button>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white transform transition-transform hover:scale-110"
              onClick={() => window.open('https://twitter.com', '_blank')}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white transform transition-transform hover:scale-110"
              onClick={() => window.open('https://facebook.com', '_blank')}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-[#0A66C2] hover:bg-[#094ea0] text-white transform transition-transform hover:scale-110"
              onClick={() => window.open('https://linkedin.com', '_blank')}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-[#E60023] hover:bg-[#cc001f] text-white transform transition-transform hover:scale-110"
              onClick={() => window.open('https://pinterest.com', '_blank')}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
              </svg>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border flex flex-col items-center">
              <div className="flex flex-col items-center">
                <h3 className="text-3xl font-bold">12.5K</h3>
                <p className="text-gray-500 text-sm">Total Followers</p>
              </div>
              <div className="mt-2 bg-green-100 text-green-600 px-2 py-0.5 text-xs rounded-md flex items-center">
                12% <svg className="h-3 w-3 ml-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0112 7z" clipRule="evenodd" /></svg>
              </div>
              <p className="text-gray-500 text-xs mt-1">vs previous month</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border flex flex-col items-center">
              <div className="flex flex-col items-center">
                <h3 className="text-3xl font-bold">40</h3>
                <p className="text-gray-500 text-sm">Posts</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border flex flex-col items-center">
              <div className="flex flex-col items-center">
                <h3 className="text-3xl font-bold">20</h3>
                <p className="text-gray-500 text-sm">Queued Posts</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border flex flex-col items-center">
              <div className="flex flex-col items-center">
                <h3 className="text-3xl font-bold">10k</h3>
                <p className="text-gray-500 text-sm">Engagements</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsWidget;
