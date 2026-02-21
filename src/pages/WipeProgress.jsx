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
  const [phase, setPhase] = useState("Sanitizing Sectors"); // Sanitizing -> Verifying -> Completed
  const [logs, setLogs] = useState([]);
  const [isAborted, setIsAborted] = useState(false);
  
  const logsEndRef = useRef(null);

  // Bounce back if accessed directly
  if (!selectedDrive || !config) {
    return <Navigate to="/detect" replace />;
  }

  const addLog = (message) => {
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 11);
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  // Simulate the wipe process
  useEffect(() => {
    if (isAborted) return;

    addLog(`INITIALIZING WIPE SEQUENCE...`);
    addLog(`TARGET: ${selectedDrive.id} (${selectedDrive.serial})`);
    addLog(`STANDARD: ${config.method.toUpperCase()}`);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 2.5; // Random jump for realism
      
      if (currentProgress < 100) {
        setProgress(currentProgress);
        if (Math.random() > 0.7) {
          addLog(`Overwriting block ${Math.floor(currentProgress * 15042)}... OK`);
        }
      } else {
        clearInterval(interval);
        
        if (phase === "Sanitizing Sectors") {
          setProgress(100);
          addLog(`SANITIZATION PASS COMPLETE. Flushing cache...`);
          
          setTimeout(() => {
            if (config.verification !== "0") {
              setPhase("Verifying Pass");
              setProgress(0);
              addLog(`STARTING VERIFICATION PASS (${config.verification}%)...`);
              startVerification();
            } else {
              completeProcess();
            }
          }, 1500);
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isAborted, phase, config, selectedDrive]);

  const startVerification = () => {
    let verifyProgress = 0;
    const interval = setInterval(() => {
      if (isAborted) {
        clearInterval(interval);
        return;
      }
      verifyProgress += Math.random() * 4;
      if (verifyProgress < 100) {
        setProgress(verifyProgress);
        if (Math.random() > 0.8) {
          addLog(`Verifying sector integrity... Match OK`);
        }
      } else {
        clearInterval(interval);
        completeProcess();
      }
    }, 150);
  };

  const completeProcess = () => {
    setProgress(100);
    setPhase("Completed");
    addLog(`WIPE OPERATION FINISHED SUCCESSFULLY.`);
    addLog(`DEVICE READY FOR AUDIT.`);
    setTimeout(() => {
      navigate('/complete', { state: { selectedDrive, config, success: true } });
    }, 2000);
  };

  const handleAbort = () => {
    setIsAborted(true);
    addLog(`!!! ABORT SIGNAL RECEIVED !!!`);
    addLog(`HALTING I/O OPERATIONS...`);
    setPhase("Aborted");
  };

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="h-full flex flex-col p-8 overflow-hidden animate-in fade-in duration-300">
      
      {/* Header Info */}
      <header className="flex justify-between items-start mb-6 shrink-0 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            {isAborted ? <XOctagon className="text-danger" /> : (phase === "Completed" ? <CheckCircle className="text-success" /> : <Activity className="text-primary animate-pulse" />)}
            Active Operation: {phase}
          </h1>
          <p className="text-muted text-sm mt-1 font-mono">
            {selectedDrive.id} | {selectedDrive.model} | S/N: {selectedDrive.serial}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Standard</p>
          <span className="bg-surface border border-border px-3 py-1 rounded font-bold text-sm text-foreground">
            {config.method.toUpperCase()}
          </span>
        </div>
      </header>

      {/* Main Progress Area */}
      <div className="flex-1 min-h-0 flex flex-col gap-6">
        
        <Card className="p-6 bg-surface shadow-sm shrink-0">
          <div className="flex justify-between items-end mb-3 font-mono">
            <div>
              <p className="text-xs text-muted uppercase tracking-wider font-bold mb-1">Pass Status</p>
              <p className="text-xl font-bold text-foreground">{phase}</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-bold tracking-tighter text-foreground">
                {Math.min(Math.floor(progress), 100)}<span className="text-2xl text-muted">%</span>
              </span>
            </div>
          </div>
          
          <ProgressBar 
            progress={progress} 
            status={isAborted ? "danger" : (phase === "Completed" ? "success" : "default")} 
            className="h-8"
          />
          
          <div className="flex justify-between text-xs text-muted mt-3 font-mono font-bold uppercase tracking-wider">
            <span>Elapsed: 00:01:24</span>
            {!isAborted && phase !== "Completed" && <span>Est. Remaining: 01:43:12</span>}
          </div>
        </Card>

        {/* Live Terminal Log */}
        <div className="flex-1 bg-[#0a0a0a] border border-border rounded flex flex-col overflow-hidden relative">
          <div className="bg-surface border-b border-border px-3 py-2 flex items-center gap-2 shrink-0">
            <Terminal size={14} className="text-muted" />
            <span className="text-xs font-bold text-muted uppercase tracking-wider">System TTY Log</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs md:text-sm text-[#00ff00] opacity-80 leading-relaxed">
            {logs.map((log, i) => (
              <div key={i} className={log.includes('ABORT') || log.includes('ERROR') ? 'text-danger font-bold' : ''}>
                {log}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <footer className="shrink-0 pt-6 mt-6 border-t border-border flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs text-danger font-bold uppercase tracking-wider bg-danger/5 border border-danger/20 px-3 py-2 rounded">
          <ShieldAlert size={16} />
          Do not remove power or disconnect drive
        </div>
        
        <Button 
          variant="danger" 
          onClick={handleAbort} 
          disabled={isAborted || phase === "Completed"}
          className="font-bold tracking-widest px-8"
        >
          {isAborted ? "OPERATION HALTED" : "EMERGENCY ABORT"}
        </Button>
      </footer>
    </div>
  );
}