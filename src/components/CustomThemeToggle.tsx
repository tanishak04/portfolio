"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import "./CustomThemeToggle.css";

export const CustomThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="w-[56px] h-[28px]" />;

    const isDark = theme === "dark";

    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
        setTheme(isDark ? "light" : "dark");
        createRipple(e);
    };

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        // Calculate relative coordinates considering the CSS scale(0.4)
        // We roughly approximate the center based on click for visual effect
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement("div");
        ripple.className = "ripple";
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";

        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    };

    return (
        <div className="custom-toggle-container">
            <div className="toggle-wrapper">
                <button
                    className={`custom-toggle-button ${isDark ? 'dark' : ''}`}
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    <div className="toggle-track"></div>
                    <div className={`toggle-slider ${isDark ? 'active' : ''}`}>
                        <div className="icon sun-icon">☀️</div>
                        <div className="icon moon-icon">🌙</div>
                    </div>
                </button>
            </div>
        </div>
    );
};
