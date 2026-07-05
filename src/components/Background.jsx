import React, { useEffect, useRef } from "react";

// Mouse-reactive particle network rendered on a fixed full-screen canvas.
function Background() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let width, height, particles, animId;
        const mouse = { x: -9999, y: -9999 };
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            const count = Math.min(120, Math.floor((width * height) / 14000));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.6 + 0.6,
                hue: Math.random() > 0.5 ? 190 : 265,
            }));
        }

        function step() {
            ctx.clearRect(0, 0, width, height);
            const linkDist = 130;

            for (let i = particles.length - 1; i >= 0; i--) {
                if (particles[i].life !== undefined && --particles[i].life <= 0) {
                    particles.splice(i, 1);
                }
            }

            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.life !== undefined) { p.vx *= 0.97; p.vy *= 0.97; }

                // gentle attraction toward the cursor
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const d = Math.hypot(dx, dy);
                if (d < 220 && d > 0.001) {
                    p.x += (dx / d) * 0.35;
                    p.y += (dy / d) * 0.35;
                }

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
                p.x = Math.max(0, Math.min(width, p.x));
                p.y = Math.max(0, Math.min(height, p.y));

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, 0.7)`;
                ctx.fill();
            }

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i], b = particles[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const d = Math.hypot(dx, dy);
                    if (d < linkDist) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `hsla(210, 80%, 70%, ${0.14 * (1 - d / linkDist)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(step);
        }

        function onClick(e) {
            // small particle burst at the click point
            for (let k = 0; k < 8; k++) {
                const a = (Math.PI * 2 * k) / 8 + Math.random() * 0.5;
                particles.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: Math.cos(a) * (1.5 + Math.random()),
                    vy: Math.sin(a) * (1.5 + Math.random()),
                    r: Math.random() * 1.6 + 0.8,
                    hue: Math.random() > 0.5 ? 190 : 265,
                    life: 90,
                });
            }
        }

        function onMove(e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }
        function onLeave() {
            mouse.x = -9999;
            mouse.y = -9999;
        }

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseout", onLeave);
        window.addEventListener("click", onClick);
        step();
        if (reduced) cancelAnimationFrame(animId); // keep one static frame

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseout", onLeave);
            window.removeEventListener("click", onClick);
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} className="bg-canvas" aria-hidden="true" />
            <div className="bg-vignette" aria-hidden="true" />
        </>
    );
}

export default Background;
