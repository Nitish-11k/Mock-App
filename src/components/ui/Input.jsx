import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export const Input = forwardRef(({ 
  className, 
  error, 
  label, 
  id,
  ...props 
}, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground",
          "placeholder:text-muted/50",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface",
          error && "border-danger focus:ring-danger/50 focus:border-danger",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-danger font-medium">{error}</span>}
    </div>
  );
});

Input.displayName = "Input";