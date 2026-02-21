import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { HardDrive, AlertOctagon, Clock, ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Select } from "../components/ui/Select";

const WIPE_METHODS = [
  { value: "nist_800_88", label: "NIST SP 800-88 Rev1 (Clear/Purge)" },
  { value: "dod_5220_22_m", label: "DoD 5220.22-M (3-Pass)" },
  { value: "custom_zero", label: "Custom Overwrite (Zero-Fill 1-Pass)" },
  { value: "gutmann", label: "Gutmann Method (35-Pass)" }
];

const VERIFICATION_LEVELS = [
  { value: "10", label: "10% Sample Verification" },
  { value: "100", label: "100% Full Pass Verification" },
  { value: "0", label: "No Verification (Not Recommended)" }
];

export default function WipeConfiguration() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedDrive = location.state?.selectedDrive;

  const [method, setMethod] = useState(WIPE_METHODS[0].value);
  const [verification, setVerification] = useState(VERIFICATION_LEVELS[0].value);

  // If accessed directly without selecting a drive, bounce back to detection
  if (!selectedDrive) {
    return <Navigate to="/detect" replace />;
  }

  const handleProceed = () => {
    navigate('/confirm', { 
      state: { 
        selectedDrive, 
        config: { method, verification } 
      } 
    });
  };

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto animate-in fade-in duration-300">
      <header className="flex items-center gap-4 mb-6 shrink-0 border-b border-border pb-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="px-2">
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Wipe Configuration</h1>
          <p className="text-muted text-sm mt-1">Select sanitization standard and verification depth</p>
        </div>
      </header>

      <div className="flex-1 min-h-0 flex flex-col gap-6">
        {/* Selected Drive Summary Card */}
        <Card className="p-4 bg-surface border-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 border border-primary/20 rounded">
              <HardDrive size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wider font-bold mb-1">Target Drive</p>
              <h3 className="font-bold text-foreground text-lg">{selectedDrive.model}</h3>
              <p className="text-sm text-muted font-mono mt-0.5">S/N: {selectedDrive.serial} • {selectedDrive.capacity}</p>
            </div>
          </div>
          <div className="text-right px-4">
            <p className="text-xs text-muted uppercase tracking-wider font-bold mb-1">Status</p>
            <span className="text-sm font-bold text-success uppercase tracking-widest bg-success/10 px-2 py-1 rounded">Locked & Ready</span>
          </div>
        </Card>

        {/* Configuration Form */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <Select 
              label="Erasure Standard" 
              id="method"
              options={WIPE_METHODS}
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            />
            <Select 
              label="Verification Level" 
              id="verification"
              options={VERIFICATION_LEVELS}
              value={verification}
              onChange={(e) => setVerification(e.target.value)}
            />
            
            <div className="flex items-center gap-3 p-3 bg-background border border-border rounded text-sm text-muted">
              <Clock size={16} className="text-primary" />
              <span>Estimated Duration: <strong className="text-foreground font-mono">~ 1h 45m</strong></span>
            </div>
          </div>

          {/* Warning Panel */}
          <Card className="p-5 border-danger bg-danger/5 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <AlertOctagon size={24} className="text-danger animate-pulse" />
              <h3 className="font-bold text-danger text-lg uppercase tracking-wide">Irreversible Action</h3>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed mb-4">
              Initiating this process will permanently destroy all cryptographic keys, partition tables, and file system structures on the target drive. Data recovery will be impossible after this point.
            </p>
            <div className="flex items-start gap-2 text-xs text-danger font-bold uppercase tracking-wider bg-danger/10 p-2 rounded">
              <ShieldAlert size={14} className="shrink-0 mt-0.5" />
              <span>Ensure you have selected the correct physical disk before proceeding.</span>
            </div>
          </Card>
        </div>
      </div>

      <footer className="shrink-0 pt-6 mt-6 border-t border-border flex justify-end">
        <Button variant="danger" size="lg" className="px-8 font-bold tracking-wider" onClick={handleProceed}>
          PROCEED TO CONFIRMATION
        </Button>
      </footer>
    </div>
  );
}