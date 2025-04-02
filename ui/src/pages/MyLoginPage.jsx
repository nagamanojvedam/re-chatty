import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/MyAuthImagePattern";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (evnt) => {
    evnt.preventDefault();
    login(formData);
  };

  return (
    <div className="grid h-screen lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="group flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 hover:bg-blue-200">
                <MessageSquare className="text-primary h-6 w-6 stroke-blue-500" />
              </div>
              <h1 className="mt-2 text-2xl font-bold">Welcome Back</h1>
              <p className="text-neutral-400">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block px-1 py-2 text-sm font-semibold text-neutral-600">
                <span>Email</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 stroke-neutral-400" />
                </div>
                <input
                  type="email"
                  className="border-1 w-full rounded-lg border-neutral-200 py-3 pl-10 placeholder:text-neutral-400"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block px-1 py-2 text-sm font-semibold text-neutral-600">
                <span>Password</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 stroke-neutral-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="border-1 w-full rounded-lg border-neutral-200 py-3 pl-10 placeholder:text-neutral-400"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="text-base-content/40 h-5 w-5" />
                  ) : (
                    <Eye className="text-base-content/40 h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-blue-600 py-4 text-sm font-semibold text-white hover:bg-blue-700 hover:text-blue-200"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-neutral-400">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 underline hover:text-blue-700"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={
          "Sign in to continue your conversations and catch up with your messages."
        }
      />
    </div>
  );
}

export default LoginPage;
