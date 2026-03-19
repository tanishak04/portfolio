"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealOptions {
    threshold?: number;
    rootMargin?: string;
    delay?: number;
}

export function useScrollReveal<T extends HTMLElement>(
    options: ScrollRevealOptions = {}
) {
    const ref = useRef<T>(null);
    const { threshold = 0.15, rootMargin = "0px 0px -50px 0px", delay = 0 } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Start hidden
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                    observer.unobserve(el);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [threshold, rootMargin, delay]);

    return ref;
}
