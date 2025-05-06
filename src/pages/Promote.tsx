
import AppShell from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Promote = () => {
  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Promote</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Promote your content</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-16">
            <h3 className="text-xl font-medium mb-4">Upgrade to Pro</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Unlock advanced promotion features to boost your social media presence and reach a wider audience.
            </p>
            <Button>Upgrade to Pro</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default Promote;
