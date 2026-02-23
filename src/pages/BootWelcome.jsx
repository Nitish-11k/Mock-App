import { useNavigate } from "react-router-dom";
import { Shield, Cpu, MemoryStick, HardDrive } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function BootWelcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 border border-primary/20">
        <Shield className="w-8 h-8 text-primary" />
      </div>

      <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
        D-Secure Drive Eraser
      </h1>
      <p className="text-muted text-sm font-mono mb-8 uppercase tracking-widest">
        Boot Edition v4.2.0
      </p>

      <Card className="w-full max-w-md p-6 mb-8 bg-surface border-primary/10">
        <h2 className="text-xs font-bold text-muted uppercase tracking-wider mb-4 border-b border-background pb-2">
          Hardware Environment
        </h2>
        <div className="space-y-3 font-mono text-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted"><Cpu size={14} /> CPU</span>
            <span className="text-foreground">Intel Xeon E-2224G</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted"><MemoryStick size={14} /> RAM</span>
            <span className="text-foreground">16384 MB (OK)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted"><HardDrive size={14} /> Storage Bus</span>
            <span className="text-foreground text-success">PCIe / SATA Active</span>
          </div>
        </div>
      </Card>

      <Button size="lg" className="w-full max-w-md font-bold tracking-wide" onClick={() => navigate('/network')}>
        INITIALIZE SYSTEM
      </Button>
    </div>
  );
}