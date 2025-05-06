
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingHero = () => {
  return (
    <div className="blue-gradient text-white py-20 px-6 md:px-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Quicker and easier social media platform for genuine interaction
        </h1>
        <p className="text-lg md:text-xl mb-8">
          With a publishing analysis and engagement platform you can trust, you can tell your product's narrative and develop your audience.
        </p>
        <Link to="/register">
          <Button size="lg" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-blue-50">
            Get Started Now
          </Button>
        </Link>
        <p className="text-sm mt-4 text-blue-100">
          No credit card required. Cancel anytime 14-day free trial
        </p>
      </div>
    </div>
  );
};

export default LandingHero;
