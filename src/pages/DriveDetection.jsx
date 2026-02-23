import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HardDrive, Usb, RefreshCw, AlertTriangle, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { cn } from "../utils/cn";
import { WipeStepper } from "../components/WipeStepper";

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
    setTimeout(() => {
      setDrives(MOCK_DRIVES);
      setIsScanning(false);
    }, 2000);
  };

  useEffect(() => {
    scanHardware();
  }, []);

  const handleSelectDrive = (drive) => {
    navigate('/config', { state: { selectedDrive: drive } });
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <WipeStepper currentStep={1} />

      <div className="max-w-6xl w-full mx-auto flex flex-col flex-1">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight leading-none mb-2">Target Selection</h1>
            <p className="text-gray-400 text-sm">Select a physical drive for sanitization</p>
          </div>
          <button
            onClick={scanHardware}
            disabled={isScanning}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
          >
            <RefreshCw size={14} className={cn(isScanning && "animate-spin")} />
            Rescan Bus
          </button>
        </div>

        {/* Separator Line */}
        <div className="h-[1px] w-full bg-white/5 mb-12" />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
          {isScanning ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-[11px] font-mono text-gray-500 uppercase tracking-[0.5em] animate-pulse">
                SCANNING PCIE / SATA / USB...
              </p>
            </div>
          ) : (
            <div className="w-full space-y-4 max-w-5xl">
              {drives.map((drive) => (
                <Card
                  key={drive.id}
                  className="bg-[#111822] border border-white/10 hover:border-emerald-500/30 transition-all p-5 flex items-center justify-between group cursor-pointer"
                  onClick={() => handleSelectDrive(drive)}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-[#0b1219] rounded-lg flex items-center justify-center border border-white/5">
                      {drive.interface === 'USB' ? <Usb size={24} className="text-gray-400" /> : <HardDrive size={24} className="text-emerald-500" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight italic">
                          {drive.model}
                        </h3>
                        {drive.isSystem && (
                          <span className="text-[9px] bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded font-black uppercase tracking-widest">
                            System
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-gray-500 uppercase">Serial: {drive.serial}</span>
                        <span className="text-xs font-mono text-gray-500 uppercase">Path: /dev/{drive.id.split('-').pop()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="text-right">
                      <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] mb-1">Capacity</p>
                      <p className="font-bold text-white text-lg">{drive.capacity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] mb-1">Bus Type</p>
                      <p className="font-bold text-gray-300 uppercase italic text-sm">{drive.interface}</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                      <ChevronRight size={20} className="text-emerald-500" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}