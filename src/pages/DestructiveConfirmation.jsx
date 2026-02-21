import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { AlertTriangle, HardDrive, ShieldAlert, XCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";

export default function DestructiveConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedDrive = location.state?.selectedDrive;
  const config = location.state?.config;

  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState("");

  if (!selectedDrive || !config) {
    return <Navigate to="/detect" replace />;
  }

  const handleConfirm = () => {
    if (confirmText.trim() !== selectedDrive.serial) {
      setError("Serial number does not match.");
      return;
    }
    setError("");
    navigate('/progress', { 
      state: { selectedDrive, config },
      replace: true 
    });
  };

  const isMatch = confirmText.trim() === selectedDrive.serial;

  return (
    // ADDED overflow-y-auto here to fix the cutoff issue
    <div className="h-full w-full flex flex-col items-center p-4 md:p-8 overflow-y-auto animate-in zoom-in-95 duration-300">
      <Card className="w-full max-w-lg border-danger shadow-2xl flex flex-col shrink-0 mt-auto mb-auto">
        
        <div className="bg-danger p-6 text-center text-white shrink-0">
          <AlertTriangle size={48} className="mx-auto mb-4 animate-pulse" />
          <h2 className="text-xl md:text-2xl font-bold tracking-widest uppercase">Destructive Action Warning</h2>
          <p className="text-sm font-medium mt-2 opacity-90">
            You are about to permanently obliterate all data on this device.
          </p>
        </div>

        <div className="p-6 bg-surface flex-1">
          <div className="flex items-center gap-4 p-4 bg-background border border-border rounded mb-6">
            <div className="p-3 bg-surface border border-border rounded shrink-0">
              <HardDrive size={24} className="text-muted" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Target Drive</p>
              <p className="font-bold text-foreground text-base md:text-lg truncate">{selectedDrive.model}</p>
              <div className="flex items-center gap-3 text-sm text-muted font-mono mt-0.5">
                <span className="text-danger font-bold">S/N: {selectedDrive.serial}</span>
                <span>•</span>
                <span>{selectedDrive.capacity}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 text-sm text-foreground/80 bg-danger/5 border border-danger/20 p-4 rounded">
              <ShieldAlert size={18} className="text-danger shrink-0 mt-0.5" />
              <p>
                The selected method <strong>{config.method.replace(/_/g, ' ').toUpperCase()}</strong> will securely overwrite all sectors. The partition table and filesystem will be destroyed.
              </p>
            </div>

            <div className="pt-2">
              <p className="text-sm font-bold text-foreground mb-2">
                Type the drive's exact serial number (<span className="text-danger font-mono select-none">{selectedDrive.serial}</span>) to authorize this wipe:
              </p>
              <Input
                id="serial-confirm"
                placeholder="Enter serial number..."
                value={confirmText}
                onChange={(e) => {
                  setConfirmText(e.target.value);
                  if (error) setError("");
                }}
                error={error}
                className="font-mono text-center text-lg uppercase"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>
        </div>

        {/* Actions are now safely inside the scrollable view */}
        <div className="p-4 md:p-6 bg-background border-t border-border flex flex-col md:flex-row gap-4 shrink-0">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate(-1)}
          >
            <XCircle size={18} className="mr-2" />
            ABORT
          </Button>
          <Button 
            variant="danger" 
            className="flex-1 font-bold tracking-widest"
            disabled={!isMatch}
            onClick={handleConfirm}
          >
            EXECUTE WIPE
          </Button>
        </div>
      </Card>
    </div>
  );
}