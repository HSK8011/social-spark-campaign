
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { usePosts } from "@/contexts/PostsContext";

const MAX_POSTS = 1;

const RecentPosts = () => {
  const { posts } = usePosts();
  const recentPosts = posts
    .filter(post => post.status === 'delivered')
    .slice(0, MAX_POSTS);
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Recent Posts</CardTitle>
      </CardHeader>
      <CardContent>
        {recentPosts.map((post) => (
          <div key={post.id} className="border rounded-md p-4 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src="/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png" />
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-sm">AIMDek Technologies</span>
                  <span className="text-xs text-gray-500">@aimdektech</span>
                </div>
                <p className="text-xs text-gray-500">Mon, Sep 27, 2021 3:53 pm</p>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="grid grid-cols-4 gap-1">
                {/* Social media icons grid */}
                {Array(16).fill(0).map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-blue-100 rounded"></div>
                ))}
              </div>
            </div>
            
            <p className="text-sm mb-4">{post.content}</p>
            
            <div className="flex items-center justify-between text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17l9.2-9.2M17 17V7H7"></path>
                  </svg>
                  <span className="text-xs">300</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <span className="text-xs">100</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3h18v18H3zM8 12h8M12 8v8"></path>
                  </svg>
                  <span className="text-xs">200</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span className="text-xs">125</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentPosts;
