import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  Heart, 
  Tag, 
  Search, 
  Filter, 
  ChevronDown, 
  X,
  Image as ImageIcon,
  MapPin,
  Hash,
  Smile,
  Send
} from "lucide-react";
import { useSocialAccounts } from "@/contexts/SocialAccountsContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import EmojiPicker from 'emoji-picker-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const EngageComponent = () => {
  const { accounts } = useSocialAccounts();
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [replyText, setReplyText] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [replyingToComment, setReplyingToComment] = useState<string | null>(null);

  const [posts] = useState([
    {
      id: '1',
      content: "Data and Creativity ❤️ The dynamic duo that your marketing strategy needs.",
      subContent: "Discover how they go hand-in-hand when it comes to campaign success.",
      image: "/lovable-uploads/dfb3d499-3b1b-47c7-811e-4bbcde51ef7b.png",
      socialIcons: Array(16).fill(null),
      comments: [
        {
          id: '1',
          user: {
            name: 'clinkitsolutions',
            avatar: '/lovable-uploads/dfb3d499-3b1b-47c7-811e-4bbcde51ef7b.png',
          },
          content: "Loving your posts! They're just our style. Check out our IG as well for more tech tips, tricks and highlights about what our superheroes are bringing to you next!",
          timestamp: '46w',
          isReplying: false,
        }
      ]
    },
    {
      id: '2',
      content: "Marketing Strategies that Work! 🚀",
      subContent: "Learn how to boost your engagement with these proven tactics.",
      image: "/lovable-uploads/marketing-strategies.png",
      socialIcons: Array(16).fill(null),
      comments: []
    },
    {
      id: '3',
      content: "Social Media Success Stories 📈",
      subContent: "Real examples of brands crushing it on social media.",
      image: "/lovable-uploads/success-stories.png",
      socialIcons: Array(16).fill(null),
      comments: []
    },
    {
      id: '4',
      content: "Content Creation Tips & Tricks 🎨",
      subContent: "Master the art of creating engaging content.",
      image: "/lovable-uploads/content-creation.png",
      socialIcons: Array(16).fill(null),
      comments: []
    },
    {
      id: '5',
      content: "Analytics Deep Dive 📊",
      subContent: "Understanding your metrics for better performance.",
      image: "/lovable-uploads/analytics.png",
      socialIcons: Array(16).fill(null),
      comments: []
    },
    {
      id: '6',
      content: "Community Building Strategies 🤝",
      subContent: "Build and grow your online community effectively.",
      image: "/lovable-uploads/community.png",
      socialIcons: Array(16).fill(null),
      comments: []
    },
    {
      id: '7',
      content: "Brand Voice Guidelines 🎯",
      subContent: "Maintaining consistency across your social presence.",
      image: "/lovable-uploads/brand-voice.png",
      socialIcons: Array(16).fill(null),
      comments: []
    }
  ]);

  const selectedPost = posts.find(post => post.id === selectedPostId) || posts[0];

  const handleReply = (commentId: string) => {
    setReplyingToComment(commentId);
    setReplyText("");
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    // Handle reply submission here
    console.log("Sending reply:", replyText);
    setReplyingToComment(null);
    setReplyText("");
  };

  const handleEmojiSelect = (emojiData: any) => {
    setReplyText(prev => prev + emojiData.emoji);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Account Selector */}
        <div className="w-full sm:w-auto sm:min-w-[200px]">
          <Select>
            <SelectTrigger className="w-full bg-white border rounded-lg p-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png" />
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <span className="font-medium">AIMDek Technologies</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              {accounts.map(account => (
                <SelectItem key={account.id} value={account.id}>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={account.profileImage} />
                      <AvatarFallback>{account.username[0]}</AvatarFallback>
                    </Avatar>
                    <span>{account.username}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search Keyword" className="pl-10 w-full" />
          </div>
          
          <div className="flex gap-2">
            <div className="relative w-full sm:w-40">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Tags" className="pl-10" />
            </div>
            
            <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter By Type</span>
            </Button>
            
            <Button variant="outline" size="icon" className="shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-6">
        {/* Posts List */}
        <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto border-b lg:border-b-0 pb-4 lg:pb-0">
          {posts.map(post => (
            <Card 
              key={post.id} 
              className={cn(
                "bg-white cursor-pointer hover:bg-gray-50 transition-colors",
                selectedPostId === post.id && "ring-2 ring-blue-500"
              )}
              onClick={() => setSelectedPostId(post.id)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  {post.image && (
                    <div className="flex-shrink-0">
                      <img 
                        src={post.image} 
                        alt="Post thumbnail" 
                        className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  {/* Post Content */}
                  <div className="flex-1 min-w-0">
                    <div className="grid grid-cols-8 gap-1 mb-2">
                      {post.socialIcons.map((_, i) => (
                        <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-100 rounded" />
                      ))}
                    </div>
                    <p className="text-sm line-clamp-2">{post.content}</p>
                    <p className="text-sm text-gray-600 line-clamp-1 mt-1">{post.subContent}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Post and Comments */}
        <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Selected Post Detail */}
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {selectedPost.image && (
                  <div className="flex-shrink-0">
                    <img 
                      src={selectedPost.image} 
                      alt="Post" 
                      className="w-full sm:w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="grid grid-cols-8 gap-1 mb-4">
                    {selectedPost.socialIcons.map((_, i) => (
                      <div key={i} className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-100 rounded" />
                    ))}
                  </div>
                  <p className="text-sm mb-2">{selectedPost.content}</p>
                  <p className="text-sm text-gray-600">{selectedPost.subContent}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <div className="space-y-4">
            {selectedPost.comments.map(comment => (
              <Card key={comment.id} className="bg-white">
                <CardContent className="p-4">
                  {/* Comment Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.user.avatar} />
                        <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{comment.user.name}</div>
                        <div className="text-xs text-gray-500">{comment.timestamp}</div>
                      </div>
                    </div>
                  </div>

                  {/* Comment Content */}
                  <p className="text-sm mb-4">{comment.content}</p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => handleReply(comment.id)}
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">Reply</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Heart className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">Like</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">Tag</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <X className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </div>

                  {/* Reply Editor */}
                  {replyingToComment === comment.id && (
                    <div className="mt-4 border rounded-lg p-4 bg-gray-50">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={selectedAccount.profileImage} />
                            <AvatarFallback>{selectedAccount.username[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            Replying to @{comment.user.name}
                          </span>
                        </div>
                        <div className="relative">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your reply..."
                            className="w-full min-h-[100px] p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="absolute right-2 bottom-2 flex items-center gap-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Smile className="h-4 w-4 text-gray-500" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="end">
                                <EmojiPicker onEmojiClick={handleEmojiSelect} />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button className="p-2 hover:bg-gray-200 rounded-lg">
                            <ImageIcon className="h-4 w-4 text-gray-500" />
                          </button>
                          <button className="p-2 hover:bg-gray-200 rounded-lg">
                            <MapPin className="h-4 w-4 text-gray-500" />
                          </button>
                          <button className="p-2 hover:bg-gray-200 rounded-lg">
                            <Hash className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={() => setReplyingToComment(null)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={handleSendReply}
                            disabled={!replyText.trim()}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Send Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngageComponent;
