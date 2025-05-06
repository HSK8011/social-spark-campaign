
import { useState } from "react";
import { useSocialAccounts } from "@/contexts/SocialAccountsContext";
import { usePosts } from "@/contexts/PostsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Bold, 
  Italic, 
  Link, 
  List, 
  ListOrdered, 
  AlignLeft, 
  Quote, 
  Undo, 
  Redo,
  Calendar,
  Image,
  MapPin,
  Smile,
  ChevronDown,
  Heart
} from "lucide-react";
import { format } from "date-fns";

const PostEditor = () => {
  const { accounts } = useSocialAccounts();
  const { createPost } = usePosts();
  
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState("now");
  const [scheduledDate, setScheduledDate] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>("/lovable-uploads/b2bfff79-ac5b-4388-81b9-5da444119c92.png");
  const [isUploading, setIsUploading] = useState(false);
  
  const handleImageUpload = () => {
    setIsUploading(true);
    
    // Simulate image upload
    setTimeout(() => {
      setSelectedImage("/lovable-uploads/b2bfff79-ac5b-4388-81b9-5da444119c92.png");
      setIsUploading(false);
    }, 1500);
  };
  
  const handleSubmit = () => {
    if (!content) {
      alert("Please enter some content for your post");
      return;
    }
    
    const media = selectedImage ? [selectedImage] : [];
    
    createPost({
      content,
      media,
      status: postType === "now" ? "delivered" : postType === "schedule" ? "queued" : "pending",
      account: selectedAccount,
      scheduledFor: scheduledDate || undefined,
      author: "AIMDek Technologies",
    });
    
    // Clear form
    setContent("");
    setSelectedImage(null);
    setScheduledDate("");
    setPostType("now");
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Schedule Post</CardTitle>
        <span className="text-sm text-gray-500">Publish - Schedule Post</span>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Select a social media account</h3>
          <div className="border rounded-md p-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png" />
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <span className="font-medium">AIMDek Technologies</span>
              <ChevronDown className="h-5 w-5 ml-auto text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Post Editor */}
          <div>
            <div className="border rounded-md">
              <div className="flex items-center border-b p-2">
                <div className="flex items-center space-x-2 mb-2 mt-2">
                  <select className="bg-gray-100 border-0 rounded p-1 text-sm">
                    <option>Paragraph</option>
                  </select>
                  <Button variant="ghost" size="sm">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Link className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Quote className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Undo className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Redo className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="The three greatest things you learn from travelling"
                  className="w-full min-h-[200px] border-0 focus:ring-0 resize-none"
                ></textarea>
                
                {selectedImage && (
                  <div className="relative mt-4">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded content" 
                      className="w-full h-auto rounded-lg"
                    />
                    <button 
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center border-t p-2 gap-2">
                <Button variant="ghost" size="sm" onClick={handleImageUpload} disabled={isUploading}>
                  <Image className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MapPin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  #
                </Button>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-4">When to post?</h3>
              <RadioGroup value={postType} onValueChange={setPostType} className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="now" id="now" />
                  <Label htmlFor="now">Send Now</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="schedule" id="schedule" />
                  <Label htmlFor="schedule">Specific Days & Times</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="queue" id="queue" />
                  <Label htmlFor="queue">Preferred Queue Time</Label>
                </div>
              </RadioGroup>
              
              {postType === "schedule" && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <Input
                      type="date"
                      value={scheduledDate.split('T')[0] || ''}
                      onChange={(e) => setScheduledDate(`${e.target.value}T12:00:00Z`)}
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-1 flex items-center">
                    <Button variant="outline" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>+</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <Button onClick={handleSubmit} className="w-full">
                {postType === "now" ? "Post Now" : postType === "schedule" ? "Schedule Post" : "Add to Queue"}
              </Button>
            </div>
          </div>
          
          {/* Post Preview */}
          <div>
            <div className="border rounded-md p-6">
              <div className="flex items-center mb-4">
                <div className="flex items-center gap-2 bg-blue-50 rounded-full px-3 py-1">
                  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-sm text-blue-700">Post Preview</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">
                Preview approximates how your content will display when published. Tests and updates by social networks may affect the final appearance.
              </p>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar>
                    <AvatarImage src="/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png" />
                    <AvatarFallback>AT</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">AIMDek Technologies</div>
                    <div className="text-xs text-gray-500">Now, Theater Ahmedabad</div>
                  </div>
                </div>
                
                <p className="text-sm mb-4">
                  {content || "Data and Creativity ❤️ The dynamic duo that your market strategy needs. Discover how they go hand-in-hand when it comes to campaign success."}
                </p>
                
                {(selectedImage || !content) && (
                  <img 
                    src={selectedImage || "/lovable-uploads/b2bfff79-ac5b-4388-81b9-5da444119c92.png"} 
                    alt="Preview" 
                    className="w-full h-auto rounded-md mb-2"
                  />
                )}
                
                <div className="flex items-center gap-3 mt-2 text-gray-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17l9.2-9.2M17 17V7H7"></path>
                  </svg>
                  <Heart className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostEditor;
