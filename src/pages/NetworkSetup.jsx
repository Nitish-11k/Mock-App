import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wifi, Globe, RefreshCcw, Lock, X, Activity, SignalHigh, SignalMedium, SignalLow, Eye, EyeOff, Check } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { cn } from "../utils/cn";

const MOCK_NETWORKS = [
    { id: 1, name: "SecureTech-Corp", secure: true, signal: "high", band: "5 GHz" },
    { id: 2, name: "DSec-Lab-5G", secure: true, signal: "high", band: "5 GHz" },
    { id: 3, name: "Guest-Network", secure: false, signal: "medium", band: "2.4 GHz" },
    { id: 4, name: "IT-Department", secure: true, signal: "low", band: "5 GHz" },
];

export default function NetworkSetup() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("wifi");
    const [selectedNetwork, setSelectedNetwork] = useState(null);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectionSuccess, setConnectionSuccess] = useState(false);
    const [isDetecting, setIsDetecting] = useState(true);
    const [detectLogs, setDetectLogs] = useState([]);

    useEffect(() => {
        const timer1 = setTimeout(() => setDetectLogs(prev => [...prev, "✓ SATA Controller Initialized"]), 800);
        const timer2 = setTimeout(() => setDetectLogs(prev => [...prev, "✓ NVMe Controller initialized"]), 1600);
        const timer3 = setTimeout(() => setIsDetecting(false), 3200);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    const handleConnect = () => {
        setIsConnecting(true);
        setTimeout(() => {
            setIsConnecting(false);
            setConnectionSuccess(true);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }, 2000);
    };

    const renderSignalIcon = (signal) => {
        switch (signal) {
            case "high": return <SignalHigh size={16} className="text-emerald-500" />;
            case "medium": return <SignalMedium size={16} className="text-amber-500" />;
            case "low": return <SignalLow size={16} className="text-amber-600" />;
            default: return <SignalHigh size={16} />;
        }
    };

    if (isDetecting) {
        return (
            <div className="fixed inset-0 bg-[#0B1219] flex flex-col items-center justify-center p-8 z-50">
                <div className="w-12 h-12 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-8"></div>
                <h2 className="text-xl font-bold text-white mb-2">Detecting Hardware</h2>
                <p className="text-gray-400 text-sm mb-6">Scanning system buses and storage devices...</p>
                <div className="space-y-2 flex flex-col items-center min-h-[80px]">
                    {detectLogs.map((log, i) => (
                        <p key={i} className="text-gray-500 text-xs font-medium animate-in slide-in-from-bottom-2 duration-300">
                            {log}
                        </p>
                    ))}
                    <p className="text-emerald-500 text-xs font-bold flex items-center gap-2">
                        <RefreshCcw size={12} className="animate-spin" />
                        Scanning for drives...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-[#0B1219] flex items-center justify-center p-4 z-50 animate-in fade-in duration-500">
            <div className="relative w-full max-w-lg">
                {!selectedNetwork ? (
                    <Card className="bg-[#111822] border border-white/10 shadow-3xl overflow-hidden rounded-lg p-0">
                        {/* Header */}
                        <div className="p-6 pb-2">
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-3">
                                    <Wifi size={20} className="text-[#10B981]" />
                                    <h2 className="text-lg font-semibold text-white">Network Connection</h2>
                                </div>
                                <button onClick={() => navigate("/login")} className="text-gray-400 hover:text-white transition-colors">
                                    <X size={18} />
                                </button>
                            </div>
                            <p className="text-sm text-gray-400 font-medium opacity-80 pl-8">
                                Connect to a network before logging in, or skip to continue offline.
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="px-6 mb-6">
                            <div className="flex bg-[#1c2530] rounded p-1 border border-white/5">
                                <button
                                    onClick={() => setActiveTab("wifi")}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded transition-all",
                                        activeTab === "wifi" ? "bg-[#111822] text-white border border-white/5 shadow-inner" : "text-gray-400 hover:text-gray-200"
                                    )}
                                >
                                    <Wifi size={16} /> Wi-Fi
                                </button>
                                <button
                                    onClick={() => setActiveTab("lan")}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded transition-all",
                                        activeTab === "lan" ? "bg-[#111822] text-white border border-white/5 shadow-inner" : "text-gray-400 hover:text-gray-200"
                                    )}
                                >
                                    <Globe size={16} /> LAN / Ethernet
                                </button>
                            </div>
                        </div>

                        {/* Network List Area */}
                        <div className="px-6 mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-medium text-gray-400">Available Networks</span>
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <RefreshCcw size={16} className="opacity-70" />
                                </button>
                            </div>

                            <div className="bg-transparent border border-white/10 rounded-lg overflow-hidden max-h-[280px] overflow-y-auto">
                                {activeTab === "wifi" ? (
                                    MOCK_NETWORKS.map((network, index) => (
                                        <button
                                            key={network.id}
                                            onClick={() => setSelectedNetwork(network)}
                                            className={cn(
                                                "w-full flex items-center justify-between p-4 hover:bg-white/5 transition-all group flex-wrap",
                                                index !== 0 && "border-t border-white/5"
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                {renderSignalIcon(network.signal)}
                                                <span className="text-sm font-bold text-white tracking-wide">
                                                    {network.name}
                                                </span>
                                                {network.secure && <Lock size={14} className="text-gray-500 opacity-60" />}
                                            </div>
                                            <span className="text-xs font-semibold text-gray-500 group-hover:text-gray-400">
                                                {network.band}
                                            </span>
                                        </button>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                                        <Globe size={40} className="mb-4 opacity-20" />
                                        <p className="text-sm font-medium italic">No active Ethernet cable detected</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 pb-6 flex justify-end">
                            <button
                                onClick={() => navigate("/login")}
                                className="px-6 py-2 bg-[#1c2530] border border-white/10 hover:border-white/20 text-white font-bold rounded text-sm transition-all"
                            >
                                Skip
                            </button>
                        </div>
                    </Card>
                ) : (
                    /* Password Entrance Modal */
                    <Card className="bg-[#111822] border border-white/10 shadow-3xl overflow-hidden rounded-lg p-0 animate-in zoom-in-95 duration-300">
                        <div className="p-6 pb-2">
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-3">
                                    <Wifi size={20} className="text-[#10B981]" />
                                    <h2 className="text-lg font-semibold text-white tracking-tight">Connect to {selectedNetwork.name}</h2>
                                </div>
                                <button onClick={() => setSelectedNetwork(null)} className="text-gray-400 hover:text-white transition-colors">
                                    <X size={18} />
                                </button>
                            </div>
                            <p className="text-sm text-gray-400 font-medium opacity-80 pl-8">
                                This network is secured. Enter the password to connect.
                            </p>
                        </div>

                        <div className="p-6">
                            {/* Specs Grid */}
                            <div className="bg-[#0b1219] border border-white/5 rounded-lg p-5 mb-6 grid grid-cols-2 gap-y-4 shadow-inner">
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Network</p>
                                    <p className="text-sm font-bold text-white">{selectedNetwork.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Signal</p>
                                    <p className="text-sm font-bold text-white flex items-center justify-end gap-2 uppercase">
                                        {selectedNetwork.signal === "high" ? "78% (Excellent)" : "42% (Fair)"}
                                        {renderSignalIcon(selectedNetwork.signal)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Band</p>
                                    <p className="text-sm font-bold text-white">{selectedNetwork.band}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Security</p>
                                    <p className="text-sm font-bold text-white uppercase tracking-tighter">WPA2/WPA3</p>
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2 mb-8">
                                <label className="text-xs font-bold text-gray-300 ml-1">Password</label>
                                <div className="relative group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#1c2530] border border-white/10 text-white text-base rounded-md pl-4 pr-12 py-3 outline-none focus:border-emerald-500 transition-all font-bold placeholder:text-gray-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-500 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    className="flex-1 py-3 bg-[#1c2530] border border-white/10 hover:bg-[#252f3a] text-white font-bold rounded-lg transition-all"
                                    onClick={() => setSelectedNetwork(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={cn(
                                        "flex-1 py-3 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2",
                                        connectionSuccess
                                            ? "bg-emerald-600 shadow-lg shadow-emerald-900/40"
                                            : (password.length >= 8
                                                ? "bg-[#10B981] hover:bg-[#12cb8e] shadow-lg shadow-emerald-900/20"
                                                : "bg-[#1c2530] text-gray-500 border border-white/5 cursor-not-allowed")
                                    )}
                                    onClick={handleConnect}
                                    disabled={password.length < 8 || isConnecting || connectionSuccess}
                                >
                                    {isConnecting ? (
                                        <Activity size={18} className="animate-spin" />
                                    ) : connectionSuccess ? (
                                        <>
                                            <Check size={18} /> Connected
                                        </>
                                    ) : (
                                        <>
                                            <Wifi size={18} /> Connect
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
