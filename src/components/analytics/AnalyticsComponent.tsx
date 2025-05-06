
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { useSocialAccounts } from "@/contexts/SocialAccountsContext";

const AnalyticsComponent = () => {
  const { accounts } = useSocialAccounts();
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Analyze</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-full md:w-96 border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png" />
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <span className="font-medium">AIMDek Technologies</span>
            </div>
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="ml-auto border rounded-lg p-3 flex items-center gap-2">
            <span className="font-medium">30 Days</span>
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <Tabs defaultValue="general" className="mb-8">
          <TabsList>
            <TabsTrigger value="general" className="px-8">General</TabsTrigger>
            <TabsTrigger value="posts" className="px-8">Posts</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
          <Card className="col-span-1">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="text-blue-400 mb-2">
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2v20h-20v-20h20zm-20 0v16l16-16h-16z"></path>
                </svg>
              </div>
              <div className="text-3xl font-bold">12.5K</div>
              <div className="text-gray-500 text-sm">Tweets</div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="text-blue-600 mb-2">
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <div className="text-3xl font-bold">40</div>
              <div className="text-gray-500 text-sm">Likes</div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="text-blue-700 mb-2">
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="text-3xl font-bold">20</div>
              <div className="text-gray-500 text-sm">Total Followers</div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="text-blue-800 mb-2">
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div className="text-3xl font-bold">10k</div>
              <div className="text-gray-500 text-sm">Engagements</div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="text-blue-900 mb-2">
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <path d="M20 8v6"></path>
                  <path d="M23 11h-6"></path>
                </svg>
              </div>
              <div className="text-3xl font-bold">10k</div>
              <div className="text-gray-500 text-sm">Audience Growth</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Most Liked Posts</h3>
          <div className="space-y-4">
            {[1, 2].map((index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src="/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png" />
                    <AvatarFallback>AT</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm">AIMDek Technologies</span>
                      <span className="text-xs text-gray-500">@aimdektech</span>
                    </div>
                    <p className="text-xs text-gray-500">Mon, Sep 27, 2021 3:53 pm</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="grid grid-cols-4 gap-1">
                    {Array(16).fill(0).map((_, i) => (
                      <div key={i} className="w-6 h-6 bg-blue-100 rounded"></div>
                    ))}
                  </div>
                </div>
                
                <p className="text-sm mb-4">
                  Data and Creativity ❤️ The dynamic duo that your marketing strategy. Discover how they go hand-in-hand when it comes to campaign. Go hand-in-hand when it comes to campaign.
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsComponent;
