
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/contexts/UsersContext";
import { Search, Edit, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const ManageUsers = () => {
  const { users, addUser, deleteUser } = useUsers();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", permissions: ["create-post"] });
  
  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      addUser(newUser);
      setNewUser({ name: "", email: "", permissions: ["create-post"] });
      setIsAddUserOpen(false);
    }
  };
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Manage Users</CardTitle>
          <Button onClick={() => setIsAddUserOpen(true)}>Add New User</Button>
        </CardHeader>
        <CardContent>
          <div className="relative w-full mb-8 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input placeholder="Search User" className="pl-10" />
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr className="text-left">
                  <th className="px-6 py-4 font-medium text-gray-600">USER NAME</th>
                  <th className="px-6 py-4 font-medium text-gray-600">EMAIL ID</th>
                  <th className="px-6 py-4 font-medium text-gray-600">PERMISSION</th>
                  <th className="px-6 py-4 font-medium text-gray-600"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Create Post</span>
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Connect Accounts</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
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
        </CardContent>
      </Card>
      
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Add a new team member to your organization.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Permissions</Label>
              <div className="col-span-3 flex gap-2">
                <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Create Post</div>
                <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Connect Accounts</div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageUsers;
