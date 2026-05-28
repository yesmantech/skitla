import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "default" | "sm" | "lg";
}

export function Button({
    className,
    variant = "primary",
    size = "default",
    ...props
}: ButtonProps) {
    const variants = {
        primary: "btn-arcadia hover:shadow-[0_20px_40px_-10px_rgba(217,177,98,0.5)]", // Tier S+ Token
        secondary: "glass border border-white/10 text-white hover:bg-white/10 hover:border-white/20",
        ghost: "bg-transparent text-gray-400 hover:text-white"
    };

    const sizes = {
        default: "h-[50px] px-8 text-[15px]",
        sm: "h-[40px] px-6 text-[13px]",
        lg: "h-[60px] px-10 text-[17px]"
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wide",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
}
