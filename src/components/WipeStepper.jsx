import { cn } from "../utils/cn";

const steps = [
    { id: 1, label: "Drive Detection" },
    { id: 2, label: "Configuration" },
    { id: 3, label: "Confirmation" },
    { id: 4, label: "Wiping" },
    { id: 5, label: "Completion" },
];

export function WipeStepper({ currentStep = 1 }) {
    return (
        <div className="w-full mb-12 animate-in fade-in duration-500">
            <div className="flex items-center justify-between max-w-4xl mx-auto relative px-2">
                {/* Connection Lines Layout */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2 -z-10" />

                {steps.map((step) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;

                    return (
                        <div key={step.id} className="flex items-center gap-3 bg-background px-4">
                            <div
                                className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300",
                                    isActive
                                        ? "bg-primary text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] ring-4 ring-primary/10"
                                        : isCompleted
                                            ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                                            : "bg-[#1c2530] text-gray-500 border border-white/5"
                                )}
                            >
                                {step.id}
                            </div>
                            <span
                                className={cn(
                                    "text-[10px] uppercase tracking-[0.15em] font-bold transition-all duration-300",
                                    isActive ? "text-white" : isCompleted ? "text-emerald-500/70" : "text-gray-500"
                                )}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
