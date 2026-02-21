import { useState } from "react";
import { Shield, CheckCircle2, X, Download, Printer } from "lucide-react";
import { Button } from "../components/ui/Button";

const MOCK_REPORTS = [
  { id: "RPT-2026-02-001", serial: "WD-WX42D9087452", model: "WD Blue SN570 NVMe", method: "NIST SP 800-88 Rev1", date: "2026-02-13" },
  { id: "RPT-2026-02-002", serial: "S4CZNX0R804567", model: "Samsung 870 EVO", method: "DoD 5220.22-M", date: "2026-02-12" }
];

export default function ReportGeneration() {
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl w-full mx-auto pb-10">
      <header>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Wipe Reports</h1>
        <p className="text-muted text-sm mt-1">View and manage secure drive erasure certificates</p>
      </header>

      <div className="bg-transparent border border-white/5 rounded-lg overflow-hidden shadow-xl">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#1C2530]/50 border-b border-white/5">
            <tr>
              <th className="px-6 py-4 font-bold text-xs text-muted uppercase tracking-wider">Report ID</th>
              <th className="px-6 py-4 font-bold text-xs text-muted uppercase tracking-wider">Drive Serial</th>
              <th className="px-6 py-4 font-bold text-xs text-muted uppercase tracking-wider">Drive Model</th>
              <th className="px-6 py-4 font-bold text-xs text-muted uppercase tracking-wider">Method</th>
              <th className="px-6 py-4 font-bold text-xs text-muted uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 font-bold text-xs text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-bold text-xs text-muted uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-[#1C2530]/10">
            {MOCK_REPORTS.map((report) => (
              <tr key={report.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground">{report.id}</td>
                <td className="px-6 py-4 text-muted font-mono">{report.serial}</td>
                <td className="px-6 py-4 text-foreground">{report.model}</td>
                <td className="px-6 py-4 text-foreground">{report.method}</td>
                <td className="px-6 py-4 text-muted font-mono">{report.date}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest">
                    <CheckCircle2 size={12} /> completed
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)} className="h-8 text-xs border-white/10 hover:border-primary">
                    View Report
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C2530] border border-white/10 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h2 className="font-bold text-lg text-foreground">Certificate of Sanitization</h2>
              <button onClick={() => setSelectedReport(null)} className="text-muted hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto space-y-6">
              <div className="border border-primary/20 bg-primary/5 p-5 rounded-lg flex items-center gap-4">
                <Shield className="text-primary" size={32} />
                <div>
                  <p className="font-bold text-foreground">Compliance Verified</p>
                  <p className="text-xs text-muted font-mono">Method: {selectedReport.method}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-4 text-sm border-t border-white/5 pt-6">
                <div><p className="text-muted text-xs uppercase mb-1">Target Model</p><p className="font-bold text-foreground">{selectedReport.model}</p></div>
                <div><p className="text-muted text-xs uppercase mb-1">Serial Number</p><p className="font-mono text-foreground">{selectedReport.serial}</p></div>
                <div><p className="text-muted text-xs uppercase mb-1">Audit Date</p><p className="text-foreground">{selectedReport.date}</p></div>
                <div><p className="text-muted text-xs uppercase mb-1">Status</p><p className="text-primary font-bold">WIPE SUCCESSFUL</p></div>
              </div>
            </div>
            <div className="p-6 border-t border-white/5 flex justify-end gap-3 bg-black/20">
              <Button variant="outline" size="sm" className="border-white/10"><Printer size={14} className="mr-2"/> Print</Button>
              <Button size="sm"><Download size={14} className="mr-2"/> Download PDF</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}