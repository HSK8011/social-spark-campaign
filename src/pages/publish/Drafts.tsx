
import AppShell from "@/components/AppShell";
import DraftPosts from "@/components/publish/DraftPosts";

const DraftsPage = () => {
  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Drafts</h1>
        <DraftPosts />
      </div>
    </AppShell>
  );
};

export default DraftsPage;
