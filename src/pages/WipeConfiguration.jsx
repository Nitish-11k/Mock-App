import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { HardDrive, AlertOctagon, Clock, ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Select } from "../components/ui/Select";
import { WipeStepper } from "../components/WipeStepper";

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
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <WipeStepper currentStep={2} />

      <div className="max-w-5xl w-full mx-auto flex flex-col flex-1">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight leading-none mb-2">Configuration</h1>
            <p className="text-gray-400 text-sm">Select sanitization standard and verification depth</p>
          </div>
        </div>

        {/* Separator Line */}
        <div className="h-[1px] w-full bg-white/5 mb-8" />

        <div className="space-y-6">
          {/* Target Summary */}
          <Card className="bg-[#111822] border border-white/10 p-5 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20">
                <HardDrive size={24} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Target Device</p>
                <div className="flex items-center gap-3 text-white font-bold text-lg italic uppercase tracking-tight">
                  {selectedDrive.model}
                  <span className="text-xs font-mono text-gray-500 lowercase opacity-50 not-italic">({selectedDrive.capacity})</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] items-center gap-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1.5 rounded-full font-black uppercase tracking-widest flex">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Locked & Ready
              </span>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-8 mt-4">
            {/* Form Section */}
            <div className="space-y-6">
              <Select
                label="Erasure Standard"
                id="method"
                options={WIPE_METHODS}
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="bg-[#1c2530] border-white/10 text-white font-bold h-12"
              />
              <Select
                label="Verification Level"
                id="verification"
                options={VERIFICATION_LEVELS}
                value={verification}
                onChange={(e) => setVerification(e.target.value)}
                className="bg-[#1c2530] border-white/10 text-white font-bold h-12"
              />

              <div className="flex items-center gap-3 p-4 bg-[#111822] border border-white/5 rounded-lg text-sm transition-all shadow-inner">
                <Clock size={16} className="text-emerald-500" />
                <span className="text-gray-400">Estimated Duration: <strong className="text-white font-mono ml-2 uppercase tracking-tighter italic">~ 1h 45m</strong></span>
              </div>
            </div>

            {/* Warning Panel */}
            <Card className="p-6 border-red-500/30 bg-red-500/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4 text-red-500">
                  <AlertOctagon size={24} className="animate-pulse" />
                  <h3 className="font-black text-lg uppercase tracking-widest italic">Irreversible Action</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 font-medium">
                  Initiating this process will permanently destroy all cryptographic keys, partition tables, and file system structures. <span className="text-red-400 font-bold underline underline-offset-4 decoration-red-500/20">Data recovery will be impossible after this point.</span>
                </p>
              </div>
              <div className="flex items-start gap-3 text-[10px] text-red-500 font-bold uppercase tracking-[0.15em] bg-red-500/10 p-4 rounded-lg border border-red-500/10 italic">
                <ShieldAlert size={16} className="shrink-0" />
                <span>Critical: Verify target identity (S/N: {selectedDrive.serial}) before proceeding.</span>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-auto pt-12 flex justify-end">
          <Button
            variant="danger"
            className="px-12 py-6 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.2em] italic text-xs shadow-xl shadow-red-900/20"
            onClick={handleProceed}
          >
            PROCEED TO CONFIRMATION
          </Button>
        </div>
      </div>
    </div>
  );
}