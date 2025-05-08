import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/contexts/UsersContext";
import { Search, Edit, Trash, HelpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Role definitions with default permissions
const ROLES = {
  admin: {
    label: "Admin",
    description: "Full access of the tool including user managements",
    defaultPermissions: ["create-post", "connect-accounts", "view-analytics", "manage-users", "approve-posts"]
  },
  manager: {
    label: "Manager",
    description: "Create, Edit and Approve Posts/Content",
    defaultPermissions: ["create-post", "connect-accounts", "view-analytics", "approve-posts"]
  },
  creator: {
    label: "Content Creator",
    description: "Create posts and saves in drafts",
    defaultPermissions: ["create-post"]
  },
  analyst: {
    label: "Content Analyst",
    description: "View analytics and Reports",
    defaultPermissions: ["view-analytics"]
  },
  client: {
    label: "Client",
    description: "View scheduled posts and reports",
    defaultPermissions: ["view-posts", "view-analytics"]
  }
};

// All available permissions
const ALL_PERMISSIONS = [
  { id: "create-post", label: "Create Posts" },
  { id: "connect-accounts", label: "Connect Accounts" },
  { id: "view-analytics", label: "View Analytics" },
  { id: "manage-users", label: "Manage Users" },
  { id: "approve-posts", label: "Approve Posts" },
  { id: "view-posts", label: "View Posts" }
];

const ManageUsers = () => {
  const { users, addUser, deleteUser, updateUser } = useUsers();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    role: "",
    permissions: [] as string[]
  });
  const [editingUser, setEditingUser] = useState({ id: "", firstName: "", lastName: "", email: "", role: "", permissions: [""] });
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleAddUser = () => {
    if (newUser.firstName && newUser.lastName && newUser.email && newUser.role) {
      addUser({
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        role: newUser.role,
        permissions: newUser.permissions
      });
      setNewUser({ firstName: "", lastName: "", email: "", role: "", permissions: [] });
      setIsAddUserOpen(false);
    }
  };
  
  const handleEditClick = (user) => {
    const [firstName, lastName] = user.name.split(' ');
    setEditingUser({
      id: user.id,
      firstName,
      lastName,
      email: user.email,
      role: user.role || "",
      permissions: user.permissions
    });
    setIsEditUserOpen(true);
  };
  
  const handleUpdateUser = () => {
    updateUser(editingUser.id, {
      name: `${editingUser.firstName} ${editingUser.lastName}`,
      email: editingUser.email,
      role: editingUser.role,
      permissions: editingUser.permissions
    });
    setIsEditUserOpen(false);
  };
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <>
      <Card className="min-h-screen sm:min-h-fit">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-xl font-semibold">Manage Users</CardTitle>
          <Button 
            onClick={() => setIsAddUserOpen(true)}
            className="w-full sm:w-auto"
          >
            Add New User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative w-full mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search User" 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden md:block border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr className="text-left">
                  <th className="px-6 py-4 font-medium text-gray-600">USER NAME</th>
                  <th className="px-6 py-4 font-medium text-gray-600">EMAIL ID</th>
                  <th className="px-6 py-4 font-medium text-gray-600">ROLE</th>
                  <th className="px-6 py-4 font-medium text-gray-600">PERMISSION</th>
                  <th className="px-6 py-4 font-medium text-gray-600"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                        {ROLES[user.role]?.label || user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 flex-wrap">
                        {user.permissions.map(permission => (
                          <span key={permission} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                            {ALL_PERMISSIONS.find(p => p.id === permission)?.label || permission}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditClick(user)}>
                        <Edit className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteUser(user.id)}>
                        <Trash className="h-5 w-5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(user)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteUser(user.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Role:</span>
                    <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                      {ROLES[user.role]?.label || user.role}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Permissions:</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {user.permissions.map(permission => (
                        <span key={permission} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                          {ALL_PERMISSIONS.find(p => p.id === permission)?.label || permission}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[500px] w-[95%] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl text-blue-700">Add New User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="role">Roles</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="w-[280px] sm:w-80">
                      <ul className="text-sm">
                        {Object.entries(ROLES).map(([key, role]) => (
                          <li key={key} className="mb-2">
                            <span className="font-semibold">{role.label}:</span> {role.description}
                          </li>
                        ))}
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                value={newUser.role}
                onValueChange={(value) => {
                  setNewUser({ 
                    ...newUser, 
                    role: value,
                    permissions: ROLES[value]?.defaultPermissions || []
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ROLES).map(([key, role]) => (
                    <SelectItem key={key} value={key}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Permissions</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ALL_PERMISSIONS.map((permission) => (
                  <label key={permission.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={newUser.permissions.includes(permission.id)}
                      onCheckedChange={(checked) => {
                        const newPermissions = checked
                          ? [...newUser.permissions, permission.id]
                          : newUser.permissions.filter(p => p !== permission.id);
                        setNewUser({ ...newUser, permissions: newPermissions });
                      }}
                    />
                    <span>{permission.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsAddUserOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              className="bg-blue-700 hover:bg-blue-800 w-full sm:w-auto"
              onClick={handleAddUser}
            >
              Send Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit User Sheet */}
      <Sheet open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <SheetContent className="w-full sm:max-w-[400px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit User</SheetTitle>
            <SheetDescription>
              Make changes to user information and permissions.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-firstName">First Name</Label>
              <Input
                id="edit-firstName"
                value={editingUser.firstName}
                onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-lastName">Last Name</Label>
              <Input
                id="edit-lastName"
                value={editingUser.lastName}
                onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Permissions</Label>
              <div className="grid gap-2">
                {ALL_PERMISSIONS.map((permission) => (
                  <label key={permission.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={editingUser.permissions.includes(permission.id)}
                      onCheckedChange={(checked) => {
                        const newPermissions = checked
                          ? [...editingUser.permissions, permission.id]
                          : editingUser.permissions.filter(p => p !== permission.id);
                        setEditingUser({ ...editingUser, permissions: newPermissions });
                      }}
                    />
                    <span>{permission.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <SheetFooter className="flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsEditUserOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateUser}
              className="w-full sm:w-auto"
            >
              Save Changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ManageUsers;
