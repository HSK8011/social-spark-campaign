
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSocialAccounts } from "@/contexts/SocialAccountsContext";
import { ChevronDown, Users, ThumbsUp, FileText, BarChart } from "lucide-react";

const AnalyticsWidget = () => {
  const { accounts } = useSocialAccounts();
  const activeAccount = accounts.find(account => account.status === 'connected');
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Channel Analytics</CardTitle>
          <div className="flex gap-2">
            <Tabs defaultValue="month">
              <TabsList className="h-8">
                <TabsTrigger value="today" className="text-xs px-3">Today</TabsTrigger>
                <TabsTrigger value="week" className="text-xs px-3">This Week</TabsTrigger>
                <TabsTrigger value="month" className="text-xs px-3">This Month</TabsTrigger>
                <TabsTrigger value="custom" className="text-xs px-3">Custom</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
            <div className="flex items-center gap-2 flex-1">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png" 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full" 
                />
              </div>
              <span className="font-medium">AIMDek Technologies</span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
          
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
