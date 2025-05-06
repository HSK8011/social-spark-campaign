
import AppShell from "@/components/AppShell";
import AnalyticsComponent from "@/components/analytics/AnalyticsComponent";

const Analyze = () => {
  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Analyze</h1>
        <AnalyticsComponent />
      </div>
    </AppShell>
  );
};

export default Analyze;
