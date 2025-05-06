
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

interface AuthFormProps {
  mode: "login" | "register";
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

const AuthForm = ({ mode }: AuthFormProps) => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<LoginFormValues | RegisterFormValues>({
    resolver: zodResolver(mode === "login" ? loginSchema : registerSchema),
    defaultValues: mode === "login"
      ? { email: "", password: "" }
      : { name: "", email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues | RegisterFormValues) => {
    setLoading(true);
    try {
      if (mode === "login") {
        await login((values as LoginFormValues).email, (values as LoginFormValues).password);
      } else {
        await signup(
          (values as RegisterFormValues).name,
          (values as RegisterFormValues).email,
          (values as RegisterFormValues).password
        );
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {mode === "register" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Your password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
