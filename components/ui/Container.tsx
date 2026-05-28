import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("mx-auto max-w-[1400px] px-6 md:px-10", className)}>
            {children}
        </div>
    );
}
