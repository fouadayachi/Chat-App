
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import validator from "validator";
import AuthImagePattern from "../components/AuthImagePattern";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();
  const validateForm = () => {
    if(!formData.email.trim())
        return toast.error("Email is required");
    if(validator.isEmail(formData.email) === false)
        return toast.error("Email is invalid");  
    if(!formData.password.trim())
        return toast.error("Password is required");
    return true; 
  }    
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(validateForm() === true){
        login(formData);
    } 
  };
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60 ">
                Sign in to your account
              </p>
            </div>
          </div>
          <form className="space-y-6" onSubmit={handleOnSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute flex items-center inset-y-0 left-0 pl-3 pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  className="input input-bordered w-full pl-10"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute flex items-center inset-y-0 left-0 pl-3 pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  className="input input-bordered w-full pl-10"
                  type={showPassword ? "text" : "password"}
                  placeholder="Jhon Doe"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 pr-3 flex items-center right-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> Loading...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/40">
              Does&apos;t have an account ?{" "}
              <Link to="/signup" className="link link-primary">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
       {/* right side */}

       <AuthImagePattern
        title="Welcome back"
        subTitle="Sign in to continue your conversations and catch up with your messages"
      />

    </div>
  );
};

export default LoginPage;
