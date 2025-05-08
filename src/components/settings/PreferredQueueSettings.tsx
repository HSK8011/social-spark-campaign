import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const PreferredQueueSettings = () => {
  const [selectedAccount, setSelectedAccount] = useState("");
  
  // Mock data for connected social accounts
  const connectedAccounts = [
    { 
      id: "1", 
      name: "AIMDek Technologies", 
      handle: "@aimdek", 
      platform: "facebook",
      profileImage: "/path-to-image.jpg"
    },
    { 
      id: "2", 
      name: "AIMDek Technologies", 
      handle: "@aimdektech", 
      platform: "instagram",
      profileImage: "/path-to-image.jpg"
    },
    { 
      id: "3", 
      name: "AIMDek Technologies", 
      handle: "@aimdek_tech", 
      platform: "twitter",
      profileImage: "/path-to-image.jpg"
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-600" />;
      case 'twitter':
        return <Twitter className="h-4 w-4 text-blue-400" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4 text-blue-700" />;
      default:
        return null;
    }
  };

  const [queueTimes, setQueueTimes] = useState({
    monday: ["09:00", "15:00", "18:00"],
    tuesday: ["09:00", "15:00", "18:00"],
    wednesday: ["09:00", "15:00", "18:00"],
    thursday: ["09:00", "15:00", "18:00"],
    friday: ["09:00", "15:00", "18:00"],
    saturday: ["09:00", "15:00"],
    sunday: ["09:00", "15:00"],
  });

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const handleAddTime = (day: string) => {
    setQueueTimes((prev) => ({
      ...prev,
      [day]: [...prev[day as keyof typeof prev], "12:00"],
    }));
  };

  const handleRemoveTime = (day: string, index: number) => {
    setQueueTimes((prev) => ({
      ...prev,
      [day]: prev[day as keyof typeof prev].filter((_, i) => i !== index),
    }));
  };

  const handleTimeChange = (day: string, index: number, newTime: string) => {
    setQueueTimes((prev) => ({
      ...prev,
      [day]: prev[day as keyof typeof prev].map((time, i) =>
        i === index ? newTime : time
      ),
    }));
  };

  const handleSaveChanges = () => {
    console.log("Saving queue times:", { account: selectedAccount, queueTimes });
    // TODO: Implement save functionality
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-2">Preferred Queue Time Settings</h2>
          <p className="text-gray-600">Set your preferred posting times for each day</p>
        </div>

        <div className="mb-6">
          <Label htmlFor="account">Select Account</Label>
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Choose a social media account" />
            </SelectTrigger>
            <SelectContent>
              {connectedAccounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  <div className="flex items-center gap-2">
                    {getPlatformIcon(account.platform)}
                    <div>
                      <span className="font-medium">{account.name}</span>
                      <span className="text-sm text-gray-500 ml-2">{account.handle}</span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedAccount && (
          <div className="space-y-6">
            {daysOfWeek.map((day) => (
              <div key={day} className="border-t pt-4 first:border-t-0 first:pt-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium capitalize">{day}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddTime(day)}
                  >
                    Add Time
                  </Button>
                </div>
                <div className="grid gap-4">
                  {queueTimes[day as keyof typeof queueTimes].map((time, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <input
                        type="time"
                        value={time}
                        onChange={(e) =>
                          handleTimeChange(day, index, e.target.value)
                        }
                        className="border rounded-md p-2"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveTime(day, index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferredQueueSettings; 