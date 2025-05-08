import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface AuthFormProps {
  mode: "login" | "register";
  onSuccess?: () => void;
}

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => Promise<void>;
  loading: boolean;
}

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => Promise<void>;
  loading: boolean;
}

const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="login-email" className="block text-sm font-medium">
          Email Address
        </label>
        <Input
          id="login-email"
          {...register("email")}
          type="email"
          placeholder="Email Address"
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="login-password" className="block text-sm font-medium">
          Password
        </label>
        <Input
          id="login-password"
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="text-right">
        <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
          Forgot Password?
        </Link>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Please wait..." : "Login Now"}
      </Button>
    </form>
  );
};

const RegisterForm = ({ onSubmit, loading }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="register-name" className="block text-sm font-medium">
          Full Name
        </label>
        <Input
          id="register-name"
          {...register("name")}
          placeholder="Your name"
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="register-email" className="block text-sm font-medium">
          Email Address
        </label>
        <Input
          id="register-email"
          {...register("email")}
          type="email"
          placeholder="Email Address"
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="register-password" className="block text-sm font-medium">
          Password
        </label>
        <Input
          id="register-password"
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      
      <Button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Please wait..." : "Create Account"}
      </Button>
    </form>
  );
};

const AuthForm = ({ mode, onSuccess }: AuthFormProps) => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      toast({
        title: "Welcome back!",
        description: "You have been successfully authenticated.",
      });
      onSuccess?.();
      navigate("/dashboard");
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      await signup(values.name, values.email, values.password);
      toast({
        title: "Account created successfully!",
        description: "You have been successfully authenticated.",
      });
      onSuccess?.();
      navigate("/dashboard");
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return mode === "login" 
    ? <LoginForm onSubmit={handleLogin} loading={loading} />
    : <RegisterForm onSubmit={handleRegister} loading={loading} />;
};

export default AuthForm;
