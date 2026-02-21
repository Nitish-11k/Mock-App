import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export const Select = forwardRef(({ 
  className, 
  label, 
  id,
  options = [],
  ...props 
}, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground appearance-none",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface",
          className
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: `right 0.5rem center`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `1.5em 1.5em`,
          paddingRight: `2.5rem`
        }}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
});

Select.displayName = "Select";