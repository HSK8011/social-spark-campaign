
import AppShell from "@/components/AppShell";
import QueuedPosts from "@/components/publish/QueuedPosts";

const PublishIndex = () => {
  return (
    <AppShell>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Publish</h1>
        </div>
        
        <QueuedPosts />
      </div>
    </AppShell>
  );
};

export default PublishIndex;
