import { useState } from "react";
import { Monitor, Settings as SettingsIcon, User, Wifi, LogOut, RefreshCw } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "../components/ui/Button";
import { Select } from "../components/ui/Select";
import { cn } from "../utils/cn";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("General");

  const TabButton = ({ label }) => (
    <button
      onClick={() => setActiveTab(label)}
      className={cn(
        "px-6 py-2 text-sm font-bold rounded-full transition-all",
        activeTab === label 
          ? "bg-[#1C2530] border border-white/10 text-foreground shadow-lg" 
          : "text-muted hover:text-foreground border border-transparent"
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl w-full mx-auto pb-10">
      <header>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-muted text-sm mt-1">Configure application preferences and system options</p>
      </header>

      <div className="flex items-center gap-1 p-1 bg-background border border-white/5 rounded-full w-fit">
        <TabButton label="General" />
        <TabButton label="Account" />
        <TabButton label="Network" />
      </div>

      {activeTab === "General" && (
        <div className="space-y-6">
          <section className="bg-[#1C2530]/30 border border-white/5 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4 text-primary font-bold uppercase tracking-wider text-xs">
              <Monitor size={18} />
              <span>Appearance</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'dark', label: 'Dark', bg: 'bg-[#0F1720]', border: 'border-[#2A3441]' },
                { id: 'light', label: 'Light', bg: 'bg-[#F4F6F8]', border: 'border-[#D8DEE5]' },
                { id: 'theme-dsecure', label: 'D-Secure', bg: 'bg-[#05100E]', border: 'border-[#133D32]' }
              ].map((t) => (
                <button 
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    "flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all bg-background/50",
                    theme === t.id ? "border-primary shadow-[0_0_15px_rgba(14,124,102,0.1)]" : "border-white/5 hover:border-white/10"
                  )}
                >
                  <div className={cn("w-full h-20 rounded border flex flex-col overflow-hidden", t.bg, t.border)}>
                    <div className={cn("h-3 border-b w-full opacity-30", t.border)} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground">{t.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-[#1C2530]/30 border border-white/5 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4 text-primary font-bold uppercase tracking-wider text-xs">
              <SettingsIcon size={18} />
              <span>Wipe Standards</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select label="Default Method" id="m" options={[{value:"n", label:"NIST SP 800-88 Rev1"}]} />
              <Select label="Verification" id="v" options={[{value:"f", label:"Full Verification"}]} />
            </div>
          </section>
        </div>
      )}

      {activeTab === "Account" && (
        <section className="bg-[#1C2530]/30 border border-white/5 rounded-lg p-6 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4 text-primary font-bold uppercase tracking-wider text-xs">
            <User size={18} />
            <span>Account Details</span>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div><p className="text-muted mb-1">Operator</p><p className="font-bold">John Mitchell</p></div>
            <div><p className="text-muted mb-1">Status</p><p className="text-primary font-bold">Authenticated</p></div>
          </div>
          <div className="mt-8 flex gap-3">
             <Button variant="outline" size="sm" className="border-white/10"><RefreshCw size={14} className="mr-2"/> Sync License</Button>
             <Button variant="danger" size="sm"><LogOut size={14} className="mr-2"/> Logout</Button>
          </div>
        </section>
      )}

      {activeTab === "Network" && (
        <section className="bg-[#1C2530]/30 border border-white/5 rounded-lg p-6 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4 text-primary font-bold uppercase tracking-wider text-xs">
            <Wifi size={18} />
            <span>Connectivity</span>
          </div>
          <div className="bg-background/50 border border-white/5 p-4 rounded flex items-center justify-between">
            <div><p className="font-bold">Network Status</p><p className="text-xs text-muted">Connected via Ethernet (eth0)</p></div>
            <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded text-xs font-bold uppercase">Online</span>
          </div>
        </section>
      )}
    </div>
  );
}