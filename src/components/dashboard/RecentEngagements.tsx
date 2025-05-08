import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

const EngagementItem = () => (
  <div className="flex items-center gap-3 py-2">
    <Avatar className="h-8 w-8">
      <AvatarImage src="/lovable-uploads/480c164e-86be-4339-bba0-d86dd7ca7153.png" />
      <AvatarFallback>CS</AvatarFallback>
    </Avatar>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1">
        <span className="font-medium text-sm truncate">clinkitsolutions</span>
        <BadgeCheck className="h-4 w-4 text-blue-500 flex-shrink-0" />
      </div>
      <div className="flex items-center gap-1 text-sm text-gray-500">
        <span>commented on tweet</span>
        <span className="text-xs">23 July 2022, 12:30 PM</span>
      </div>
    </div>
  </div>
);

const RecentEngagements = () => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Recent Engagement</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <EngagementItem />
          <EngagementItem />
          <EngagementItem />
          <EngagementItem />
        </div>

        <div className="mt-4 flex justify-end">
          <Link to="/engagements" className="flex items-center gap-1 text-sm text-blue-600 font-medium hover:text-blue-800">
            View More
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentEngagements;
