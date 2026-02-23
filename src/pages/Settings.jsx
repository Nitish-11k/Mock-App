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
        "px-6 py-2 text-sm font-bold rounded-full transition",
        activeTab === label
          ? "bg-foreground text-background shadow-lg"
          : "text-muted hover:text-foreground hover:bg-surface/50 border border-transparent"
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl w-full mx-auto pb-10">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-muted text-sm mt-1">Configure application preferences and system options</p>
      </header>

      <div className="flex items-center gap-1 p-1 bg-surface/50 border border-border rounded-full w-fit backdrop-blur-sm">
        <TabButton label="General" />
        <TabButton label="Account" />
        <TabButton label="Network" />
      </div>

      {activeTab === "General" && (
        <div className="space-y-8">
          <section className="bg-surface border border-border rounded-xl p-8 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-2 mb-8 border-b border-border pb-6 text-primary font-bold uppercase tracking-[0.15em] text-[11px]">
              <Monitor size={16} />
              <span>Appearance</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'dark', label: 'Dark', bg: 'bg-[#0F1720]', border: 'border-[#2A3441]' },
                { id: 'light', label: 'Light', bg: 'bg-[#F8FAFC]', border: 'border-[#E2E8F0]' },
                { id: 'theme-dsecure', label: 'D-Secure', bg: 'bg-[#05100E]', border: 'border-[#133D32]' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    "flex flex-col items-center gap-4 p-5 rounded-xl border-2 transition-all",
                    theme === t.id
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/5"
                      : "border-border/50 hover:border-primary/30 bg-background/30"
                  )}
                >
                  <div className={cn("w-full h-24 rounded-lg border shadow-inner flex flex-col overflow-hidden", t.bg, t.border)}>
                    <div className={cn("h-4 border-b w-full opacity-10 bg-white/10")} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground">{t.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-surface border border-border rounded-xl p-8 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-2 mb-8 border-b border-border pb-6 text-primary font-bold uppercase tracking-[0.15em] text-[11px]">
              <SettingsIcon size={16} />
              <span>Default Wipe Settings</span>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <Select label="Default Wipe Method" id="m" options={[{ value: "n", label: "NIST SP 800-88 Rev1" }]} />
              <Select label="Default Verification Level" id="v" options={[{ value: "f", label: "Full Sector Verification" }]} />
            </div>
          </section>
        </div>
      )}

      {activeTab === "Account" && (
        <section className="bg-surface border border-border rounded-xl p-8 shadow-sm animate-in fade-in duration-300">
          <div className="flex items-center gap-2 mb-8 border-b border-border pb-6 text-primary font-bold uppercase tracking-[0.15em] text-[11px]">
            <User size={16} />
            <span>Account Details</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
            <div className="bg-background/20 p-4 rounded-lg border border-border/50">
              <p className="text-[10px] text-muted uppercase font-bold tracking-widest mb-1.5">Operator</p>
              <p className="font-bold text-foreground text-base">John Mitchell</p>
            </div>
            <div className="bg-background/20 p-4 rounded-lg border border-border/50">
              <p className="text-[10px] text-muted uppercase font-bold tracking-widest mb-1.5">Status</p>
              <p className="text-primary font-bold text-base flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Authenticated
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="outline" size="sm" className="h-10 px-6 font-bold"><RefreshCw size={14} className="mr-2" /> Sync License</Button>
            <Button variant="danger" size="sm" className="h-10 px-6 font-bold"><LogOut size={14} className="mr-2" /> Logout</Button>
          </div>
        </section>
      )}

      {activeTab === "Network" && (
        <section className="bg-surface border border-border rounded-xl p-8 shadow-sm animate-in fade-in duration-300">
          <div className="flex items-center gap-2 mb-8 border-b border-border pb-6 text-primary font-bold uppercase tracking-[0.15em] text-[11px]">
            <Wifi size={16} />
            <span>Connectivity</span>
          </div>
          <div className="bg-background/40 border border-border rounded-xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Wifi size={24} className="text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-lg">Network Status</p>
                <p className="text-sm text-muted">Connected via Ethernet (eth0)</p>
              </div>
            </div>
            <span className="bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-md shadow-primary/20">Online</span>
          </div>
        </section>
      )}
    </div>
  );
}