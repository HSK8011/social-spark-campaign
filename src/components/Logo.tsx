
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      </div>
      <div className="font-bold text-blue-500 flex flex-col leading-none">
        <span className="text-sm">MARKETING</span>
        <span className="text-xs text-blue-400">Automation Tools</span>
      </div>
    </Link>
  );
};

export default Logo;
