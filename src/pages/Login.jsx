import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 animate-in fade-in duration-300">
      <Card className="w-full max-w-sm p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-surface border border-border rounded mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Technician Login</h2>
          <p className="text-xs text-muted mt-1 text-center">Authenticate to access enterprise sanitization tools.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <Input 
            label="Operator Email" 
            id="email" 
            type="email" 
            placeholder="admin@enterprise.local" 
            required 
          />
          <Input 
            label="Access Token / Password" 
            id="password" 
            type="password" 
            placeholder="••••••••" 
            required 
          />
          <div className="pt-2">
            <Button type="submit" className="w-full" isLoading={isLoading}>
              AUTHORIZE
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}