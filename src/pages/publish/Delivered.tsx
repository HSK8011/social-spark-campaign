
import AppShell from "@/components/AppShell";
import DeliveredPosts from "@/components/publish/DeliveredPosts";

const DeliveredPage = () => {
  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Delivered Posts</h1>
        <DeliveredPosts />
      </div>
    </AppShell>
  );
};

export default DeliveredPage;
