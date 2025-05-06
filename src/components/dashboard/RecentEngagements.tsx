
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const engagements = [
  {
    id: '1',
    user: {
      name: 'cliniktsolutions',
      avatar: '/lovable-uploads/dfb3d499-3b1b-47c7-811e-4bbcde51ef7b.png',
    },
    action: 'commented on tweet',
    date: '23 July 2022, 12:30 PM',
  },
  {
    id: '2',
    user: {
      name: 'cliniktsolutions',
      avatar: '/lovable-uploads/dfb3d499-3b1b-47c7-811e-4bbcde51ef7b.png',
    },
    action: 'commented on tweet',
    date: '23 July 2022, 12:30 PM',
  },
  {
    id: '3',
    user: {
      name: 'cliniktsolutions',
      avatar: '/lovable-uploads/dfb3d499-3b1b-47c7-811e-4bbcde51ef7b.png',
    },
    action: 'commented on tweet',
    date: '23 July 2022, 12:30 PM',
  },
  {
    id: '4',
    user: {
      name: 'cliniktsolutions',
      avatar: '/lovable-uploads/dfb3d499-3b1b-47c7-811e-4bbcde51ef7b.png',
    },
    action: 'commented on tweet',
    date: '23 July 2022, 12:30 PM',
  },
];

const RecentEngagements = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Recent Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {engagements.map((engagement) => (
            <div key={engagement.id} className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={engagement.user.avatar} />
                <AvatarFallback>{engagement.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-sm text-blue-600">{engagement.user.name}</span>
                  <span className="text-sm text-gray-600">{engagement.action}</span>
                </div>
                <p className="text-xs text-gray-500">{engagement.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Link to="/engage" className="flex items-center gap-1 text-sm text-blue-600 font-medium hover:text-blue-800">
            View More
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentEngagements;
