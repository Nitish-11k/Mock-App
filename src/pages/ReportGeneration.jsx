import { useState } from "react";
import { Shield, CheckCircle2, FileCheck, Download, CloudUpload, Printer, X } from "lucide-react";
import { Button } from "../components/ui/Button";

const MOCK_REPORTS = [
  {
    id: "RPT-2026-02-001",
    serial: "WD-WX42D9087452",
    model: "WD Blue SN570 NVMe",
    method: "NIST SP 800-88 Rev1",
    date: "2026-02-13",
    status: "Completed",
    technician: "John Mitchell"
  },
  {
    id: "RPT-2026-02-002",
    serial: "S4CZNX0R804567",
    model: "Samsung 870 EVO",
    method: "DoD 5220.22-M",
    date: "2026-02-12",
    status: "Completed",
    technician: "John Mitchell"
  }
];

export default function ReportGeneration() {
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl w-full mx-auto pb-10">
      <header>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Wipe Reports</h1>
        <p className="text-muted text-sm mt-1">View and manage secure drive erasure certificates</p>
      </header>

      {/* Independent Card Table Container */}
      <div className="bg-transparent border border-border/30 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
          <thead>
            <tr className="bg-surface/50 border-b border-border/30">
              <th className="px-6 py-4 font-bold text-xs text-muted uppercase tracking-wider">Report ID</th>
              <th className="px-6 py-4 font-bold text-xs text-muted uppercase tracking-wider">Drive Serial</th>
              <th className="px-6 py-4 font-bold text-xs text-muted uppercase tracking-wider">Drive Model</th>
              <th className="px-6 py-4 font-bold text-xs text-muted uppercase tracking-wider">Method</th>
              <th className="px-6 py-4 font-bold text-xs text-muted uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 font-bold text-xs text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-bold text-xs text-muted uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {MOCK_REPORTS.map((report) => (
              <tr key={report.id} className="hover:bg-surface/30 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground">{report.id}</td>
                <td className="px-6 py-4 text-muted font-mono">{report.serial}</td>
                <td className="px-6 py-4 text-foreground">{report.model}</td>
                <td className="px-6 py-4 text-foreground">{report.method}</td>
                <td className="px-6 py-4 text-muted font-mono">{report.date}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest">
                    <CheckCircle2 size={12} /> {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedReport(report)}
                    className="h-8 text-xs border-border/40 hover:bg-surface"
                  >
                    View Report
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal logic remains same for certificate viewing */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            {/* ... Modal content ... */}
            <div className="bg-surface border border-border/40 p-8 rounded-xl max-w-2xl w-full text-center">
                <h2 className="text-xl font-bold mb-4">Report Preview: {selectedReport.id}</h2>
                <Button onClick={() => setSelectedReport(null)}>Close Preview</Button>
            </div>
        </div>
      )}
    </div>
  );
}