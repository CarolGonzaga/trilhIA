"use client";
import { useState, useEffect } from "react";

const TYPING_SPEED = 40; // Velocidade em ms

export function useTypewriter(text: string) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let isCancelled = false;

        // Resetar quando o texto muda
        setDisplayedText("");

        const typeNext = (i: number) => {
            if (isCancelled) return;

            if (i < text.length) {
                setDisplayedText((prev) => prev + text[i]);
                setTimeout(() => typeNext(i + 1), TYPING_SPEED);
            }
        };

        // Inicia a digitação
        typeNext(0);

        // Cleanup robusto contra Strict Mode
        return () => {
            isCancelled = true;
        };
    }, [text]);

    return displayedText;
}
