
import { Link } from "react-router-dom";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import QueuedPosts from "@/components/publish/QueuedPosts";

const PublishIndex = () => {
  return (
    <AppShell>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Publish</h1>
          <Link to="/publish/schedule">
            <Button>Schedule Post</Button>
          </Link>
        </div>
        
        <QueuedPosts />
      </div>
    </AppShell>
  );
};

export default PublishIndex;
