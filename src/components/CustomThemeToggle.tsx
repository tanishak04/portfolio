"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "next-themes";

export const CustomThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => setMounted(true), []);

    const toggleTheme = useCallback(() => {
        const isDark = resolvedTheme === "dark";
        const nextBg = isDark ? "rgba(239, 235, 227, 0.9)" : "rgba(18, 18, 18, 0.9)";

        // Get button center position for the circle origin
        let originX = "50%";
        let originY = "0%";
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            originX = `${cx}px`;
            originY = `${cy}px`;
        }

        const overlay = document.createElement("div");
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 99999;
            background: ${nextBg};
            pointer-events: none;
            will-change: clip-path, opacity;
            -webkit-clip-path: circle(0% at ${originX} ${originY});
            clip-path: circle(0% at ${originX} ${originY});
            animation: theme-circle-expand 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        `;

        // Inject dynamic keyframes with the correct origin
        const styleEl = document.createElement("style");
        styleEl.textContent = `
            @keyframes theme-circle-expand {
                0% { -webkit-clip-path: circle(0% at ${originX} ${originY}); clip-path: circle(0% at ${originX} ${originY}); opacity: 1; }
                50% { -webkit-clip-path: circle(150% at ${originX} ${originY}); clip-path: circle(150% at ${originX} ${originY}); opacity: 1; }
                100% { -webkit-clip-path: circle(150% at ${originX} ${originY}); clip-path: circle(150% at ${originX} ${originY}); opacity: 0; }
            }
        `;
        document.head.appendChild(styleEl);
        document.body.appendChild(overlay);

        // Switch theme at midpoint
        setTimeout(() => {
            setTheme(isDark ? "light" : "dark");
        }, 400);

        // Cleanup
        setTimeout(() => {
            overlay.remove();
            styleEl.remove();
        }, 850);
    }, [resolvedTheme, setTheme]);

    if (!mounted) return <div style={{ width: "44px", height: "20px" }} />;

    const isDark = resolvedTheme === "dark";

    return (
        <button
            ref={buttonRef}
            id="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                fontSize: "14px",
                letterSpacing: "2px",
                color: "hsl(var(--foreground))",
                padding: "8px 12px",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "0px",
                lineHeight: 1,
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
            }}
        >
            <span
                style={{
                    opacity: isDark ? 0.3 : 1,
                    textShadow: isDark ? "none" : "0 0 5px currentColor",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                0
            </span>
            <span style={{ opacity: 0.3, margin: "0 2px" }}>/</span>
            <span
                style={{
                    opacity: isDark ? 1 : 0.3,
                    textShadow: isDark ? "0 0 5px currentColor" : "none",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                1
            </span>
        </button>
    );
};
