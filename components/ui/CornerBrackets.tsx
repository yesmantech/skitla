import { cn } from "@/lib/utils";
import React from "react";

interface CornerBracketsProps {
    className?: string;
    color?: string;
    size?: number;
    strokeWidth?: number;
}

export function CornerBrackets({
    className,
    color = "#D9B162", // Arcadia Gold
    size = 12,
    strokeWidth = 1.5,
}: CornerBracketsProps) {
    return (
        <div className={cn("absolute inset-0 pointer-events-none z-20", className)}>
            {/* Top Left */}
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                fill="none"
                className="absolute top-0 left-0"
            >
                <path
                    d={`M${strokeWidth / 2} ${size} V${strokeWidth / 2} H${size}`}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
            </svg>

            {/* Top Right */}
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                fill="none"
                className="absolute top-0 right-0"
            >
                <path
                    d={`M0 ${strokeWidth / 2} H${size - strokeWidth / 2} V${size}`}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
            </svg>

            {/* Bottom Left */}
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                fill="none"
                className="absolute bottom-0 left-0"
            >
                <path
                    d={`M${strokeWidth / 2} 0 V${size - strokeWidth / 2} H${size}`}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
            </svg>

            {/* Bottom Right */}
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                fill="none"
                className="absolute bottom-0 right-0"
            >
                <path
                    d={`M0 ${size - strokeWidth / 2} H${size - strokeWidth / 2} V0`}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}
