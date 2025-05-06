
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const LandingFooter = () => {
  return (
    <footer className="bg-blue-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-lg mb-4">Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/tools/publishing" className="text-blue-200 hover:text-white">Publishing</Link></li>
              <li><Link to="/tools/analytics" className="text-blue-200 hover:text-white">Analytics</Link></li>
              <li><Link to="/tools/engagement" className="text-blue-200 hover:text-white">Engagement</Link></li>
              <li><Link to="/pricing" className="text-blue-200 hover:text-white">Pricing</Link></li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/company/customers" className="text-blue-200 hover:text-white">Customers</Link></li>
              <li><Link to="/company/community" className="text-blue-200 hover:text-white">Community</Link></li>
              <li><Link to="/company/about-us" className="text-blue-200 hover:text-white">About Us</Link></li>
              <li><Link to="/company/request-feature" className="text-blue-200 hover:text-white">Make a feature request</Link></li>
              <li><Link to="/company/non-profit" className="text-blue-200 hover:text-white">Non-Profit organizations</Link></li>
              <li><Link to="/company/professionals" className="text-blue-200 hover:text-white">Professionals</Link></li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/support" className="text-blue-200 hover:text-white">Support</Link></li>
              <li><Link to="/support/webinars" className="text-blue-200 hover:text-white">Schedule for Webinars</Link></li>
              <li><Link to="/support/twitter" className="text-blue-200 hover:text-white">Follow us on Twitter</Link></li>
              <li><Link to="/support/covid19" className="text-blue-200 hover:text-white">COVID-19 Assistance Status</Link></li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-lg mb-4">Free Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources/extensions" className="text-blue-200 hover:text-white">Resource center for Browser Extensions</Link></li>
              <li><Link to="/resources/transparency" className="text-blue-200 hover:text-white">Transparency timeline for the content</Link></li>
              <li><Link to="/resources/podcast" className="text-blue-200 hover:text-white">library remix podcast</Link></li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <Logo className="mb-4" />
          </div>
        </div>
        
        <div className="mt-12 text-center text-blue-200 text-sm">
          <p>Copyright 2023, All Rights Reserved to Marketing Automation Tool</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
