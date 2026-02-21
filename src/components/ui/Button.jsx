import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

export const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  isLoading = false, 
  disabled, 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed rounded active:scale-[0.98]";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-accent focus:ring-primary shadow-sm",
    danger: "bg-danger text-white hover:bg-red-600 focus:ring-danger shadow-sm",
    outline: "border-2 border-border bg-transparent hover:bg-surface hover:text-foreground focus:ring-border text-muted",
    ghost: "bg-transparent hover:bg-surface text-muted hover:text-foreground focus:ring-border",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = "Button";