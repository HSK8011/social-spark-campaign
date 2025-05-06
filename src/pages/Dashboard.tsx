
import AppShell from "@/components/AppShell";
import AnalyticsWidget from "@/components/dashboard/AnalyticsWidget";
import RecentEngagements from "@/components/dashboard/RecentEngagements";
import RecentPosts from "@/components/dashboard/RecentPosts";
import UpcomingPosts from "@/components/dashboard/UpcomingPosts";

const Dashboard = () => {
  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="mb-6">
          <AnalyticsWidget />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentEngagements />
          <div className="space-y-6">
            <RecentPosts />
            <UpcomingPosts />
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Dashboard;
