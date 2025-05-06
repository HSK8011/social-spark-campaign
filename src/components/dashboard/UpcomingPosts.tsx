
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoreVertical } from "lucide-react";
import { usePosts } from "@/contexts/PostsContext";

const MAX_POSTS = 1;

const UpcomingPosts = () => {
  const { queuedPosts } = usePosts();
  const upcomingPosts = queuedPosts.slice(0, MAX_POSTS);
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Upcoming Posts</CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingPosts.map((post) => (
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
              <div>
                <MoreVertical className="h-5 w-5 text-gray-400" />
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
            
            <div className="flex justify-end gap-2">
              <button className="text-sm px-4 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-50">Edit</button>
              <button className="text-sm px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Delete</button>
              <button className="text-sm px-4 py-1 bg-white border text-gray-600 rounded hover:bg-gray-50">View</button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingPosts;
