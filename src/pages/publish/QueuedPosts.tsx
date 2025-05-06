
import AppShell from "@/components/AppShell";
import QueuedPosts from "@/components/publish/QueuedPosts";

const QueuedPostsPage = () => {
  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Queued Posts</h1>
        <QueuedPosts />
      </div>
    </AppShell>
  );
};

export default QueuedPostsPage;
