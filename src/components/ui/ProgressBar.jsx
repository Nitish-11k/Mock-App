import { cn } from "../../utils/cn";

export function ProgressBar({ 
  progress = 0, 
  status = "default", // default, success, danger
  className 
}) {
  const statusColors = {
    default: "bg-primary",
    success: "bg-success",
    danger: "bg-danger"
  };

  return (
    <div className={cn("w-full bg-background border border-border rounded overflow-hidden h-6 relative", className)}>
      <div 
        className={cn("h-full transition-all duration-300 ease-out", statusColors[status])}
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      />
      {/* Optional overlay stripe effect for enterprise feel */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] opacity-20 pointer-events-none" />
    </div>
  );
}