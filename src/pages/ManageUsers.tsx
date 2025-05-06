
import AppShell from "@/components/AppShell";
import ManageUsersComponent from "@/components/users/ManageUsers";

const ManageUsersPage = () => {
  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
        <ManageUsersComponent />
      </div>
    </AppShell>
  );
};

export default ManageUsersPage;
