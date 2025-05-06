
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";

const AccountSettings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "AIMDek Technologies",
    email: "aimdektech@aimdek.com",
    phone: "+91 98765 43210",
    timezone: "Culcutta (+05:30)",
  });
  
  const [notifications, setNotifications] = useState({
    accountUpdate: { email: true, desktop: false },
    newUser: { email: true, desktop: false },
    newProfile: { email: true, desktop: false },
    newPost: { email: true, desktop: false },
    approvalRejected: { email: true, desktop: true },
    approvalRequested: { email: true, desktop: false },
    approvalApproved: { email: true, desktop: false },
    profileChanged: { email: true, desktop: true },
  });
  
  const handleProfileUpdate = () => {
    console.log("Profile updated:", profileData);
  };
  
  const handleNotificationChange = (category: string, channel: 'email' | 'desktop', value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [channel]: value
      }
    }));
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex mb-8 border-b">
          <div className="flex-grow-0 mr-6">
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png" />
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center mt-2">
                <div className="font-medium">AIMDek Technologies</div>
                <div className="text-sm text-gray-500">marketing@aimdek.com</div>
              </div>
            </div>
            
            <div className="space-y-1">
              <button
                className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-md ${
                  activeTab === 'profile' ? 'bg-blue-700 text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Profile Settings</span>
              </button>
              
              <button
                className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-md ${
                  activeTab === 'notification' ? 'bg-blue-700 text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('notification')}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span>Notification Settings</span>
              </button>
              
              <button
                className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-md ${
                  activeTab === 'security' ? 'bg-blue-700 text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('security')}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>Security Settings</span>
              </button>
              
              <button
                className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-md ${
                  activeTab === 'general' ? 'bg-blue-700 text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('general')}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                <span>General Settings</span>
              </button>
            </div>
          </div>
          
          <div className="flex-grow border-l pl-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-medium mb-6">Profile Settings</h2>
                <p className="text-gray-600 mb-6">Basic info, like your name and address, that you use on Nio Platform.</p>
                
                <div className="mb-6">
                  <div className="relative mb-8">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarImage src="/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png" />
                      <AvatarFallback>AT</AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full transform translate-x-12">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="username">User Name</Label>
                      <Input 
                        id="username" 
                        value={profileData.name} 
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})} 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone No.</Label>
                      <Input 
                        id="phone" 
                        value={profileData.phone} 
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})} 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={profileData.email} 
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})} 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <select 
                        id="timezone"
                        value={profileData.timezone}
                        onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
                        className="w-full mt-1 border rounded-md p-2"
                      >
                        <option>Culcutta (+05:30)</option>
                        <option>UTC</option>
                        <option>EST (-05:00)</option>
                        <option>PST (-08:00)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" className="text-red-500">Delete My Account</Button>
                  <Button onClick={handleProfileUpdate}>Save Changes</Button>
                </div>
              </div>
            )}
            
            {activeTab === 'notification' && (
              <div>
                <h2 className="text-xl font-medium mb-6">Notification Settings</h2>
                <p className="text-gray-600 mb-6">You will get only notification what have enabled.</p>
                
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left">NOTIFICATION TYPE</th>
                        <th className="px-6 py-4 text-center">EMAIL NOTIFICATION</th>
                        <th className="px-6 py-4 text-center">DESKTOP NOTIFICATION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">Account Update</div>
                            <div className="text-sm text-gray-500">Received when your account is modified</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Checkbox 
                            checked={notifications.accountUpdate.email} 
                            onCheckedChange={(checked) => 
                              handleNotificationChange('accountUpdate', 'email', !!checked)
                            } 
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Checkbox 
                            checked={notifications.accountUpdate.desktop} 
                            onCheckedChange={(checked) => 
                              handleNotificationChange('accountUpdate', 'desktop', !!checked)
                            } 
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">New User Added</div>
                            <div className="text-sm text-gray-500">Sent when new user is added</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Checkbox 
                            checked={notifications.newUser.email} 
                            onCheckedChange={(checked) => 
                              handleNotificationChange('newUser', 'email', !!checked)
                            } 
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Checkbox 
                            checked={notifications.newUser.desktop} 
                            onCheckedChange={(checked) => 
                              handleNotificationChange('newUser', 'desktop', !!checked)
                            } 
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">New Social Profile Connected</div>
                            <div className="text-sm text-gray-500">Sent when new social profile is connected</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Checkbox 
                            checked={notifications.newProfile.email} 
                            onCheckedChange={(checked) => 
                              handleNotificationChange('newProfile', 'email', !!checked)
                            } 
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Checkbox 
                            checked={notifications.newProfile.desktop} 
                            onCheckedChange={(checked) => 
                              handleNotificationChange('newProfile', 'desktop', !!checked)
                            } 
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-medium mb-6">Security Settings</h2>
                <p className="text-gray-600 mb-6">Update your password and security settings.</p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" className="mt-1" />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                    <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
                    <Button variant="outline">Enable Two-Factor Authentication</Button>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="font-medium mb-4">Sessions</h3>
                    <p className="text-gray-600 mb-4">Manage your active sessions</p>
                    <Button variant="outline" className="text-red-500">Sign Out All Sessions</Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'general' && (
              <div>
                <h2 className="text-xl font-medium mb-6">General Settings</h2>
                <p className="text-gray-600 mb-6">Configure general app settings.</p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Language</h3>
                    <select className="w-full border rounded-md p-2">
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="font-medium mb-4">Default View</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="radio" id="dashboard" name="default-view" defaultChecked />
                        <Label htmlFor="dashboard">Dashboard</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" id="publish" name="default-view" />
                        <Label htmlFor="publish">Publish</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" id="analyze" name="default-view" />
                        <Label htmlFor="analyze">Analyze</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="font-medium mb-4">Data & Privacy</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id="analytics" defaultChecked />
                        <Label htmlFor="analytics">Allow analytics tracking</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="marketing" defaultChecked />
                        <Label htmlFor="marketing">Receive marketing emails</Label>
                      </div>
                    </div>
                  </div>
                  
                  <Button>Save Settings</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
