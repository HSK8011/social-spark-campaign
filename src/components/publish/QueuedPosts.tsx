import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/contexts/PostsContext";
import { ChevronLeft, ChevronRight, Search, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QueuedPosts = () => {
  const { queuedPosts } = usePosts();
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">Queued Posts</CardTitle>
          <span className="text-sm text-gray-500">Publish - Queued Posts</span>
        </div>
        <Button onClick={() => navigate('/publish/schedule')}>Schedule Post</Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <Tabs defaultValue="day">
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select className="pl-10 pr-10 py-2 border rounded-md bg-white appearance-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Search by Social Profile</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select className="pl-10 pr-10 py-2 border rounded-md bg-white appearance-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Search by Tags</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
          </Button>
          <h3 className="font-medium">Today, 08 Aug 2022</h3>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="relative">
          {/* Timeline */}
          <div className="absolute left-16 top-0 bottom-0 border-l border-dashed border-gray-300"></div>
          
          {/* Time slots */}
          {['08:00 am', '09:00 am', '10:00 am', '11:00 am', '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm'].map((time, index) => (
            <div key={index} className="flex mb-6">
              <div className="w-16 pt-2 font-medium text-gray-500 text-sm">{time}</div>
              
              <div className="flex-1 pl-8">
                {index === 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex bg-white border rounded p-4">
                      <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded mr-2">f</div>
                      <div className="flex flex-col">
                        <div className="text-sm">08:00 am</div>
                        <div className="flex items-center gap-1">
                          <img 
                            src="/lovable-uploads/b2bfff79-ac5b-4388-81b9-5da444119c92.png" 
                            alt="Post thumbnail" 
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="text-sm">Enjoying holidays with AIMDek Family</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex bg-white border rounded p-4">
                      <div className="w-8 h-8 bg-blue-400 text-white flex items-center justify-center rounded mr-2">t</div>
                      <div className="flex flex-col">
                        <div className="text-sm">08:30 am</div>
                        <div className="flex items-center gap-1">
                          <img 
                            src="/lovable-uploads/b2bfff79-ac5b-4388-81b9-5da444119c92.png" 
                            alt="Post thumbnail" 
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="text-sm">Enjoying holidays with AIMDek Family</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {index === 1 && (
                  <div className="flex bg-white border rounded p-4 max-w-md">
                    <div className="w-8 h-8 bg-red-600 text-white flex items-center justify-center rounded mr-2">yt</div>
                    <div className="flex flex-col">
                      <div className="text-sm">09:10 am</div>
                      <div className="flex items-center gap-1">
                        <img 
                          src="/lovable-uploads/b2bfff79-ac5b-4388-81b9-5da444119c92.png" 
                          alt="Post thumbnail" 
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="text-sm">Enjoying holidays with AIMDek Family</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QueuedPosts;
