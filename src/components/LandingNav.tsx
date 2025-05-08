import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthModal from "./auth/AuthModal";

const LandingNav = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <nav className="py-4 px-6 md:px-16 flex items-center justify-between bg-white">
      <Logo />
      
      <div className="hidden md:flex items-center gap-8">
        <Link to="/tools" className="text-gray-600 hover:text-gray-800">Tools</Link>
        <Link to="/pricing" className="text-gray-600 hover:text-gray-800">Pricing</Link>
        <Link to="/resources" className="text-gray-600 hover:text-gray-800">Resources</Link>
        <Link to="/about" className="text-gray-600 hover:text-gray-800">About</Link>
        <Link to="/customers" className="text-gray-600 hover:text-gray-800">Customers</Link>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="default" onClick={() => setShowRegisterModal(true)}>
          Get Started Now
        </Button>
        <Button variant="outline" onClick={() => setShowLoginModal(true)}>
          Login
        </Button>
      </div>

      <AuthModal 
        mode="login"
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      
      <AuthModal
        mode="register"
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
    </nav>
  );
};

export default LandingNav;
