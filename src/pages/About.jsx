import { Shield, Info, Cpu, HardDrive, Lock } from "lucide-react";
import { Card } from "../components/ui/Card";

export default function About() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl w-full mx-auto pb-10">
      <header>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">About System</h1>
        <p className="text-muted text-sm mt-1">Product information and appliance identification</p>
      </header>

      <section className="bg-[#1C2530]/30 border border-white/5 rounded-lg p-8 flex flex-col items-center text-center">
        <div className="p-4 bg-primary/10 rounded-full border border-primary/20 mb-6">
          <Shield size={48} className="text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground tracking-tight">D-Secure Drive Eraser</h2>
        <p className="text-primary font-mono text-sm font-bold uppercase tracking-[0.2em] mt-2">Enterprise Boot Edition</p>
        
        <div className="grid grid-cols-2 gap-8 w-full max-w-md mt-10 text-sm border-t border-white/5 pt-8">
          <div className="text-left">
            <p className="text-muted text-xs uppercase font-bold tracking-widest mb-1">Software Version</p>
            <p className="text-foreground font-mono">v2.5.0 build 20260214</p>
          </div>
          <div className="text-left">
            <p className="text-muted text-xs uppercase font-bold tracking-widest mb-1">Engine Status</p>
            <p className="text-success font-bold">OPTIMIZED</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#1C2530]/20 border-white/5 p-6 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Cpu size={20} />
            <h3 className="font-bold text-sm uppercase tracking-wider">Kernel Environment</h3>
          </div>
          <ul className="space-y-3 text-sm font-mono">
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-muted">OS Type:</span>
              <span className="text-foreground">Linux x64 (UEFI)</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-muted">Security:</span>
              <span className="text-foreground">Secure Boot Enabled</span>
            </li>
          </ul>
        </Card>

        <Card className="bg-[#1C2530]/20 border-white/5 p-6 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Lock size={20} />
            <h3 className="font-bold text-sm uppercase tracking-wider">Compliance Registry</h3>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            This appliance is certified for use in NIST 800-88 Rev1 and DoD 5220.22-M environments. All wipe logs are cryptographically signed.
          </p>
        </Card>
      </div>
    </div>
  );
}