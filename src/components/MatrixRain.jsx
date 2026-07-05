import React, { useEffect, useRef, useState } from "react";

// Digital-rain overlay, toggled by the terminal's `matrix` command
// via a window "matrix-toggle" event.
const GLYPHS = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789";

function MatrixRain() {
    const [on, setOn] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        const toggle = () => setOn((v) => !v);
        window.addEventListener("matrix-toggle", toggle);
        return () => window.removeEventListener("matrix-toggle", toggle);
    }, []);

    useEffect(() => {
        if (!on) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let width, height, drops, animId, last = 0;
        const fontSize = 16;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            drops = Array.from({ length: Math.ceil(width / fontSize) }, () =>
                Math.floor(Math.random() * -50)
            );
        }

        function step(t) {
            animId = requestAnimationFrame(step);
            if (t - last < 50) return;
            last = t;
            ctx.fillStyle = "rgba(5, 5, 8, 0.12)";
            ctx.fillRect(0, 0, width, height);
            ctx.font = `${fontSize}px monospace`;
            drops.forEach((y, i) => {
                const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                ctx.fillStyle = Math.random() > 0.975 ? "#c4f5e0" : "#22d3aa";
                ctx.fillText(ch, i * fontSize, y * fontSize);
                drops[i] = y * fontSize > height && Math.random() > 0.975 ? 0 : y + 1;
            });
        }

        resize();
        window.addEventListener("resize", resize);
        animId = requestAnimationFrame(step);
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, [on]);

    if (!on) return null;
    return <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />;
}

export default MatrixRain;
