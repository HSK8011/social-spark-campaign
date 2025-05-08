import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { useSocialAccounts } from "@/contexts/SocialAccountsContext";
import { usePosts } from "@/contexts/PostsContext";
import { useState } from "react";

const AnalyticsComponent = () => {
  const { accounts } = useSocialAccounts();
  const { delivered } = usePosts();
  const [selectedAccount] = useState(accounts[0]);
  const [timeframe] = useState("30 Days");
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Analyze</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="w-full sm:w-96 border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={selectedAccount?.profileImage} />
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <span className="font-medium">{selectedAccount?.username}</span>
            </div>
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="w-full sm:w-auto border rounded-lg p-3 flex items-center gap-2">
            <span className="font-medium">{timeframe}</span>
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <Tabs defaultValue="general" className="mb-8">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="general" className="flex-1 sm:flex-none px-8">General</TabsTrigger>
            <TabsTrigger value="posts" className="flex-1 sm:flex-none px-8">Posts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-10">
              <Card className="col-span-1">
                <CardContent className="pt-6 flex flex-col items-center">
                  <div className="text-blue-400 mb-2">
                    <svg className="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2v20h-20v-20h20zm-20 0v16l16-16h-16z"></path>
                    </svg>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold">{delivered.length}</div>
                  <div className="text-gray-500 text-sm">Posts</div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardContent className="pt-6 flex flex-col items-center">
                  <div className="text-blue-600 mb-2">
                    <svg className="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold">
                    {delivered.reduce((sum, post) => sum + (post.engagement?.likes || 0), 0)}
                  </div>
                  <div className="text-gray-500 text-sm">Likes</div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardContent className="pt-6 flex flex-col items-center">
                  <div className="text-blue-700 mb-2">
                    <svg className="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold">
                    {delivered.reduce((sum, post) => sum + (post.engagement?.views || 0), 0)}
                  </div>
                  <div className="text-gray-500 text-sm">Total Views</div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardContent className="pt-6 flex flex-col items-center">
                  <div className="text-blue-800 mb-2">
                    <svg className="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold">
                    {delivered.reduce((sum, post) => sum + (post.engagement?.comments || 0), 0)}
                  </div>
                  <div className="text-gray-500 text-sm">Comments</div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardContent className="pt-6 flex flex-col items-center">
                  <div className="text-blue-900 mb-2">
                    <svg className="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <path d="M20 8v6"></path>
                      <path d="M23 11h-6"></path>
                    </svg>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold">
                    {delivered.reduce((sum, post) => sum + (post.engagement?.shares || 0), 0)}
                  </div>
                  <div className="text-gray-500 text-sm">Shares</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Most Engaged Posts</h3>
              <div className="space-y-4">
                {delivered
                  .sort((a, b) => ((b.engagement?.likes || 0) + (b.engagement?.comments || 0)) - 
                                ((a.engagement?.likes || 0) + (a.engagement?.comments || 0)))
                  .slice(0, 3)
                  .map((post) => (
                    <div key={post.id} className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar>
                          <AvatarImage src={post.account.profileImage} />
                          <AvatarFallback>AT</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-sm">{post.account.username}</span>
                            <span className="text-xs text-gray-500">@{post.account.username}</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="grid grid-cols-4 gap-1">
                          {Array(16).fill(0).map((_, i) => (
                            <div key={i} className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-100 rounded"></div>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-sm mb-4">{post.content}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span>❤️ {post.engagement?.likes || 0}</span>
                        <span>💬 {post.engagement?.comments || 0}</span>
                        <span>🔄 {post.engagement?.shares || 0}</span>
                        <span>👁️ {post.engagement?.views || 0}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="posts">
            <div className="space-y-4">
              {delivered.map((post) => (
                <div key={post.id} className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={post.account.profileImage} />
                      <AvatarFallback>AT</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-sm">{post.account.username}</span>
                        <span className="text-xs text-gray-500">@{post.account.username}</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {post.media && post.media.length > 0 && (
                    <div className="mb-4">
                      <img 
                        src={post.media[0]} 
                        alt="Post media" 
                        className="w-full rounded-lg object-cover max-h-96"
                      />
                    </div>
                  )}
                  
                  <p className="text-sm mb-4">{post.content}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span>❤️ {post.engagement?.likes || 0}</span>
                    <span>💬 {post.engagement?.comments || 0}</span>
                    <span>🔄 {post.engagement?.shares || 0}</span>
                    <span>👁️ {post.engagement?.views || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalyticsComponent;
