
import AppShell from "@/components/AppShell";
import ConnectSocialMedia from "@/components/connect/ConnectSocialMedia";

const Connect = () => {
  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Connect to Social Network</h1>
        <ConnectSocialMedia />
      </div>
    </AppShell>
  );
};

export default Connect;
