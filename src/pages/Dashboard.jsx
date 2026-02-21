import { useNavigate } from "react-router-dom";
import { Shield, Calendar, Clock, ArrowRight, FileCheck, FileText } from "lucide-react";
import { Button } from "../components/ui/Button";

const StatCard = ({ label, value, icon: Icon, valueColor = "text-foreground" }) => (
  <div className="bg-[#1C2530]/50 border border-white/5 p-5 rounded-lg flex flex-col justify-center transition-all hover:border-primary/50">
    <div className="flex items-center gap-2 text-xs text-muted mb-2">
      {Icon && <Icon size={14} />}
      <span>{label}</span>
    </div>
    <p className={`text-xl font-bold tracking-wide ${valueColor}`}>{value}</p>
  </div>
);

const ComplianceCard = ({ title, subtitle }) => (
  <div className="border border-white/5 p-5 rounded-lg bg-[#1C2530]/30 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
    <Shield size={16} className="text-muted mb-3 group-hover:text-primary transition-colors" />
    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-xs text-muted mt-1">{subtitle}</p>
  </div>
);

const WipedDriveItem = ({ model, serial, method, date }) => (
  <div className="flex items-center justify-between p-5 rounded-lg border border-white/5 bg-[#1C2530]/20 hover:border-primary/40 transition-colors">
    <div className="flex items-center gap-4">
      <div className="p-2 border border-white/10 rounded-md bg-background">
        <FileText size={18} className="text-primary" />
      </div>
      <div>
        <p className="font-bold text-foreground text-sm">{model}</p>
        <p className="text-xs text-muted font-mono mt-0.5">S/N: {serial}</p>
      </div>
    </div>
    <div className="flex items-center gap-12 text-right">
      <div>
        <p className="text-sm font-bold text-foreground">{method}</p>
        <p className="text-xs text-muted font-mono mt-0.5">{date}</p>
      </div>
      <span className="text-[10px] text-primary border border-primary/40 px-3 py-1 rounded font-bold uppercase tracking-widest">
        COMPLETED
      </span>
    </div>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 animate-in fade-in duration-300 max-w-5xl w-full mx-auto pb-10">
      <header>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-muted text-sm mt-1">Enterprise disk sanitization overview and controls</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Account" value="Enterprise IT Division" />
        <StatCard label="Remaining Licenses" value="12" valueColor="text-primary" />
        <StatCard label="License Expiration" value="2026-08-30" icon={Calendar} />
        <StatCard label="Last Activity" value="2026-02-13 16:45" icon={Clock} />
      </div>

      <div className="flex gap-4">
        <Button onClick={() => navigate('/detect')} className="h-10 px-6 bg-primary hover:bg-accent text-white font-bold border-0">
          Start New Drive Erasure <ArrowRight size={16} className="ml-2" />
        </Button>
        <Button onClick={() => navigate('/reports')} variant="outline" className="h-10 px-6 bg-transparent border-white/10 text-foreground hover:bg-white/5 font-bold">
          View Reports
        </Button>
      </div>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Shield size={18} className="text-primary" />
          <h2 className="font-bold text-sm text-foreground uppercase tracking-wider">Compliance Standards</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ComplianceCard title="NIST SP 800-88 Rev1" subtitle="Guidelines for Media Sanitization" />
          <ComplianceCard title="DoD 5220.22-M" subtitle="Department of Defense Clearing Standard" />
          <ComplianceCard title="GDPR Alignment" subtitle="EU General Data Protection Regulation" />
          <ComplianceCard title="ISO 27001 Alignment" subtitle="Information Security Management" />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <FileCheck size={18} className="text-primary" />
          <h2 className="font-bold text-sm text-foreground uppercase tracking-wider">Recently Wiped Drives</h2>
        </div>
        <div className="flex flex-col gap-3">
          <WipedDriveItem model="WD Blue SN570 NVMe" serial="WD-WX42D9087452" method="NIST SP 800-88 Rev1" date="2026-02-13" />
          <WipedDriveItem model="Samsung 870 EVO" serial="S4CZNX0R804567" method="DoD 5220.22-M" date="2026-02-12" />
        </div>
      </section>
    </div>
  );
}