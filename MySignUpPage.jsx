import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    const { fullName, email, password } = formData;
    if (!fullName.trim()) return toast.error("Full name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid email format");
    if (!password) toast.error("Password is required");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (evnt) => {
    evnt.preventDefault();

    const success = validateForm();

    if (success) signup(formData);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* left */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-fit rounded-xl bg-blue-100 p-3 hover:bg-blue-200">
              <MessageSquare className="size-6 stroke-blue-600" />
            </div>
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-neutral-400">
              Get started with your free account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-6">
              <div>
                <label className="block px-1 py-2 text-sm font-semibold text-neutral-500">
                  <span className="">Full Name</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="size-5" />
                  </div>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(evnt) =>
                      setFormData({ ...formData, fullName: evnt.target.value })
                    }
                    className="border-1 w-full rounded-md border-neutral-200 p-3 pl-10"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block px-1 py-2 text-sm font-semibold text-neutral-500">
                  <span className="">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="size-5" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(evnt) =>
                      setFormData({ ...formData, email: evnt.target.value })
                    }
                    className="border-1 w-full rounded-md border-neutral-200 p-3 pl-10"
                    placeholder="johndoe@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block px-1 py-2 text-sm font-semibold text-neutral-500">
                  <span className="">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="size-5" />
                  </div>
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    value={formData.password}
                    onChange={(evnt) =>
                      setFormData({ ...formData, password: evnt.target.value })
                    }
                    className="border-1 w-full rounded-md border-neutral-200 p-3 pl-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="button absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg bg-blue-600 py-4 text-sm font-semibold text-white hover:bg-blue-700 hover:text-blue-200"
              >
                {isSigningUp ? <Loader2 /> : "Create Account"}
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-neutral-400">
              Already have an account{" "}
              <Link
                to="/login"
                className="text-blue-600 underline hover:text-blue-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* right */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
}

export default SignUpPage;
