import { Dialog, DialogContent } from "@/components/ui/dialog";
import AuthForm from "./AuthForm";

interface AuthModalProps {
  mode: "login" | "register";
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ mode, isOpen, onClose }: AuthModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-1">
            {mode === "login" ? "Login Now" : "Start your free trial"}
          </h2>
          <p className="text-gray-500">
            {mode === "login" ? "Welcome Back!" : "No credit card required"}
          </p>
        </div>
        
        <AuthForm mode={mode} onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal; 