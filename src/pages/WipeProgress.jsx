import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Activity, ShieldAlert, Terminal, XOctagon, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";

export default function WipeProgress() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedDrive = location.state?.selectedDrive;
  const config = location.state?.config;

  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("Sanitizing Sectors");
  const [logs, setLogs] = useState([]);
  const [isAborted, setIsAborted] = useState(false);

  const logsEndRef = useRef(null);
  const intervalRef = useRef(null);

  // Bounce back if accessed directly
  if (!selectedDrive || !config) {
    return <Navigate to="/detect" replace />;
  }

  const addLog = (message) => {
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 11);
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  useEffect(() => {
    if (isAborted) return;

    // We start fresh when the component mounts or if it's not started yet
    if (!intervalRef.current) {
      addLog(`INITIALIZING WIPE SEQUENCE...`);
      addLog(`TARGET: ${selectedDrive.id} (${selectedDrive.serial})`);
      addLog(`STANDARD: ${config.method.toUpperCase()}`);

      let localProgress = 0;
      let localPhase = "Sanitizing Sectors";

      const startSimulation = () => {
        intervalRef.current = setInterval(() => {
          if (isAborted) {
            clearInterval(intervalRef.current);
            return;
          }

          const increment = localPhase === "Sanitizing Sectors" ? 0.8 + (Math.random() * 1.5) : 1.5 + (Math.random() * 2);
          localProgress += increment;

          if (localProgress < 100) {
            setProgress(localProgress);
            if (Math.random() > 0.9) {
              const block = Math.floor(localProgress * 15042);
              addLog(localPhase === "Sanitizing Sectors"
                ? `Overwriting block ${block}... OK`
                : `Verifying sector ${block} integrity... Match OK`);
            }
          } else {
            clearInterval(intervalRef.current);
            setProgress(100);

            if (localPhase === "Sanitizing Sectors") {
              addLog(`SANITIZATION PASS COMPLETE. Flushing cache...`);

              setTimeout(() => {
                if (config.verification !== "0") {
                  addLog(`STARTING VERIFICATION PASS (${config.verification}%)...`);
                  localPhase = "Verifying Pass";
                  setPhase("Verifying Pass");
                  localProgress = 0;
                  setProgress(0);
                  startSimulation(); // Start the next phase
                } else {
                  completeProcess();
                }
              }, 1500);
            } else {
              completeProcess();
            }
          }
        }, 200);
      };

      const completeProcess = () => {
        setPhase("Completed");
        addLog(`WIPE OPERATION FINISHED SUCCESSFULLY.`);
        addLog(`DEVICE READY FOR AUDIT.`);
        setTimeout(() => {
          navigate('/complete', { state: { selectedDrive, config, success: true } });
        }, 2000);
      };

      startSimulation();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAborted, config, selectedDrive, navigate]);

  const handleAbort = () => {
    setIsAborted(true);
    addLog(`!!! ABORT SIGNAL RECEIVED !!!`);
    addLog(`HALTING I/O OPERATIONS...`);
    setPhase("Aborted");
  };

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [logs]);

  return (
    <div className="h-full flex flex-col p-8 overflow-hidden animate-in fade-in duration-500 max-w-[1600px] mx-auto w-full">

      {/* Header Info */}
      <header className="flex justify-between items-end mb-8 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {isAborted ? <XOctagon className="text-danger" size={20} /> : (phase === "Completed" ? <CheckCircle className="text-success" size={20} /> : <Activity size={20} className="animate-pulse" />)}
            </div>
            <h1 className="text-3xl font-black text-foreground tracking-tight uppercase italic mb-1">
              {isAborted ? 'Operation Aborted' : (phase === "Completed" ? 'Operation Complete' : 'Active Operation')}
            </h1>
          </div>
          <p className="text-muted text-sm font-mono opacity-70 ml-12">
            {selectedDrive.id} | {selectedDrive.model} | <span className="text-foreground/60 font-bold underline decoration-primary/30 decoration-2">S/N: {selectedDrive.serial}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-muted uppercase tracking-[0.3em] mb-2 opacity-60">Security Standard</p>
          <span className="bg-primary/10 border border-primary/30 px-5 py-2 rounded-lg font-black text-xs text-primary tracking-widest uppercase shadow-sm">
            {config.method}
          </span>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-8">

        {/* Left: Progress & Controls */}
        <div className="w-full md:w-[400px] flex flex-col gap-6 shrink-0">
          <Card className="p-8 bg-surface border-border/60 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />

            <div className="flex justify-between items-end mb-6 font-mono relative">
              <div>
                <p className="text-[10px] text-muted uppercase tracking-[0.2em] font-black mb-2 opacity-60">Pass Status</p>
                <p className="text-lg font-bold text-foreground leading-tight">{phase}</p>
              </div>
              <div className="text-right">
                <span className="text-5xl font-black tracking-tighter text-foreground">
                  {Math.min(Math.floor(progress), 100)}<span className="text-2xl text-muted ml-0.5 opacity-40">%</span>
                </span>
              </div>
            </div>

            <ProgressBar
              progress={progress}
              status={isAborted ? "danger" : (phase === "Completed" ? "success" : "default")}
              className="h-10 rounded-lg shadow-inner bg-background/50 border-border/40"
            />

            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-border/40 font-mono">
              <div>
                <p className="text-[9px] text-muted uppercase font-black tracking-widest mb-1 opacity-50">Elapsed</p>
                <p className="text-xs font-bold text-foreground opacity-80">00:01:24</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-muted uppercase font-black tracking-widest mb-1 opacity-50">Remaining</p>
                <p className="text-xs font-bold text-foreground opacity-80">
                  {!isAborted && phase !== "Completed" ? "01:43:12" : "--:--:--"}
                </p>
              </div>
            </div>
          </Card>

          <div className="mt-auto space-y-4 pt-10 border-t border-border/40">
            <div className="flex items-center gap-3 text-[10px] text-danger font-black uppercase tracking-widest bg-danger/5 border border-danger/10 px-4 py-3 rounded-xl shadow-sm">
              <ShieldAlert size={14} className="shrink-0" />
              <span>Safety Protocol: Do not remove power</span>
            </div>

            <Button
              variant="danger"
              onClick={handleAbort}
              disabled={isAborted || phase === "Completed"}
              className="w-full font-black tracking-[0.2em] py-6 uppercase text-xs shadow-lg shadow-danger/20 hover:brightness-110 transition-all border-0"
            >
              Emergency Abort
            </Button>
          </div>
        </div>

        {/* Right: Expansive TTY Log - Fixed height with internal scroll */}
        <div className="flex-1 bg-black/40 border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden group">
          <div className="bg-surface/50 border-b border-border px-5 py-4 flex justify-between items-center bg-background/20 backdrop-blur-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-primary/10 rounded-md">
                <Terminal size={14} className="text-primary" />
              </div>
              <span className="text-[10px] font-black text-foreground/80 uppercase tracking-[0.25em]">System TTY Log Trace</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-border/40" />
              <div className="w-2 h-2 rounded-full bg-border/40" />
              <div className="w-2 h-2 rounded-full bg-border/40" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 font-mono text-[11px] md:text-[12px] text-[#00ff9d] opacity-90 leading-[1.8] custom-scrollbar selection:bg-primary/30">
            {logs.map((log, i) => (
              <div key={i} className={`flex gap-4 ${log.includes('ABORT') || log.includes('ERROR') ? 'text-danger font-bold' : ''}`}>
                <span className="opacity-30 shrink-0 select-none">{String(i + 1).padStart(4, '0')}</span>
                <span className="break-all">{log}</span>
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}