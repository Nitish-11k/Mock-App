import React, { useState } from "react";
import { Shield, CheckCircle2, X, Download, Printer, CloudUpload, HardDrive, FileText, Activity } from "lucide-react";

const MOCK_REPORTS = [
  {
    id: "RPT-2026-02-001",
    serial: "WD-WX42D9087452",
    model: "WD Blue SN570 NVMe",
    method: "NIST SP 800-88 Rev1",
    date: "2026-02-13",
    startTime: "2026-02-13 14:32:18",
    endTime: "2026-02-13 16:45:22",
    passes: "3 passes",
    hash: "a2f7c6d9e2b1a4f6c7d9e8f9a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0"
  },
  {
    id: "RPT-2026-02-002",
    serial: "S4CZNX0R804567",
    model: "Samsung 870 EVO",
    method: "DoD 5220.22-M",
    date: "2026-02-12",
    startTime: "2026-02-12 09:15:00",
    endTime: "2026-02-12 11:30:45",
    passes: "3 passes",
    hash: "b1f2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0a2f7c6d9e2b1a4f6c7d9e8f9"
  }
];

export default function ReportGeneration() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = MOCK_REPORTS.filter(report =>
    report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-[1200px] w-full mx-auto pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Wipe Reports</h1>
          <p className="text-muted text-sm mt-1">View and manage secure drive erasure certificates</p>
        </div>

        {/* Search Bar Integration */}
        <div className="relative w-full md:w-80 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted group-focus-within:text-primary transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search ID, Serial, Model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface border border-border text-foreground text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted/50 font-medium"
          />
        </div>
      </header>

      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-2xl transition-colors duration-300">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-background/20 border-b border-border">
              <th className="px-6 py-5 font-bold text-[11px] text-muted uppercase tracking-[0.1em]">Report ID</th>
              <th className="px-6 py-5 font-bold text-[11px] text-muted uppercase tracking-[0.1em]">Drive Serial</th>
              <th className="px-6 py-5 font-bold text-[11px] text-muted uppercase tracking-[0.1em]">Drive Model</th>
              <th className="px-6 py-5 font-bold text-[11px] text-muted uppercase tracking-[0.1em]">Method</th>
              <th className="px-6 py-5 font-bold text-[11px] text-muted uppercase tracking-[0.1em]">Date</th>
              <th className="px-6 py-5 font-bold text-[11px] text-muted uppercase tracking-[0.1em]">Status</th>
              <th className="px-6 py-5 font-bold text-[11px] text-muted uppercase tracking-[0.1em] text-right pr-10">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <tr key={report.id} className="border-b border-border/50">
                  <td className="px-6 py-5 font-bold text-foreground tracking-tight">{report.id}</td>
                  <td className="px-6 py-5 text-muted font-mono text-[13px]">{report.serial}</td>
                  <td className="px-6 py-5 text-foreground text-opacity-80 font-medium">{report.model}</td>
                  <td className="px-6 py-5 text-foreground text-opacity-80">{report.method}</td>
                  <td className="px-6 py-5 text-muted font-mono text-[13px]">{report.date}</td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                      <CheckCircle2 size={12} className="fill-emerald-500/10" /> completed
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right pr-10">
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="h-9 px-5 text-xs font-bold border border-border bg-background/50 hover:bg-primary hover:text-white hover:border-primary transition-all rounded-lg text-foreground text-opacity-70 active:scale-95"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-20 text-center text-muted italic">
                  No reports found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Theme-Aware High-Fidelity Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setSelectedReport(null)} />

          <div className="bg-surface border border-border rounded-xl shadow-[0_0_80px_rgba(0,0,0,0.6)] w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col relative z-10 animate-in zoom-in-95 duration-300">

            {/* Modal Header */}
            <div className="px-8 py-5 border-b border-border flex justify-between items-center bg-background/20 relative">
              <h2 className="font-extrabold text-[11px] text-foreground uppercase tracking-[0.2em] opacity-80">Certificate of Secure Drive Erasure</h2>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-2 hover:bg-white/5 rounded-lg text-muted hover:text-foreground transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-8 overflow-y-auto custom-scrollbar space-y-10 bg-surface">

              {/* Branding Section */}
              <div className="flex justify-between items-start border-b border-border pb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                    <Shield className="text-primary" size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg leading-none mb-2">D-Secure Drive Eraser</h3>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest leading-none">Enterprise Edition v2.5.0</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted uppercase font-bold tracking-widest mb-1.5 opacity-60">Report ID</p>
                  <p className="font-mono text-sm font-bold text-foreground px-4 py-1.5 bg-background/50 rounded-lg border border-border shadow-inner">
                    {selectedReport.id}
                  </p>
                </div>
              </div>

              {/* Compliance Information Card (Primary Highlight) */}
              <section className="bg-primary/5 border border-primary/30 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground opacity-80">Compliance Information</h4>
                </div>
                <div className="grid grid-cols-2 gap-x-12 gap-y-8 px-4">
                  <div>
                    <p className="text-[10px] text-muted uppercase font-bold tracking-widest mb-2">Erasure Method</p>
                    <p className="text-sm font-bold text-foreground">{selectedReport.method}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted uppercase font-bold tracking-widest mb-2">Verification Result</p>
                    <p className="text-sm font-bold text-emerald-500">Passed</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted uppercase font-bold tracking-widest mb-2">Pass Count</p>
                    <p className="text-sm font-bold text-foreground">{selectedReport.passes}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted uppercase font-bold tracking-widest mb-2">Status</p>
                    <p className="text-sm font-bold text-emerald-500">Completed Successfully</p>
                  </div>
                </div>
              </section>

              {/* Drive Details Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground opacity-80">Drive Details</h4>
                </div>
                <div className="grid grid-cols-2 gap-x-12 gap-y-8 px-4 bg-background/20 p-6 rounded-xl border border-border">
                  <div>
                    <p className="text-[10px] text-muted uppercase font-bold tracking-widest mb-2">Model</p>
                    <p className="text-sm font-bold text-foreground">{selectedReport.model}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted uppercase font-bold tracking-widest mb-2">Serial Number</p>
                    <p className="font-mono text-xs font-bold text-foreground uppercase tracking-wider">{selectedReport.serial}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted uppercase font-bold tracking-widest mb-2">Start Time</p>
                    <p className="text-sm font-bold text-foreground text-opacity-70">{selectedReport.startTime}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted uppercase font-bold tracking-widest mb-2">End Time</p>
                    <p className="text-sm font-bold text-foreground text-opacity-70">{selectedReport.endTime}</p>
                  </div>
                </div>
              </section>

              {/* Security Integrity Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground opacity-80">Security Integrity</h4>
                </div>
                <div className="px-4 space-y-6 bg-background/20 p-6 rounded-xl border border-border">
                  <div>
                    <p className="text-[10px] text-muted uppercase font-bold tracking-widest mb-3">Verification Hash (SHA-256)</p>
                    <div className="bg-background/60 p-5 rounded-xl border border-border shadow-inner font-mono text-[10px] text-muted break-all leading-loose">
                      {selectedReport.hash}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-emerald-500 font-bold bg-emerald-500/5 px-4 py-3 rounded-lg border border-emerald-500/20">
                    <CheckCircle2 size={14} />
                    <span>Drive successfully wiped and verified according to industry standard {selectedReport.method}</span>
                  </div>
                </div>
              </section>

              {/* Signature Area */}
              <div className="grid grid-cols-2 gap-x-20 px-4 pt-4 border-t border-border mt-10">
                <div className="space-y-4">
                  <p className="text-[10px] text-muted uppercase font-extrabold tracking-widest opacity-60">Technician</p>
                  <div className="border-b border-border pb-2 text-base font-bold text-foreground font-serif italic tracking-wide">
                    John Mitchell
                  </div>
                  <p className="text-[10px] text-muted font-mono">{selectedReport.date}</p>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] text-muted uppercase font-extrabold tracking-widest opacity-60">Validator</p>
                  <div className="border-b border-border pb-2 text-base font-bold text-foreground font-serif italic tracking-wide">
                    System Validator
                  </div>
                  <p className="text-[10px] text-muted font-mono">{selectedReport.date}</p>
                </div>
              </div>

              {/* Footer Audit Label */}
              <div className="text-center pt-10 opacity-40">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-1">D-Secure Audit Protocol v2.5.0</p>
                <p className="text-[9px] font-mono italic">Audit Trace: {selectedReport.id.replace('RPT-', '')}</p>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-border bg-background/40 flex justify-center gap-4">
              <button className="flex items-center bg-primary hover:brightness-110 text-white px-8 py-2.5 rounded-lg text-xs font-bold transition-all gap-2 shadow-lg shadow-primary/20 active:scale-95 uppercase tracking-widest">
                <Download size={14} /> Download PDF
              </button>
              <button className="flex items-center bg-surface border border-border hover:bg-background/60 text-foreground text-opacity-80 px-8 py-2.5 rounded-lg text-xs font-bold transition-all gap-2 active:scale-95 shadow-sm uppercase tracking-widest">
                <CloudUpload size={14} /> Cloud Upload
              </button>
              <button className="flex items-center bg-surface border border-border hover:bg-background/60 text-foreground text-opacity-80 px-8 py-2.5 rounded-lg text-xs font-bold transition-all gap-2 active:scale-95 shadow-sm uppercase tracking-widest">
                <Printer size={14} /> Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}