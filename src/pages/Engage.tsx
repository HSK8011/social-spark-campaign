
import AppShell from "@/components/AppShell";
import EngageComponent from "@/components/engage/EngageComponent";

const Engage = () => {
  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Engage</h1>
        <EngageComponent />
      </div>
    </AppShell>
  );
};

export default Engage;
