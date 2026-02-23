import { useNavigate } from "react-router-dom";
import { Shield, Calendar, Clock, ArrowRight, FileText } from "lucide-react";
import { Button } from "../components/ui/Button";

const StatCard = ({ label, value, icon: Icon, valueColor = "text-foreground" }) => (
  <div className="bg-surface border border-border p-6 rounded-xl flex flex-col justify-center transition focus-within:border-primary/50 hover:border-primary/50 shadow-sm">
    <div className="flex items-center gap-2 text-[10px] text-muted mb-3 uppercase tracking-[0.2em] font-extrabold opacity-70">
      {Icon && <Icon size={12} />}
      <span>{label}</span>
    </div>
    <p className={`text-xl font-bold tracking-tight ${valueColor}`}>{value}</p>
  </div>
);

const ComplianceCard = ({ title, subtitle }) => (
  <div className="border border-border p-5 rounded-xl bg-surface hover:border-primary transition-colors duration-300 cursor-pointer group shadow-sm flex flex-col items-start gap-4 active:scale-[0.98]">
    <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
      <Shield size={16} className="text-primary/70 group-hover:text-primary transition-colors" />
    </div>
    <div>
      <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors tracking-tight uppercase">{title}</h3>
      <p className="text-[10px] text-muted mt-1 leading-relaxed opacity-80">{subtitle}</p>
    </div>
  </div>
);

const WipedDriveItem = ({ model, serial, method, date, onViewReport }) => (
  <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface shadow-sm group/item">
    <div className="flex items-center gap-4">
      <div className="p-2.5 border border-border rounded-lg bg-background shadow-inner">
        <FileText size={18} className="text-primary" />
      </div>
      <div>
        <p className="font-bold text-foreground text-[13px] tracking-tight">{model}</p>
        <p className="text-[11px] text-muted font-mono mt-0.5 opacity-80 uppercase">S/N: {serial}</p>
      </div>
    </div>
    <div className="flex items-center gap-8">
      <div className="text-right hidden sm:block">
        <p className="text-[11px] font-bold text-foreground opacity-90">{method}</p>
        <p className="text-[10px] text-muted font-mono mt-0.5">{date}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full flex items-center gap-2 min-w-[100px] justify-center shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">completed</span>
        </div>
        <button
          onClick={onViewReport}
          className="h-8 px-4 text-[10px] font-bold border border-border bg-background/50 hover:bg-primary hover:text-white hover:border-primary transition-all rounded-lg text-foreground text-opacity-70 active:scale-95 whitespace-nowrap"
        >
          View Report
        </button>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl w-full mx-auto pb-20">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-muted text-sm mt-1">Enterprise disk sanitization overview and controls</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Account" value="Enterprise IT Division" />
        <StatCard label="Remaining Licenses" value="12" valueColor="text-primary" />
        <StatCard label="License Expiration" value="2026-08-30" icon={Calendar} />
        <StatCard label="Last Activity" value="2026-02-13 16:45" icon={Clock} />
      </div>

      <div className="flex flex-wrap gap-4">
        <Button onClick={() => navigate('/detect')} className="h-11 px-6 bg-primary hover:brightness-110 text-white font-bold border-0 shadow-lg shadow-primary/20 transition-all active:scale-95 text-xs">
          Start New Drive Erasure <ArrowRight size={14} className="ml-2" />
        </Button>
        <Button onClick={() => navigate('/reports')} variant="outline" className="h-11 px-6 bg-surface border-border text-foreground hover:bg-primary hover:text-white hover:border-primary font-bold transition-all active:scale-95 text-xs">
          View Reports
        </Button>
      </div>

      <section>
        <div className="flex items-center gap-3 mb-5 group">
          <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shadow-sm">
            <Shield size={14} className="text-primary" />
          </div>
          <h2 className="font-extrabold text-[10px] text-foreground uppercase tracking-[0.2em] opacity-60">Compliance Standards</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <ComplianceCard title="NIST SP 800-88 Rev1" subtitle="Guidelines for Media Sanitization" />
          <ComplianceCard title="DoD 5220.22-M" subtitle="Department of Defense Clearing Standard" />
          <ComplianceCard title="GDPR Alignment" subtitle="General Data Protection Regulation" />
          <ComplianceCard title="ISO 27001 Alignment" subtitle="Information Security Management" />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-5 group">
          <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shadow-sm">
            <FileText size={14} className="text-primary" />
          </div>
          <h2 className="font-extrabold text-[10px] text-foreground uppercase tracking-[0.2em] opacity-60">Recently Wiped Drives</h2>
        </div>
        <div className="flex flex-col gap-3">
          <WipedDriveItem
            model="WD Blue SN570 NVMe"
            serial="WD-WX42D9087452"
            method="NIST SP 800-88 Rev1"
            date="2026-02-13"
            onViewReport={() => navigate('/reports')}
          />
          <WipedDriveItem
            model="Samsung 870 EVO"
            serial="S4CZNX0R804567"
            method="DoD 5220.22-M"
            date="2026-02-12"
            onViewReport={() => navigate('/reports')}
          />
        </div>
      </section>
    </div>
  );
}