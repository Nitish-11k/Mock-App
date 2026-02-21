import React from 'react';
import { Shield, Cpu, Monitor, HardDrive, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto w-full text-foreground text-opacity-80">

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">About</h1>
        <p className="text-sm text-muted">D-Secure Drive Eraser - Boot Edition</p>
      </div>

      <div className="space-y-6">
        {/* Card 1: Product Information */}
        <div className="bg-surface rounded-xl border border-border p-8 transition-colors duration-300 shadow-sm">
          <div className="flex items-start gap-8 mb-8">
            <div className="p-5 bg-primary/10 rounded-xl border border-primary/20 flex-shrink-0">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <div className="pt-1">
              <h2 className="text-2xl font-bold text-foreground mb-1">D-Secure Drive Eraser</h2>
              <p className="text-muted text-sm mb-6 uppercase tracking-wider font-semibold">Enterprise Disk Sanitization Solution - Boot Edition</p>

              <div className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <span className="text-muted w-28 font-medium">Version:</span>
                  <span className="font-bold text-foreground">2.5.0</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-muted w-28 font-medium">Build:</span>
                  <span className="font-bold text-foreground">28268214</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-muted w-28 font-medium">Release Date:</span>
                  <span className="font-bold text-foreground">February 14, 2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border transition-colors duration-300">
            <h3 className="text-[11px] font-extrabold text-foreground mb-4 uppercase tracking-[0.2em] opacity-60">Product Description</h3>
            <p className="text-sm text-foreground text-opacity-70 leading-relaxed max-w-3xl">
              D-Secure Drive Eraser is a professional-grade disk sanitization appliance designed for enterprise IT professionals. Running from bootable USB or PXE environments, it provides secure, compliant, and irreversible data erasure for physical storage devices before system deployment or decommissioning. The application supports multiple industry-standard erasure methods including NIST SP 800-88 Rev1, DoD 5220.22-M, and custom configurations.
            </p>
          </div>
        </div>

        {/* Card 2: License Information */}
        <div className="bg-surface rounded-xl border border-border p-8 transition-colors duration-300 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-8 flex items-center gap-2 border-b border-border pb-4">
            License Information
          </h3>
          <div className="space-y-6 text-sm px-2">
            <div className="flex justify-between items-center">
              <span className="text-muted font-medium">License Type</span>
              <span className="font-bold text-foreground">Enterprise Multi-Seat</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted font-medium">Licensed To</span>
              <span className="font-bold text-foreground">Enterprise IT Division</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted font-medium">License Key</span>
              <span className="font-mono text-foreground font-bold text-xs tracking-wider">DSEC-ENT-2024-XXXX-XXXX-XXXX</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted font-medium">Expires</span>
              <span className="font-bold text-foreground">August 30, 2026</span>
            </div>
          </div>
        </div>

        {/* Card 3: System Hardware Information */}
        <div className="bg-surface rounded-xl border border-border p-8 transition-colors duration-300 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-6">System Hardware Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Processor */}
            <div className="bg-background/40 rounded-xl border border-border p-5 flex items-start gap-4 transition-colors duration-300 hover:bg-background/60 hover:border-primary/30 group">
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-[10px] text-muted uppercase tracking-widest font-extrabold mb-1.5 opacity-60">Processor</div>
                <div className="text-sm font-bold text-foreground">Intel Core i7-12700K</div>
                <div className="text-xs text-muted font-medium mt-1">12 Cores, 20 Threads</div>
              </div>
            </div>

            {/* Memory */}
            <div className="bg-background/40 rounded-xl border border-border p-5 flex items-start gap-4 transition-colors duration-300 hover:bg-background/60 hover:border-primary/30 group">
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <Monitor className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-[10px] text-muted uppercase tracking-widest font-extrabold mb-1.5 opacity-60">Memory</div>
                <div className="text-sm font-bold text-foreground">32 GB DDR4</div>
                <div className="text-xs text-muted font-medium mt-1">3200 MHz</div>
              </div>
            </div>

            {/* Storage Controllers */}
            <div className="bg-background/40 rounded-xl border border-border p-5 flex items-start gap-4 transition-colors duration-300 hover:bg-background/60 hover:border-primary/30 group">
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <HardDrive className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-[10px] text-muted uppercase tracking-widest font-extrabold mb-1.5 opacity-60">Storage Controllers</div>
                <div className="text-sm font-bold text-foreground">3 Detected</div>
                <div className="text-xs text-muted font-medium mt-1">NVMe, SATA, USB</div>
              </div>
            </div>

            {/* Boot Mode */}
            <div className="bg-background/40 rounded-xl border border-border p-5 flex items-start gap-4 transition-colors duration-300 hover:bg-background/60 hover:border-primary/30 group">
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-[10px] text-muted uppercase tracking-widest font-extrabold mb-1.5 opacity-60">Boot Mode</div>
                <div className="text-sm font-bold text-foreground">UEFI</div>
                <div className="text-xs text-muted font-medium mt-1">Secure Boot Enabled</div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-20 text-center space-y-3 pb-12 opacity-60">
          <p className="text-[12px] text-muted font-bold tracking-widest uppercase">© 2026 D-Secure Technologies. All rights reserved.</p>
          <p className="text-[11px] text-muted text-opacity-80 max-w-md mx-auto italic">This is a specialized boot environment tool for enterprise data sanitization.</p>
        </div>

      </div>
    </div>
  );
};

export default About;