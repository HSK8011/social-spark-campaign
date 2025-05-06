
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeatureSection = () => {
  return (
    <div className="py-16 px-6 md:px-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">
        Media platform tools designed specifically for small business
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="p-6 flex flex-col items-center text-center">
          <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-blue-700 mb-3">Put your content out there</h3>
          <p className="mb-6 text-gray-600">
            Create eye-catching material for your social media networks, and take use of the most up-to-date Instagram capabilities.
          </p>
          <Link to="/register">
            <Button>Get Started Now</Button>
          </Link>
        </div>
        
        <div className="p-6 flex flex-col items-center text-center">
          <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20V10"></path>
              <path d="M18 20V4"></path>
              <path d="M6 20v-4"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-blue-700 mb-3">Examine your marketing tactics</h3>
          <p className="mb-6 text-gray-600">
            To increase reach, engagement, and sales, track your progress, create reports and gain insights.
          </p>
          <Link to="/register">
            <Button>Get Started Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
