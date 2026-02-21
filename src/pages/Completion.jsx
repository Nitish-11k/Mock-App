import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { CheckCircle, Shield, FileText, ArrowLeft, Download, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function Completion() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedDrive = location.state?.selectedDrive;
  const config = location.state?.config;

  if (!selectedDrive || !config) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 animate-in zoom-in-95 duration-500">
      <Card className="w-full max-w-2xl border-emerald-500/20 shadow-[0_0_100px_rgba(16,185,129,0.15)] overflow-hidden relative">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

        {/* Success Header */}
        <div className="p-10 text-center border-b border-border bg-emerald-500/[0.02]">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <CheckCircle size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black text-foreground tracking-tight uppercase italic mb-2">Wipe Successful</h2>
          <p className="text-muted text-sm font-medium tracking-wide">
            The device has been sanitized and verified according to security protocols.
          </p>
        </div>

        {/* Audit Summary Grid */}
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-muted font-black uppercase tracking-[0.2em] mb-2 opacity-60">Target Device</p>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-surface border border-border rounded-lg shadow-sm">
                    <Shield size={16} className="text-primary" />
                  </div>
                  <p className="font-bold text-foreground text-sm">{selectedDrive.model}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-muted font-black uppercase tracking-[0.2em] mb-2 opacity-60">Serial Number</p>
                <p className="font-mono text-sm font-bold text-foreground px-3 py-1 bg-background border border-border rounded-md inline-block">
                  {selectedDrive.serial}
                </p>
              </div>
            </div>

            <div className="space-y-6 text-right">
              <div>
                <p className="text-[10px] text-muted font-black uppercase tracking-[0.2em] mb-2 opacity-60">Sanitization Method</p>
                <p className="font-bold text-foreground text-sm">{config.method.toUpperCase().replace(/_/g, ' ')}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted font-black uppercase tracking-[0.2em] mb-2 opacity-60">Audit Result</p>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                  PASS - SECURE
                </span>
              </div>
            </div>
          </div>

          {/* Certificate Notice */}
          <div className="bg-primary/5 border border-primary/20 p-5 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-primary/10 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <FileText className="text-primary" size={24} />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">Security Audit Certificate</p>
                <p className="text-[11px] text-muted mt-0.5 font-medium opacity-80">RPT-{new Date().toISOString().slice(0, 10).replace(/-/g, '')}-SEC-01</p>
              </div>
            </div>
            <ExternalLink className="text-muted group-hover:text-primary transition-colors" size={18} />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-background/50 border-t border-border flex gap-4">
          <Button
            variant="outline"
            className="flex-1 font-bold text-xs uppercase tracking-widest py-6 border-border hover:bg-surface"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2" size={14} /> Back to Dashboard
          </Button>
          <Button
            className="flex-1 bg-primary font-black text-xs uppercase tracking-widest py-6 shadow-lg shadow-primary/20 hover:brightness-110"
            onClick={() => navigate('/reports')}
          >
            <Download className="mr-2" size={14} /> View Full Report
          </Button>
        </div>
      </Card>
    </div>
  );
}