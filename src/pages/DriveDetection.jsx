import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HardDrive, Usb, RefreshCw, AlertTriangle, Loader2, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { cn } from "../utils/cn";

// Mock data as requested
const MOCK_DRIVES = [
  { id: 'dev-nvme0n1', model: 'Samsung 980 PRO NVMe', serial: 'S5GXNX0R301452', capacity: '1.0 TB', interface: 'NVMe', isSystem: true, status: 'online' },
  { id: 'dev-sda', model: 'Seagate BarraCuda', serial: 'Z9A8B7C6', capacity: '512 GB', interface: 'SATA', isSystem: false, status: 'online' },
  { id: 'dev-sdb', model: 'SanDisk Extreme Portable', serial: 'SD-4459021', capacity: '1.0 TB', interface: 'USB', isSystem: false, status: 'online' },
];

export default function DriveDetection() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(true);
  const [drives, setDrives] = useState([]);

  const scanHardware = () => {
    setIsScanning(true);
    setDrives([]);
    // Simulate bus scan delay
    setTimeout(() => {
      setDrives(MOCK_DRIVES);
      setIsScanning(false);
    }, 1500);
  };

  useEffect(() => {
    scanHardware();
  }, []);

  const handleSelectDrive = (drive) => {
    // In a real app, you'd pass the drive to a global context or state manager here
    navigate('/config', { state: { selectedDrive: drive } });
  };

  return (
   <div className="h-full flex flex-col space-y-6 p-8 overflow-y-auto animate-in fade-in duration-300 mx-auto max-w-4xl w-full">
      
      {/* Header */}
      <header className="flex items-center justify-between mb-6 shrink-0 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Target Selection</h1>
          <p className="text-muted text-sm mt-1">Select a physical drive for sanitization</p>
        </div>
        <Button variant="outline" onClick={scanHardware} disabled={isScanning} className="h-10">
          <RefreshCw size={16} className={cn("mr-2", isScanning && "animate-spin")} />
          Rescan Bus
        </Button>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 flex flex-col relative">
        {isScanning ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted">
            <Loader2 size={48} className="animate-spin text-primary mb-4" />
            <p className="font-mono text-sm uppercase tracking-widest animate-pulse">Scanning PCIe / SATA / USB...</p>
          </div>
        ) : (
          <div className="space-y-3 overflow-y-auto pr-2 pb-4">
            {drives.map((drive) => (
              <Card key={drive.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/50 transition-colors">
                
                {/* Drive Identity */}
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-background border border-border rounded flex-shrink-0">
                    {drive.interface === 'USB' ? <Usb size={24} className="text-muted" /> : <HardDrive size={24} className="text-primary" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-foreground text-lg">{drive.model}</h3>
                      {drive.isSystem && (
                        <span className="flex items-center gap-1 text-[10px] bg-danger/10 text-danger border border-danger/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          <AlertTriangle size={10} /> System
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted font-mono mt-1">
                      <span>S/N: {drive.serial}</span>
                      <span>•</span>
                      <span>{drive.id}</span>
                    </div>
                  </div>
                </div>

                {/* Drive Stats & Action */}
                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-border md:border-0">
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider font-bold">Capacity</p>
                      <p className="font-mono font-bold text-foreground">{drive.capacity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider font-bold">Interface</p>
                      <p className="font-mono font-bold text-foreground">{drive.interface}</p>
                    </div>
                  </div>
                  <Button onClick={() => handleSelectDrive(drive)} className="shrink-0 group">
                    Select <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}