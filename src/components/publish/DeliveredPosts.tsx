
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/contexts/PostsContext";
import { MoreVertical } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const DeliveredPosts = () => {
  const { delivered } = usePosts();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">Delivered</CardTitle>
          <span className="text-sm text-gray-500">Publish - Delivered</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {delivered.map((post) => (
            <div key={post.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png" />
                    <AvatarFallback>AT</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">AIMDek Technologies</span>
                      <span className="text-xs text-gray-400">@aimdektech</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Mon, Sep 27, 2021 3:53 pm</span>
                  <MoreVertical className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="mb-4 flex gap-3">
                <div className="grid grid-cols-4 gap-1">
                  {Array(16).fill(0).map((_, i) => (
                    <div key={i} className="w-6 h-6 bg-blue-100 rounded"></div>
                  ))}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{post.content}</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  Re-Share
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveredPosts;
