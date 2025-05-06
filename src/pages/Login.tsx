
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/Logo";
import AuthForm from "@/components/auth/AuthForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Log in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm mode="login" />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center">
          <div className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
