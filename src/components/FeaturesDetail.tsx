
import { Link } from "react-router-dom";

const FeaturesDetail = () => {
  return (
    <div className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-700">Publish</h2>
            <p className="text-lg text-gray-700">
              Plan and arrange your social media initiatives visually. 
              Co-ordinate creative efforts to increase social media engagement.
            </p>
            <Link to="/features" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              View More 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/dd7ebdb2-20ab-429d-ab69-e1b5eda4387e.png"
              alt="Publish Feature" 
              className="w-full max-w-md"
            />
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 items-center mb-24">
          <div className="flex justify-center order-2 md:order-1">
            <img 
              src="/lovable-uploads/b61305c6-3778-4b52-80e4-67d2d1426b45.png" 
              alt="Analytics Feature" 
              className="w-full max-w-md"
            />
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-3xl font-bold text-blue-700">Analyze</h2>
            <p className="text-lg text-gray-700">
              Your content's performance should be measured and reported on. 
              Gain in-depth knowledge to help you expand your reach revenue & engagement.
            </p>
            <Link to="/features" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              View More 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-700">Engage</h2>
            <p className="text-lg text-gray-700">
              Make connections with your audience. Engage with the most important comments faster and gain customer trust.
            </p>
            <Link to="/features" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              View More 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/0d74264f-0f03-4c88-985a-ac2257113035.png" 
              alt="Engage Feature" 
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesDetail;
