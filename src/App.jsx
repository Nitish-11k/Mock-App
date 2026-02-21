import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Shield, Activity, Wifi, Monitor, Cpu, Settings as SettingsIcon } from 'lucide-react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

// Import Pages
import BootWelcome from './pages/BootWelcome';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DriveDetection from './pages/DriveDetection';
import WipeConfiguration from './pages/WipeConfiguration';
import DestructiveConfirmation from './pages/DestructiveConfirmation';
import WipeProgress from './pages/WipeProgress';
import Completion from './pages/Completion';
import ReportGeneration from './pages/ReportGeneration';
import Settings from './pages/Settings';
import About from './pages/About';
import Help from './pages/Help';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Simple helper to highlight the active tab
  const getTabClass = (path) => {
    return currentPath === path
      ? "bg-primary text-white px-4 py-1.5 rounded-lg font-bold transition-all shadow-md shadow-primary/20"
      : "text-muted hover:text-foreground px-4 py-1.5 rounded-lg transition-all cursor-pointer hover:bg-background/50";
  };

  return (
    <div className="h-screen w-screen bg-background flex flex-col font-sans transition-colors duration-300 overflow-hidden text-foreground">

      {/* Top Bar - Matched to Screenshot */}
      <header className="h-16 border-b border-border bg-surface flex items-center px-6 justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg tracking-tight">D-Secure Drive Eraser</span>
          </div>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link to="/dashboard" className={getTabClass('/dashboard')}>Dashboard</Link>
            <Link to="/detect" className={getTabClass('/detect')}>Drive Erase</Link>
            <Link to="/reports" className={getTabClass('/reports')}>Reports</Link>
            <Link to="/settings" className={getTabClass('/settings')}>Settings</Link>
            <Link to="/about" className={getTabClass('/about')}>About</Link>
            <Link to="/help" className={getTabClass('/help')}>Help</Link>
          </nav>
        </div>

        {/* Right Status Section */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 bg-background/50 border border-border px-3 py-1.5 rounded-lg">
            <Activity className="w-4 h-4 text-primary" />
            <span className="font-bold">12 wipes remaining</span>
          </div>
          <Wifi className="w-4 h-4 text-success" />
          <div className="flex items-center gap-3 border-l border-border pl-6">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-black shadow-lg shadow-primary/20">
              JM
            </div>
            <span className="font-bold hidden sm:inline-block">John Mitchell</span>
          </div>
        </div>
      </header>

      {/* Main Content Area - Now Full Screen & Scrollable */}
      <main className="flex-1 overflow-y-auto bg-background p-6 md:p-8">
        <div className="max-w-[1400px] mx-auto min-h-full flex flex-col">
          {children}
        </div>
      </main>

      {/* Bottom Status Bar - Matched to Screenshot */}
      <footer className="h-10 border-t border-border bg-surface flex items-center px-6 text-[12px] text-muted justify-between shrink-0 font-mono">
        <div className="flex items-center gap-6">
          <span className="bg-border/50 text-foreground px-2 py-1 rounded font-bold">System Ready</span>
          <span className="flex items-center gap-2"><Monitor size={14} /> Intel Core i7-12700K • 32GB RAM</span>
          <span className="flex items-center gap-2"><SettingsIcon size={14} /> BIOS: UEFI</span>
        </div>
        <div className="opacity-70">
          v2.5.0 Build 20260214
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/boot" replace />} />
            <Route path="/boot" element={<BootWelcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/detect" element={<DriveDetection />} />
            <Route path="/config" element={<WipeConfiguration />} />
            <Route path="/confirm" element={<DestructiveConfirmation />} />
            <Route path="/progress" element={<WipeProgress />} />
            <Route path="/complete" element={<Completion />} />
            <Route path="/reports" element={<ReportGeneration />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;