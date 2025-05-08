import { useState, useRef, useEffect } from "react";
import { useSocialAccounts } from "@/contexts/SocialAccountsContext";
import { usePosts } from "@/contexts/PostsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Bold, 
  Italic, 
  Underline,
  Link as LinkIcon, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo, 
  Redo,
  Image as ImageIcon,
  Video,
  FileGif,
  Smile,
  ChevronDown,
  Heart,
  Plus
} from "lucide-react";
import { format, addDays, isBefore, startOfToday } from "date-fns";

// Add this constant for emojis
const COMMON_EMOJIS = [
  '😀', '😂', '🥰', '😊', '😎', '🤔', '👍', '❤️', 
  '🎉', '✨', '🔥', '💯', '🙌', '👏', '🤝', '💪',
  '📸', '🎨', '🎭', '🎬', '🎵', '🎮', '📱', '💻',
  '🌟', '🌈', '🌺', '🌸', '🍕', '☕', '🎯', '💡'
];

const PostEditor = () => {
  const { accounts } = useSocialAccounts();
  const { createPost } = usePosts();
  const editorRef = useRef<HTMLDivElement>(null);
  
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState("specific");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false
  });

  // Add state to track current list type
  const [currentListType, setCurrentListType] = useState<'number' | 'bullet' | null>(null);
  const [currentNumber, setCurrentNumber] = useState(1);

  const [selectedTime, setSelectedTime] = useState<string>("12:00");
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("PM");

  useEffect(() => {
    // Initialize editor content
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, []);

  const updateActiveFormats = () => {
    if (editorRef.current) {
      setActiveFormats({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        justifyLeft: document.queryCommandState('justifyLeft'),
        justifyCenter: document.queryCommandState('justifyCenter'),
        justifyRight: document.queryCommandState('justifyRight')
      });
    }
  };

  // Add function to check if text follows list pattern
  const checkListPattern = (text: string): boolean => {
    if (!currentListType) return false;
    
    const lines = text.split('\n');
    const lastLine = lines[lines.length - 1];
    
    if (currentListType === 'number') {
      return /^\d+\.\s/.test(lastLine);
    } else {
      return /^•\s/.test(lastLine);
    }
  };

  // Function to handle automatic list creation
  const handleListCreation = (e: React.KeyboardEvent) => {
    if (!editorRef.current) return;

    const content = editorRef.current.textContent || '';
    
    // Check if list pattern is broken on input
    if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Backspace') {
      if (currentListType && !checkListPattern(content)) {
        // User has modified the list pattern, end list mode
        setCurrentListType(null);
        setCurrentNumber(1);
        return;
      }
    }

    if (e.key === ' ') {
      const currentLineText = content.trim();

      if (currentLineText === '1') {
        e.preventDefault();
        document.execCommand('delete', false);
        document.execCommand('insertHTML', false, '1. ');
        setCurrentListType('number');
        setCurrentNumber(2);
      } else if (currentLineText === '-') {
        e.preventDefault();
        document.execCommand('delete', false);
        document.execCommand('insertHTML', false, '• ');
        setCurrentListType('bullet');
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();

      const lines = content.split('\n');
      const currentLine = lines[lines.length - 1] || '';
      const isEmptyLine = currentLine.replace(/[\d\s•.-]/g, '').trim() === '';

      if (isEmptyLine) {
        // Exit list mode if line is empty
        document.execCommand('insertHTML', false, '\n');
        setCurrentListType(null);
        setCurrentNumber(1);
      } else {
        // Check if the current line follows the list pattern
        if (!checkListPattern(currentLine)) {
          // If pattern is broken, just add new line without list formatting
          document.execCommand('insertHTML', false, '\n');
          setCurrentListType(null);
          setCurrentNumber(1);
        } else {
          // Continue the list with proper formatting
          if (currentListType === 'number') {
            document.execCommand('insertHTML', false, `\n${currentNumber}. `);
            setCurrentNumber(prev => prev + 1);
          } else if (currentListType === 'bullet') {
            document.execCommand('insertHTML', false, '\n• ');
          }
        }
      }
    }
  };

  // Update handleEditorChange to check for list pattern breaks
  const handleEditorChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setContent(content);

      // Check if we're in a list and the pattern is broken
      if (currentListType && !checkListPattern(editorRef.current.textContent || '')) {
        setCurrentListType(null);
        setCurrentNumber(1);
      }

      updateActiveFormats();
    }
  };

  const handleEditorClick = () => {
    updateActiveFormats();
  };

  const handleEditorKeyUp = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      updateActiveFormats();
    }
  };

  // Update handleKeyDown to include list handling
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
      return;
    }

    handleListCreation(e);
  };

  // Enhanced paste handler to maintain list structure and detect breaks
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    
    if (currentListType) {
      const lines = text.split('\n');
      const formattedLines = lines.map((line, index) => {
        if (index === 0) {
          // For first line, check if it maintains list pattern
          const firstLine = line.trim();
          if (currentListType === 'number' && /^\d+\./.test(firstLine)) {
            return line; // Keep existing number if it has one
          } else if (currentListType === 'bullet' && /^[•-]/.test(firstLine)) {
            return line; // Keep existing bullet if it has one
          }
          // Add appropriate list marker if it doesn't have one
          return currentListType === 'number' ? `${currentNumber + index}. ${line}` : `• ${line}`;
        }
        return currentListType === 'number' ? `${currentNumber + index}. ${line}` : `• ${line}`;
      });
      
      document.execCommand('insertText', false, formattedLines.join('\n'));
      
      if (currentListType === 'number') {
        setCurrentNumber(currentNumber + lines.length);
      }
    } else {
      document.execCommand('insertText', false, text);
    }

    // Check if pasted content breaks list pattern
    setTimeout(() => {
      if (editorRef.current && currentListType && !checkListPattern(editorRef.current.textContent || '')) {
        setCurrentListType(null);
        setCurrentNumber(1);
      }
    }, 0);
  };

  // Add helper function to check if we're at the start of a line
  const isAtLineStart = (): boolean => {
    const selection = window.getSelection();
    if (!selection?.rangeCount) return false;

    const range = selection.getRangeAt(0);
    const startContainer = range.startContainer;
    
    if (startContainer.nodeType === Node.TEXT_NODE) {
      const textBefore = startContainer.textContent?.slice(0, range.startOffset) || '';
      return !textBefore.includes('\n');
    }
    
    return true;
  };

  const handleFileUpload = (file: File, type: 'image' | 'video') => {
    const reader = new FileReader();
    reader.onloadend = () => {
      switch (type) {
        case 'image':
          setSelectedImage(reader.result as string);
          break;
        case 'video':
          setSelectedVideo(reader.result as string);
          break;
      }
    };
    reader.readAsDataURL(file);
  };

  const insertEmoji = (emoji: string) => {
    document.execCommand('insertText', false, emoji);
    handleEditorChange();
  };
  
  const handleSubmit = () => {
    if (!content) {
      alert("Please enter some content for your post");
      return;
    }
    
    const media = [];
    if (selectedImage) media.push(selectedImage);
    if (selectedVideo) media.push(selectedVideo);
    
    createPost({
      content,
      media,
      status: postType === "now" ? "delivered" : postType === "schedule" ? "queued" : "pending",
      account: selectedAccount,
      scheduledFor: selectedDate ? format(selectedDate, 'yyyy-MM-ddTHH:mm:ss') : undefined,
      author: "AIMDek Technologies",
    });
    
    // Clear form
    setContent("");
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
    setSelectedImage(null);
    setSelectedVideo(null);
    setSelectedDate(undefined);
    setPostType("now");
  };

  // Function to check if selected date and time is valid (in the future)
  const isValidScheduleTime = () => {
    if (!selectedDate) return false;
    
    const [hours, minutes] = selectedTime.split(':').map(Number);
    let scheduleHours = hours;
    if (selectedPeriod === "PM" && hours !== 12) {
      scheduleHours += 12;
    } else if (selectedPeriod === "AM" && hours === 12) {
      scheduleHours = 0;
    }

    const scheduleDate = new Date(selectedDate);
    scheduleDate.setHours(scheduleHours, minutes, 0, 0);
    return isBefore(new Date(), scheduleDate);
  };

  // Function to format the schedule time for display
  const getFormattedScheduleTime = () => {
    if (!selectedDate) return "";
    
    const [hours, minutes] = selectedTime.split(':').map(Number);
    let scheduleHours = hours;
    if (selectedPeriod === "PM" && hours !== 12) {
      scheduleHours += 12;
    } else if (selectedPeriod === "AM" && hours === 12) {
      scheduleHours = 0;
    }

    const scheduleDate = new Date(selectedDate);
    scheduleDate.setHours(scheduleHours, minutes, 0, 0);
    return format(scheduleDate, "MMM d, yyyy 'at' h:mm a");
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-1">Schedule Post</h1>
        <p className="text-sm sm:text-base text-gray-600">Publish - Schedule Post</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <Card className="bg-white">
            <CardContent className="p-4 sm:p-6">
          {/* Account Selection */}
          <div className="mb-6">
                <p className="mb-2 text-sm sm:text-base">Select a social media account</p>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue>
                  <div className="flex items-center gap-2">
                        <img src="/aimdek-logo.png" alt="AIMDek" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full" />
                        <span className="text-sm sm:text-base">AIMDek Technologies</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aimdek">
                  <div className="flex items-center gap-2">
                        <img src="/aimdek-logo.png" alt="AIMDek" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full" />
                        <span className="text-sm sm:text-base">AIMDek Technologies</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

              {/* Editor Section */}
              <div className="border-b pb-6 mb-6">
            <div className="border-b pb-2 mb-4">
                  <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant={activeFormats.bold ? "secondary" : "ghost"}
                            size="sm" 
                            onClick={() => formatText('bold')}
                            className={`${activeFormats.bold ? "bg-muted" : ""} p-2 sm:p-3`}
                          >
                            <Bold className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs sm:text-sm">Bold (Ctrl+B)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant={activeFormats.italic ? "secondary" : "ghost"}
                            size="sm" 
                            onClick={() => formatText('italic')}
                            className={`${activeFormats.italic ? "bg-muted" : ""} p-2 sm:p-3`}
                          >
                            <Italic className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs sm:text-sm">Italic (Ctrl+I)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant={activeFormats.underline ? "secondary" : "ghost"}
                            size="sm" 
                            onClick={() => formatText('underline')}
                            className={`${activeFormats.underline ? "bg-muted" : ""} p-2 sm:p-3`}
                          >
                            <Underline className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs sm:text-sm">Underline (Ctrl+U)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant={activeFormats.justifyLeft ? "secondary" : "ghost"}
                            size="sm" 
                            onClick={() => formatText('justifyLeft')}
                            className={`${activeFormats.justifyLeft ? "bg-muted" : ""} p-2 sm:p-3`}
                          >
                            <AlignLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs sm:text-sm">Align Left</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant={activeFormats.justifyCenter ? "secondary" : "ghost"}
                            size="sm" 
                            onClick={() => formatText('justifyCenter')}
                            className={`${activeFormats.justifyCenter ? "bg-muted" : ""} p-2 sm:p-3`}
                          >
                            <AlignCenter className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs sm:text-sm">Center</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant={activeFormats.justifyRight ? "secondary" : "ghost"}
                            size="sm" 
                            onClick={() => formatText('justifyRight')}
                            className={`${activeFormats.justifyRight ? "bg-muted" : ""} p-2 sm:p-3`}
                          >
                            <AlignRight className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs sm:text-sm">Align Right</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => {
                            const url = prompt('Enter URL:');
                            if (url) formatText('createLink', url);
                          }}>
                            <LinkIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs sm:text-sm">Insert Link</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => formatText('undo')}>
                            <Undo className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs sm:text-sm">Undo (Ctrl+Z)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => formatText('redo')}>
                            <Redo className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs sm:text-sm">Redo (Ctrl+Y)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
              </div>
            </div>

                <div
                  ref={editorRef}
                  className="w-full min-h-[150px] sm:min-h-[200px] focus:outline-none overflow-auto p-2 sm:p-4"
                  contentEditable
                  onInput={handleEditorChange}
                  onClick={handleEditorClick}
                  onKeyUp={handleEditorKeyUp}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  placeholder="Type '1' or '-' and press space to start a list..."
                  style={{ 
                    minHeight: '150px',
                    padding: '1rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.375rem',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap'
                  }}
            />

            {selectedImage && (
              <div className="mt-4">
                <img src={selectedImage} alt="Selected" className="max-w-full h-auto rounded-lg" />
              </div>
            )}

                {selectedVideo && (
                  <div className="mt-4">
                    <video src={selectedVideo} controls className="max-w-full h-auto rounded-lg" />
                  </div>
                )}

                <div className="flex items-center gap-1 sm:gap-2 mt-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-2 sm:p-3" onClick={() => document.getElementById('image-upload')?.click()}>
                          <ImageIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs sm:text-sm">Upload Image</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

              <input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'image');
                    }}
                  />

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-2 sm:p-3" onClick={() => document.getElementById('video-upload')?.click()}>
                          <Video className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs sm:text-sm">Upload Video or GIF</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <input
                    id="video-upload"
                    type="file"
                    className="hidden"
                    accept="video/*,.gif"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'video');
                    }}
                  />

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Smile className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] p-2">
                      <div className="grid grid-cols-8 gap-1">
                        {COMMON_EMOJIS.map((emoji, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-muted"
                            onClick={() => insertEmoji(emoji)}
                          >
                            {emoji}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
            </div>

          {/* Scheduling Options */}
              <div className="border-t pt-6">
                <h3 className="font-medium mb-4 text-sm sm:text-base">When to post?</h3>
            <RadioGroup
                  defaultValue="now"
                  className="space-y-4"
              onValueChange={(value) => setPostType(value)}
            >
                  <Label
                    htmlFor="now"
                    className="flex items-center space-x-2 p-3 sm:p-4 rounded-lg border hover:bg-gray-50 cursor-pointer w-full"
                  >
                <RadioGroupItem value="now" id="now" />
                    <div className="flex-1">
                      <div className="font-medium text-sm sm:text-base">Send Now</div>
                      <p className="text-xs sm:text-sm text-gray-500">Post will be published immediately</p>
              </div>
                  </Label>

                  <div className="space-y-4">
                    <Label
                      htmlFor="specific"
                      className="flex items-center space-x-2 p-3 sm:p-4 rounded-lg border hover:bg-gray-50 cursor-pointer w-full"
                    >
                <RadioGroupItem value="specific" id="specific" />
                      <div className="flex-1">
                        <div className="font-medium text-sm sm:text-base">Schedule for Later</div>
                        <p className="text-xs sm:text-sm text-gray-500">Choose a specific date and time to publish</p>
              </div>
                    </Label>

            {postType === "specific" && (
                      <div className="ml-4 sm:ml-6 p-3 sm:p-4 border rounded-lg bg-gray-50">
                        <div className="grid gap-4">
                <div>
                            <Label className="text-xs sm:text-sm font-medium mb-1.5 block">Select Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                              disabled={(date) => isBefore(date, startOfToday())}
                              className="rounded-md border bg-white w-full sm:w-auto"
                  />
                </div>
                          
                <div>
                            <Label className="text-xs sm:text-sm font-medium mb-1.5 block">Select Time</Label>
                            <div className="flex gap-2">
                              <Select 
                                value={selectedTime}
                                onValueChange={setSelectedTime}
                              >
                                <SelectTrigger className="w-full text-xs sm:text-sm">
                                  <SelectValue placeholder="Time" />
                    </SelectTrigger>
                    <SelectContent>
                                  {Array.from({ length: 12 * 4 }, (_, i) => {
                                    const hour = Math.floor(i / 4) + 1;
                                    const minute = (i % 4) * 15;
                                    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                                  }).map((time) => (
                                    <SelectItem key={time} value={time} className="text-xs sm:text-sm">
                                      {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                              <Select
                                value={selectedPeriod}
                                onValueChange={(value: "AM" | "PM") => setSelectedPeriod(value)}
                              >
                                <SelectTrigger className="w-16 sm:w-20 text-xs sm:text-sm">
                                  <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                                  <SelectItem value="AM" className="text-xs sm:text-sm">AM</SelectItem>
                                  <SelectItem value="PM" className="text-xs sm:text-sm">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                          </div>

                          {selectedDate && (
                            <div className="bg-white p-2 sm:p-3 rounded-md border">
                              <p className="text-xs sm:text-sm font-medium">Scheduled for:</p>
                              <p className="text-xs sm:text-sm text-gray-600">{getFormattedScheduleTime()}</p>
              </div>
            )}

                          {selectedDate && !isValidScheduleTime() && (
                            <p className="text-xs sm:text-sm text-red-500">
                              Please select a future date and time
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <Label
                    htmlFor="queue"
                    className="flex items-center space-x-2 p-3 sm:p-4 rounded-lg border hover:bg-gray-50 cursor-pointer w-full"
                  >
                    <RadioGroupItem value="queue" id="queue" />
                    <div className="flex-1">
                      <div className="font-medium text-sm sm:text-base">Preferred Queue Time</div>
                      <p className="text-xs sm:text-sm text-gray-500">Add to your next available preferred time slot</p>
                    </div>
                  </Label>
                </RadioGroup>

                <Button 
                  className="mt-6 w-full text-sm sm:text-base py-2 sm:py-3" 
                  onClick={handleSubmit}
                  disabled={postType === "specific" && !isValidScheduleTime()}
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              {postType === "now" ? "Post Now" : postType === "specific" ? "Schedule Post" : "Add to Queue"}
            </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Column */}
        <div className="lg:col-span-4">
          <Card className="bg-white lg:sticky lg:top-4">
            <CardContent className="p-4 sm:p-6">
              <h3 className="font-medium mb-4 text-sm sm:text-base">Post Preview</h3>
              <div className="text-xs sm:text-sm text-gray-500 mb-4">
                Preview approximates how your content will display when published.
            </div>

              <div className="border rounded-lg p-3 sm:p-4" style={{ minHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
              <div className="flex items-center gap-2 mb-4">
                  <img src="/aimdek-logo.png" alt="AIMDek" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
                <div>
                    <div className="font-medium text-sm sm:text-base">AIMDek Technologies</div>
                    <div className="text-xs sm:text-sm text-gray-500">Now, Twitter, @aimdektech</div>
                  </div>
              </div>

                <div className="mb-4 prose prose-sm max-w-none text-xs sm:text-sm" dangerouslySetInnerHTML={{ 
                  __html: content || "Your post content will appear here"
                }} />

              {selectedImage && (
                  <img src={selectedImage} alt="Preview" className="w-full rounded-lg mb-4" />
                )}

                {selectedVideo && (
                  <video src={selectedVideo} controls className="w-full rounded-lg mb-4" />
                )}

                <div className="flex items-center gap-3 sm:gap-4 mt-4 text-gray-500">
                <button className="hover:text-gray-700">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
                <button className="hover:text-gray-700">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button className="hover:text-gray-700">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
