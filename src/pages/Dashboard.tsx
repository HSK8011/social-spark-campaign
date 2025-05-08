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
        
        <div className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-7">
              <AnalyticsWidget />
            </div>
            <div className="col-span-5">
              <RecentEngagements />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="overflow-y-auto scrollbar-hide">
              <RecentPosts />
            </div>
            <div className="overflow-y-auto scrollbar-hide">
              <UpcomingPosts />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Dashboard;
