
import AppShell from "@/components/AppShell";
import AccountSettings from "@/components/settings/AccountSettings";

const Settings = () => {
  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <AccountSettings />
      </div>
    </AppShell>
  );
};

export default Settings;
