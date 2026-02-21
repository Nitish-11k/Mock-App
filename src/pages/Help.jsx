import { HelpCircle, BookOpen, ExternalLink, LifeBuoy, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/Button";

const HelpCard = ({ icon: Icon, title, description }) => (
  <div className="border border-white/5 p-6 rounded-lg bg-[#1C2530]/30 hover:border-primary hover:bg-primary/5 transition-all group">
    <Icon size={24} className="text-primary mb-4" />
    <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted leading-relaxed mb-4">{description}</p>
    <Button variant="outline" size="sm" className="w-full text-xs border-white/10 hover:border-primary">
      Open Documentation
    </Button>
  </div>
);

export default function Help() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl w-full mx-auto pb-10">
      <header>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Support & Resources</h1>
        <p className="text-muted text-sm mt-1">Documentation and troubleshooting for the D-Secure appliance</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HelpCard 
          icon={BookOpen} 
          title="User Manual" 
          description="Step-by-step guides on drive sanitization and report exporting procedures."
        />
        <HelpCard 
          icon={Shield} 
          title="Sanitization Standards" 
          description="Technical details regarding NIST 800-88, DoD 5220, and custom erasure algorithms."
        />
        <HelpCard 
          icon={LifeBuoy} 
          title="Support Desk" 
          description="Contact D-Secure Technologies for enterprise licensing or hardware bus issues."
        />
      </div>

      <section className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="text-primary" size={20} />
          <h2 className="font-bold text-base text-foreground">Diagnostic Tip</h2>
        </div>
        <p className="text-sm text-muted leading-relaxed">
          If your drive is not appearing in the <strong>Target Selection</strong> screen, ensure the drive is not currently mounted or locked by another system service. You can use the <span className="text-primary font-mono">Rescan Bus</span> button to refresh the hardware inventory.
        </p>
      </section>
    </div>
  );
}