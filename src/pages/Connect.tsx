
import AppShell from "@/components/AppShell";
import ConnectSocialMedia from "@/components/connect/ConnectSocialMedia";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Connect = () => {
  const navigate = useNavigate();
  
  return (
    <AppShell>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Connect to Social Network</h1>
          <Button onClick={() => navigate('/connect/new')}>Connect New Channel</Button>
        </div>
        <ConnectSocialMedia />
      </div>
    </AppShell>
  );
};

export default Connect;
