
import AppShell from "@/components/AppShell";
import PendingApproval from "@/components/publish/PendingApproval";

const PendingApprovalPage = () => {
  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Pending Approval</h1>
        <PendingApproval />
      </div>
    </AppShell>
  );
};

export default PendingApprovalPage;
