"use client";

import { useState, useCallback, useEffect } from "react";

const CHARS = "!@#$%^&*()_+{}:\"<>?,./;'[]\\-=`~";

export function useTextScramble(text: string) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);

    const scramble = useCallback(() => {
        if (isScrambling) return;
        setIsScrambling(true);

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(prev =>
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
                setIsScrambling(false);
            }

            iteration += 1 / 3;
        }, 30);
    }, [text, isScrambling]);

    return { displayText, scramble };
}
