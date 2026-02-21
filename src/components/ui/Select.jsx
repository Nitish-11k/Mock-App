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
          "flex h-11 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground appearance-none shadow-sm",
          "focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition duration-200",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface",
          className
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238AA8A1' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: `right 1rem center`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `1.2em 1.2em`,
          paddingRight: `3rem`
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