
import AppShell from "@/components/AppShell";
import ConnectSocialMedia from "@/components/connect/ConnectSocialMedia";

const Connect = () => {
  
  return (
    <AppShell>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Connect to Social Network</h1>
        </div>
        <ConnectSocialMedia />
      </div>
    </AppShell>
  );
};

export default Connect;
