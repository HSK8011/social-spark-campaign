
import AppShell from "@/components/AppShell";
import ManageUsersComponent from "@/components/users/ManageUsers";

const ManageUsersPage = () => {
  return (
    <AppShell>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Manage Users</h1>
        </div>
        <ManageUsersComponent />
      </div>
    </AppShell>
  );
};

export default ManageUsersPage;
