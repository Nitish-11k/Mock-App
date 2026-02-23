import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, WifiOff } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2500);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0B1219] flex items-center justify-center z-[100]">
        <div className="w-12 h-12 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 animate-in fade-in duration-500 bg-[#0B1219]">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-[#0E1B1B] rounded-xl flex items-center justify-center border border-[#143D37] mb-8">
            <Shield className="w-8 h-8 text-[#10B981]" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Authentication Required</h1>
          <p className="text-gray-400 text-sm">Enter your D-Secure credentials</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-300 ml-1">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="tech@company.com"
              className="w-full bg-[#161D24] border border-[#2A3441] h-12 rounded-lg px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-300 ml-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#161D24] border border-[#2A3441] h-12 rounded-lg px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-[#0E7C66] hover:bg-[#0C6A57] text-white font-bold rounded-lg transition-all"
            isLoading={isLoading}
          >
            Login
          </Button>

          <div className="flex items-center gap-4 py-2">
            <div className="h-[1px] flex-1 bg-gray-800"></div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">OR</span>
            <div className="h-[1px] flex-1 bg-gray-800"></div>
          </div>

          <button
            type="button"
            className="w-full h-12 border border-[#2A3441] hover:bg-white/5 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                navigate('/dashboard');
              }, 2500);
            }}
          >
            <WifiOff size={18} />
            Continue in Offline Mode
          </button>
        </form>

        <p className="text-xs font-medium text-gray-500 text-center mt-4">
          Demo credentials: <span className="text-gray-400">tech@dsecure.com</span> / <span className="text-gray-400">demo</span>
        </p>
      </div>
    </div>
  );
}