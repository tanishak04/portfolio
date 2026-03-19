"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    pulseOffset: number; // unique phase per particle for pulsing
}

export function NeuralNetwork({ className = "" }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const mouse = useRef({ x: -1000, y: -1000 });
    const animFrame = useRef<number>(0);
    const timeRef = useRef<number>(0);
    const { resolvedTheme } = useTheme();

    const PARTICLE_COUNT = 80;
    const LINK_DISTANCE = 120;
    const MOUSE_RADIUS = 100;
    const PARTICLE_SPEED = 0.3;

    const initParticles = useCallback((w: number, h: number) => {
        particles.current = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.current.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * PARTICLE_SPEED * 2,
                vy: (Math.random() - 0.5) * PARTICLE_SPEED * 2,
                radius: Math.random() * 2 + 1,
                pulseOffset: Math.random() * Math.PI * 2,
            });
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (!rect) return;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initParticles(rect.width, rect.height);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current.x = e.clientX - rect.left;
            mouse.current.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.current.x = -1000;
            mouse.current.y = -1000;
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        const animate = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (!rect) return;
            const w = rect.width;
            const h = rect.height;

            timeRef.current += 0.02;
            const time = timeRef.current;

            ctx.clearRect(0, 0, w, h);

            // Subtle grey for links (minimal luxurious aesthetic)
            const linkColor = "rgba(80, 80, 80,";
            const isDark = resolvedTheme === "dark";

            const pts = particles.current;

            // Update positions
            for (const p of pts) {
                // Mouse repulsion
                const dx = p.x - mouse.current.x;
                const dy = p.y - mouse.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_RADIUS && dist > 0) {
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    p.vx += (dx / dist) * force * 0.5;
                    p.vy += (dy / dist) * force * 0.5;
                }

                // Damping
                p.vx *= 0.98;
                p.vy *= 0.98;

                // Ensure minimum velocity
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed < PARTICLE_SPEED * 0.3) {
                    p.vx += (Math.random() - 0.5) * 0.1;
                    p.vy += (Math.random() - 0.5) * 0.1;
                }

                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
                p.x = Math.max(0, Math.min(w, p.x));
                p.y = Math.max(0, Math.min(h, p.y));
            }

            // Draw links — subtle grey
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const dx = pts[i].x - pts[j].x;
                    const dy = pts[i].y - pts[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < LINK_DISTANCE) {
                        const opacity = (1 - dist / LINK_DISTANCE) * 0.2;
                        ctx.beginPath();
                        ctx.strokeStyle = `${linkColor} ${opacity})`;
                        ctx.lineWidth = 0.6;
                        ctx.moveTo(pts[i].x, pts[i].y);
                        ctx.lineTo(pts[j].x, pts[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles with pulsing opacity (firing neurons)
            for (const p of pts) {
                const pulse = 0.3 + Math.sin(time * 2 + p.pulseOffset) * 0.25;
                const nodeColor = isDark
                    ? `rgba(239, 235, 227, ${pulse})`
                    : `rgba(18, 18, 18, ${pulse})`;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = nodeColor;
                ctx.fill();

                // Subtle glow ring on brighter pulses
                if (pulse > 0.45) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = isDark
                        ? `rgba(239, 235, 227, ${(pulse - 0.45) * 0.15})`
                        : `rgba(18, 18, 18, ${(pulse - 0.45) * 0.15})`;
                    ctx.fill();
                }
            }

            // Draw mouse connections
            if (mouse.current.x > 0) {
                for (const p of pts) {
                    const dx = p.x - mouse.current.x;
                    const dy = p.y - mouse.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MOUSE_RADIUS * 1.5) {
                        const opacity = (1 - dist / (MOUSE_RADIUS * 1.5)) * 0.2;
                        ctx.beginPath();
                        ctx.strokeStyle = `${linkColor} ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(mouse.current.x, mouse.current.y);
                        ctx.lineTo(p.x, p.y);
                        ctx.stroke();
                    }
                }
            }

            animFrame.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animFrame.current);
            window.removeEventListener("resize", resizeCanvas);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [resolvedTheme, initParticles]);

    return (
        <div className={`overflow-hidden ${className}`} style={{ height: "100%" }}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ cursor: "crosshair", display: "block", pointerEvents: "auto", touchAction: "none" }}
            />
            {/* Glassmorphism Status Card */}
            <div
                className="hidden md:block md:absolute md:bottom-6 md:right-6 z-10 px-5 py-4 rounded-lg border border-foreground/10"
                style={{
                    background: resolvedTheme === "dark"
                        ? "rgba(18, 18, 18, 0.4)"
                        : "rgba(239, 235, 227, 0.4)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                }}
            >
                <pre className="text-[10px] leading-relaxed tracking-wider font-mono text-foreground/60 select-none">
                    {`SYSTEM_STATUS: ACTIVE
VISUALIZATION: NEURAL_MESH_V2.0
CORE_FOCUS: MACHINE_LEARNING`}
                </pre>
            </div>
        </div>
    );
}
