import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-brand-primary/30 bg-brand-primary/10 text-brand-primary uppercase tracking-[0.15em]",
            className
        )}>
            {children}
        </span>
    );
}
