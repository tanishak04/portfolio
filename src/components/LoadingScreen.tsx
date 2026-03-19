"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface GrowthNode {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    pulseOffset: number;
    born: number; // timestamp when this node was born
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodes = useRef<GrowthNode[]>([]);
    const animFrame = useRef<number>(0);
    const timeRef = useRef<number>(0);
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const progressRef = useRef(0);
    const centerRef = useRef({ x: 0, y: 0 });

    const MAX_NODES = 80;

    // Simulate loading progress
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.random() * 3 + 1;
                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return next;
            });
        }, 60);
        return () => clearInterval(interval);
    }, []);

    // Handle completion transition
    useEffect(() => {
        if (progress >= 100) {
            setTimeout(() => setFadeOut(true), 400);
            setTimeout(() => onComplete(), 1600);
        }
        progressRef.current = progress;
    }, [progress, onComplete]);

    const addNode = useCallback((cx: number, cy: number) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 150 + 30;
        nodes.current.push({
            x: cx + Math.cos(angle) * dist,
            y: cy + Math.sin(angle) * dist,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 2 + 1.2,
            pulseOffset: Math.random() * Math.PI * 2,
            born: timeRef.current,
        });
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            centerRef.current = {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            };
        };

        resize();
        window.addEventListener("resize", resize);

        // seed the first node at center
        nodes.current = [{
            x: centerRef.current.x,
            y: centerRef.current.y,
            vx: 0,
            vy: 0,
            radius: 2.5,
            pulseOffset: 0,
            born: 0,
        }];

        const LINK_DISTANCE = 140;

        const animate = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const cx = centerRef.current.x;
            const cy = centerRef.current.y;

            timeRef.current += 0.02;
            const time = timeRef.current;
            const pct = progressRef.current;

            ctx.clearRect(0, 0, w, h);

            // Add nodes based on progress
            const targetNodes = Math.floor((pct / 100) * MAX_NODES);
            while (nodes.current.length < targetNodes) {
                addNode(cx, cy);
            }

            const pts = nodes.current;
            const linkColor = "rgba(80, 80, 80,";

            // Scale factor for expansion at 100%
            const expanding = pct >= 100;
            const expandProgress = expanding
                ? Math.min((time - nodes.current[nodes.current.length - 1].born) * 2, 1)
                : 0;
            const scale = 1 + expandProgress * 0.5;

            if (expanding) {
                ctx.save();
                ctx.translate(cx, cy);
                ctx.scale(scale, scale);
                ctx.translate(-cx, -cy);
            }

            // Update positions
            for (const p of pts) {
                p.vx *= 0.995;
                p.vy *= 0.995;

                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed < 0.1) {
                    p.vx += (Math.random() - 0.5) * 0.08;
                    p.vy += (Math.random() - 0.5) * 0.08;
                }

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
                p.x = Math.max(0, Math.min(w, p.x));
                p.y = Math.max(0, Math.min(h, p.y));
            }

            // Draw links
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const dx = pts[i].x - pts[j].x;
                    const dy = pts[i].y - pts[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < LINK_DISTANCE) {
                        const opacity = (1 - dist / LINK_DISTANCE) * 0.3;
                        ctx.beginPath();
                        ctx.strokeStyle = `${linkColor} ${opacity})`;
                        ctx.lineWidth = 0.6;
                        ctx.moveTo(pts[i].x, pts[i].y);
                        ctx.lineTo(pts[j].x, pts[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes with pulsing
            for (const p of pts) {
                const age = Math.min((time - p.born) * 3, 1); // fade in
                const pulse = 0.3 + Math.sin(time * 2 + p.pulseOffset) * 0.25;
                const alpha = pulse * age;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(18, 18, 18, ${alpha})`;
                ctx.fill();

                // Glow
                if (pulse > 0.45 && age > 0.5) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(18, 18, 18, ${(pulse - 0.45) * 0.12 * age})`;
                    ctx.fill();
                }
            }

            if (expanding) {
                ctx.restore();
            }

            animFrame.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animFrame.current);
            window.removeEventListener("resize", resize);
        };
    }, [addNode]);

    return (
        <div
            className={`fixed inset-0 z-[9999] transition-opacity duration-[1200ms] ease-out ${fadeOut ? "opacity-0 scale-110" : "opacity-100 scale-100"
                }`}
            style={{
                background: "#EFEBE3",
                transformOrigin: "center center",
                transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
            }}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ display: "block" }}
            />

            {/* Bottom-right HUD */}
            <div className="absolute bottom-10 right-10 z-10 flex flex-col items-center pointer-events-none select-none">
                <div className="text-[11px] font-mono tracking-[0.3em] text-neutral-400 uppercase mb-4 text-center">
                    INITIALIZING NEURAL MESH
                </div>

                {/* Progress ring */}
                <div className="relative w-24 h-24 mb-4">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle
                            cx="50" cy="50" r="42"
                            fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1"
                        />
                        <circle
                            cx="50" cy="50" r="42"
                            fill="none" stroke="rgba(18,18,18,0.5)" strokeWidth="1"
                            strokeDasharray={`${2 * Math.PI * 42}`}
                            strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
                            strokeLinecap="round"
                            style={{ transition: "stroke-dashoffset 0.3s ease-out" }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-mono font-bold text-neutral-800 tracking-wider">
                            {Math.floor(progress)}%
                        </span>
                    </div>
                </div>

                <div className="text-[9px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
                    {progress < 30 && "SPAWNING NODES..."}
                    {progress >= 30 && progress < 60 && "ESTABLISHING CONNECTIONS..."}
                    {progress >= 60 && progress < 90 && "BUILDING NEURAL PATHWAYS..."}
                    {progress >= 90 && progress < 100 && "ACTIVATING MESH..."}
                    {progress >= 100 && "SYSTEM ONLINE"}
                </div>
            </div>
        </div>
    );
}
