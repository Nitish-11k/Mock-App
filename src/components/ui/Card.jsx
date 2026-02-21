import { cn } from "../../utils/cn";

export function Card({ className, children, ...props }) {
  return (
    <div 
      className={cn("bg-surface border border-border rounded shadow-sm overflow-hidden", className)} 
      {...props}
    >
      {children}
    </div>
  );
}