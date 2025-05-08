import { Button } from "@/components/ui/button";
import { useState } from "react";
import AuthModal from "./auth/AuthModal";

const LandingHero = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <div className="blue-gradient text-white py-20 px-6 md:px-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Quicker and easier social media platform for genuine interaction
        </h1>
        <p className="text-lg md:text-xl mb-8">
          With a publishing analysis and engagement platform you can trust, you can tell your product's narrative and develop your audience.
        </p>
        <Button 
          size="lg" 
          className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-blue-50"
          onClick={() => setShowRegisterModal(true)}
        >
          Get Started Now
        </Button>
        <p className="text-sm mt-4 text-blue-100">
          No credit card required. Cancel anytime 14-day free trial
        </p>
      </div>

      <AuthModal
        mode="register"
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
    </div>
  );
};

export default LandingHero;
