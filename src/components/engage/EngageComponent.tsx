
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Check, Trash2, MessageSquare, Heart, Tag, Search, Filter } from "lucide-react";
import { useSocialAccounts } from "@/contexts/SocialAccountsContext";

const EngageComponent = () => {
  const { accounts } = useSocialAccounts();
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [replyText, setReplyText] = useState("");
  const [comments, setComments] = useState([
    {
      id: '1',
      user: {
        name: 'cliniktsolutions',
        avatar: '/lovable-uploads/dfb3d499-3b1b-47c7-811e-4bbcde51ef7b.png',
      },
      content: "Loving your posts! They're just our style. Check out our IG as well for more tech tips, tricks and highlights about what our superheroes are bringing to you next!",
      timestamp: '46w',
      isReplying: false,
    },
    {
      id: '2',
      user: {
        name: 'cliniktsolutions',
        avatar: '/lovable-uploads/dfb3d499-3b1b-47c7-811e-4bbcde51ef7b.png',
      },
      content: "Loving your posts! They're just our style. Check out our IG as well for more tech tips, tricks and highlights about what our superheroes are bringing to you next!",
      timestamp: '46w',
      isReplying: false,
    },
  ]);
  
  const toggleReply = (id: string) => {
    setComments(comments.map(comment => 
      comment.id === id 
        ? { ...comment, isReplying: !comment.isReplying } 
        : comment
    ));
  };
  
  const sendReply = (id: string) => {
    if (!replyText.trim()) return;
    
    // In a real app, you would send the reply to an API
    console.log(`Replying to comment ${id}: ${replyText}`);
    
    // Reset the reply state
    setReplyText("");
    toggleReply(id);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Engage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <div className="border rounded-lg p-4 flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png" />
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <span className="font-medium">AIMDek Technologies</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <Input placeholder="Search Keyword" className="pl-10" />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              
              <div className="relative">
                <Input placeholder="Tags" className="pl-10" />
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter By Type
              </Button>
              
              <Button variant="outline" className="p-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="grid grid-cols-4 gap-4">
                <div className="col-span-3 border rounded-lg p-4">
                  <div className="flex flex-col gap-3 mb-4">
                    <div className="grid grid-cols-4 gap-1">
                      {Array(16).fill(0).map((_, i) => (
                        <div key={i} className="w-6 h-6 bg-blue-100 rounded"></div>
                      ))}
                    </div>
                    
                    <p className="text-sm">Data and Creativity ❤️ The dynamic duo that your marketing strategy needs. Discover how they go hand-in-hand when it comes to campaign success.</p>
                  </div>
                  
                  <p className="text-sm mb-4">
                    <span className="font-medium">Discover how they go hand-in-hand</span> when it comes to campaign success. Data and Creativity ❤️ The dynamic duo that your marketing strategy needs.
                  </p>
                </div>
                
                <div className="col-span-1 border rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.user.avatar} />
                      <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <div className="font-medium text-sm">{comment.user.name}</div>
                      <div className="text-xs text-gray-500">{comment.timestamp}</div>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-6">{comment.content}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="ghost" size="sm" className="text-xs">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Heart className="h-4 w-4 mr-1" />
                      Like
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Tag className="h-4 w-4 mr-1" />
                      Tag
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Check className="h-4 w-4 mr-1" />
                      Assign
                    </Button>
                  </div>
                  
                  {comment.isReplying && (
                    <div className="mt-4 space-y-2">
                      <Input 
                        placeholder={`Reply to @${comment.user.name}`}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleReply(comment.id)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => sendReply(comment.id)}
                          disabled={!replyText.trim()}
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngageComponent;
