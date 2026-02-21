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
          ? "bg-[#1C2530] border border-white/10 text-foreground" 
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
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
              <Monitor size={18} className="text-primary" />
              <h2 className="font-bold text-sm text-foreground uppercase tracking-wider">Appearance</h2>
            </div>
            
            <div className="mb-6 space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest">Selected Theme</label>
              <Select 
                id="theme-select"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                options={[
                  { value: "dark", label: "Dark Theme - Default" },
                  { value: "light", label: "Light Theme - High Contrast" },
                  { value: "theme-dsecure", label: "D-Secure Theme - Enhanced Green" }
                ]}
              />
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
                    theme === t.id ? "border-primary shadow-[0_0_15px_rgba(14,124,102,0.2)]" : "border-white/5 hover:border-white/10"
                  )}
                >
                  <div className={cn("w-full h-20 rounded border flex flex-col overflow-hidden", t.bg, t.border)}>
                    <div className={cn("h-3 border-b w-full opacity-50", t.border)} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground">{t.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-[#1C2530]/30 border border-white/5 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
              <SettingsIcon size={18} className="text-primary" />
              <h2 className="font-bold text-sm text-foreground uppercase tracking-wider">Default Wipe Settings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-widest">Wipe Method</label>
                <Select id="m" defaultValue="n" options={[{value:"n", label:"NIST SP 800-88 Rev1"}]} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-widest">Verification</label>
                <Select id="v" defaultValue="f" options={[{value:"f", label:"Full Sector Verification"}]} />
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}